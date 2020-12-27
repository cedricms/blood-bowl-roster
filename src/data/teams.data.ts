import type { TeamList } from "../models/team.model";

export const teamData: TeamList = {
  teams: [
    {
      name: "Imperial Nobility",
      id: 1,
      players: [
        { id: 1, max: 12 },
        { id: 2, max: 2 },
        { id: 3, max: 2 },
        { id: 4, max: 4 },
        { id: 5, max: 1 },
      ],
      reroll: { cost: 70, max: 8 },
      apothecary: true,
      tier: 2,
      specialRules: ["Old World Classic"],
    },
    {
      name: "Black Orc",
      id: 2,
      players: [
        { id: 6, max: 12 },
        { id: 7, max: 6 },
        { id: 8, max: 1 },
      ],
      reroll: { cost: 60, max: 8 },
      apothecary: true,
      tier: 2,
      specialRules: ['Badlands Brawl', 'Bribery and Corruption']
    },
    {
      name: "Chaos Chosen",
      id: 3,
      players: [
        { id: 9, max: 16 },
        { id: 10, max: 4 },
        { id: 11, max: 1 },
        { id: 12, max: 1 },
        { id: 13, max: 1 },
      ],
      reroll: { cost: 60, max: 8 },
      apothecary: true,
      tier: 2,
      specialRules: ['Favoured of...']
    },
    {
      name: "Dark Elf",
      id: 4,
      players: [
        { id: 14, max: 12 },
        { id: 15, max: 2 },
        { id: 16, max: 4 },
        { id: 17, max: 2 },
        { id: 18, max: 2 },
      ],
      reroll: { cost: 50, max: 8 },
      apothecary: true,
      tier: 1,
      specialRules: ['Elven Kingdoms League']
    },
    {
      name: "Dwarf",
      id: 5,
      players: [
        { id: 19, max: 12 },
        { id: 20, max: 2 },
        { id: 21, max: 2 },
        { id: 22, max: 2 },
        { id: 23, max: 1 },
      ],
      reroll: { cost: 50, max: 8 },
      apothecary: true,
      tier: 1,
      specialRules: ["Old World Classic", "Worlds Edge Superleague"]
    },
    {
      name: "Elven Union",
      id: 6,
      players: [
        { id: 24, max: 12 },
        { id: 25, max: 2 },
        { id: 26, max: 4 },
        { id: 27, max: 2 },
      ],
      reroll: { cost: 50, max: 8 },
      apothecary: true,
      tier: 2,
      specialRules: ["Elven Kingdoms League"]
    },
    {
      name: "Goblin",
      id: 7,
      players: [
        { id: 28, max: 16 },
        { id: 29, max: 1 },
        { id: 30, max: 1 },
        { id: 31, max: 1 },
        { id: 32, max: 1 },
        { id: 33, max: 1 },
        { id: 34, max: 1 },
        { id: 8, max: 2 },
      ],
      reroll: { cost: 60, max: 8 },
      apothecary: true,
      tier: 3,
      specialRules: ["Badlands Brawl", "Bribery and Corruption", "Underworld Challenge"]
    },
    {
      name: "Halfling",
      id: 8,
      players: [
        { id: 35, max: 16 },
        { id: 36, max: 2 },
        { id: 37, max: 2 },
        { id: 38, max: 2 },
      ],
      reroll: { cost: 60, max: 8 },
      apothecary: true,
      tier: 3,
      specialRules: ["Halfling Thimble Cup", "Old World Classic"]
    },
    {
      name: "Human",
      id: 9,
      players: [
        { id: 39, max: 16 },
        { id: 40, max: 2 },
        { id: 41, max: 4 },
        { id: 42, max: 4 },
        { id: 35, max: 3 },
        { id: 5, max: 1 },
      ],
      reroll: { cost: 50, max: 8 },
      apothecary: true,
      tier: 1,
      specialRules: ["Old World Classic"]
    },
    {
      name: "Lizardmen",
      id: 10,
      players: [
        { id: 43, max: 12 },
        { id: 44, max: 2 },
        { id: 45, max: 6 },
        { id: 46, max: 1 },
      ],
      reroll: { cost: 70, max: 8 },
      apothecary: true,
      tier: 1,
      specialRules: ["Lustrian Superleague"]
    },
    {
      name: "Necromantic Horror",
      id: 11,
      players: [
        { id: 47, max: 16 },
        { id: 48, max: 2 },
        { id: 49, max: 2 },
        { id: 50, max: 2 },
        { id: 51, max: 2 },
      ],
      reroll: { cost: 70, max: 8 },
      apothecary: false,
      tier: 2,
      specialRules: ["Masters of Undeath", "Sylvanian Spotlight"]
    },
    {
      name: "Nurgle",
      id: 12,
      players: [
        { id: 52, max: 12 },
        { id: 53, max: 4 },
        { id: 54, max: 4 },
        { id: 55, max: 1 },
      ],
      reroll: { cost: 70, max: 8 },
      apothecary: false,
      tier: 2,
      specialRules: ["Favoured of Nurgle"]
    },
    {
      name: "Ogre",
      id: 13,
      players: [
        { id: 56, max: 16 },
        { id: 57, max: 1 },
        { id: 58, max: 5 },
      ],
      reroll: { cost: 70, max: 8 },
      apothecary: true,
      tier: 3,
      specialRules: ["Badlands Brawl", "Low Cost Linemen", "Old World Classic"]
    },
    {
      name: "Old World Alliance",
      id: 14,
      players: [
        { id: 39, max: 12 },
        { id: 40, max: 1 },
        { id: 41, max: 1 },
        { id: 42, max: 1 },
        { id: 19, max: 2 },
        { id: 20, max: 1 },
        { id: 21, max: 1 },
        { id: 22, max: 1 },
        { id: 35, max: 2 },
        { id: 5, max: 1 },
        { id: 38, max: 1 }
      ],
      reroll: { cost: 70, max: 8 },
      apothecary: true,
      tier: 1,
      specialRules: ["Old World Classic"]
    },
    {
      name: "Orc",
      id: 15,
      players: [
        { id: 59, max: 16 },
        { id: 60, max: 2 },
        { id: 61, max: 4 },
        { id: 62, max: 5 },
        { id: 63, max: 6 },
        { id: 64, max: 1 },
      ],
      reroll: { cost: 60, max: 8 },
      apothecary: true,
      tier: 1,
      specialRules: ["Badlands Brawl"]
    },
    {
      name: "Shambling Undead",
      id: 16,
      players: [
        { id: 65, max: 12 },
        { id: 47, max: 12 },
        { id: 48, max: 4 },
        { id: 66, max: 2 },
        { id: 67, max: 2 },
      ],
      reroll: { cost: 70, max: 8 },
      apothecary: false,
      tier: 1,
      specialRules: ["Masters of Undeath", "Sylvanian Spotlight"]
    },
    {
      name: "Skaven",
      id: 17,
      players: [
        { id: 68, max: 16 },
        { id: 69, max: 2 },
        { id: 70, max: 4 },
        { id: 71, max: 2 },
        { id: 72, max: 1 },
      ],
      reroll: { cost: 50, max: 8 },
      apothecary: true,
      tier: 1,
      specialRules: ["Underworld Challenge"]
    },
    {
      name: "Snotling",
      id: 18,
      players: [
        { id: 73, max: 16 },
        { id: 74, max: 2 },
        { id: 75, max: 2 },
        { id: 76, max: 2 },
        { id: 77, max: 2 },
        { id: 8, max: 2 },
      ],
      reroll: { cost: 60, max: 8 },
      apothecary: true,
      tier: 3,
      specialRules: ["Bribery and Corruption", "Low Cost Linemen", "Underworld Challenge"]
    },
    {
      name: "Underworld Denizen",
      id: 19,
      players: [
        { id: 28, max: 12 },
        { id: 73, max: 6 },
        { id: 68, max: 3 },
        { id: 69, max: 1 },
        { id: 70, max: 1 },
        { id: 71, max: 1 },
        { id: 71, max: 1 },
        { id: 8, max: 1 },
        { id: 72, max: 1 }
      ],
      reroll: { cost: 70, max: 8 },
      apothecary: true,
      tier: 2,
      specialRules: ["Bribery and Corruption", "Underworld Challenge"]
    },
    {
      name: "Wood Elf",
      id: 20,
      players: [
        { id: 78, max: 12 },
        { id: 79, max: 2 },
        { id: 80, max: 4 },
        { id: 81, max: 2 },
        { id: 38, max: 1 },

      ],
      reroll: { cost: 50, max: 8 },
      apothecary: true,
      tier: 1,
      specialRules: ["Elven Kingdoms League"]
    },
    {
      name: "Chaos Renegade",
      id: 21,
      players: [
        { id: 39, max: 12 },
        { id: 40, max: 1 },
        { id: 28, max: 4 },
        { id: 59, max: 1 },
        { id: 68, max: 1 },
        { id: 8, max: 1 },
        { id: 5, max: 1 },
        { id: 13, max: 1 },
        { id: 72, max: 1 },

      ],
      reroll: { cost: 70, max: 8 },
      apothecary: true,
      tier: 2,
      specialRules: ["Favoured of..."]
    },
  ],
};
