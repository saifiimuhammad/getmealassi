import mongoose from "mongoose";

const connectDb = (uri: string, dbName: string): void => {
  mongoose
    .connect(uri, { dbName })
    .then((data) => {
      console.log(`Connected to db: ${data.connection.host}`);
    })
    .catch((err) => {
      throw err;
    });
};

export { connectDb };
