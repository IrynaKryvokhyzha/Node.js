import mongoose from "mongoose";
const { Schema } = mongoose;

// Cxема для коментарів
const commentSchema = new Schema({
  commenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  commentText: { type: String, required: true },
});

// Створення основної схеми для посту
const postSchema = new Schema({
  post: {
    type: String,
    required: true,
  },
  img: {
    type: String, //тут зберігаємо саме зображення base64(так зберіг іконки,логотипи,превю до товара), а не шлях до нього
  },
  authors: [
    //(це масив із id)
    {
      type: mongoose.Schema.Types.ObjectId, //зберіг id
      ref: "User",
      required: true,
    },
  ],
  comments: [commentSchema],
});

// Створення моделі з використанням схеми посту const
const Post = mongoose.model("Post", postSchema);
export default Post;
