import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Todo extends Component {

    render() {
        return (
            <li className={`${this.props.item.done ? 'done' : ''}`}>
                <label>
                    <input 
                        type="checkbox" 
                        checked={this.props.item.done} 
                        onClick={() => this.props.onCheck()}
                        />
                    {this.props.item.text} [{this.props.item.id}]
                </label>
                <button onClick={() => this.props.onRemove()}>Remove</button>
            </li>
        )
    }

}

Todo.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
        done: PropTypes.bool,
    }),
    onCheck: PropTypes.func,
    onUpdate: PropTypes.func,
    onRemove: PropTypes.func
}