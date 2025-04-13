import mongoose, { Schema, model } from "mongoose";

const schema = new Schema(
  {
    paymentId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
    reciever: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.models.Payment || model("Payment", schema);
