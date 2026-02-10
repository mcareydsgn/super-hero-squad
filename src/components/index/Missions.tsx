import React, { useEffect, useMemo } from "react";
import { useStore } from '@nanostores/react';

import type {Mission} from "../../MissionTypes.ts";
import "./Missions.css";

import { $allMissions } from "../../MissionStores.ts";
import { $maxHeroesOnDuty, $clearOnDutyHeroes } from "../../HeroesStore.ts";

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

function Missions() {
    const missions = useStore($allMissions);

    const [mission, setMission] = React.useState<Mission | null>(null);
    const [currentMissionIndex, setCurrentMissionIndex] = React.useState(0);


    function handleMissionUpdate(changeIndex: number) {
       const nextIndex = currentMissionIndex + changeIndex;

        const selectedMission = missions[nextIndex];
        setMission(selectedMission);
        setCurrentMissionIndex(nextIndex);
        $maxHeroesOnDuty.set(selectedMission.required_heroes);
        $clearOnDutyHeroes();


    }

    useEffect(() => {
        if (missions.length > 0 && !mission) {
            const selectedMission = missions[currentMissionIndex];
            setMission(selectedMission);
            $maxHeroesOnDuty.set(selectedMission.required_heroes);
        }
    }, []);


    if (!mission) return <p>Loading mission...</p>;


    return (
        <>
            <article className="mission-objective">
                <h4>{mission.title}</h4>
                <p>{mission.mission}</p>
                <p>Required Heroes: {mission.required_heroes}</p>
            </article>
            <div className={"mission-change"}>
                <button className={"button accent round"}
                        type={"button"}
                        onClick={() => handleMissionUpdate(-1)}
                        disabled={currentMissionIndex === 0}>
                    <svg width="24" height="24"
                         fill="currentColor" viewBox="0 0 24 24" >
                        <path d="M14.29 6.29 8.59 12l5.7 5.71 1.42-1.42-4.3-4.29 4.3-4.29z"></path>
                    </svg>
                    <span className={"sr-only"}>Previous Mission</span>
                </button>

                <button className={"button accent round"}
                        type={"button"}
                        onClick={() => handleMissionUpdate(1)}
                        disabled={currentMissionIndex >= missions.length - 1}>
                    <svg width="24" height="24"
                         fill="currentColor" viewBox="0 0 24 24" >
                        <path d="m9.71 17.71 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
                    </svg>
                    <span className={"sr-only"}>Next Mission</span>
                </button>
            </div>

        </>

    );
}

export default Missions;