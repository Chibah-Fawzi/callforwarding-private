const { STRIPE_SECRET_KEY, STRIPE_DOMAIN } = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

async function createPayment(req, res) {
  const { price } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // const confirmPaymentIntent = await stripe.paymentIntents.confirm(
  //   paymentIntent.id,
  //   { payment_method: "pm_card_visa", return_url: "http://localhost:3000" }
  // );

  res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
    // confirmPaymentIntent,
  });
}
async function getPayment(req, res) {
  const paymentId = req.params.id;
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

  res.status(200).json({
    success: true,
    paymentIntent,
  });
}

module.exports = {
  createPayment,
  getPayment,
};
