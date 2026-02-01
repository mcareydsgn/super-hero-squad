import type { Hero} from './HeroTypes.ts'

import {atom, computed, type ReadableAtom} from 'nanostores';

import StartHeroesJSON from "./assets/starter-heroes.json";

const JSONHeroes : Hero[] =   StartHeroesJSON.map((hero) => {
        const {id, name, powerstats } = hero;
        const {publisher, alignment} = hero.biography;
        const {url: imageSource} = hero.image;

        return {id, name, powerstats, publisher, alignment, imageSource, onDuty : false};
    }
);



export const $allHeroes = atom(JSONHeroes);

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

export const $maxHeroesOnDuty = atom(4);