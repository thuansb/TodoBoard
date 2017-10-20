import React from 'react';
import ColumnHeader from '../ColumnHeader';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <ColumnHeader title="TODO" counter={10000} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
