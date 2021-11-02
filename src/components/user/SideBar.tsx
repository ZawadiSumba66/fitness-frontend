import { slide as Menu } from 'react-burger-menu';
import { Link } from '@reach/router';
import React from 'react';

type UserSidebar = {
  username: string,
};

const SideBar: React.FunctionComponent<any> = ({ username }: UserSidebar) => {
  const logOut = () => localStorage.clear();

  return (
    <Menu className="d-flex flex-column bg-white justify-content-between">
      <div className="pb-5 pt-2 pl-2">
        <i className="fas fa-heartbeat" />
        <span className="font-weight-bold">KEEP IT FIT</span>
      </div>
      <div className="d-flex flex-column mb-5 text-center">
        <div>
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

export default SideBar;
