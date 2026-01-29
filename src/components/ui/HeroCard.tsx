interface PowerStats  {
    "intelligence": string,
    "strength": string,
    "speed": string,
    "durability": string,
    "power": string,
    "combat": string
}

interface Hero {
    name: string,
    powerstats: PowerStats,
    id: string,
    publisher: string,
    alignment: string,
}

interface Props {
    hero:  Hero,
    showBioLinks: boolean,
    showPowerStats: boolean,
    buttonText: string,
    onHeroCardAction: (id: string) => void
}


function HeroCard({hero, showBioLinks = false, showPowerStats = false, buttonText, onHeroCardAction} : Props ) {

    const handleHeroCardAction = (id: string) => {
        onHeroCardAction(id);
    }

    return (
        <>
            <article>
                <img src="" alt=""/>
                <h3>Hero Name</h3>
                <div>
                    <h4>Power Stats</h4>
                    <ol>

                    </ol>
                </div>
                <button type={"button"} onClick={()=>handleHeroCardAction("2")}>{buttonText}</button>
                <a>Read Full Bio</a>
            </article>
        </>
    );
}