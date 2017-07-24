import Location from '../../src/containers/Location'

describe('Location', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Location/>)
  })

  // it('should have a specified initial state', () => {
  //   expect(wrapper).toHaveState('locationInfo')
  // })

  // it('should render a h1 tag with cereal list', () => {
  //   expect(wrapper.find('h1')).toBePresent();
  //   expect(wrapper.find('h1').text()).toBe ("Cereal List")
  // })
});
