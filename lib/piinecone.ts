import { Pinecone } from "@pinecone-database/pinecone";

export const pinecone = new Pinecone({
  apiKey: process.env.PINEECONE_DB_API_KEY!,
});

export const pineconeIndex = pinecone.Index("codesorcerer-vector-embeddings");
