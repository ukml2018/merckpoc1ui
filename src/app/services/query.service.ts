import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, output } from "@angular/core";

@Injectable({
    providedIn:"root"
})

export class QueryService {

    constructor(private http:HttpClient) {

    }
    
    // url = 'http://internal-advisor360-lb-2105012466.us-east-1.elb.amazonaws.com:8081/sa/converse';
    url = 'http://169.63.181.214:5000/invokesearch/';
    // url = 'http://localhost:4200/invokesearch/';


    callConverse(query:string) {
        // const data = {
        //     'input':{
        //         'text':'What if I exclude incoming supply from tier2 shortages'
        //     },
        //     'output':{
        //         'isfollowUp':''
        //     },
        //     'context':{
        //         'conversation_id':''
        //     },
        //     'watsonAssistant':{
        //         'confidence':1
        //     }
        // }

        // const headers = {'user-id':'moumita.das1@merck.com','user-timezone':'GMT'};

    //     const httpOptions = {
    //         headers: new HttpHeaders()
    //   }
  
    //   httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    //   httpOptions.headers.append('Content-Type', 'application/json');
    //   httpOptions.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //   httpOptions.headers.append('user-id','moumita.das1@merck.com');
    //   httpOptions.headers.append('user-timezone','GMT');
    const finalURL = `${this.url}${query}`;
    console.log('finalURL ==> ', finalURL);
        return this.http.get(finalURL);
    } 
}