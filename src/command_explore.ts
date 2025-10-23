import { PokeAPI } from "./pokeapi.js";
import { State } from "./state.js";

const api = new PokeAPI();

export async function commandExplore(state: State, args: string[]) {
    const locationName = args[0];
    if (!locationName) {
        console.log("Please provide a location area name.");
        return state.rl.prompt();
    }

    try {
        const resp = await api.fetchPokemons(locationName);

        if (!resp.pokemon_encounters || resp.pokemon_encounters.length === 0) {
            console.log("No Pokémon found in this area.");
        } else {
            console.log(`Exploring ${locationName}...`);
            console.log("Found Pokémon:");
            for (const encounter of resp.pokemon_encounters) {
                console.log(` - ${encounter.pokemon.name}`);
            }
        }
    } catch (err:any) {
        console.log("Error fetching location area:", err.message);
    }

    state.rl.prompt();
}