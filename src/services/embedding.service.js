//import embeddings from "@themaximalist/embeddings.js";
import { pipeline } from "@xenova/transformers";


export async function createEmbedding(text) {

  const extractor = await pipeline(
    "feature-extraction",
    //"Xenova/all-mpnet-base-v2" //768-D
    "Xenova/all-MiniLM-L6-v2" //384-D
  );
  console.log(text?.length);
  const embedding = await extractor(
    text ?? '',
    { pooling: "mean", normalize: true }
  );
  // const response=await embeddings(text);
  return Array.from(embedding.data);
  //console.log(response);
   
}
