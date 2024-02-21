import { Injectable } from '@nestjs/common';
const net = require('net');

@Injectable()
export class CheckDlinkService {
  baseCheckDlink(ip: any, port: string) {
    return new Promise((resolve, reject) => {
      const client = new net.Socket();
      let responseData = '';
      // let currentData = ''
      // const adminPrompt = "admin#";

      client.on('data', (data: { toString: () => any; }) => {
        // const receivedData = data.toString();
        // currentData += receivedData;
        responseData += data.toString()
        // // Проверяем, есть ли adminPrompt в текущих данных
        // if (currentData.includes(adminPrompt)) {
        //   // Разделяем данные на блоки
        //   const blocks = currentData.split(adminPrompt);
        //   console.log('block',blocks[0])
        //   // Первый блок, если он не пустой, сохраняем как data_1
        //   if (blocks[0].trim() !== '') {
        //     const key = `data_${Object.keys(responseData).length + 1}`;
        //     responseData[key] = blocks[0];
        //   }
        //   // Оставшиеся данные заменяем на текущие данные
        //   currentData = blocks[1] || '';
        // }
        console.log(responseData)
       // console.log('currentData2',currentData)
         setTimeout(() => {
           client.end();
        }, 4000)
      });
      // F - 172.17.214.12 C - 172.22.22.41
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
        sendDataWithDelay(client, `show ports ${port}\r`, 300)
        sendDataWithDelay(client, `q`, 300)
        sendDataWithDelay(client, `show fdb port ${port}\r`, 300)
        sendDataWithDelay(client, 'show address_binding blocked all\r', 300)
        sendDataWithDelay(client, 'show address_binding ip_mac all\r', 300)
        sendDataWithDelay(client, `show address_binding dhcp_snoop binding_entry port ${port}\r`, 300)
        sendDataWithDelay(client, `show error ports ${port}\r`, 300)
        sendDataWithDelay(client, `q`, 300)
        sendDataWithDelay(client, `sh switch\ra`, 300)
        sendDataWithDelay(client, `sh log\r  q`, 300)
        sendDataWithDelay(client, `cable_diag ports ${port}\r`, 300)
      });
    })
  }


}
function sendDataWithDelay(client: { write: (arg0: any) => void; }, data: string, delay: number) {
  setTimeout(()=>{
    client.write(data)
  }, delay)
    
}