import { Link } from '@reach/router';
import Header from './homepage/Header';
import SecondSection from './homepage/SecondSection';
import ThirdSection from './homepage/ThirdSection';
import Footer from './homepage/Footer';

const Home: React.FunctionComponent<any> = () => (
  <div>
    <div className="main">
      <Header />
      <div className="main__wrapper-box pt-lg-5 px-3 mt-5">
        <h1 className="text-2xl md:text-5xl text-white font-weight-bold">
          Best Gym
        </h1>
        <h1 className="text-2xl md:text-5xl text-white font-weight-bold">
          Workout Exercises
        </h1>

        <p className="text-sm md:text-base mt-3 text-white">
          Get to view the best workout exercises offered by our team from fitness.io for free.
          <br />
          You can also create exercises that you want and think can be beneficial to others.
          <br />
          Be the change you want to become and see your life transform today.
        </p>
        <div className="my-4">
          <Link to="/signup" className="main-btn button-orange text-light font-weight-bold py-2 px-4">
            GET STARTED
          </Link>
        </div>
      </div>
    </div>
    <SecondSection />
    <ThirdSection />
    <Footer />
  </div>
);
export default Home;
