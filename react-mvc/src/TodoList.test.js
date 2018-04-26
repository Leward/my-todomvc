import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import TodoList from './TodoList'
import Todo from './Todo'
import NewTodo from './NewTodo'

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TodoList />, div);
    ReactDOM.unmountComponentAtNode(div);
});


describe('rendering', () => {
    it('should render todo items', () => {
        const wrapper = shallow(<TodoList />)
        wrapper.setState({
            items: [
                { id: 1, text: 'A', done: true },
                { id: 2, text: 'B', done: false },
                { id: 3, text: 'C', done: false },
                { id: 4, text: 'D', done: false }
            ]
        })
        expect(wrapper.find(Todo).length).toBe(4)
    })
})

describe('add', () => {
    it('should add an item', () => {
        const wrapper = shallow(<TodoList />);
        const instance = wrapper.instance()
        const n = wrapper.find('Todo').length // inital nb of todos items
    
        instance.add('test')
        wrapper.update()
        expect(wrapper.find('Todo').length).toBe(n + 1)
    })

    it('should handle add event', () => {
        const wrapper = shallow(<TodoList />)
        wrapper.setState({
            items: [
                { id: 1, text: 'A', done: false },
                { id: 2, text: 'B', done: false }
            ]
        })
        wrapper.find(NewTodo).first().simulate('add', 'C')
        expect(wrapper.state().items[2].text).toBe('C')
    })
})

describe('check', () => {
    it('should handle check events', () => {
        const wrapper = shallow(<TodoList />)
        wrapper.setState({ items: [{ id: 1, text: 'A', done: false }] })
        wrapper.find('Todo').first().simulate('check')
        expect(wrapper.state().items[0].done).toBe(true)
    })
})

describe('edit', () => {
    it('should handle edit events', () => {
        const wrapper = shallow(<TodoList />)
        wrapper.setState({ items: [{ id: 1, text: 'A', done: false }] })
        wrapper.find('Todo').first().simulate('edit', 'B')
        expect(wrapper.state().items[0].text).toBe('B')
    })
})

describe('remove', () => {
    it('should handle remove events', () => {
        const wrapper = shallow(<TodoList />)
        wrapper.setState({
            items: [
                { id: 1, text: 'A', done: false },
                { id: 2, text: 'B', done: false }
            ]
        })
        wrapper.find('Todo').first().simulate('remove', 1)
        expect(wrapper.state().items[0].text).toBe('B')
    })
})
