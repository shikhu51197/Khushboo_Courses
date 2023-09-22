import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/Payment.js";
export const buySubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.role === "admin")
    return next(new ErrorHandler("Admin can't buy subscription", 400));

  const plan_id = process.env.PLAN_ID || "plan_MF06J4Tc7WFlLx";

  const subscription = await instance.subscriptions.create({
    plan_id,
    customer_notify: 1,
    total_count: 12,
  });

  user.subscription.id = subscription.id;

  user.subscription.status = subscription.status;

  await user.save();

  res.status(201).json({
    success: true,
    subscriptionId: subscription.id,
  });
});

export const paymentVerification = catchAsyncError(async (req, res, next) => {
  const { razorpay_signature, razorpay_payment_id, razorpay_subscription_id } =
    req.body;

    console.log("Payment Verification Request Received");
    console.log("Request Body:", req.body);

  const user = await User.findById(req.user._id);
   
  const subscription_id = user.subscription.id;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(razorpay_payment_id + "|" + subscription_id, "utf-8")
    .digest("hex");

  const isAuthentic = generated_signature === razorpay_signature;
  console.log("isAuthentic:", isAuthentic);
  if (!isAuthentic){
    console.log("Payment Verification Failed");
      return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`);
  }
  

  // database comes here
  await Payment.create({
    razorpay_signature,
    razorpay_payment_id,
    razorpay_subscription_id,
  });

  user.subscription.status = "active";
  
  await user.save();
  console.log("Payment Verification Successful");
  res.redirect(
    `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`
  );
});

export const getRazorPayKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
});

export const cancelSubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const subscriptionId = user.subscription.id;
  let refund = false;

  await instance.subscriptions.cancel(subscriptionId);

  const payment = await Payment.findOne({
    razorpay_subscription_id: subscriptionId,
  });

  if (!payment) {
    return res.status(400).json({ success: false, message: "Payment not found for the subscription." });
  }

  const gap = Date.now() - payment.createdAt;
  const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;

  try {
    if (refundTime > gap) {
      await instance.payments.refund(payment.razorpay_payment_id);
      refund = true;
    }

    await Payment.deleteOne({ _id: payment._id });
    // Using Mongoose's unset method to remove fields
    user.subscription.id = undefined;
    user.subscription.status = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: refund
        ? "Subscription cancelled. You will receive a full refund within 7 days."
        : "Subscription cancelled. Now refund initiated as the subscription was cancelled after 7 days.",
    });
  } catch (error) {
    console.error("Error during cancelSubscription:", error);
    return res.status(500).json({ success: false, message: "An error occurred while cancelling the subscription." });
  }
  
});
