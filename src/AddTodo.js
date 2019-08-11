import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {todosListQuery} from './TodoList';

class AddTodo extends Component {
    state = {
        title: '',
        category: ''
    };

    handleSave = () => {
        const {title, category} = this.state;
        const {mutate} = this.props;
        mutate({
            variables: {title, category},
            update(cache, { data: { addTodo } }) {
                const { todos } = cache.readQuery({ query: todosListQuery });
                cache.writeQuery({
                  query: todosListQuery,
                  data: { todos: todos.concat([addTodo]) },
                });
            }
        })
        .then(res => {
            this.setState({
                title: '',
                category: ''
            });
        });
    }

    render(){
        return(<div>
            <input 
                value={this.state.title} 
                onChange={e => this.setState({title: e.target.value})} 
                placeholder="Title"
            />
            <input 
                value={this.state.category} 
                onChange={e => this.setState({category: e.target.value})} 
                placeholder="Category"
            />
            <button onClick={this.handleSave}>Save</button>
        </div>);
    }
}

const createTodo = gql`
    mutation addTodo($title: String!, $category: String!){
        addTodo(title: $title, category: $category){
            id,
            title,
            category
        }
    }
`;

export default graphql(createTodo)(AddTodo);