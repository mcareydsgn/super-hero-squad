

export interface PowerStats  {
    "intelligence": string,
    "strength": string,
    "speed": string,
    "durability": string,
    "power": string,
    "combat": string
}

export interface Hero {
    name: string,
    powerstats?: PowerStats,
    id: string,
    publisher?: string,
    alignment?: string,
    imageSource: string,
    onDuty: boolean,
}
