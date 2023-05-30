const queryString = require('query-string');
const useOracle = require('./services/oracle');

const login = async () => {
  const oracle = useOracle(process.env.ADMIN_URL, process.env.ENVIRONMENT_APPKEY);

  const response = await oracle.post('ccadmin/v1/login', queryString.stringify({grant_type:'client_credentials'}), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.access_token;
};

module.exports = login;