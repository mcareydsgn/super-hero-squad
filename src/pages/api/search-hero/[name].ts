export const prerender = false;
import { getSecret } from 'astro:env/server';
import type {APIRoute} from "astro";

export const GET : APIRoute = async ({ params  }) => {
    const {name} = params;

    try {

        const response = await fetch(`https://superheroapi.com/api/${getSecret('API_KEY')}/search/${name}`, {
        });

        const data = await response.json();

        return new Response(JSON.stringify(data.results), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }

};
