import React, {useState} from "react";
import {useStore} from "@nanostores/react";

import "./search.css"
import type {Hero} from "../../HeroTypes.ts";
import {$allHeroes, $addToAllHeroes, $mapHeroData} from "../../HeroesStore.ts";


async function searchHero(name) {
  const response =  await fetch(`/api/search-hero/${name}`, {
      method: "GET",
  });

  try {
      const data = await response.json();

      if (data.response === 'success') {
          return $mapHeroData(data.results) as Hero[];
      }

      return [];

  } catch (e) {
      console.error(e);
      return [];
  }

}


function Search() {
    const allHeroes = useStore($allHeroes);
    const [returnedHeroes, setReturnedHeroes]  = useState<Hero[]>([]);

    async function handleSubmit(e){
        setReturnedHeroes([]);
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const allReadyHaveHero = allHeroes.find((hero) => hero.name.toLowerCase() === form.name);

        try {

            const response = await searchHero(formData.get('heroname'));
            let newHeroes: Hero[] =  response.filter(newHero => !allHeroes.some(existingHero => newHero.id === existingHero.id));

            if (Array.isArray(response)) {
                setReturnedHeroes((prev)=> {
                    return [...prev, ...newHeroes];
                });
            }

        } catch (e) {
            console.error(e);
        }

    }

    function handleAddHero(id: string) {
         const matchingHeroIndex = returnedHeroes.findIndex(hero => hero.id === id);

         if (matchingHeroIndex >= 0) {
             $addToAllHeroes(returnedHeroes[matchingHeroIndex]);

             setReturnedHeroes((prev) => {
                 return  prev.toSpliced(matchingHeroIndex, 1);
             });

         }
    }

    return (
        <>
            <search>
                <form action="" method="get" onSubmit={handleSubmit} className={'stacked'}>
                    <label htmlFor={'hero-search'}>Search:</label>
                    <div>
                        <input id={'hero-search'} type={'search'} name={'heroname'} placeholder={'Search...'}/>
                        <button type="submit">Search</button>
                    </div>
                </form>
            </search>
            {returnedHeroes.length > 0  &&
                <details className="search-results">
                    <summary>
                        Found {returnedHeroes.length} Heroes.
                    </summary>
                    <ul className={'combo-box'}>
                        { returnedHeroes.map(hero => (
                            <li key={`search_result_${hero.id}`}>
                                <button className={"button"} onClick={() => handleAddHero(hero.id)}>
                                    <img src={hero.imageSource} alt={hero.name} />
                                    <span>{hero.name}</span>
                                </button>
                            </li> ))
                        }
                    </ul>
                </details>
            }
      </>

    );
}

export default Search;