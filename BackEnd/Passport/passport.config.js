import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../Models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";
export const configurePassport = async () => {
  passport.serializeUser((user, done) => {
    console.log("Serializing User");
    done(null, user.id); // Stores only user ID in session
  });
  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing User");
    try {
      const user = await User.findById(id);
      done(null, user); // Retrieves full user object from DB
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("Invalid usernmae or password ");
        }
        const validpassword = await bcrypt.compare(password, user.password);
        if (!validpassword) {
          throw new Error("Invalid username or password");
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};
