import { Injectable } from '@nestjs/common';
const net = require('net');

@Injectable()
export class CheckFoxGateService {
  baseCheckFoxGate(ip: any, port: string) {
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
      // 172.22.101.91
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
        sendDataWithDelay(client, 'sh int br\r ', 300)
        sendDataWithDelay(client, `sh interface ethernet 0/0/${port}\r `, 300)
        sendDataWithDelay(client, `sh mac-address-table interface ethernet 0/0/${port}\r`, 300)
        sendDataWithDelay(client, `sh mac-address-table interface ethernet 0/1/${port}\r     `, 300)
        sendDataWithDelay(client, `sh dhcp-snooping clients\r`, 300)
        sendDataWithDelay(client, `sh statistics interface ethernet 0/0/${port}\r`, 300)
        sendDataWithDelay(client, `sh running-config interface ethernet 0/0/${port}\r`, 300)
        sendDataWithDelay(client, `sh logg buf\r q`, 300)

      });
    })
  }


}
function sendDataWithDelay(client: { write: (arg0: any) => void; }, data: string, delay: number) {
  setTimeout(() => {
    client.write(data)
  }, delay)
}