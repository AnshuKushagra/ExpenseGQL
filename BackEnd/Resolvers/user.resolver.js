import { Query } from "mongoose";
import { users } from "../DummyData/data.js";
const userResolver = {
  Query: {
    users: (_, __, { req, res }) => {
      return users;
    },
    user: (_, { userId }) => {
      return users.find((user) => user._id === userId);
    },
  },
  Mutation: {},
};
export default userResolver;
