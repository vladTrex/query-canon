import React from "react";
import {ApolloProvider} from "react-apollo";
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {Route, Switch, Redirect, BrowserRouter as Router} from 'react-router-dom';

import logo from "./logo.svg";
import "./App.css";
import TodoList from './containers/ProductsListContainer';
import AddTodo from './containers/AddProductContainer';
import Me from './containers/MeContainer';

const cache = new InMemoryCache({
    dataIdFromObject: object => {
        console.log(object);
        return object._id || null;
    }
});

const link = new HttpLink({
    uri: 'http://localhost:4000/graphql'
});

const client = new ApolloClient({link, cache});

const mainScreen = () => {
    return (
        <div>
            <AddTodo/>
            <TodoList/>
        </div>
    );
};

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        GraphQL Apollo Client Example
                    </p>
                </header>
                <Router>
                    <Switch>
                        <Route path="/me" component={Me}/>
                        <Route path="/" component={mainScreen}/>
                        <Redirect to="/"/>
                    </Switch>
                </Router>
            </div>
        </ApolloProvider>
    );
}

export default App;
