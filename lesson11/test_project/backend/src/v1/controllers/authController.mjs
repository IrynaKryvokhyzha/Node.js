import User from "../models/user/User.mjs";
import UsersDBService from "../models/user/UsersDBService.mjs";
import TypesDBService from "../models/type/TypesDBService.mjs";
import { prepareToken } from "../../../utils/jwtHelpers.mjs";

class AuthController {
  static async signup(req, res) {
    try {
      // const typeId = await TypesDBService.findOne(
      //   { title: "guest" },
      //   { _id: 1 }
      // );
      // console.log("typeId", typeId);

      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        //   type: typeId,
      });
      user.setPassword(req.body.password);
      const populatedUser = await user.populate("type");
      const savedUser = await user.save();
      const token = prepareToken(
        {
          id: savedUser._id,
          username: savedUser.username,
          //  type: populatedUser.type.title,
        },
        req.headers
      );
      res.status(201).json({
        result: "Signed up successfully",
        token,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({ error: "Signup error" });
    }
  }

  //   static async signup(req, res) {
  //     // Check if required fields are present
  //     if (!req.body.name) {
  //       return res.status(400).json({ error: "Name is required" });
  //     }
  //     if (!req.body.email) {
  //       return res.status(400).json({ error: "Email is required" });
  //     }
  //     if (!req.body.password) {
  //       return res.status(400).json({ error: "Password is required" });
  //     }
  //     if (!req.body.confirmPassword) {
  //       return res.status(400).json({ error: "Confirm Password is required" });
  //     }

  //     // Check if the passwords match
  //     // if (req.body.password !== req.body.confirmPassword) {
  //     //   return res.status(400).json({ error: 'Passwords do not match' });
  //     // }

  //     try {
  //       // Check if user already exists
  //       const existingUser = await UsersDBService.findOne({
  //         email: req.body.email,
  //       });
  //       if (existingUser) {
  //         return res.status(400).json({ error: "User already exists" });
  //       }

  //       // Create a new user object
  //       const newUser = {
  //         name: req.body.name,
  //         email: req.body.email,
  //         password: req.body.password, // Ideally, hash the password before storing it
  //       };

  //       // Save the new user to the database
  //       const savedUser = await UsersDBService.create(newUser);

  //       // Generate a token for the newly registered user
  //       const token = prepareToken(
  //         {
  //           id: savedUser._id,
  //           username: savedUser.username,
  //         },
  //         req.headers
  //       );

  //       // Respond with success and token
  //       res.json({
  //         result: "User created successfully",
  //         token,
  //       });
  //     } catch (err) {
  //       res.status(500).json({ error: "Error during registration" });
  //     }
  //   }

  // static async signup(req, res) {
  //   try {
  //     const user = new User({
  //       email: req.body.email,
  //       username: req.body.username,
  //     })
  //     user.setPassword(req.body.password)
  //     const savedUser = await user.save()
  //     const token = prepareToken(
  //       {
  //         id: savedUser._id,
  //         nick: savedUser.nick,
  //       },
  //       req.headers
  //     )
  //     res.status(201).json({
  //       result: 'Signed up successfully',
  //       token,
  //     })
  //   } catch (err) {
  //     res.status(500).json({ error: 'Signup error' })
  //   }
  // }

  static async login(req, res) {
    if (!req.body.email) {
      return res.status(401).json({ error: "Email is required" });
    }
    if (!req.body.password) {
      return res.status(401).json({ error: "Password is required" });
    }

    try {
      const user = await UsersDBService.findOne({
        email: req.body.email,
      });
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      if (!user.validPassword(req.body.password)) {
        return res.status(401).json({ error: "Login error" });
      }
      const token = prepareToken(
        {
          id: user._id,
          username: user.username,
        },
        req.headers
      );
      res.json({
        result: "Authorized",
        token,
      });
    } catch (err) {
      res.status(401).json({ error: "Login error" });
    }
  }
}

export default AuthController;
