import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ================= CREATE ORDER =================
export const createOrder = async (req, res) => {

  try {

    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (err) {

    console.log("RAZORPAY ERROR:", err);

    res.status(500).json({
      message: "Payment order failed"
    });
  }
};

// ================= VERIFY PAYMENT =================
export const verifyPayment = async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_SECRET
        )
        .update(body.toString())
        .digest("hex");

    const isAuthentic =
      expectedSignature === razorpay_signature;

    if (isAuthentic) {

      res.json({
        success: true,
        message: "Payment verified"
      });

    } else {

      res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Verification failed"
    });
  }
};