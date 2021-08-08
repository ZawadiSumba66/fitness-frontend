import { Link } from '@reach/router';
import { Navbar } from 'react-bootstrap';

const Header = () => (
  <Navbar
    className="d-flex justify-content-between py-3 align-items-center"
  >
    <div>
      <Link
        to="/"
        className="text-lg text-decoration-none font-weight-bolder text-light"
      >
        <i className="fas fa-heartbeat" />
        <span>KEEP IT FIT</span>
      </Link>
    </div>
    <div className="">
      <Link
        to="/login"
        className="px-4 text-decoration-none font-weight-bolder text-uppercase text-dark text-sm-light"
      >
        Sign in
      </Link>
      <Link to="/signup" className="header-btn font-weight-bolder text-uppercase text-light py-2 px-3 button-nav btn-dark">
        Sign up
      </Link>
    </div>
  </Navbar>
);
export default Header;
