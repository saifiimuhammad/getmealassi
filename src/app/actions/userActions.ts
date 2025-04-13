import { Payment } from "../models/Payment";
import { User } from "../models/User";
import { connectDb } from "../utils/db";

const fetchPayments = async (username: string) => {
  connectDb(process.env.MONGODB_URI as string, "GetmeaLassi");

  //   const user = await User.findOne({ username }).lean();

  //   const payments = await Payment.find({ reciever: user._id, status: true })
  //     .sort({
  //       createdAt: -1,
  //     })
  //     .lean();

  //   console.log(payments);
  //   return payments;
};

export { fetchPayments };
