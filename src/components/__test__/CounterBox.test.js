import React from 'react';
import CounterBox from '../CounterBox';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <CounterBox counter={10000} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
