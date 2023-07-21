/**
 * Change the namespace to the namespace on Pinecone you'd like to store your embeddings.
 */

if (!process.env.PINECONE_INDEX_NAME) {
  throw new Error('Missing Pinecone index name in .env file');
}

const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME ?? 'crested-butte-municipal-code-project';

const PINECONE_NAME_SPACE = 'cb-namespace-a'; //namespace is optional for your vectors

export { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE };
