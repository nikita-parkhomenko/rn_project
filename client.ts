import { apiUrl } from './App/services/EnvironmentService';
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import tokenLink, { withToken, refreshResponse } from './tokenLink';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createUploadLink({
  uri: `${apiUrl}/graphql`,
  credentials: 'include',
});

const client = new ApolloClient({
  link: ApolloLink.from([withToken, tokenLink, refreshResponse, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
