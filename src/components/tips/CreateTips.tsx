import { connect } from 'react-redux';
import { useState } from 'react';
import store from '../../store';
import { createTip } from '../../actions/tip_action';
import DashboardLeft from '../user/DashboardLeft';
import Flash from '../user/Flash';

type TipsCreate = {
  error: string[]
};

const CreateTips: React.FunctionComponent<any> = ({ error }: TipsCreate) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tip = {
      title,
      description,
      benefits,
      instructions,
      image,
    };
    store.dispatch(createTip(tip));
    console.log(error);
  };

  const fileChange = (files: any) => {
    setImage(files[0]);
  };

  return (
    <div>
      <DashboardLeft />
      <div className="user__info p-3">
        <div className="rounded p-3 mt-4">
          <Flash />
          <div className="errors">
            {error ? (
              <div>
                {error.map((item: string) => (
                  <li className="text-danger" key={Date.now() * Math.random()}>{item}</li>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className="create-tips">
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-5">
            <h3 className="pb-3 font-bold md:text-2xl text-xl text-orange">Create a Workout Tip</h3>
            <p className="font-weight-bold">Please fill all the fields below.</p>
            <br />
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              placeholder="Enter the Title"
              className="form-control"
              data-rows="3"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              placeholder="Enter a brief description"
              className="form-control mt-3"
              data-rows="3"
            />
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              name="instructions"
              placeholder="Add some instructions to follow"
              className="form-control mt-3"
              data-rows="3"
            />
            <textarea
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              name="benefits"
              placeholder="What are some of the benefits a user will gain"
              className="form-control mt-3"
              data-rows="3"
            />
            <label htmlFor="avatar">
              Choose an image
              <input
                type="file"
                className="w-100 my-3"
                onChange={(e) => fileChange(e.target.files)}
                id="avatar"
              />
            </label>
            <br />
            <input
              type="submit"
              className="button-orange mt-3 w-50 text-light btn font-weight-bold"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

type TipError = {
  tipsReducer: {
    tip_error: string[]
  }
};
const mapStateToProps = (state: TipError) => ({
  error: state.tipsReducer.tip_error,
});

export default connect(mapStateToProps, null)(CreateTips);
