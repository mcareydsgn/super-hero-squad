const prerender = false;
import React from "react";
import type { Hero, PowerStats} from '../../HeroTypes.ts'
import {$toggleHeroDutyStatus} from'../../HeroesStore.ts'

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
                                        <span>{key}:</span><span>{value}</span>
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
        $toggleHeroDutyStatus(id, onDuty);
    }

    return (
        <>
            <article className="mini-hero-card">
                <details name={"mini-hero-card"}>
                    <summary>
                        <span>{hero.name}  </span>
                        <img src={hero.imageSource} alt=""/>
                    </summary>
                    <div className="hero-card-content">
                        {hero.powerstats && (<HeroPowerStats {...hero.powerstats} />)}
                    </div>
                </details>
                <button type={"button"} onClick={() => handleHeroCardAction(hero.id, hero.onDuty)}>{buttonText}</button>

            </article>
        </>
    );
}

export default HeroCard;