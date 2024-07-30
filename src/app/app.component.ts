import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  title = 'poc-new';

  query = '';

  queryResp = '';

  queryRespActive = false;

  @ViewChild('textmessage') textmessage!:ElementRef

  @ViewChild('answer')
  answer!: ElementRef;

  constructor(private renderer: Renderer2, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    
    
  }

  ngAfterViewInit() {
    const _self = this;
    (window as any).watsonAssistantChatOptions = {
      integrationID: '9b114fa1-6814-4d8d-bbde-1d9387994b33', // The UUID from the IBM Watson Assistant embed code
      region: 'us-south', // The region e.g. 'us-south', 'us-east', 'jp-tok', 'au-syd', 'eu-gb', 'eu-de', etc.
      serviceInstanceID: '0ee5cd1c-3904-4697-8867-5ac7d42c8da8', // The UUID from the IBM Watson Assistant embed code
      onLoad: async (instance: { on: (arg0: { type: string; handler: (event: any) => void; }) => void; render: () => any; }) => {
        
        const self = _self;
        instance.on({ type: 'receive', handler: (event: any) => {
            console.log('I received a message!', event);
            // update Question
              if(event.data.context.skills['actions skill'].skill_variables && event.data.context.skills['actions skill'].skill_variables.User_query) {
                // this.textmessage.nativeElement.value = event.data.context.skills['actions skill'].skill_variables.User_query;

                const length = event.data.context.skills['actions skill'].skill_variables.chat_history.length;
                
                // const value = event.data.context.skills['actions skill'].skill_variables.chat_history[length-1]['u']
                const value = event.data.context.skills['actions skill'].skill_variables.chat_history[length-1];

                this.textmessage.nativeElement.value = value;
                console.log('value ', value)
              }
              
            if (event.data.output && event.data.output.generic) {
              // Iterate through the generic elements to find text responses
              /*event.data.output.generic.forEach((generic: { response_type: string; text: any; }) => {
                if (generic.response_type === 'text' && generic.text.trim() !== '') {
                  
                  // let jsonResp = {"summary":"The risk is related to a single source for high volume markets across the products.;Uncertainty in phase I/II clinical performance due to lot-to-lot consistency of active substance used across phases."};
                  if(typeof generic.text == 'string' && JSON.parse(generic.text) && typeof JSON.parse(generic.text) == 'object') {
                    // console.log('jsonResp ==> ', jsonResp);
                    // console.log('jsonResp.summary ==> ', jsonResp.summary);
                    let jsonResp = JSON.parse(generic.text);
                    this.queryResp = jsonResp.summary;
                    this.answer.nativeElement.innerText = this.queryResp;
                  }
                  else {
                    this.answer.nativeElement.innerText = generic.text;
                  }                  
                  self.queryRespActive = true
                  this.chRef.detectChanges();
                }
              });*/
              const generic = event.data.output.generic[0];
              if (generic && generic.response_type === 'text' && generic.text.trim() !== '') {
                //if(typeof generic.text == 'string' && JSON.parse(generic.text) && typeof JSON.parse(generic.text) == 'object') {
                  // console.log('jsonResp ==> ', jsonResp);
                  // console.log('jsonResp.summary ==> ', jsonResp.summary);
                  // let jsonResp = JSON.parse(generic.text);
                  //this.queryResp = jsonResp.summary;
                  const tempResp = generic.text
                  this.queryResp = tempResp.replace(/<br\s*\/?>/gi, '\n');
                  // console.log('this.queryResp ==> ', this.queryResp)
                  // this.answer.nativeElement.innerText = this.queryResp;
                //}
                //else {
                  // this.answer.nativeElement.innerText = generic.text;
                //}                  
                self.queryRespActive = true
                this.chRef.detectChanges();
              }

            }
          }
        });

        // Render the chat instance
        await instance.render();
      }
    };

    setTimeout(() => {
      const t = document.createElement('script');
      t.src = 'https://web-chat.global.assistant.watson.appdomain.cloud/versions/' + ((window as any).watsonAssistantChatOptions.clientVersion || 'latest') + '/WatsonAssistantChatEntry.js';
      document.head.appendChild(t);
    });
  }

}
