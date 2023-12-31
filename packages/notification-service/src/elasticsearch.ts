import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';
import { Logger } from 'winston';
import { config } from '@notification/config';
import { winstonLogger } from '@base/logger';

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'notificationElasticSearchServer',
  'debug',
);

const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`,
  auth: {
    username: `${config.ELASTIC_USERNAME}`,
    password: `${config.ELASTIC_PASSWORD}`,
  },
});

export const checkConnection = async (): Promise<void> => {
  let isConnected = false;

  while (!isConnected) {
    try {
      const health: ClusterHealthResponse =
        await elasticSearchClient.cluster.health({});
      log.info(
        `NotificationService ElasticSearch health status - ${health.status}`,
      );
      isConnected = true;
    } catch (error) {
      log.error('Connection to ElasticSearch Failed,,, Retrying...');
      log.log('error', 'NotificationServer checkConnection() method: ', error);
    }
  }
};
