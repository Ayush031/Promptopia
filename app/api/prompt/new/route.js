import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { prompt, userId, tag } = await req.json();

  try {
    await connectToDB(); //lamda function die after execution
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    })
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to create new prompt with Error: ", error.message, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}