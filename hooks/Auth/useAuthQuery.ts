import { UseQueryOptions, useQuery, QueryKey } from '@tanstack/react-query';

/**
 * @template TQueryFnData - shape of the data returned from endpoint
 * @template TError - shape of error returned from endpoint
 * @template TData - shape of the data returned from endpoint
 * @template TQueryKey - shape of the query key
 *
 * @param {TQueryKey} querykey - the query key
 * @param {Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'initialData'> & { initialData?: () => undefined; }} options - the options for the query
 */

const useAuthQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  querykey: TQueryKey,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'initialData'> & {
    initialData?: () => undefined;
  },
) => {
  const query = useQuery(querykey, options);

  return query;
};

export default useAuthQuery;
