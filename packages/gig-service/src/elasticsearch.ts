import { Client } from '@elastic/elasticsearch';
import {
  ClusterHealthResponse,
  CountResponse,
} from '@elastic/elasticsearch/lib/api/types';
import { Logger } from 'winston';
import { config } from '@gig/config';
import { winstonLogger } from '@base/logger';
import { ISellerGig } from '@base/interfaces/gig.interface';

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'gigElasticSearchServer',
  'debug',
);

const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`,
  auth: {
    username: `${config.ELASTIC_USERNAME}`,
    password: `${config.ELASTIC_PASSWORD}`,
  },
});

const checkConnection = async (): Promise<void> => {
  let isConnected = false;

  while (!isConnected) {
    try {
      const health: ClusterHealthResponse =
        await elasticSearchClient.cluster.health({});
      log.info(`GigService ElasticSearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error('Connection to ElasticSearch Failed,,, Retrying...');
      log.log('error', 'GigService checkConnection() method: ', error);
    }
  }
};

const createIndex = async (indexName: string): Promise<void> => {
  try {
    const result = await elasticSearchClient.indices.exists({
      index: indexName,
    });
    if (result) {
      log.info(`Index "${indexName}" already exist.`);
    } else {
      await elasticSearchClient.indices.create({ index: indexName });
      await elasticSearchClient.indices.refresh({ index: indexName });
      log.info(`Created Index ${indexName}`);
    }
  } catch (error) {
    log.error(`An error occurred while creating the index ${indexName}`);
    log.log('error', 'GigService createIndex() method: ', error);
  }
};

const getDocumentCount = async (index: string): Promise<number> => {
  try {
    const result: CountResponse = await elasticSearchClient.count({ index });
    return result.count;
  } catch (error) {
    log.log(
      'error',
      'GigService elasticsearch getDocumentCount() method error:',
      error,
    );
    return 0;
  }
};

const getIndexedData = async (
  index: string,
  itemId: string,
): Promise<ISellerGig> => {
  try {
    const result = await elasticSearchClient.get({ index, id: itemId });
    return result._source as ISellerGig;
  } catch (error) {
    log.log(
      'error',
      'GigService elasticsearch getIndexedData() method: ',
      error,
    );
    return {} as ISellerGig;
  }
};

const addDataToIndex = async (
  index: string,
  itemId: string,
  gigDocument: unknown,
): Promise<void> => {
  try {
    await elasticSearchClient.index({
      index,
      id: itemId,
      document: gigDocument,
    });
  } catch (error) {
    log.log(
      'error',
      'GigService elasticsearch addDataToIndex() method: ',
      error,
    );
  }
};

const updateIndexedData = async (
  index: string,
  itemId: string,
  gigDocument: unknown,
): Promise<void> => {
  try {
    await elasticSearchClient.update({
      index,
      id: itemId,
      doc: gigDocument,
    });
  } catch (error) {
    log.log(
      'error',
      'GigService elasticsearch updateIndexedData() method error:',
      error,
    );
  }
};

const deleteIndexedData = async (
  index: string,
  itemId: string,
): Promise<void> => {
  try {
    await elasticSearchClient.delete({
      index,
      id: itemId,
    });
  } catch (error) {
    log.log(
      'error',
      'GigService elasticsearch deleteIndexedData() method error:',
      error,
    );
  }
};

export {
  elasticSearchClient,
  checkConnection,
  createIndex,
  getDocumentCount,
  getIndexedData,
  addDataToIndex,
  updateIndexedData,
  deleteIndexedData,
};
