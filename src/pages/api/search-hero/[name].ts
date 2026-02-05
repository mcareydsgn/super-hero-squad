export const prerender = false;
import type {APIRoute} from "astro";
import { API_KEY } from 'astro:env/server';

export const GET : APIRoute = async ({ params  }) => {
    const {name} = params;

    try {

        const response = await fetch(`https://superheroapi.com/api/${API_KEY}/search/${name}`, {
        });

        const data = await response.json();

        if (data.success === 'success') {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        } else {
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            })
        }


    } catch (e) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }

};
