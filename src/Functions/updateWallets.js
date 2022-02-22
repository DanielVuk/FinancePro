const updateWallets = (transaction, action, state, prevTrans = null) => {
    console.log(state);
    let newWallets = [...state.wallets];

    let toWalletIndex = state.wallets.findIndex(
        (item) => item.id === transaction.toWalletId
    );

    let fromWalletIndex = state.wallets.findIndex(
        (item) => item.id === transaction.fromWalletId
    );

    if (action === "add") {
        if (transaction.type === "income") {
            newWallets[toWalletIndex].balance += +transaction.amount;
        }
        if (transaction.type === "expense") {
            newWallets[fromWalletIndex].balance -= +transaction.amount;
        }
        if (transaction.type === "transfer") {
            newWallets[toWalletIndex].balance += +transaction.amount;
            newWallets[fromWalletIndex].balance -= +transaction.amount;
        }
    } else if (action === "delete") {
        if (transaction.type === "income") {
            newWallets[toWalletIndex].balance -= +transaction.amount;
        }
        if (transaction.type === "expense") {
            newWallets[fromWalletIndex].balance += +transaction.amount;
        }
        if (transaction.type === "transfer") {
            newWallets[toWalletIndex].balance -= +transaction.amount;
            newWallets[fromWalletIndex].balance += +transaction.amount;
        }
    } else if (action === "edit") {
        if (prevTrans.type === "income") {
            newWallets[toWalletIndex].balance -= +prevTrans.amount;
        }
        if (prevTrans.type === "expense") {
            newWallets[fromWalletIndex].balance += +prevTrans.amount;
        }
        if (prevTrans.type === "transfer") {
            newWallets[toWalletIndex].balance -= +prevTrans.amount;
            newWallets[fromWalletIndex].balance += +prevTrans.amount;
        }

        if (transaction.type === "income") {
            newWallets[toWalletIndex].balance += +transaction.amount;
        }
        if (transaction.type === "expense") {
            newWallets[fromWalletIndex].balance -= +transaction.amount;
        }
        if (transaction.type === "transfer") {
            newWallets[toWalletIndex].balance += +transaction.amount;
            newWallets[fromWalletIndex].balance -= +transaction.amount;
        }
    }
    return newWallets;
};

// const getWalletBalance = ({wallet, transactions}) =>{
//     let initialBalance = wallet.balance;

//     return 0;
// }

// const getAllWalletsBalance = ({state}) =>{
//     let initialBalance = 0

//     state.wallets.forEach(wallet => {
//         initialBalance += getWalletBalance(wallet, state.transactions);
//     });

//     return initialBalance;
// }

export default updateWallets;
