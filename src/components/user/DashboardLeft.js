import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import SideBar from './SideBar';
import { fetchUser } from '../../actions/user_action';

const DashboardLeft = ({ user }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center spinner__wrapper">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
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
