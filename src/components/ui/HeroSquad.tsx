
import React from "react";
import { useStore } from '@nanostores/react';
import { $heroesOnDuty, $totalOnDuty, $maxHeroesOnDuty} from "../../HeroesStore.ts";
import MiniHeroCard from "./MiniHeroCard.tsx";


function HeroSquad() {
    const heroesOnDuty = useStore($heroesOnDuty);
    const maxHeroesOnDuty = useStore($maxHeroesOnDuty);
    const totalOnDuty = useStore($totalOnDuty);

    function heroCards(){
        const heroCards  = heroesOnDuty.map((hero) => {
            const {id, name, powerstats, publisher, alignment,imageSource, onDuty} = hero;

            return (
            <MiniHeroCard key={id} hero={{id, name, powerstats, publisher, alignment, imageSource, onDuty }}  buttonText={"Remove Hero"}>
            </MiniHeroCard>
            )
        });


        let remainingSlots = maxHeroesOnDuty - totalOnDuty;
        while (remainingSlots > 0) {
            heroCards.push( (
                <article key={`remainingSlots_${remainingSlots}`} className={"mini-hero-card hero-placeholder"}></article>
            ) );
            remainingSlots -= 1;
        }

        return heroCards;
    }

console.log(maxHeroesOnDuty - totalOnDuty)

    return (
        <>
            {heroCards()}
        </>
    )
}

export default HeroSquad;