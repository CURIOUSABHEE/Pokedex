import { createInterface, type Interface } from "readline";
import type { CLICommand } from "./command.js";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMap, commandMapb } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { Pokemon } from "./pokeapi.js";

export type State = {
    rl: Interface;
    commandRegistry: Record<string, CLICommand>;
    nextURL?: string | null;
    prevURL?: string | null;
    pokedex: Record<string, Pokemon>
};

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const commandRegistry: Record<string, CLICommand> = {};

    // Exit command
    commandRegistry["exit"] = {
        name: "exit",
        description: "Exit the REPL",
        callback: (state, args = []) => {
            // We pass commandRegistry manually if needed
            commandExit(state, state.commandRegistry);
        },
    };

    // Help command
    commandRegistry["help"] = {
        name: "help",
        description: "Show this help message",
        callback: (state, args = []) => {
            commandHelp(state, state.commandRegistry);
        },
    };

    // Map command
    commandRegistry["map"] = {
        name: "map",
        description: "Showing 20 locations",
        callback: (state, args = []) => {
            commandMap(state);
        },
    };

    // Map back command
    commandRegistry["mapb"] = {
        name: "mapb",
        description: "Showing previous 20 locations",
        callback: (state, args = []) => {
            commandMapb(state);
        },
    };

    // Explore command
    commandRegistry["explore"] = {
        name: "explore",
        description: "Explore a location",
        callback: (state, args = []) => {
            if (!args[0]) {
                console.log("Please provide a location to explore.");
                state.rl.prompt();
                return;
            }
            commandExplore(state, args);
        },
    };

    commandRegistry["catch"] = {
        name: "catch",
        description: "catch a pokemon",
        callback: (state, args = []) => {
            commandCatch(state, args);
        },
    }
    const pokedex: Record<string, Pokemon> = {}

    return { rl, commandRegistry, nextURL: null, prevURL: null, pokedex };
}