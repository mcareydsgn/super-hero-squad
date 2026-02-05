const prerender = false;
import React from "react";

import "./HeroCard.css"
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
                                        <span className="stat-name">{key}</span> <span className="stat-number">{value.toLowerCase() === 'null' ? '--' : value}</span>
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

function MiniHeroCard({hero, showBioLinks = false, buttonText} : Props ) {

    const handleHeroCardAction = (id :string, onDuty:boolean) => {
        $toggleHeroDutyStatus(id, onDuty);
    }

    return (
        <>
            <article className="mini-hero-card">
                <details name={"mini-hero-card"}>
                    <summary>
                        <span className={"sr-only"}>{hero.name}  </span>
                        <img src={hero.imageSource} alt=""/>
                    </summary>
                    <div className="hero-card-content">
                        {hero.powerstats && (<HeroPowerStats {...hero.powerstats} />)}
                    </div>
                </details>
                <button className={'button secondary'} type={"button"} onClick={() => handleHeroCardAction(hero.id, hero.onDuty)}>
                    <span className={"sr-only"}>
                        {buttonText}
                    </span>
                    <svg width="24" height="24"
                          fill="currentColor" viewBox="0 0 24 24" >
                        <path d="M4.93 4.93C3.04 6.82 2 9.33 2 12s1.04 5.18 2.93 7.07c1.95 1.95 4.51 2.92 7.07 2.92s5.12-.97 7.07-2.92S22 14.67 22 12s-1.04-5.18-2.93-7.07c-3.9-3.9-10.24-3.9-14.14 0M12 4.01c1.73 0 3.46.56 4.9 1.68l-4.9 4.9-4.9-4.9A7.97 7.97 0 0 1 12 4.01m-8 8c0-1.8.6-3.5 1.68-4.9l4.9 4.9-4.9 4.9A7.92 7.92 0 0 1 4 12.01m3.1 6.32 4.9-4.9 4.9 4.9a8.014 8.014 0 0 1-9.8 0m11.22-1.41-4.9-4.9 4.9-4.9c1.09 1.4 1.68 3.1 1.68 4.9s-.6 3.5-1.68 4.9"></path>
                    </svg>
                </button>
            </article>
        </>
    );
}

export default MiniHeroCard;