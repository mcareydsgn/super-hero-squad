import React, {type ReactEventHandler, useState} from "react";
import {useStore} from "@nanostores/react";

import "./search.css"
import type {Hero} from "../../HeroTypes.ts";
import {$allHeroes, $addToAllHeroes, $mapHeroData} from "../../HeroesStore.ts";


async function searchHero(name : string) {
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
    const [preformedSearch, setPreformedSearch]  = useState<boolean>(false);

    async function handleSubmit(e : React.SubmitEvent<HTMLFormElement>) {
        setReturnedHeroes([]);
        setPreformedSearch(false);
        e.preventDefault();

        try {
            const form = e.currentTarget as HTMLFormElement;
            const formData = new FormData(form);

            // @ts-ignore
            const response = await searchHero(formData.get('heroname'));
            let newHeroes: Hero[] = response.filter(newHero => !allHeroes.some(existingHero => newHero.id === existingHero.id));

            if (Array.isArray(response)) {
                setReturnedHeroes((prev) => {
                    return [...prev, ...newHeroes];
                });
                setPreformedSearch(true);
            }

        } catch (e) {
            console.error(e);
        }
    }

    function handleAddAllHeroes(){
        $addToAllHeroes(returnedHeroes);
        setReturnedHeroes([]);
        setPreformedSearch(false);
    }

    function handleClearReturnedHeroes(){
        setReturnedHeroes([]);
        setPreformedSearch(false);
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
                <form action="" method="get" onSubmit={handleSubmit}>
                    <label htmlFor={'hero-search'}>Search Heroes:</label>
                    <div>
                        <input id={'hero-search'} type={'search'} name={'heroname'} placeholder={'Ant-Man, Darth' +
                            ' Vader'}/>
                        <button type="submit" className={"button accent"} >Search</button>

                    </div>

                    <p>Search Heroes and Villains from Marvel, DC, Star Wars universes and more!</p>
                </form>
            </search>
            {(preformedSearch && returnedHeroes.length == 0) &&
                <p>No Heroes or Villains Found</p>
            }
            {returnedHeroes.length > 0  &&
                <details className="search-results">
                    <summary>
                        Found {returnedHeroes.length} Heroes.

                        <button type={'button'} className={"button-text accent"} onClick={handleClearReturnedHeroes}>
                            Clear <span className={'sr-only'}>Searched Heroes</span>
                        </button>
                    </summary>
                    <ul aria-live="polite">
                        <li>
                            <button className={"button accent round"} onClick={handleAddAllHeroes} title={"Add All"}>
                                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                      fill="currentColor" viewBox="0 0 24 24" >
                                    <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path>
                                </svg>
                                <span className={"sr-only"}>Add All</span>
                            </button>
                        </li>
                        { returnedHeroes.map(hero => (
                            <li key={`search_result_${hero.id}`}>
                                <button className={"button hero"} onClick={() => handleAddHero(hero.id)}>
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