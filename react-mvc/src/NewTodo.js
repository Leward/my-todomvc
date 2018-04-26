import React, { Component } from 'react';

export default class Todo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.handleInputChanged.bind(this)} />
                <button onClick={() => this.props.onAdd(this.state.text)}>Add</button>
            </div>
        )
    }

    handleInputChanged(event) {
        this.setState({
            text: event.target.value
        })
    }
}