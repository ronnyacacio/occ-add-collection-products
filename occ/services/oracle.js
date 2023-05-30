const axios = require('axios');

const useOracle = (url, token) => {
  return axios.create({
    baseURL: url,
    headers: {
      ContentType: 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + token,
    }
  });
};

module.exports = useOracle;