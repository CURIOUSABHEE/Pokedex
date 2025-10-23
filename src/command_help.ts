import type { State } from "./state.js";
import type { CLICommand } from "./command.js";

export function commandHelp(_state: State, commands: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    if (!commands) return;
    for (const key in commands) {
        console.log(`${key}: ${commands[key].description}`);
    }
}