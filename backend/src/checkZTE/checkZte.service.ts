import { Injectable } from '@nestjs/common';
const net = require('net');

@Injectable()
export class CheckZteService {
  baseCheckZte(ip: any, port: string) {
    return new Promise((resolve, reject) => {
      const client = new net.Socket();
      let responseData = '';

      client.on('data', (data: { toString: () => any; }) => {
        responseData += data.toString();
        console.log('Received:', responseData);
         setTimeout(() => {
          resolve(responseData);
           client.end();
        }, 9000)
      });
      // 172.23.111.61
      // Обработчик события "close" для завершения соединения
      client.on('close', () => {
        console.log('Connection closed');
        // console.log('reData:', responseData, 'endData');
        resolve(responseData);
      });

      client.on('error', (error: any) => {
        reject(error);
      });

      client.connect(23, ip, () => {
        console.log('Connected to remote host');
        sendDataWithDelay(client, 'sazeke\r\n', 300)
        sendDataWithDelay(client, 'sazekeL12-\r\n', 300)
        sendDataWithDelay(client, 'en\r\n', 600)
        sendDataWithDelay(client, 'rbnfqcrbqbynthyt\r\n', 600)
        sendDataWithDelay(client, `sh port ${port}\r\n`, 600)
        sendDataWithDelay(client, `sh fdb port ${port} d\r\n`, 600)
        sendDataWithDelay(client, `sh mac dyn port ${port}\r\n`, 600)
        sendDataWithDelay(client, `sh dhcp\r\n`, 600)
        sendDataWithDelay(client, ' ', 600)
        sendDataWithDelay(client, `sh dhcp snooping binding\r\n`, 600)
        sendDataWithDelay(client, `sh acl binding all\r\n`, 600)
        sendDataWithDelay(client, `sh port ${port} st\r\n`, 600)
    //    sendDataWithDelay(client, `sh vct port ${port}\r\n`, 800)
        sendDataWithDelay(client, `sh ter log\r\nq`, 600)
        sendDataWithDelay(client, `sh version\r\n`, 600)
      });
    })
  }


}
function sendDataWithDelay(client: { write: (arg0: any) => void; }, data: string, delay: number) {
  setTimeout(() => {
    client.write(data)
  }, delay)
}