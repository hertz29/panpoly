const request = require('request-promise');

async function requestSimple({
    url, method, headers, body, qs,
  }) {
    const sendOptions = {
      url,
      method,
      headers,
      body,
      qs,
      simple: false,
      json: true,
      resolveWithFullResponse: true,
    };
  
    return request(sendOptions);
  }

  module.exports = {
      requestSimple,
  }
