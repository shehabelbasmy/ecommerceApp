import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  
  constructor(private httpClient:HttpClient) { }

  getCreditCardMonth(startMonth:number):Observable<number[]>{

    let data:number[]=[]

    for(let theMonth=startMonth;theMonth<=12;theMonth++){
      data.push(theMonth)
      
    }
    return of(data);
  }

  getCreditCardYears():Observable<number[]>{
    
    const currentYear:number=new Date().getFullYear();
    const lastYear:number=currentYear+10
    let data:number[]=[]
    
    for(let theYear=currentYear;theYear<=lastYear;theYear++){
      data.push(theYear)
    }

    return of(data)

  }

  getCountries():Observable<Country[]>{
    const url=`http://localhost:8080/api/countries`
    return this.httpClient.get<GetResponseCountry>(url).pipe(
      map(response=>response._embedded.countries)
    )
  }
  
  getStates(countryCode:string):Observable<State[]>{

    const url=`http://localhost:8080/api/states/search/findByCountryCode?code=${countryCode}`
    console.log(countryCode)

    return this.httpClient.get<GetResponseState>(url).pipe(
      map(response=>response._embedded.states)
    )
  }
  
  
}

interface GetResponseCountry{
  _embedded:{
    countries:Country[]
  }
}

interface GetResponseState{
  _embedded:{
    states:State[]
  }
}