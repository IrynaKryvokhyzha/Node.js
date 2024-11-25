import PostsDBService from "../models/post/PostsDBService.mjs";
import TypesDBService from "../models/type/TypesDBService.mjs";
import UsersDBService from "../models/user/UsersDBService.mjs";
import { validationResult } from "express-validator";

class PostsController {
  static async getList(req, res) {
    try {
      const filters = {};
      for (const key in req.query) {
        if (req.query[key]) filters[key] = req.query[key];
      }
      const usersList = await UsersDBService.getList({});
      const dataList = await PostsDBService.getList(filters);
      dataList.forEach((item, ind, arr) => {
        arr[ind].authors = item.authors.map((author) => author.name).join(",");
      });
      res.render("postsList", {
        pageTitle: "Posts title",
        headerTitle: "Posts list",
        posts: dataList,
        users: usersList,
        addNewRoute: "/posts/register",
        editLinkBase: "/posts/register",
        deletePostRoute: "/posts",
        addCommentBase: "/posts/comments",
        deleteCommentRoute: "/posts/comments",
      });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }

  static async registerForm(req, res) {
    try {
      const id = req.params.id;
      let dataItem = {};
      if (id) {
        dataItem = await PostsDBService.getById(id);
      }
      const usersList = await UsersDBService.getList({});
      //відредерити сторінку з формою
      res.render("general/generalEditForm", {
        pageTitle: "Post form",
        headerTitle: "Register form",
        fields: [
          { name: "post", type: "text", required: true, label: "Пост" },
          { name: "img", type: "file", label: "Лого" },
          {
            name: "authors",
            type: "select",
            required: true,
            label: "Автори",
            multiple: true,
            options: usersList,
          },
        ],
        initialValues: dataItem,
        errors: [],
        submitUrl: "/posts/register" + (id ? `/${id}` : ""),
        redirectUrl: "/posts",
        // data: user,
        // types,
      });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }

  static async register(req, res) {
    // Якщо валідація пройшла успішно, виконуємо логіку реєстрації
    const errors = validationResult(req);
    const data = req.body;
    const usersList = await UsersDBService.getList({});
    if (!errors.isEmpty()) {
      if (req.params.id) data.id = req.params.id;
      return res.status(400).render("general/generalEditForm", {
        pageTitle: "Post form",
        headerTitle: "Register form",
        fields: [
          { name: "post", type: "text", required: true, label: "Пост" },
          { name: "img", type: "file", label: "Лого" },
          {
            name: "authors",
            type: "select",
            required: true,
            label: "Автори",
            multiple: true,
            options: usersList,
          },
        ],
        initialValues: data,
        errors: errors.array(),
        submitUrl: "/posts/register",
        redirectUrl: "/posts",
      });
    }

    try {
      const dataObj = req.body;
      // const { title } = req.body
      // const dataObj = { title }
      if (req.params.id) {
        // Оновлюємо дані про користувача в базі даних
        await PostsDBService.update(req.params.id, dataObj);
      } else {
        // Додаємо користувача в базу даних
        await PostsDBService.create(dataObj);
      }
      res.redirect("/types");
    } catch (error) {
      res.status(500).render("general/generalEditForm", {
        pageTitle: "Type form",
        headerTitle: "Register form",
        fields: [
          { name: "post", type: "text", required: true, label: "Пост" },
          { name: "img", type: "file", label: "Лого" },
          {
            name: "authors",
            type: "select",
            required: true,
            label: "Автори",
            multiple: true,
            options: usersList,
          },
        ],
        initialValues: data,
        errors: [{ msg: err.message }],
        submitUrl: "/types/register",
        redirectUrl: "/types",
      });
    }
  }
  static async delete(req, res) {
    try {
      await PostsDBService.deleteById(req.body.id);
      res.json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete user" });
    }
  }

  //---- comments----------
  // Метод для створення коментаря

  static async createComment(req, res) {
    try {
      const post = await PostsDBService.getById(req.params.postId);
      if (!post) {
        throw new Error("Post not found");
      }
      const { commenter, commentText } = req.body;
      const newComment = { commenter, commentText };
      post.comments.push(newComment);
      await post.save();
      // res.json({ success: true })
      res.redirect("/posts");
    } catch (error) {
      throw new Error("Error creating comment: " + error.message);
    }
  }

  // Метод для видалення коментаря
  static async deleteComment(req, res) {
    try {
      const post = await PostsDBService.getById(req.params.postId);
      if (!post) {
        throw new Error("Post not found");
      }
      post.comments = post.comments.filter(
        (comment) => comment._id.toString() !== req.body.id
      );
      await post.save();
      // res.json({ success: true })
      res.redirect("/posts");
    } catch (error) {
      throw new Error("Error deleting comment: " + error.message);
    }
  }
}
export default PostsController;
