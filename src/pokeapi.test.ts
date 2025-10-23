import { describe, it, expect } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {

  it("should store and retrieve values", () => {
    const cache = new Cache(1000); // 1 second interval
    cache.add("key1", { name: "Pikachu" });

    const cached = cache.get<{ name: string }>("key1");
    expect(cached).toBeDefined();
    expect(cached?.val.name).toBe("Pikachu");
  });

  it("should delete old entries after interval", async () => {
    const cache = new Cache(50); // 50ms interval for fast test
    cache.add("key2", { name: "Bulbasaur" });

    // Wait 60ms to exceed interval
    await new Promise((resolve) => setTimeout(resolve, 60));
    cache.reap(); // Manually call reap

    const cached = cache.get<{ name: string }>("key2");
    expect(cached).toBeUndefined();
  });

});