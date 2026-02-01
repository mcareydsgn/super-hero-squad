
import React from "react";
import { useStore } from '@nanostores/react';
import {$allHeroes} from "../../HeroesStore.ts";
import HeroCard from "./HeroCard.tsx";


function HeroRecruits() {
    const allHeroes = useStore($allHeroes);

    return (
        <>
            {
                allHeroes.map((hero) => {
                    const {id, name, powerstats, publisher, alignment,imageSource, onDuty} = hero;

                    if (onDuty == false) {
                        return (
                            <HeroCard key={id} hero={{id, name, powerstats, publisher, alignment, imageSource, onDuty }} showBioLinks={true} buttonText={"Recruit Hero"}>
                            </HeroCard>
                        )
                    } else {
                        return null;
                    }
                })

            }
        </>
    )
}

export default HeroRecruits;