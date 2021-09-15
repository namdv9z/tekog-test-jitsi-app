import { action, createStore, thunk } from 'easy-peasy';
import { Platform } from 'react-native';
import axios from '../utils/axios';

const store = createStore({
  userInfor: {
    username: '',
    voipToken: '',
    setUsername: action((state, payload) => {
      state.username = payload;
    }),
    setToken: action((state, payload) => {
      state.voipToken = payload;
    }),
    /**
     * @param payload object { username, voipToken}
     */
    login: thunk(async (actions, payload) => {
      actions.setUsername(payload.username);
      actions.setToken(payload.voipToken);

      const res = await axios.post('/register', {
        username: payload.username,
        voipToken: payload.voipToken,
        platform: Platform.OS,
      });
      return res;
    }),
    logout: action(state => {
      state.username = '';
    }),
    call: thunk(async (actions, payload) => {
      const res = await axios.post('/call', {
        username: payload.username,
        caller: payload.caller,
      });
      console.log(JSON.stringify(res));
    }),
  },
});

export default store;
