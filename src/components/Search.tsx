import {useStore} from "@nanostores/react";
import React, {useState} from "react";
import { $allHeroes} from "../HeroesStore.ts";
import type {Hero} from "../HeroTypes.ts";


async function searchHero(name) {
  const response =  await fetch(`api/search-hero/${name}`, {
      method: "GET",
  });

  const json = await response.json();

  return json;
}


function Search() {
    const allHeroes = useStore($allHeroes);
    const [returnedHeroes, setReturnedHeroes]  = useState<Hero[]>([]);

    async function handleSubmit(e){
        setReturnedHeroes([]);
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const allReadyHaveHero = allHeroes.find((hero) => hero.name === form.name);

        if (allReadyHaveHero === undefined) {
            const data = await searchHero(formData.get('heroname'));

            if (Array.isArray(data)) {
                setReturnedHeroes((prev)=> {
                    return [...prev, ...data];
                });
            }

        }
    }

    console.log(returnedHeroes);

    return (
        <>
            <search>
                <form action="" method="get" onSubmit={handleSubmit}>
                    <label htmlFor={'hero-search'}>Search:</label>
                    <input id={'hero-search'} type={'search'} name={'heroname'} placeholder={'Search...'}/>
                    <button type="submit">Search</button>
                </form>
            </search>
            {returnedHeroes.length &&
                <div>
                    <ul>
                        { returnedHeroes.map(hero => ( <li><button>Add {hero.name} </button></li> ) )}
                    </ul>

                </div>
            }
      </>

    );
}

export default Search;