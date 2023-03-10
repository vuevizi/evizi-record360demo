import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

import {Provider} from 'react-redux';
import {store} from './redux/store';

const httpLink = createHttpLink({
  uri: 'http://192.168.1.189:3030/v2'
});
const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('access-token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});
const client = new ApolloClient({
  uri: 'http://192.168.1.189:3030/v2',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
