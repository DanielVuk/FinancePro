import axios from "axios";

const addTransaction = async (transaction, token, userId) => {
    const endpoint = `https://financepro-4ff68-default-rtdb.europe-west1.firebasedatabase.app/transactions.json?auth=${token}`;

    return await axios.post(endpoint, {
        ...transaction,
        userId,
    });
};

const deleteTransaction = async (transactionId, token) => {
    const endpoint = `https://financepro-4ff68-default-rtdb.europe-west1.firebasedatabase.app/transactions/${transactionId}.json?auth=${token}`;

    return await axios.delete(endpoint);
};

const editTransaction = async (transaction, transactionId, token) => {
    const endpoint = `https://financepro-4ff68-default-rtdb.europe-west1.firebasedatabase.app/transactions/${transactionId}.json?auth=${token}`;

    return await axios.put(endpoint, {
        ...transaction,
    });
};

const getUserTransactions = async (token, userId) => {
    const endpoint = `https://financepro-4ff68-default-rtdb.europe-west1.firebasedatabase.app/transactions.json?orderBy="userId"&equalTo="${userId}"&auth=${token}&print=pretty`;
    let result = await axios.get(endpoint);

    let resultArray = Object.entries(result.data);

    let transactions = [];
    resultArray.map((item) =>
        transactions.push({
            id: item[0],
            ...item[1],
        })
    );

    return transactions;
};

export {
    addTransaction,
    deleteTransaction,
    editTransaction,
    getUserTransactions,
};
