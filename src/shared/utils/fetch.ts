// ./src/shared/utils/fetch.ts
import { isServer, PORT } from '../constants/env';

const envAwareFetch = (url: string, options?: Record<string, unknown>) => {
  const fetchUrl =
    isServer && url.startsWith('/') ? `http://localhost:${PORT}${url}` : url;
  console.log('---------- custom fetch called', fetchUrl);

  const res = fetch(fetchUrl, options).then((res) => {
    console.log('-------body', res);
    return res.json();
  });
  return res;
};

export { envAwareFetch as fetch };
