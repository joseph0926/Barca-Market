import axios from 'axios';
import { sign } from 'jsonwebtoken';
import { config } from '@gateway/config';

export class AxiosService {
  public axios: ReturnType<typeof axios.create>;

  constructor(baseURL: string, serviceName: string) {
    this.axios = this.axiosCreateInstance(baseURL, serviceName);
  }

  public axiosCreateInstance(
    baseURL: string,
    serviceName?: string,
  ): ReturnType<typeof axios.create> {
    let gatewayToken = '';
    if (serviceName) {
      gatewayToken = sign({ id: serviceName }, `${config.GATEWAY_JWT_TOKEN}`);
    }

    const instance: ReturnType<typeof axios.create> = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        gatewayToken,
      },
      withCredentials: true,
    });

    return instance;
  }
}
