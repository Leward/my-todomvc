import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import Todo from './Todo'

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const item = { id: 1, text: 'A', done: false }
    const div = document.createElement('div');
    ReactDOM.render(<Todo item={item} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('checkbox', () => {
    it('should be checked when item is done', () => {
        const item = { id: 1, text: 'A', done: true }
        const wrapper = shallow(<Todo item={item} />)
        expect(wrapper.find('input').prop('checked')).toBe(true)
    })

    it('should be unchecked when item is not done', () => {
        const item = { id: 1, text: 'A', done: false }
        const wrapper = shallow(<Todo item={item} />)
        expect(wrapper.find('input').prop('checked')).toBe(false)
    })

    it('should trigger "check" event when clicked', () => {
        let eventTriggered = false
        const item = { id: 1, text: 'A', done: false }
        const wrapper = shallow(<Todo item={item} onCheck={() => eventTriggered = true} />)
        wrapper.find('input').first().simulate('click')
        expect(eventTriggered).toBe(true)
    })
})

describe('style', () => {
    it('it should have the .done class when item is done', () => {
        const item = { id: 1, text: 'A', done: true }
        const wrapper = shallow(<Todo item={item} />)
        expect(wrapper.find('li').hasClass('done')).toBe(true)
    })

    it('it should not have the .done class when item is not done', () => {
        const item = { id: 1, text: 'A', done: false }
        const wrapper = shallow(<Todo item={item} />)
        expect(wrapper.find('li').hasClass('done')).toBe(false)
    })
})

describe('remove button', () => {
    it('should trigger the "remove" event when it is clicked', () => {
        let eventTriggered = false
        const item = { id: 1, text: 'A', done: false }
        const wrapper = shallow(<Todo item={item} onRemove={() => eventTriggered = true} />)
        wrapper.find('button').first().simulate('click')
        expect(eventTriggered).toBe(true)
    })
})