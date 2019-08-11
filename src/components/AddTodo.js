import React, {Component} from 'react';

class AddTodo extends Component {
    state = {
        title: '',
        category: ''
    };

    handleSave = () => {
        const {title, category} = this.state;
        this.props.onSave(title, category);

        this.setState({
            title: '',
            category: ''
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

export default AddTodo;