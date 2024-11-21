import mongoose from "mongoose";

const { Schema } = mongoose;

const typeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Type is required"],
    trim: true,
  },
});
const Type = mongoose.model("Type", typeSchema);
export default Type;
