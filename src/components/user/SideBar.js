import { slide as Menu } from 'react-burger-menu';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const SideBar = ({ username, image }) => {
  const logOut = () => localStorage.clear();

  if (!username) {
    return <h1>Loading...</h1>;
  }
  return (
    <Menu className="d-flex flex-column bg-white justify-content-between">
      <div className="pb-5 pt-2 pl-2">
        <i className="fas fa-heartbeat" />
        <span className="font-weight-bold">KEEP IT FIT</span>
      </div>
      <div className="d-flex flex-column mb-5 text-center">
        <div>
          <img
            src={image}
            alt=""
            className="d-block mx-auto card-rounded-image"
          />
          <h5 className="my-2 text-center user-name menu-item text-orange">
            @
            {username}
          </h5>
        </div>
        <div className="d-flex flex-column">
          <Link
            to="/dashboard"
            className="text-dark font-weight-bold text-decoration-none text-hover my-3"
          >
            Dashboard
          </Link>
          <Link to="/tips" className="text-dark font-weight-bold text-decoration-none text-hover">
            View Tips
          </Link>
          <Link
            to="/create-tip"
            className="text-dark font-weight-bold text-decoration-none text-hover my-3"
          >
            Create Tip
          </Link>
        </div>
      </div>
      <div>
        <hr className="mb-2" />
        <Link
          to="/login"
          onClick={logOut}
          className="button-orange text-white py-1 font-weight-bold w-50 mx-auto text-decoration-none d-flex justify-content-center"
        >
          Logout
        </Link>
      </div>
    </Menu>
  );
};

SideBar.propTypes = {
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default SideBar;
