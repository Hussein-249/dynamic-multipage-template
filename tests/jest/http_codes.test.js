const axios = require('axios');


// remember to ensure the server is live before running this test
test('GET request returns status code 200', async () => {
    const indexResponse = await axios.get('http://localhost:3000/');
  
    expect(indexResponse.status).toBe(200);
  });
