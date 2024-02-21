const net = require('net');
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
 app.get('/getdata', async (req, res)=>{
  if (req.url === '/getdata') {
    try {
      const responseData = await fetchDataFromSocket();
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(responseData);
    } catch (error) {
      console.error('Error:', error);
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Internal Server Error');
    }
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
  }
 }) 

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

async function fetchDataFromSocket() {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();
    let responseData = [];

    client.on('data', (data) => {
      responseData.push(data.toString());
      console.log('Received:', data.toString());
      setTimeout(()=>{
               client.end(); 
            },3000)
    });

    // Обработчик события "close" для завершения соединения
    client.on('close', () => {
      console.log('Connection closed');
      console.log('reData:', responseData);
      resolve(responseData.toString());
    });

    client.on('error', (error) => {
      reject(error);
    });

    client.connect(23, '172.23.100.41', () => {
      console.log('Connected to remote host');
      sendDataWithDelay(client, 'sazeke\r\n', 120)
      sendDataWithDelay(client, 'sazekeL12-\r\n', 120)
      sendDataWithDelay(client, 'sh int port 1\r\n', 120)
      sendDataWithDelay(client, 'sh loopback-detection port-list 1\r\n', 120)
      sendDataWithDelay(client, 'sh mac-address-table l2-address port 1\r\n', 120)
      sendDataWithDelay(client, 'sh ip dhcp snooping binding\r\n', 120)
      sendDataWithDelay(client, 'test cable-diagnostics port-list 1\r\n', 120)
      sendDataWithDelay(client, 'sh cable-diagnostics port-list 1\r\n', 2200)
      sendDataWithDelay(client, 'sh logging file\r\n', 2222)
      // client.write('sazeke\r\n');
      // client.write('sazekeL12-\r\n');
      // // client.write('sh int port 1\r\n');
      // // client.write('sh loopback-detection port-list 1\r\n');
      // // client.write('sh mac-address-table l2-address port 1\r\n');
      // // client.write('sh ip dhcp snooping binding\r\n');
      // client.write('test cable-diagnostics port-list 1\r\n');
      // client.write('sh cable-diagnostics port-list 1\r\n');

    });
  });
}
function sendDataWithDelay (client, data, delay) {
  setTimeout(()=>{
    client.write(data)
  }, delay)
}




// async function fetchDataFromSocket() {
//     return new Promise((resolve, reject) => {

//       const client = new net.Socket();
//       let responseData = []
     
// client.on('data',  (data) => {
//    //  console.log('Received1:','+++++++++' + data + '*********--******');
//      // console.log('Received:','--------' + data.toString() + '///////');
//     responseData.push(data.toString())
//     console.log('reData',responseData)
//      setTimeout(()=>{
//       client.end(); 
//      },2000)
//   });
  
//   // Обработчик события "close" для завершения соединения
//   client.on('close', () => {
//     console.log('Connection closed');
//     console.log('reData1',responseData)
//     resolve(responseData.toString());
//   });

//   client.on('error', (error) => {
//     reject(error);
//   });

//     client.connect(23, '172.21.25.37',  () => {
//         console.log('Connected to remote host');
//         client.write('sazeke\r\n')
//         client.write('sazekeL12-\r\n')
//         client.write('sh int port 2\r\n')
        
//         // result(client,'sazeke\r\n')
//         // result(client,'sazekeL12-\r\n')
//         // result(client,'sh int port 2\r\n')
//         // result(client,'test cable-diagnostics port-list 2\r\n')
//         // result(client,'sh cable-diagnostics port-list 2\r\n')
//       });
//      // client.setEncoding('utf8');
     
//     });
//   }
  


















  

// const { Telnet } = require('telnet-client')
// const connection = new Telnet()

// these parameters are just examples and most probably won't work for your use-case.
// const params = {
//   host: '172.21.25.37',
//   port: 23,
//   username: 'sazeke',
//   password: 'sazekeL12-',
//   timeout: 1500,
//   negotiationMandatory: false
// }

// connection.on('ready', function(prompt) {
//     console.log('Connected to remote host');
//     console.log(prompt);
    
//     Отправляем команды на устройство
//     connection.exec('sh interface port 2', function(err, response) {
//       if (err) {
//         console.error('Error executing command:', err);
//       } else {
//         console.log('Command 1 output:', response);
//       }
//     });
//   });
  
//   connection.on('timeout', function() {
//     console.log('Socket timeout!');
//     connection.end();
//   });

//   connection.connect(params);



// const net = require('net');
// const http = require('http');


// const server = http.createServer((req, res) => {
//   if (req.url === '/getdata') {
// function fetchDataFromSocket(host, port, requestData) {
//   return new Promise((resolve, reject) => {
//     const client = new net.Socket();
//     let responseData = '';

//     client.on('data', (data) => {
//       responseData += data.toString('utf8');
//     });

//     client.on('close', () => {
//       resolve(responseData);
//       client.destroy();
//     });

//     client.on('error', (error) => {
//       reject(error);
//       client.destroy();
//     });

//     client.connect(port, host, () => {
//       console.log('Connected to remote host');
//       client.write(requestData);
//     });
//   });
// }
  
// // Пример использования
// async function main() {
//   try {
//     const host = '192.168.0.1';
//     const port = 23;
//     const requestData = 'your_request_data_here';

//     const result = await fetchDataFromSocket(host, port, requestData);
//     console.log('Received:', result);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
// main();
//   }}



// server.listen(3000, () => {
//   console.log('Server listening on port 3000');
// })