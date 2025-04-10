const transactionTypeDef = `#graphql
    type Transaction{
        _id:ID!
        userId:ID!
        description:String!
        paymentType:String!
        category:String!
        amount:Float!
        location:String
        date:String!
    }
    type Query{
        transactions:[Transaction!]
        transaction(transactionId:ID!):Transaction
        # TODO=>ADD CATEGORY STATISTICS QUERY
        categoryStatistics:[categoryStatistics!]
    }
    type Mutation{
        createTransaction(input:CreateTransactionInput!):Transaction!
        updateTransaction(input:updateTransactionInput!):Transaction!
        deleteTransaction(transactionId:ID!):Transaction!
    }
    type categoryStatistics{
        category:String!
        totalAmount:Float!
    }
    input CreateTransactionInput{
        description:String!
        paymentType:String!
        category:String!
        amount:Float!
        date:String!
        location:String
    }
    input updateTransactionInput{
        transactionId:ID!
        description:String
        paymentType:String
        category:String
        amount:Float
        date:String
        location:String
    }
`;
export default transactionTypeDef;
