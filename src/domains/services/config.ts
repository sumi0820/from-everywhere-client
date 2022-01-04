/* eslint-disable import/prefer-default-export */
import { Options, NormalizedOptions } from 'ky';
import camelcaseKeys from 'camelcase-keys';

// export const API_URL = 'https://from-everywhere.herokuapp.com/api';
export const API_URL = 'http://localhost:5000/api';

export const DEFAULT_API_OPTIONS: Options = {
  prefixUrl: `${API_URL}`,
  timeout: 7000,
  retry: 2,
  hooks: {
    afterResponse: [
      async (
        _request: Request,
        _options: NormalizedOptions,
        response: Response,
      ): Promise<Response> => {
        const body = new Blob(
          [JSON.stringify(camelcaseKeys(await response.json()), null, 2)],
          { type: 'application/json' },
        );
        const { headers, status, statusText } = response;
        const init = { headers, status, statusText };

        return new Response(body, init);
      },
    ],
  },
};
