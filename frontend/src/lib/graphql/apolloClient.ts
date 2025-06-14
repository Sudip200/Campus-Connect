import {InMemoryCache,ApolloClient} from "@apollo/client";

const client = new ApolloClient({
    cache:new InMemoryCache(),
    uri: `${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule-graphql`
})
export default client