const { STRIPE_SECRET_KEY, STRIPE_DOMAIN } = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const Vonage = require("@vonage/server-sdk");
const vonage = new Vonage({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

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

  const confirmPaymentIntent = await stripe.paymentIntents.confirm(
    paymentIntent.id,
    { payment_method: "pm_card_visa", return_url: "http://localhost:3000" }
  );

  res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
    confirmPaymentIntent,
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

function checkNumber(req, res) {
  const {
    COUNTRY_CODE,
    VONAGE_NUMBER_TYPE,
    NUMBER_SEARCH_CRITERIA,
    NUMBER_SEARCH_PATTERN,
    VONAGE_NUMBER_FEATURES,
  } = req.body;

  vonage.number.search(
    COUNTRY_CODE,
    {
      type: VONAGE_NUMBER_TYPE, // STRING => MOBILE - LANDLINE - TOLL FREE --- DEFAULT "MOBILE"
      pattern: NUMBER_SEARCH_CRITERIA, // NUMBER => Area code || Preferred digits (OBLIGATORY)
      search_pattern: NUMBER_SEARCH_PATTERN, // NUMBER => 0 : Starts With, 1 : Contains, 2 : Ends With --- DEFAULT : 0
      features: VONAGE_NUMBER_FEATURES, // STRING => SMS - VOICE - MMS --- DEFAULT : "VOICE" - "SMS"
    },
    (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(
          `Here are ${res.numbers.length} of the ${res.count} matching numbers available for purchase:`
        );
        res.numbers.forEach((number) => {
          console.log(`Tel: ${number.msisdn} Cost: ${number.cost}`);
        });
      }
    }
  );
}

function buyNumber(req, res) {
  const { COUNTRY_CODE, VONAGE_NUMBER } = req.body;

  vonage.number.buy(COUNTRY_CODE, VONAGE_NUMBER, (err, result) => {
    if (err) {
      console.error(err);
      res.json({
        success: false,
        err,
      });
    } else {
      console.log(JSON.stringify(result, null, 2));
      res.json({
        success: true,
        result,
      });
    }
  });
}

async function getNumbers(req, res) {
  const { NUMBER_SEARCH_CRITERIA, NUMBER_SEARCH_PATTERN } = req.body;

  vonage.number.get(
    NUMBER_SEARCH_CRITERIA && NUMBER_SEARCH_PATTERN
      ? {
          pattern: NUMBER_SEARCH_CRITERIA, // NUMBER => Area code &&|| Preferred digits
          search_pattern: NUMBER_SEARCH_PATTERN, // NUMBER => 0 : Starts With, 1 : Contains, 2 : Ends With,
        }
      : {},
    (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(
          `Here are ${res.numbers.length} of your ${res.count} matching numbers:`
        );
        res.numbers.forEach((number) => {
          console.log(`Tel: ${number.msisdn} Cost: ${number.type}`);
        });
      }
    }
  );
}

module.exports = {
  createPayment,
  getPayment,
  buyNumber,
  checkNumber,
  getNumbers,
};
