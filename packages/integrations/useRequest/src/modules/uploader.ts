import type { AxiosRequestConfig } from 'axios';

import type { RequestClient } from '../request-client';
import { Result } from '../types';

class FileUploader {
  private client: RequestClient;

  constructor(client: RequestClient) {
    this.client = client;
  }

  public async upload(
    url: string,
    data: { file: Blob | File } & Record<string, any>,
    config?: AxiosRequestConfig,
  ): Promise<Result> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const finalConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    };

    return this.client.post(url, formData, finalConfig);
  }
}

export { FileUploader };
