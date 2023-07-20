const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

const downloadResource = (url, filePath) => {
  request(url, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      return;
    }

    if (response.statusCode !== 200) {
      console.error('Request failed:', response.statusCode, response.statusMessage);
      return;
    }

    fs.writeFile(filePath, body, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return;
      }
      const fileSize = Buffer.byteLength(body);
      console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
    });
  });
};

downloadResource(url, filePath);