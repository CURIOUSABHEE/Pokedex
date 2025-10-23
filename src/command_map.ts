import { PokeAPI } from "./pokeapi.js";
import { State } from "./state.js";

const api = new PokeAPI()

export async function commandMap(state: State){
    // if nextURL exists, go to next page. Otherwise load first page
    const resp = await api.fetchLocations(state.nextURL ?? undefined);

    resp.results.forEach(r => console.log(r.name));

    state.nextURL = resp.next;
    state.prevURL = resp.previous;

    state.rl.prompt();
}

export async function commandMapb(state: State) {
  if (!state.nextURL) {
    console.log("No more pages.");
    return state.rl.prompt();
  }

  const resp = await api.fetchLocations(state.nextURL);
  resp.results.forEach(r => console.log(r.name));

  // update new pagination state
  state.nextURL = resp.next;
  state.prevURL = resp.previous;

  state.rl.prompt();
}
