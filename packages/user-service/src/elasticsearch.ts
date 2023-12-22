import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';
import { Logger } from 'winston';
import { config } from '@user/config';
import { winstonLogger } from '@base/logger';

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'userElasticSearchServer',
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
      log.info(`UserService ElasticSearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error('Connection to ElasticSearch Failed,,, Retrying...');
      log.log('error', 'UserService checkConnection() method: ', error);
    }
  }
};

export { checkConnection };
