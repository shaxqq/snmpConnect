import { Injectable } from '@nestjs/common';
const net = require('net');

@Injectable()
export class CheckBdcomGService {
  baseCheckBdcomG(ip: any, port: string) {
    return new Promise((resolve, reject) => {
      const client = new net.Socket();
      let responseData = '';

      client.on('data', (data: { toString: () => any; }) => {
        responseData += data.toString();
        console.log('Received:', data.toString());
         setTimeout(() => {
           client.end();
        }, 6000)
      });
      // 172.17.204.11 
      // Обработчик события "close" для завершения соединения
      client.on('close', () => {
        console.log('Connection closed');
         console.log('reData:', responseData);
        resolve(responseData);
      });

      client.on('error', (error: any) => {
        reject(error);
      });

      client.connect(23, ip, () => {
        console.log('Connected to remote host');
        sendDataWithDelay(client, 'sazeke\r', 300)
        sendDataWithDelay(client, 'sazekeL12-\r', 300)
        sendDataWithDelay(client, 'sh int br\r q', 500)
        sendDataWithDelay(client, `sh int ${port}\r `, 500)
        sendDataWithDelay(client, `sh mac address-table interface ${port}\r`, 500)
        sendDataWithDelay(client, `sh gpon optical-transceiver-diagnosis interface ${port}\r`, 500)
        sendDataWithDelay(client, `sh run interface ${port}\r`, 500)
        sendDataWithDelay(client, `sh gpon inactive-onu\r                     `, 500)

      });
    })
  }


}
function sendDataWithDelay(client: { write: (arg0: any) => void; }, data: string, delay: number) {
  setTimeout(() => {
    client.write(data)
  }, delay)
}