import { Link } from '@reach/router';
import second from '../../assets/second.jpg';

const SecondSection = () => (
  <div className=" pt-5 mx-lg-5">
    <h5 className="text-sm-gray text-center my-2 text-orange font-weight-bold text-uppercase">
      Reliable and well-sourced health practises
    </h5>
    <h6 className="text-center mb-3">
      Get access to the tips anywhere, anytime.
    </h6>
    <div className="row align-items-center">
      <div className="col-md-6">
        <div className="pl-3">
          <h2 className="text-3xl md:text-3xl font-bold">
            Change your life today for a better tomorrow
          </h2>
          <p className="text-sm-gray mb-5 mt-3">
            Would you like to see a change in your body?
            Are you ready for a whole new healthy lifestyle just by few tips
            offered by our experts? Then worry no more because we got you.
            All you need is positive attitude and the willingness to start.
          </p>
          <Link to="/signup" className="button-orange text-light font-weight-bold px-4 py-2 mt-4">
            LEARN MORE
          </Link>
        </div>
      </div>
      <div className=" col-md-6">
        <img
          src={second}
          alt="FitOne"
          className="second_image"
        />
      </div>
    </div>
  </div>
);

export default SecondSection;
