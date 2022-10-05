# callforwarding-server

<h1>To run the server :</h1>
<br>
`npm install` <br>
`nodemon app`

<br><br>


<h1>Routes :</h1>
<br>
<b>POST</b>  `/createPayment`  (paymentController.createPayment) => Create Payment Intent(Stripe)<br>
 <b>GET</b>  `/getPayment/:id`  (paymentController.getPayment= => Retrieve Payment Intent(Stripe)<br>
  <b>`GET`</b>  `/numbers`  (paymentController.getNumbers= => Retrieve user's bought numbers(Vonage)<br>
<b>`POST`</b> `/number`  (paymentController.buyNumber) => Buy virtual number(Vonage)<br>
  <b>`GET`</b>  `/availableNumbers`  (paymentController.checkNumber= => Check the availibility of a number(Vonage)
