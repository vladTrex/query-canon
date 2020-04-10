import React, {Component} from 'react';

class AddProduct extends Component {
    state = {
        title: '',
        category: 'business'
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
                itemID='todoInput'
            />
            <select value={this.state.category} onChange={e => this.setState({category: e.target.value})}>
                <option value="business">Business</option>
                <option value="personal">Personal</option>
                <option value="group">Group</option>
            </select>
            <button onClick={this.handleSave} itemID='saveButton'>Save</button>
        </div>);
    }
}

export default AddProduct;