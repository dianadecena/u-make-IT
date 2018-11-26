import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
 
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit   {

  public payPalConfig?: PayPalConfig;

    ngOnInit(){
      this.initConfig();
    }

    private initConfig(){
      this.payPalConfig = new PayPalConfig(
        PayPalIntegrationType.ClientSideREST,
        PayPalEnvironment.Sandbox,
        {
          commit: true,
          client: {
            sandbox:
              'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
          },
          button: {
            label: 'paypal',
            layout: 'vertical'
          },
          onAuthorize: (data, actions) => {
            console.log('Authorize');
            return of(undefined);
          },
          onPaymentComplete: (data, actions) => {
            console.log('OnPaymentComplete');
          },
          onCancel: (data, actions) => {
            console.log('OnCancel');
          },
          onError: err => {
            console.log('OnError');
          },
          onClick: () => {
            console.log('onClick');
          },
          validate: (actions) => {
            console.log(actions);
          },
          experience: {
            noShipping: true,
            brandName: 'Angular PayPal'
          },
          transactions: [
            {
              amount: {
                total: 30.11,
                currency: 'USD',
                details: {
                  subtotal: 30.00,
                  tax: 0.07,
                  shipping: 0.03,
                  handling_fee: 1.00,
                  shipping_discount: -1.00,
                  insurance: 0.01
                }
              },
            }
          ],
          note_to_payer: 'Contact us if you have troubles processing payment'
        }
      );
    }

  }