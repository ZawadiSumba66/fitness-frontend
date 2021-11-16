import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import SideBar from './SideBar';
import { fetchUser, UserSignup } from '../../actions/user_action';

type UserDashboardLeft = {
  user: {
    avatar_url: any
    user: {
      username: string,
    }
  }
};

const DashboardLeft: React.FunctionComponent<any> = ({ user }: UserDashboardLeft) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  console.log(user.user.username);
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
          username={user.user.username}
          image={user.avatar_url}
        />
      </div>
    </div>
  );
};

type UserState = {
  userReducer: {
    user: {
      user: UserSignup
    }
  }
};

const mapStateToProps = (state: UserState) => ({
  user: state.userReducer.user,
});

export default connect(mapStateToProps, null)(DashboardLeft);
