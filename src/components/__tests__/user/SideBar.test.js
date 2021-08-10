import renderer from 'react-test-renderer';
import SideBar from '../../user/SideBar';

it('matches the Sidebar componenent snapshot', () => {
  const tree = renderer.create(<SideBar />).toJSON();
  expect(tree).toMatchSnapshot();
});
