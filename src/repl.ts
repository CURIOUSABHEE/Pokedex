import type { State } from "./state.js";

export function startREPL(state: State) {
    const { rl, commandRegistry } = state;

    rl.prompt();

    rl.on("line", (input: string) => {
        // const cleanedInput = cleanInput(input);

        // ignore empty input
        // if (cleanedInput.length === 0) {
        //     rl.prompt();
        //     return;
        // }

        const [commandName, ...args] = input.trim().split(" ");
        const command = commandRegistry[commandName];
        if (command) {
            command.callback(state, args);
        }

        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input
        .toLowerCase()
        .trim()
        .split(" ")
        .filter((word) => word !== "");
}
