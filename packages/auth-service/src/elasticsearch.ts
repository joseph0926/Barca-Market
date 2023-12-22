import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';
import { Logger } from 'winston';
import { config } from '@auth/config';
import { winstonLogger } from '@base/logger';

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'authElasticSearchServer',
  'debug',
);

const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`,
});

const checkConnection = async (): Promise<void> => {
  let isConnected = false;

  while (!isConnected) {
    try {
      const health: ClusterHealthResponse =
        await elasticSearchClient.cluster.health({});
      log.info(`AuthService ElasticSearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error('Connection to ElasticSearch Failed,,, Retrying...');
      log.log('error', 'AuthService checkConnection() method: ', error);
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
    log.log('error', 'AuthService createIndex() method: ', error);
  }
};

const getDocumentById = async (
  index: string,
  gigId: string,
): Promise<unknown> => {
  try {
    const result = await elasticSearchClient.get({
      id: gigId,
      index,
    });
    return result._source;
  } catch (error) {
    log.log('error', 'AuthService getDocumentById() method: ', error);
  }
};

export { elasticSearchClient, checkConnection, createIndex, getDocumentById };
