const axios = require('axios');

module.exports = {
  getApi: url => axios({
    url,
    method: 'GET',
    responseType: 'json',
    timeout: 20000
  }).then(rs => rs.data),
  postApi: (url, data) => axios({
    url,
    data,
    method: 'POST',
    responseType: 'json',
    timeout: 20000
  }).then(rs => rs.data)
}
;
