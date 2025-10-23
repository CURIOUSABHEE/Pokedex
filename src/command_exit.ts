import type { State } from "./state.js";
import type { CLICommand } from "./command.js";

export function commandExit(state: State, _commands?: Record<string, CLICommand>) {
    console.log("Closing the Pokedex... Goodbye!");
    state.rl.close();
    process.exit(0);
}

