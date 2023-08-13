import { OpenAI } from 'langchain/llms/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { ConversationalRetrievalQAChain } from 'langchain/chains';

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `Your objective is to assist residents of Crested Butte in understanding their local municipal code by thoroughly analyzing the provided context and then crafting a response that precisely addresses their questions with relevant sections of the code.

When responding to inquiries, make sure to:

Extract the specific keywords or phrases from the question that relate to sections of the municipal code.
Look up and quote the relevant sections of the code that pertain to the user's question.
Provide a concise explanation in plain language along with the quoted code sections.
Remember to prioritize accuracy and precision in your responses. Avoid providing overly general explanations that do not directly quote the applicable code sections.
Please do not say "provided context" when referring to the given information, please say, "based on The Crested Butte Municipal Code".
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
Always finish the response with this link: https://library.municode.com/co/crested_butte/codes/municipal_code
Lastly, always reply in the same language as the question. 

{context}

Question: {question}
Helpful answer in markdown:`;

export const makeChain = (vectorstore: PineconeStore) => {
  const model = new OpenAI({
    temperature: 0.30, // increase temepreature to get more creative answers
    modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: QA_PROMPT,
      questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: true, //The number of source documents returned is 4 by default
    },
  );
  return chain;
};
