import { PokeAPI } from "./pokeapi.js";
import { State } from "./state.js";

const api = new PokeAPI();

export async function commandCatch(state: State, args: string[]) {
    const pokemonName = args[0];
    if (!pokemonName) {
        console.log("Please provide a pokemon name.");
        return state.rl.prompt();
    }

    try {
        const resp = await api.fetchPokemon(pokemonName);

        console.log(`Throwing a Pokeball at ${pokemonName}...`);

        // Calculate catch chance (higher base_experience = harder to catch)
        const maxExp = 500; // adjust for balance
        const catchChance = Math.max(0.1, 1 - resp.base_experience / maxExp);

        if (Math.random() < catchChance) {
            console.log(`${pokemonName} was caught!`);

            // Add to user's Pokedex
            state.pokedex[pokemonName] = resp;
        } else {
            console.log(`${pokemonName} escaped!`);
        }
    } catch (err: any) {
        console.log("Error fetching Pokemon:", err.message);
    }

    state.rl.prompt();
}