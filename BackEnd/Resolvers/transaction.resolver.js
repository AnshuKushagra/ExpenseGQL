import Transaction from "../Models/transaction.model.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) {
          throw new Error("Unauthorized");
        }
        const userId = await context.getUser()._id;
        const transaction = await Transaction.find({ userId });
        return transaction;
      } catch (error) {
        console.error("Error getting transactions:", error);
        throw new Error("Error getting transactions");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        // const transaction = await Transaction.findById({
        //   // _id: new mongoose.Types.ObjectId(transactionId),
        // });
        const transaction = await Transaction.findById(
          new ObjectId(transactionId)
        );
        console.log(transaction);
        return transaction;
      } catch (error) {
        console.error("Error getting transaction:", error);
        throw new Error(error.message || "Error getting transaction");
      }
    },
    //  TODO=>ADD CATEGORY STATISTICS QUERY
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.error("Error creating transactions:", error);
        throw new Error("Error creating transactions");
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updatedTransaction;
      } catch (error) {
        console.error("Error updating transactions:", error);
        throw new Error("Error updating transactions");
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deletedTransaction;
      } catch (error) {
        console.error("Error deleting transactions:", error);
        throw new Error("Error deleting transactions");
      }
    },
  },
  // TODO=>ADD TRANSACTION/USER RELATIONSHIP
};
export default transactionResolver;
