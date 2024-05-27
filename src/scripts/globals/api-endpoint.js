/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import CONFIG from './config';

const API_ENDPOINTS = {
  HOME: `${CONFIG.BASE_URL}/list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
};

export default API_ENDPOINTS;
