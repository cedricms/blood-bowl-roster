<script lang="ts">
    import { starPlayers } from '../data/starPlayer.data';
    import { currentTeam } from '../store/currentTeam.store';
    import { filterStarPlayers } from '../helpers/starPlayerFilter';
    import { roster } from '../store/teamRoster.store';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import type { Team } from '../models/team.model';
    import { rosterSpecialRules } from '../store/rosterSpecialRules.store';
    import { formatNumberInThousands } from '../helpers/formatTotalToThousands';
    import type { StarPlayer } from '../models/player.model';

    let selectedId: number;

    $: filteredStarPlayers = filterStarPlayers(
        starPlayers,
        $rosterSpecialRules,
        $roster.players.map((x) => x.player.id)
    )
        .map((x, _, a) => {
            let displayName = x.position;
            if (x?.twoForOne) {
                const other = a.find((p) => p.id === x?.twoForOne);
                if (other.id < x.id) {
                    return { ...x, displayName: 'ignoreThis' };
                }
                displayName = x.position + ' & ' + other.position;
            }
            return { ...x, displayName };
        })
        .filter((x) => x.displayName !== 'ignoreThis');

    let currentStarPlayerAmount: number;
    $: currentStarPlayerAmount = $roster.players
        .filter((x) => x.starPlayer && !x.deleted)
        .filter((x, _, a) => {
            const other = a.find(
                (p) => p.player.id === (x.player as StarPlayer)?.twoForOne
            );
            if (other?.player?.id < x.player.id) {
                return false;
            }
            return true;
        }).length;

    const getSelected = (id) => {
        return starPlayers.starPlayers.find((x) => x.id === id);
    };

    const addStarPlayer = () => {
        const addTwo = getSelected(selectedId).twoForOne;

        roster.addPlayer({
            player: getSelected(selectedId),
            playerName: getSelected(selectedId).position,
            starPlayer: true,
        });

        if (addTwo) {
            const twoForPlayer = starPlayers.starPlayers.find(
                (x) => x.id === getSelected(selectedId).twoForOne
            );
            roster.addPlayer({
                player: twoForPlayer,
                playerName: twoForPlayer.position,
                starPlayer: true,
            });
        }
        setTimeout(() => {
            // This is a hack until I work out why the binding isn't updated when the options array change
            selectedId = filteredStarPlayers?.[0]?.id;
        }, 2);
    };
</script>

<section class="no-print star-player">
    <header>
        <h3>Star Player</h3>
    </header>
    <div class="star-player__content">
        {#if filteredStarPlayers.length > 0}
            <select
                aria-label="star player name"
                class="star-player-select"
                data-cy="star-player-select"
                bind:value={selectedId}
            >
                {#each filteredStarPlayers as star (star.id)}
                    <option value={star.id}>{star.displayName}</option>
                {/each}
            </select>
        {/if}
        <div class="star-player__secondary">
            <div class="star-player-amount">
                {currentStarPlayerAmount} / 2
            </div>
            <div class="star-player-cost">
                {formatNumberInThousands(getSelected(selectedId)?.cost) || 0}
            </div>
            <div class="add-star">
                {#if filteredStarPlayers.length > 0 && currentStarPlayerAmount < 2}
                    <MaterialButton
                        hoverText="Add star player"
                        symbol="add_circle"
                        clickFunction={addStarPlayer}
                        cyData="add-star-player"
                    />
                {/if}
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    .star-player {
        margin-right: 1em;
        border: 1px solid #ccc;
        margin-block-end: 1rem;
        header {
            background-color: var(--main-colour);
            h3 {
                padding: 8px;
                margin: 0;
                color: var(--white);
                font-family: var(--body-font);
                text-align: center;
                font-size: 14px;
                line-height: 28px;
                text-transform: uppercase;
            }
        }
        &__content {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
            padding: 8px;
        }
        &__secondary {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
            margin-left: auto;
        }
        @media screen and (max-width: 783px) {
            width: 100%;
            margin-right: 0;
        }
    }
    // .star-player-inducement {
    //     margin-block-end: 1em;
    //     margin-right: 1em;
    //     tr {
    //         height: 44px;
    //     }
    // }
    // .left-align {
    //     text-align: left;
    // }
    .add-star {
        height: 24px;
    }
</style>
