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
                                        <span className="stat-number">{value}</span>
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
            <article className="hero-card">
                <div>
                    <img src={hero.imageSource} alt=""/>
                    <h3>{hero.name}</h3>
                </div>
                <a href={`/hero-bio/${hero.id}`}>Read Full Bio</a>
                <div className="hero-card-content">
                    {hero.powerstats && (<HeroPowerStats {...hero.powerstats} />)}

                </div>
                <button className={'button accent'} type={"button"} onClick={() => handleHeroCardAction(hero.id, hero.onDuty)}>{buttonText}</button>
            </article>
        </>
    );
}

export default HeroCard;