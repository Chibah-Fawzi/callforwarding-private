# callforwarding-server

<h1>To run the server :</h1>
<br>
`npm install` <br>
`nodemon app`

<br><br>


<h1>Routes :</h1>
<br>
<b>POST</b>  <i>/createPayment</i> :  (paymentController.createPayment) => Create Payment Intent(Stripe)<br>
 <b>GET</b>  <i>/getPayment:id</i> :  (paymentController.getPayment)=> Retrieve Payment Intent(Stripe)<br>
  <b>GET</b>  <i>/numbers</i> :  (paymentController.getNumbers)=> Retrieve user's bought numbers(Vonage)<br>
<b>POST</b> <i>/number</i> :  (paymentController.buyNumber) => Buy virtual number(Vonage)<br>
  <b>GET</b>  <i>/availableNumbers</i> :  (paymentController.checkNumber) => Check the availibility of a number(Vonage)

