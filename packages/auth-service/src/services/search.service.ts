import { getDocumentById } from '@auth/elasticsearch';

export const gigById = async (
  index: string,
  gigId: string,
): Promise<unknown> => {
  const gig = await getDocumentById(index, gigId);
  return gig;
};

// npm i elasticdump -g
// elasticdump --input=./gigs.json --output=http://localhost:9200/gigs --type=data
