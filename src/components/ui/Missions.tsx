import React, { useEffect, useMemo } from "react";
import { useStore } from '@nanostores/react';
import { $allMissions } from "../../MissionStores.ts";
import { $maxHeroesOnDuty } from "../../HeroesStore.ts";

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

function Missions() {
    const missions = useStore($allMissions);

    // 1. Memoize the random mission so it doesn't change on every render
    const mission = useMemo(() => {
        if (missions.length === 0) return null;
        const missionIndex = getRandomInt(0, missions.length);
        return missions[missionIndex];
    }, [missions]); // Only pick a new mission if the list of missions changes

    // 2. Update the store inside an effect
    useEffect(() => {
        if (mission) {
            $maxHeroesOnDuty.set(mission.required_heroes);
        }
    }, [mission]); // Only update when the mission changes

    if (!mission) return <p>Loading missions...</p>;

    return (
        <article>
            <h3>{mission.title}</h3>
            <p>{mission.mission}</p>
            <p>Required Heroes: {mission.required_heroes}</p>
        </article>
    );
}

export default Missions;