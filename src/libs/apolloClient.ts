import { useMemo } from 'react';
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
    from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { IncomingHttpHeaders } from 'http';

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
        // uri: 'http://localhost:4000/graphql', // Server URL (must be absolute)
        uri:
            process.env.NODE_ENV === 'production'
                ? 'https://swapshop-server-pzsb.onrender.com/graphql'
                : 'http://localhost:4000/graphql',
        credentials: 'include', // Additional fetch() options like `credentials` or `headers`
        fetch: enhancedFetch,
    });

    const cache = new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {},
            },
        },
    });

    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: from([errorLink, httpLink]),
        cache: cache,
    });
}

export function initializeApollo(
    initialState: NormalizedCacheObject | null = null,
) {
    const _apolloClient = apolloClient ?? createApolloClient();

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
    const store = useMemo(() => initializeApollo(state), [state]);
    return store;
}
