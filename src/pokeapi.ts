import { Cache } from "./pokecache.js";


export type ShallowLocations = {
    results: { name: string, url: string }[]
    next: string | null
    previous: string | null
}

export type Location = {
    id: number;
    name: string;
    pokemon_encounters: {
        pokemon: {
            name: string;
        };
    }[];
};

export type Pokemon = {
    id: number;
    name: string;
    base_experience: number
};

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor(interval = 60000) {
        this.cache = new Cache(interval);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {

        const url = pageURL ?? `${PokeAPI.baseURL}/location-area?offset=0&limit=20`
        const cached = this.cache.get<ShallowLocations>(url)?.val

        if (cached) {
            return cached;
        }

        try {
            const locations = await fetch(url)
            const data = await locations.json()
            const result = { results: data.results, next: data.next, previous: data.previous }
            this.cache.add(url, result);
            return result
        } catch (err) {
            console.error(err);
            return { results: [], next: null, previous: null };
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`
        const cached = this.cache.get<Location>(url)?.val
        if (cached) return cached;

        try {
            const resp = await fetch(url);
            const data = await resp.json();
            this.cache.add(url, data);
            return data;
        } catch (err) {
            console.error(err)
            throw err;
        }
    }

    async fetchPokemons(locationName: string): Promise<Location> {
        return this.fetchLocation(locationName)
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        try {
            const response = await fetch(url);
            const pokemon = await response.json();
            this.cache.add(url, pokemon);
            return pokemon;
        } catch (err: any) {
            console.error(err)
            throw err;
        }
    }
}
