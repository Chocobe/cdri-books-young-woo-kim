import axios, {
  InternalAxiosRequestConfig,
} from 'axios';

/**
 * baseURL 마다 token 전달 방법이 다를 수 있으므로, 대응하는 token injector 구현
 */
const tokenInjectorManager: {
  [baseURL: string]: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig,
} = {
  /**
   * for Kakao API
   */
  ['https://dapi.kakao.com'](config: InternalAxiosRequestConfig) {
    const token = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
    console.log('token: ', token);

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