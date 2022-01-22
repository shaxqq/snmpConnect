import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {
   constructor(){}
  values = ''
  // ngOnInit(): void {
  //   this.http
  //     .get('http://localhost:3000/snmp',{observe: 'body', responseType: 'json'})
  //     .subscribe((data:any) => {
  //     //  this.snmp= new Snmp(data.oid, data.type, data.value)
  //       console.log(data)
  //       console.log(data.oid)
        
  //   //    console.log(this.snmp)
  //     });
  // }

 


  // async onSubmit(ip: string, sw: string) {
  //   await this.http.get('http://localhost:3000/snmp').subscribe(()=>{
  //     console.log(ip + sw)
  //   })
   
  // }

  // onKey(event: any) {
  //   console.log(event.target.value)
  //   // this.values += ip
  //   // this.values += port
  //   // console.log(ip)
  //   // console.log(port)
    
  // }
 
  
  // ip=['']
  // swIp(getIp:string){
  //   if(getIp){
  //     this.ip.push(getIp)
  //   }
  //   console.log(getIp)
    
  // }
}


  // onSubmit(hero: Hero): Observable<Hero> {
  //   return this.http.post<Hero>('http://localhost:3000/snmp',hero, {observe: 'body', responseType: 'json'}).pipe(
  //     catchError(this.handleError('addHero', hero))
  //   );
  //   }