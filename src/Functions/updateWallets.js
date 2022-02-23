const getTotalBalance = (state) => {
    let initialBalance = 0;
    state.wallets.forEach((wallet) => {
        initialBalance += getWalletBalance(wallet, state.transactions);
    });
    return initialBalance;
};

const getWalletBalance = (wallet, transactions) => {
    let initialBalance = wallet.balance;
    transactions.forEach((t) => {
        if (t.type === "income") {
            if (t.toWalletId === wallet.id) {
                initialBalance += +t.amount;
            }
        }
        if (t.type === "expense") {
            if (t.fromWalletId === wallet.id) {
                initialBalance -= +t.amount;
            }
        }
        if (t.type === "transfer") {
            if (t.toWalletId === wallet.id) {
                initialBalance += +t.amount;
            } else if (t.fromWalletId === wallet.id) {
                initialBalance -= +t.amount;
            }
        }
    });
    return initialBalance;
};

export { getTotalBalance, getWalletBalance };
