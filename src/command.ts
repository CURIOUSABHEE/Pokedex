import type { State } from "./state.js";

export type CLICommand = {
  name: string;
  description: string;
  // callbacks may be async (return Promise<void>) or sync (void)
  callback: (state: State, args?: string[]) => Promise<void> | void;
};