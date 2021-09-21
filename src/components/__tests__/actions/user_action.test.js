import axios from 'axios';
import { fetchUser } from '../../../actions/user_action';

jest.mock('axios');

describe('fetchuser', () => {
  it('fetches successfully data from an API', async (done) => {
    const data = {
      data: [
        {
          username: 'peter45', email: 'peter45@gmail.com', password: '123456789', password_confirmation: '123456789',
        },
      ],
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(fetchUser('react')).resolves.toEqual(data);
    done();
  });
});
