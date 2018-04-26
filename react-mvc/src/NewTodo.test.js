import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import NewTodo from './NewTodo'

Enzyme.configure({ adapter: new Adapter() });

it('should trigger "add" event when cilcking the button', () => {
    let eventTriggered = false
    const wrapper = shallow(<NewTodo onAdd={() => eventTriggered = true} />)
    wrapper.find('button').first().simulate('click')
    expect(eventTriggered).toBe(true)
})

it('should trigger "add" event with text provided as input', () => {
    let capturedValue = null;
    const wrapper = shallow(<NewTodo onAdd={(text) => capturedValue = text} />)
    wrapper.find('input').first().simulate('change', {target: {value: 'something'}})
    wrapper.find('button').first().simulate('click')
    expect(capturedValue).toBe('something')
})

it('should not trigger "add" event when text is empy', () => {

})

it('clicking add button should reset the text', () => {})