import TextField from '../../src/components/TextField'
import { mount } from 'enzyme';
import React from 'react';
import jasmineEnzyme from 'jasmine-enzyme';

describe('TextField', () => {
  let name,
      content,
      wrapper;

  beforeEach( () => {
    wrapper = mount(
      <TextField
        name="address"
        content="test content"
      />
    );
  });

  it('should render an input tag', () => {
    expect(wrapper.find('input').length).toEqual(1);
  })
})
