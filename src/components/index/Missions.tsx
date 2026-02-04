import type {Mission} from "../../MissionTypes.ts";

import React, { useEffect, useMemo } from "react";
import { useStore } from '@nanostores/react';
import { $allMissions } from "../../MissionStores.ts";
import { $maxHeroesOnDuty } from "../../HeroesStore.ts";

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

function Missions() {
    const missions = useStore($allMissions);

    const [mission, setMission] = React.useState<Mission | null>(null);

    useEffect(() => {
        if (missions.length > 0 && !mission) {
            const missionIndex = Math.floor(Math.random() * missions.length);
            const selectedMission = missions[missionIndex];

            setMission(selectedMission);
            $maxHeroesOnDuty.set(selectedMission.required_heroes);
        }
    }, [missions]);


    if (!mission) return <p>Loading mission...</p>;


    return (
        <article>
            <h3>{mission.title}</h3>
            <p>{mission.mission}</p>
            <p>Required Heroes: {mission.required_heroes}</p>
        </article>
    );
}

export default Missions;