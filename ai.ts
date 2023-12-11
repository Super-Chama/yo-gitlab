import { envObj } from "./env.ts";
import { promptv2 } from "./prompt.ts";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "https://esm.sh/langchain@0.0.203/prompts";
import { LLMChain } from "https://esm.sh/langchain@0.0.203/chains";
import { ChatOpenAI } from "https://esm.sh/langchain@0.0.203/chat_models/openai";

const humanMessagePrompt =
  HumanMessagePromptTemplate.fromTemplate(`\"\"\"{diff}\"\"\"`);
const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(promptv2);

const chatPrompt = ChatPromptTemplate.fromMessages([
  systemMessagePrompt,
  humanMessagePrompt,
]);

const chat = new ChatOpenAI({
  temperature: 0,
  modelName: "gpt-3.5-turbo",
  openAIApiKey: envObj.OPENAI_API_KEY,
});

export const summerizeChain = new LLMChain({
  llm: chat,
  verbose: false,
  prompt: chatPrompt,
});
