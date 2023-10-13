import { UseQueryOptions, useQuery, QueryKey, QueryFunction } from '@tanstack/react-query';

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
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'initialData'> & {
    initialData?: () => undefined;
  },
) => {
  const query = useQuery(querykey, queryFn, options);

  return query;
};

// EXample Usage
/**
 * Example usage of useAuthQuery
* const Example = () => {
*   const { data, isLoading, isError } = useAuthQuery(
*     ["users"],
*     fetchFn, function for fetching
*     { initialData: () => undefined }
*   );

*   if (isLoading) {
*     return <div>Loading...</div>;
*   }

*   if (isError) {
*     return <div>Error</div>;
*   }

*   return <div>{JSON.stringify(data)}</div>;
* };
*/

export default useAuthQuery;
