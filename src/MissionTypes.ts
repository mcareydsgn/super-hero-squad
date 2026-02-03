
export interface MissionStats {
    "intelligence": number,
    "strength": number,
    "speed": number,
    "durability": number,
    "power": number,
    "combat": number
}

export interface Mission  {
    "title": string,
    "mission": string,
    mission_stats: MissionStats
    "required_heroes": number,
    "complete": boolean
}
