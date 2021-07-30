import { slide as Menu } from 'react-burger-menu';
import { Link } from '@reach/router';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUser } from '../../actions/user_action';

const SideBar = ({ user, getuser }) => {
  const logOut = () => localStorage.clear();
  // useEffect(() => {
  //   getuser();
  //   console.log(user);
  // }, []);
  const getUserInfo = async () => {
    getuser();
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  if (!user) {
    return <h1>loading</h1>;
  }
  return (
    <Menu className="d-flex flex-column justify-content-between">
      <div className="d-flex flex-column mb-5">
        <div>
          {/* <img
            src={user.avatar}
            alt=""
            className="d-block mx-auto card-rounded-image"
          /> */}
          <h2 className="my-2 text-center user-name menu-item">
            {user.username}
          </h2>
          <p>
            {user.email}
          </p>
        </div>
        <div className="d-flex flex-column">
          <Link
            to="/dashboard"
            className="menu-item text-hover my-3"
          >
            Dashboard
          </Link>
          <Link to="/tips" className="menu-item text-hover">
            Tips
          </Link>
          <Link
            to="/create-tip"
            className="menu-item text-hover my-3"
          >
            Create Tip
          </Link>
        </div>
      </div>
      <div className="sidebar-link">
        <hr className="mb-2" />
        <Link
          to="/login"
          onClick={logOut}
          className="menu-item text-hover"
        >
          Logout
        </Link>
      </div>
    </Menu>
  );
};

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  getuser: () => dispatch(fetchUser()),
});

SideBar.propTypes = {
  user: PropTypes.instanceOf(Array).isRequired,
  getuser: PropTypes.func.isRequired,
};

// SideBar.defaultProps = {
//   user: 'janedoe',
// };

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
