import { Link } from '@reach/router';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTips } from '../../actions/tip_action';

const DisplayTips = ({ tips, gettips }) => {
  useEffect(() => {
    gettips();
    console.log(tips);
  }, []);
  if (!tip) {
    return <h1>loading</h1>;
  }
  return (
    <div>
      <div className="d-flex flex-column mb-5">
        <div>
        {tips.map}
        </div>
        <div className="d-flex flex-column">
          <Link
            to="/dashboard"
            className="menu-item text-hover my-3"
          >
            Dashboard
          </Link>
          <Link
            to="/create-tip"
            className="menu-item text-hover my-3"
          >
            Create Tip
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tip: state.tipsReducer.tips});

const mapDispatchToProps = (dispatch) => ({
  gettips: () => dispatch(fetchTips()),
});

DisplayTips.propTypes = {
  tip: PropTypes.instanceOf(Array).isRequired,
  gettip: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTips);
