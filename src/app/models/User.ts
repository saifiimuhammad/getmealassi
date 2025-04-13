import mongoose, { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    tagline: {
      type: String,
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    banner: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    stripeInfo: {
      secretKey: {
        type: String,
      },
      publishableKey: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || model("User", schema);
