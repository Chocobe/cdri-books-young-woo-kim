import axios, {
  InternalAxiosRequestConfig,
} from 'axios';

// FIXME: symbol key 만 global config 로 분리하기
const EMPTY_ENVIRONMENT_SYMBOL = Symbol.for('EMPTY_ENVIRONMENT');

/**
 * baseURL 마다 token 전달 방법이 다를 수 있으므로, 대응하는 token injector 구현
 */
const tokenInjectorManager: {
  [baseURL: string]: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig,
} = {
  /**
   * for Kakao API
   */
  [process.env.NEXT_PUBLIC_API_BASE_URL || EMPTY_ENVIRONMENT_SYMBOL](config: InternalAxiosRequestConfig) {
    const token = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

    if (token) {
      config.headers.Authorization = `KakaoAK ${token}`;
    }

    return config;
  },
};

const apis = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5_000,
});

apis.interceptors.request.use(config => {
  const baseURL = config.baseURL ?? '';
  tokenInjectorManager[baseURL]?.(config);

  return config;
});

export default apis;
