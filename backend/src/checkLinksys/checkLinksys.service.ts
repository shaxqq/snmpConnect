import { Injectable } from '@nestjs/common';
const net = require('net');

@Injectable()
export class CheckLinksysService {
  baseCheckLinksys(ip: any, port: string) {
    return new Promise((resolve, reject) => {
      const client = new net.Socket();
      let responseData = '';
     // let currentData = ''; // Переменная для хранения текущих данных

      client.on('data', (data: { toString: () => any; }) => {
        responseData += data.toString();
        console.log('Received:', responseData);

        // currentData += receivedData
        // if (receivedData.includes('console# ')) {
        //   const key = `data_${Object.keys(responseData).length + 1}`;
        //   responseData[key] = currentData;
        //   currentData = ''; 
        // }
        
         setTimeout(() => {
           //resolve(responseData);
           client.end();
        }, 9000)
      });
      // 172.17.244.41
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
        sendDataWithDelay(client, `sh int con e e${port}\r`, 630)
        sendDataWithDelay(client, `sh int description e e${port}\r`, 630)
        sendDataWithDelay(client, `sh int st e e${port}\r`, 630)
        sendDataWithDelay(client, `sh b a e e${port}\r`, 630)
        sendDataWithDelay(client, `sh ip dhcp sn b\r`, 630)
        sendDataWithDelay(client, `sh ip so st e e${port}\r`, 630)
        sendDataWithDelay(client, `sh int counters e e${port}\r`, 630)
        sendDataWithDelay(client, `sh system\r`, 630)
      //  sendDataWithDelay(client, `test copper-port tdr e${port}\r`, 2222)
        sendDataWithDelay(client, `sh log\r q`, 630)

      });
    })
  }


}
function sendDataWithDelay(client: { write: (arg0: any) => void; }, data: string, delay: number) {
  setTimeout(() => {
    client.write(data)
  }, delay)
}