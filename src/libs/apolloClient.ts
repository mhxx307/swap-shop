import { useMemo } from 'react';
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
    from,
    split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { IncomingHttpHeaders } from 'http';
import fetch from 'isomorphic-unfetch';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

interface ApolloPageProps {
    [APOLLO_STATE_PROP_NAME]?: NormalizedCacheObject;
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

// const httpLink = new HttpLink({
//     uri: 'http://localhost:4000/graphql', // Server URL (must be absolute)
//     credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
//     headers: {
//         'content-type': 'application/json',
//     },
// });

// https://swapshop-server-pzsb.onrender.com/graphql

function createApolloClient(headers: IncomingHttpHeaders | null = null) {
    const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
        return fetch(url, {
            ...init,
            headers: {
                ...init.headers,
                'Access-Control-Allow-Origin': '*',
                // here we pass the cookie along for each request
                Cookie: headers?.cookie ?? '',
            },
        });
    };

    const httpLink = new HttpLink({
        uri:
            process.env.NODE_ENV === 'production'
                ? 'https://swapshop-server-pzsb.onrender.com/graphql'
                : 'http://localhost:4000/graphql', // Server URL (must be absolute)
        credentials: 'include', // Additional fetch() options like `credentials` or `headers`
        fetch: enhancedFetch,
    });

    const wsLink =
        typeof window !== 'undefined'
            ? new GraphQLWsLink(
                  createClient({
                      url:
                          process.env.NODE_ENV === 'production'
                              ? 'wss://swapshop-server-pzsb.onrender.com/'
                              : 'ws://localhost:4000/',
                  }),
              )
            : null;

    // The split function takes three parameters:
    //
    // * A function that's called for each operation to execute
    // * The Link to use for an operation if the function returns a "truthy" value
    // * The Link to use for an operation if the function returns a "falsy" value
    const splitLink =
        typeof window !== 'undefined' && wsLink != null
            ? split(
                  ({ query }) => {
                      const def = getMainDefinition(query);
                      return (
                          def.kind === 'OperationDefinition' &&
                          def.operation === 'subscription'
                      );
                  },
                  wsLink,
                  httpLink,
              )
            : httpLink;

    const cache = new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {},
            },
        },
    });

    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: from([errorLink, splitLink]),
        cache: cache,
        credentials: 'include',
    });
}

export function initializeApollo(
    {
        headers,
        initialState,
    }: {
        headers?: IncomingHttpHeaders | null;
        initialState?: NormalizedCacheObject | null;
    } = { headers: null, initialState: null },
) {
    const _apolloClient = apolloClient ?? createApolloClient(headers);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
        const data = merge(existingCache, initialState, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) =>
                    sourceArray.every((s) => !isEqual(d, s)),
                ),
            ],
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function addApolloState(
    client: ApolloClient<NormalizedCacheObject>,
    pageProps: { props: ApolloPageProps },
) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }

    return pageProps;
}

export function useApollo(pageProps: ApolloPageProps) {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    const store = useMemo(
        () => initializeApollo({ initialState: state }),
        [state],
    );
    return store;
}
