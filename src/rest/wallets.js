import axios from "axios";

const getUserWallets = async (token, userId) => {
    const endpoint = `https://financepro-4ff68-default-rtdb.europe-west1.firebasedatabase.app/wallets.json?orderBy="userId"&equalTo="${userId}"&auth=${token}&print=pretty`;
    let result = await axios.get(endpoint);

    let resultArray = Object.entries(result.data);

    let wallets = [];
    resultArray.map((item) =>
        wallets.push({
            id: item[0],
            ...item[1],
        })
    );

    return wallets;
};

const addWallet = async (wallet, token, userId) => {
    const endpoint = `https://financepro-4ff68-default-rtdb.europe-west1.firebasedatabase.app/wallets.json?auth=${token}`;

    return await axios.post(endpoint, {
        ...wallet,
        userId,
    });
};

const deleteWallet = async (walletId, token) => {
    const endpoint = `https://financepro-4ff68-default-rtdb.europe-west1.firebasedatabase.app/wallets/${walletId}.json?auth=${token}`;

    return await axios.delete(endpoint);
};

const editWallet = async (wallet, walletId, token) => {
    const endpoint = `https://financepro-4ff68-default-rtdb.europe-west1.firebasedatabase.app/wallets/${walletId}.json?auth=${token}`;

    return await axios.put(endpoint, {
        ...wallet,
    });
};

export { addWallet, deleteWallet, editWallet, getUserWallets };
