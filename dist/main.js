import { startREPL } from "./repl.js";
import { initState } from "./state.js";
export const state = initState();
startREPL(state);
