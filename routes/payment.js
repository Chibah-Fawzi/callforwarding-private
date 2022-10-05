const paymentController = require("../controllers/payment");

function init(router) {
  router.route("/createPayment").post(paymentController.createPayment);
  router.route("/getPayment/:id").get(paymentController.getPayment);
  //   router.route("/payment").post(paymentController.getPayment);
  router.route("/numbers").get(paymentController.getNumbers);
  router.route("/number").post(paymentController.buyNumber);
  router.route("/availableNumbers").get(paymentController.checkNumber);
  //   router.route("/customers").post(paymentController.createCustomerInfos);
  //   router.route("/customer/:id").get(paymentController.getCustomerInfos);
  //   router.route("/customers").get(paymentController.getCustomersInfos);
}

module.exports.init = init;
