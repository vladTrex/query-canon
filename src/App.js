import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from 'apollo-client';
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from 'apollo-cache-inmemory';

import logo from "./logo.svg";
import "./App.css";
import TodoList from './containers/TodoListContainer';
import AddTodo from './containers/AddTodoContainer';

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const client = new ApolloClient({link, cache});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
        <div>
          <AddTodo />
          <TodoList />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
