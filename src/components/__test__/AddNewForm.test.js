import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import AddNewForm from '../AddNewForm';

Enzyme.configure({ adapter: new Adapter() })

function setup() {
    const props = {
        addNewTask: jest.fn(),
        initStatus: 0
    }

    const wrapper = shallow(<AddNewForm {...props} />)

    return {
        props,
        wrapper
    }
}

describe('Board', () => {
    it('should render subcomponents', () => {
        const { wrapper } = setup()
        
        expect(wrapper.find('form')).toHaveLength(1)
        expect(wrapper.find('label')).toHaveLength(1)

        const input = wrapper.find('input')
        expect(input).toHaveLength(1)
        expect(input.props().placeholder).toEqual('task name')
    })

    // it('should call addNewTask on submit with valid input', () => {
    //     const { wrapper, props } = setup()
    //     const input = wrapper.find('input')
    //     const form = wrapper.find('form')

    //     // #1 with empty input
    //     input.simulate('change', {target: {value: ''}});
    //     form.simulate('submit', { preventDefault: jest.fn() })        
    //     expect(props.addNewTask.mock.calls.length).toBe(0)

    //     // #2 with valid imput
    //     input.simulate('change', {target: {value: 'Some thing else'}});
       
    //     form.simulate('submit', { preventDefault: jest.fn() })        
    //     expect(props.addNewTask.mock.calls.length).toBe(1)
    //   })
})


