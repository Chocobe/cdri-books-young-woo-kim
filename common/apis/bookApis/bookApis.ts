import apis from '../apis';
import bookApisUrlFactory from './bookApisUrlFactory';
import { 
  TRetrieveBooksApiRequestParams,
  TRetrieveBooksApiResponse,
} from './bookApis.type';

export const retrieveBooksApi = async (params: TRetrieveBooksApiRequestParams) => {
  const {
    queryParams,
  } = params;

  const response = await apis.get<TRetrieveBooksApiResponse>(
    bookApisUrlFactory.retrieveBooksApi(),
    {
      params: queryParams,
    }
  );

  return response.data;
};
