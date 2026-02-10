import type { Hero} from './HeroTypes.ts'
import {atom, computed, type ReadableAtom} from 'nanostores';
import StartHeroesJSON from "./assets/starter-heroes.json";


export const $mapHeroData = (data:any) => {
    let hero: Hero[] = data;
    if (!Array.isArray(data)) {
        hero = [data]
    }

    return hero.sort((a: Hero, b: Hero) => {
        return a.name.localeCompare(b.name);
    }).map((hero:any) => {
            const {id, name, powerstats } = hero;
            const {publisher, alignment} = hero.biography;
            const {url: imageSource} = hero.image;
            return {id, name, powerstats, publisher, alignment, imageSource, onDuty : false};
        }
    )

}

const JSONHeroes : Hero[] =   $mapHeroData(StartHeroesJSON);

export const $allHeroes = atom(JSONHeroes);

export const  $addToAllHeroes = ((hero :any) => {
    const currentHeroes = structuredClone($allHeroes.get());
    // @ts-ignore
    if (Array.isArray(hero)) {
        $allHeroes.set([...currentHeroes, ...hero]);
    } else {
        $allHeroes.set([...currentHeroes, ...[hero]]);
    }
});

export const $heroesOnDuty  = computed($allHeroes, allHeroes => {
    return allHeroes.filter(hero =>  hero.onDuty);
})

export const $totalOnDuty = computed($heroesOnDuty, heroesOnDuty =>{
    return heroesOnDuty.length;
});

export const $toggleHeroDutyStatus = (id:string, currentOnDutyState: boolean) => {
    const currentHeroes = structuredClone($allHeroes.get());

    const matchingHeroIndex: number = currentHeroes.findIndex(hero => hero.id === id);
    currentHeroes[matchingHeroIndex].onDuty = !currentOnDutyState;
    $allHeroes.set(currentHeroes);
}

export const $clearOnDutyHeroes = () => {
    const  resetHeroes =  structuredClone($allHeroes.get()).map(hero =>  {
        return {
            ...hero,
            onDuty: false,
        }
    });
    $allHeroes.set(resetHeroes);

};

export const $maxHeroesOnDuty = atom(4);