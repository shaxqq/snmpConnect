import { Component } from '@angular/core';
import  infoContent  from './info.json'

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html', 
  styleUrls: ['./info.component.scss'],
  providers: [],
})

export class Info  {
  
  optic = infoContent.optic
  nonOptic = infoContent.nonOptic
  gateway = infoContent.gateway
  
}
