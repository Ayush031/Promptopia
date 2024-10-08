import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

//GET
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response("Prompt not found", { status: 404 })
        return new Response(JSON.stringify(prompt), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response("Failed to fetch prompts with Error: ", error.message, {
            status: 500,
            headers: { "Content-Type": "application/json" },
        })
    }
}

//PATCH
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response("Prompt not found", { status: 404 });
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save()
        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to create the prompt with Error: ", error.message, { status: 500 })
    }
}


//DELETE
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findByIdAndDelete(params.id);
        // if (!prompt) return new Response("Prompt not found", { status: 404 });
        // await prompt.remove();
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to delete the prompt with Error: ", error.message, { status: 500 })
    }
}
