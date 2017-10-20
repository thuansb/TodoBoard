import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import { Board } from '../index'
import Column from '../../../components/Column'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

function setup() {
    const props = {
        fetchTask: jest.fn(),
        taskList: []
    }

    const wrapper = shallow(<Board {...props} />)

    return {
        props,
        wrapper
    }
}

describe('Board', () => {
    it('should render sub components', () => {
        const { wrapper } = setup();
        const AddNewForm = wrapper.find('AddNewForm');
        expect(AddNewForm).toHaveLength(1)
        expect(AddNewForm.props().initStatus).toBe(0);
    
        expect(wrapper.find('CounterBox')).toHaveLength(1);

        expect(wrapper.find(Column)).toHaveLength(3);
    })

    it('should call fetchTask onComponentWillMount', () => {
        const { props } = setup()
        expect(props.fetchTask.mock.calls.length).toBe(1)
    })
})


