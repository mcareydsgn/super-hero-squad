
import React, {useEffect} from "react";
import { useStore } from '@nanostores/react';

import './HeroRecruits.css'
import {$allHeroes} from "../../HeroesStore.ts";
import HeroCard from "../ui/HeroCard.tsx";


function HeroRecruits() {
    const allHeroes = useStore($allHeroes);

    return (
        <>
            {
                allHeroes.map((hero) => {
                    const {id, name, powerstats, publisher, alignment,imageSource, onDuty} = hero;
                    const heroOrVillain = alignment === 'good' ? 'Hero' : 'Villain';
                    if (onDuty == false) {
                        return (
                            <HeroCard key={id} hero={{id, name, powerstats, publisher, alignment, imageSource, onDuty }} showBioLinks={true} buttonText={`Recruit ${heroOrVillain}`}>
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