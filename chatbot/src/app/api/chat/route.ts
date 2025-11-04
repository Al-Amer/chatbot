import {streamText, UIMessage, convertToModelMessages, tool, InferUITools, UIDataTypes, stepCountIs, } from "ai";
import {openai} from "@ai-sdk/openai";


export async function POST(req:Request) {
    try{
    const { messages }: { messages: UIMessage[] } = await req.json();
    const result = streamText({
        model: openai("gpt-4.1-mini"),
        messages: convertToModelMessages(messages),
    })
    return result.toUIMessageStreamResponse();
    }catch(e){
        console.error("Error streaming chat completion:", e);
        return new Response("Failed to stream chat completion", { status: 500 });
    }
}