import { Injectable } from '@nestjs/common';
let WebSocket = require('ws');

@Injectable()
export class DhcpLogService {
    dhcpLog(dhcpIp: string, macSrc: string, callback: (data: any) => void) {
        let log = new WebSocket(`wss://adm.o3.ua/ws_dhcp${dhcpIp}`);

        log.onopen = function () {
            console.log('Соединение по WebSocket установлено');
            setTimeout(() => {
                log.close();
            }, 60000); // Таймаут 30 секунд
        }

        log.onclose = function (e: any) {
            if (e.wasClean) {
                console.log(`[close] Соединение закрыто чисто, код=${e.code}, причина=${e.reason}`);
            } else {
                console.log('[close] Соединение закрыто неожиданно');
            }
        }

        log.onmessage = function (e: any) {
            const data = e.data;
            // console.log('dataService', data)
            if (data.includes(macSrc)) {
                console.log('Получены данные:', data);
                callback(data); // Передаем данные в предоставленную функцию обратного вызова
            }
        }

        log.onerror = function (error: any) {
            console.error('Ошибка WebSocket:', error);
        }
    }
}