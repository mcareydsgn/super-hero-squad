const prerender = false;
import React from "react";

import "./HeroCard.css"
import type { Hero, PowerStats} from '../../HeroTypes.ts'
import {$totalOnDuty, $maxHeroesOnDuty, $toggleHeroDutyStatus} from '../../HeroesStore.ts'

interface Props {
    hero:  Hero,
    showBioLinks?: boolean,
    buttonText: string;
}


function HeroPowerStats({...rest}: PowerStats) {
    const powerStatEntries = Object.entries({...rest});

    if (powerStatEntries.length > 0) {
        return (
            < >
                <h4>Power Stats</h4>
                <ol className={"power-stats"}>
                    {
                        powerStatEntries.map(entry => {
                            const [key, value] = entry;
                                return (
                                    <li key={key}>
                                        <span className="stat-number">{value.toLowerCase() === 'null' ? '--' : value}</span>
                                        <span className="stat-name">{key}</span>
                                    </li>
                                )
                        })
                    }
                </ol>
            </>
        )
    }

    return null;
}

function HeroCard({hero, showBioLinks = false, buttonText} : Props ) {

    const handleHeroCardAction = (id :string, onDuty:boolean) => {
        if ($totalOnDuty.get() < $maxHeroesOnDuty.get()) {
            $toggleHeroDutyStatus(id, onDuty);
        }
    }

    return (
        <>
            <article className="hero-card stacked">
                <div>
                    <img src={hero.imageSource} alt=""/>
                    <h3>{hero.name}</h3>
                </div>
                <a href={`/hero-bio/${hero.id}`}>
                    <svg aria-hidden width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                        <path d="M8 6h9v2H8z"></path><path d="M20 2H6C4.35 2 3 3.35 3 5v14c0 1.65 1.35 3 3 3h15v-2H6c-.55 0-1-.45-1-1s.45-1 1-1h14c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1m-6 14H6c-.35 0-.69.07-1 .18V5c0-.55.45-1 1-1h13v12z"></path>
                    </svg>
                    Read Full Bio
                </a>
                <div className="hero-card-content">
                    {hero.powerstats && (<HeroPowerStats {...hero.powerstats} />)}

                </div>
                <button className={'button secondary'} type={"button"} onClick={() => handleHeroCardAction(hero.id, hero.onDuty)}>{buttonText}</button>
            </article>
        </>
    );
}

export default HeroCard;