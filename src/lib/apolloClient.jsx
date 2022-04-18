import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

function CreateApolloClient() {

    const httpLink = new HttpLink({
        uri: "https://agora-server-zj4ep.ondigitalocean.app/",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
        },
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
            );
        if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: from([errorLink, httpLink]),
        cache: new InMemoryCache()
    });

}

export default CreateApolloClient;