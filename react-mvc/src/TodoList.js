import React, { Component } from 'react';
import Todo from './Todo'
import NewTodo from './NewTodo'

export default class Todos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            counter: 1,
            items: []
        }
    }

    componentDidMount() {
        this.add("Buy bread")
        this.add("Repair bike")
    }

    render() {
        let rows = this.state.items.map(this.renderItem.bind(this));
        return (
            <div>
                <ul>
                    {rows}
                </ul>
                <NewTodo onAdd={(text) => this.add(text)} />
            </div>
        )
    }

    renderItem(item) {
        return (
            <Todo
                key={item.id}
                item={item}
                onCheck={() => this.checkItem(item.id)}
                onEdit={ text => this.editItem(item.id, text) }
                onRemove={() => this.removeItem(item.id)}
            />
        )
    }

    add(text) {
        this.setState((prevState, props) => {
            let items = prevState.items.slice(0)
            items.push({
                id: prevState.counter,
                text: text,
                done: false
            })
            return {
                counter: prevState.counter + 1,
                items: items
            }
        })
    }

    checkItem(id) {
        const items = this.state.items
        const index = items.findIndex(item => item.id === id)
        if(index === -1) {
            return;
        }
        this.updateItem(id, {done: !items[index].done})
    }

    editItem(id, text) {
        this.updateItem(id, {text: text})
    }

    updateItem(id, data) {
        const items = this.state.items.slice()
        const index = items.findIndex(item => item.id === id)
        if(index === -1) {
            return;
        }
        items[index] = Object.assign({}, items[index], data)
        this.setState({items: items})
    }

    removeItem(id) {
        const items = this.state.items.slice()
        const index = items.findIndex(item => item.id === id)
        if(index === -1) {
            return;
        }
        items.splice(index, 1)
        this.setState({items: items})
    }

}