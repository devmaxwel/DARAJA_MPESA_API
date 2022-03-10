import axios from "axios";
import asyncHandler from "express-async-handler";
import moment from "moment";
import { paymentsModel } from "../models/mpesa.model";
import { base64 } from "../utils/base64.util";

export const mpesaRequest= asyncHandler(async (req, res) => {
  const { amount, mobile,} = req.body;

  if (!amount || !mobile) {
    res
      .sendStatus(400)
      .json({ errorMessage: "amount and number cannot be null" });
  }
  const shortCode = `${process.env.shortCode}`;
  const amountPayable = `${amount}`;
  const passKey = `${process.env.passKey}`;
  const url = `${process.env.LNMPOendpoint}`;
  const timestamp = moment().format("YYYYMMDDHHmmss");
  const password = base64(shortCode, passKey, timestamp);
  const auth = "";

  await axios
    .post(
      url,
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amountPayable,
        PartyA: mobile,
        PartyB: shortCode,
        PhoneNumber: mobile,
        CallBackURL: "https://2237-41-84-152-6.ngrok.io/mpesa/hooks",
        AccountRefference: "Test",
        TransactionDesc: "Order Payment",
      },
      {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      }
    )
    .then((response) => {
      if (req.body.stkCallback.callBackMetadata.ResultCode === 0) {
        const payment = await paymentsModel.create({
          user,
          mobile,
          amount,
        });

        if (payment) {
          res.sendStatus(200).json({
            id: payment._id,
            payment,
          });
        }
        return response.data;
      }
    })
    .catch((error) => {
      res.sendStatus(200).json({
        errorMessage: `an error occured: ${error}`,
      });
    });
});
