import { Link } from '@reach/router';
import third from '../../assets/third.jpg';

const ThirdSection = () => (
  <div className=" my-5 py-5 third_section_wrapper">
    <div className="row align-items-center">
      <div className=" col-md-6">
        <img
          src={third}
          alt="FitHomeTwo"
          className="third_image"
        />
      </div>
      <div className="col-md-6">
        <div>
          <h2 className="text-lg-black font-weight-bold">
            We are here to guide you in every step.
          </h2>
          <p className="text-sm-gray mb-5 mt-3">
            The advice given by our experts is just enough to get you through the day.
            In the morning, evening, at home or at the gym. It does not matter. All we
            encourage is to start and see your dream healthy lifestyle come to a reality.
          </p>
          <Link to="/signup" className="button-orange text-light font-weight-bold px-4 py-2 mt-4">
            GET STARTED
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default ThirdSection;
