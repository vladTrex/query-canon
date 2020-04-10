import React, {Component} from 'react';
import {CATEGORY_ENUMS} from "../constants/enums";

class AddProduct extends Component {
    state = {
        title: '',
        category: CATEGORY_ENUMS.BUSINESS
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
                <option value={CATEGORY_ENUMS.BUSINESS}>Business</option>
                <option value={CATEGORY_ENUMS.PERSONAL}>Personal</option>
                <option value={CATEGORY_ENUMS.GROUP}>Group</option>
            </select>
            <button onClick={this.handleSave} itemID='saveButton'>Save</button>
        </div>);
    }
}

export default AddProduct;