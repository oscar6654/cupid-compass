import TextField from '../../src/components/TextField';
import { mount } from 'enzyme';
import React from 'react';

describe('TextField', () => {
  let name,
      content,
      wrapper;

  beforeEach(() => {
    wrapper = mount(
      <TextField
        name="City"
        content="Chicago"
      />
    );
  });

  it('should render a label tag', () => {
    expect(wrapper.find('label').length).toEqual(1);
  });

  it('should render a label tag with the correct label name', () => {
    expect(wrapper.find('label').text()).toBe('City');
  });

  it('should render an input tag', () => {
    expect(wrapper.find('input').length).toEqual(1);
  });

  it('should render an input tag with the correct content', () => {
    expect(wrapper.find('input').props().value).toBe('Chicago');
  });
});
