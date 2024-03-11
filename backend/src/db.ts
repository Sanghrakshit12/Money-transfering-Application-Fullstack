import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface IUser {
  userName: string;
  email: string;
  password: string;
}


const userSchema = new Schema<IUser>({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
});


const connectdb = async () => {
  try {
    await mongoose.connect(process.env.mongo_url);
    console.log("mongodb Connected");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
    return;
  }
};



const user = model("user", userSchema);

connectdb().then(() => {
  module.exports = user;
});