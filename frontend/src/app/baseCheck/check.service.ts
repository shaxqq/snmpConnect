import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Check } from './check.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckService {
  constructor(public http: HttpClient) { }
  getCheck(check: Check) {
    let sw = check.getSw()
    const body = {
      sw: sw,
      port: check.port.trim()
    }
    return this.http.post('http://localhost:3000/check', body)
  }
}
@Injectable({
  providedIn: 'root'
})
export class CheckZteService {
  constructor(public http: HttpClient) { }
  getCheck(check: Check) {
    let sw = check.getSw()
    const body = {
      sw: sw,
      port: check.port.trim()
    }
    return this.http.post('http://localhost:3000/checkzte', body)
  }
}
@Injectable({
  providedIn: 'root'
})
export class CheckLinksysService {
  constructor(public http: HttpClient) { }
  getCheck(check: Check) {
    let sw = check.getSw()
    const body = {
      sw: sw,
      port: check.port.trim()
    }
    return this.http.post('http://localhost:3000/checklinksys', body)
  }
}
@Injectable({
  providedIn: 'root'
})
export class CheckDlinkService {
  constructor(public http: HttpClient) { }
  getCheck(check: Check) {
    let sw = check.getSw()
    const body = {
      sw: sw,
      port: check.port.trim()
    }
    return this.http.post('http://localhost:3000/checkdlink', body)
  }
}
@Injectable({
  providedIn: 'root'
})
export class CheckBdcomService {
  constructor(public http: HttpClient) { }
  getCheck(check: Check) {
    let sw = check.getSw()
    const body = {
      sw: sw,
      port: check.port.trim()
    }
    return this.http.post('http://localhost:3000/checkbdcom', body)
  }
}
@Injectable({
  providedIn: 'root'
})
export class CheckBdcomSolutionService {
  constructor(public http: HttpClient) { }
  getCheck(check: Check) {
    let sw = check.getSw()
    const body = {
      sw: sw,
      port: check.port.trim()
    }
    return this.http.post('http://localhost:3000/checkbdcomsolution', body)
  }
}
@Injectable({
  providedIn: 'root'
})
export class CheckRaisecomGService {
  constructor(public http: HttpClient) { }
  getCheck(check: Check) {
    let sw = check.getSw()
    const body = {
      sw: sw,
      port: check.port.trim()
    }
    return this.http.post('http://localhost:3000/checkraisecomg', body)
  }
}
@Injectable({
  providedIn: 'root'
})
export class CheckFoxGateService {
  constructor(public http: HttpClient) { }
  getCheck(check: Check) {
    let sw = check.getSw()
    const body = {
      sw: sw,
      port: check.port.trim()
    }
    return this.http.post('http://localhost:3000/checkfoxgate', body)
  }
}
@Injectable({
  providedIn: 'root'
})
export class CheckBdcomGService {
  constructor(public http: HttpClient) { }
  getCheck(check: Check) {
    let sw = check.getSw()
    const body = {
      sw: sw,
      port: check.port.trim()
    }
    return this.http.post('http://localhost:3000/checkbdcomg', body)
  }
}