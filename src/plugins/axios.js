import axios from 'axios';

export default ({ Vue }) => {
  Vue.prototype.$axios = axios;
  Vue.prototype.$API_URL = 'https://chatdev.dynns.com';
};
