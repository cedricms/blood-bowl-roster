import { nanoid } from 'nanoid';
import type {
    GameEvent,
    GameEventTally,
    GameEventType,
    MatchHistoryRecord,
    MatchHistorySummary,
} from '../models/matchHistory.model';
import type { Roster, RosterPlayerRecord } from '../models/roster.model';

export function newMatchRecord(coachName?: string): MatchHistoryRecord {
    return {
        id: nanoid(),
        playingCoach: {
            name: coachName,
            pettyCash: 0,
            leaguePoints: 0,
            winnings: 0,
            fanFactor: 0,
        },
        opponentCoach: { name: '' },
        weather: { table: 'default', result: '4 - 10' },
        isLeagueMatch: true,
        time: { date: new Date().toISOString().slice(0, 10) },
        stadium: { category: 'Nothing out of the Ordinary', attribute: 1 },
        gameEventTally: {
            touchdown: 0,
            completion: 0,
            casualty: 0,
            kill: 0,
            interception: 0,
            deflection: 0,
            opponentScore: 0,
        },
    };
}

export function matchSummary(record: MatchHistoryRecord): MatchHistorySummary {
    const { opponentScore, ...playerScores } = record.gameEventTally;
    const newSummary: MatchHistorySummary = {
        id: record.id,
        opponent: {
            name: record.opponentCoach.name,
            score: opponentScore,
        },
        playerScores,
        isLeagueMatch: record.isLeagueMatch,
        matchDate: record.time.date,
        leaguePoints: record.playingCoach.leaguePoints,
    };
    return newSummary;
}

export function updateMatchDraftTotals(
    record: MatchHistoryRecord
): MatchHistoryRecord {
    const newTally: GameEventTally = {
        opponentScore: record.gameEventTally.opponentScore,
        ...mapGameEventsToTally(record.playingCoach.gameEvents),
    };
    return {
        ...record,
        gameEventTally: newTally,
    };
}

export function updateRosterWithDraft(
    roster: Roster,
    options?: {
        spp: boolean;
        removeInducements: boolean;
        addWinnings: boolean;
    }
): Roster {
    if (!roster.matchDraft) return roster;
    console.log('start update');
    const r = { ...roster };

    if (roster.matchDraft?.playingCoach?.gameEventRecording === 'individual') {
        r.players = addEventsToPlayers(
            roster.matchDraft.playingCoach.gameEvents,
            [...roster.players],
            !!options?.spp,
            roster.matchDraft?.playingCoach?.mvp?.id
        );
        r.matchDraft = updateMatchDraftTotals(roster.matchDraft);
    }

    if (options?.addWinnings && roster.matchDraft?.playingCoach?.winnings) {
        r.treasury += roster.matchDraft.playingCoach.winnings / 1000;
    }

    r.matchDraft.playingCoach.inducementsHired = Object.entries(
        r.inducements
    ).map((i) => ({ id: i[0], amount: i[1] }));

    if (options?.removeInducements) {
        r.inducements = {};
        r.players;
    }
    console.log('end update');

    return r;
}

function addEventsToPlayers(
    events: GameEvent[],
    players: RosterPlayerRecord[],
    addSpp: boolean,
    mvp: string
) {
    return players.map((p) => {
        const player = { ...p };
        console.log(player);

        if (events?.length > 0) {
            const playerEvents = events.filter(
                (e) => e.playerId === p.playerId
            );
            playerEvents.forEach((e) => {
                if (!player.alterations.gameRecords) {
                    player.alterations.gameRecords = {};
                }
                player.alterations.gameRecords[e.eventType] = player.alterations
                    .gameRecords[e.eventType]
                    ? player.alterations.gameRecords[e.eventType] + 1
                    : 1;
                if (addSpp) {
                    console.log(e.eventType);
                    console.log(eventToSpp[e.eventType]);
                    player.alterations.spp += eventToSpp[e.eventType];
                }
            });
        }

        if (p.playerId === mvp) {
            player.alterations?.gameRecords?.['mvp']
                ? player.alterations.gameRecords['mvp']++
                : 1;

            if (addSpp) {
                player.alterations.spp += 4;
            }
        }
        return player;
    });
}

const eventToSpp: Record<GameEventType, number> = {
    casualty: 2,
    completion: 1,
    kill: 0,
    touchdown: 3,
    deflection: 1,
    interception: 2,
};

export const gameEventPluralMap: Record<GameEventType, string> = {
    touchdown: 'Touchdowns',
    completion: 'Completions',
    casualty: 'Casualties',
    kill: 'Kills',
    interception: 'Interceptions',
    deflection: 'Deflections',
};

function mapGameEventsToTally(
    events: GameEvent[]
): Omit<GameEventTally, 'opponentScore'> {
    let newTally: Omit<GameEventTally, 'opponentScore'> = {
        casualty: 0,
        touchdown: 0,
        completion: 0,
        kill: 0,
        deflection: 0,
        interception: 0,
    };
    if (events?.length > 0) {
        events.forEach((e) => newTally[e.eventType]++);
    }
    return newTally;
}
