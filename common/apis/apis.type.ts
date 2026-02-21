/**
 * @example
 * https://www.cdri.pro/.../[pathParams[key]]
 */
type TApiPathParams<TPathParams> = TPathParams extends void
  ? unknown
  : { pathParams: TPathParams };

/**
 * @example
 * https://www.cdri.pro/...?query_1=[queryParams[key]]
 */
type TApiQueryParams<TQueryParams> = TQueryParams extends void
  ? unknown
  : { queryParams: TQueryParams };

/**
 * api request payload
 */
type TApiPayload<TPayload> = TPayload extends void
  ? unknown
  : { payload: TPayload };

export type TApiRequestParams<
  TPathParams,
  TQueryParams = void,
  TPayload = void,
> = 
  & TApiPathParams<TPathParams>
  & TApiQueryParams<TQueryParams>
  & TApiPayload<TPayload>;