import { Link } from '@reach/router';
import PropTypes from 'prop-types';

const DisplayTip = ({ title, description, id }) => (
  <div className="shadow rounded infoCarousel__wrapper-desc-info mx-auto mb-5">
    <h3 className="text-center font-weight-bold test-class">{title}</h3>
    <div className="bg-white align-items-center p-3">
      <p>{description}</p>
    </div>
    <Link to={`/tips/${id}`} className="button-orange p-2 ml-3 text-light font-weight-bold">
      View more details
    </Link>
    <div className="pt-4 px-3">
      <span className="fa fa-star checked" />
      <span className="fa fa-star checked" />
      <span className="fa fa-star checked" />
      <span className="fa fa-star checked" />
      <span className="fa fa-star text-sm-gray" />
    </div>
  </div>
);
DisplayTip.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
export default DisplayTip;
