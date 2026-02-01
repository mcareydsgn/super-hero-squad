import type { APIRoute } from 'astro'
import { getSecret } from 'astro:env/server';

export const GET : APIRoute = async ({ params  }) => {
    const {id} = params;

    try {

        const response = await fetch(`https://superheroapi.com/api/${getSecret('API_KEY')}/${id}`, {
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};