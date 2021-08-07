import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import SideBar from './SideBar';
import { fetchUser } from '../../actions/user_action';

const DashboardLeft = ({ user }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (!user) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <div className="sidebar-wrapper">
        <SideBar
          pageWrapId="page-wrap"
          outerContainerId="outer-container"
          username={user.username}
          image={user.image}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.userReducer.user.user,
});

DashboardLeft.propTypes = {
  user: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, null)(DashboardLeft);
