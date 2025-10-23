
type CacheEntry<T> = {
    createdAt: number,
    val: T
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(intervalValue:number) {
    if (typeof intervalValue !== 'number' || intervalValue < 0) {
      throw new Error('intervalValue must be a non-negative number.');
    }
    this.#interval = intervalValue; // Assign the parameter value to the private field
    this.startReapLoop(); // Call the method to start the loop
  }

    add<T>(key: string, val:T){
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val
        }
        this.#cache.set(key, entry)
        
    }

    get<T>(key: string): CacheEntry<T> | undefined {
        return this.#cache.get(key);
    }

    reap(){
        const now = Date.now();
        for (const [key, entry] of this.#cache.entries()) {
            if (entry.createdAt < now - this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    startReapLoop(){
        this.#reapIntervalId = setInterval(()=>{
            this.reap() 
        }, this.#interval)
    }

    stopReapLoop(){
        if (this.#reapIntervalId){
            clearInterval(this.#reapIntervalId)
            this.#reapIntervalId = undefined
        }
    }
}
