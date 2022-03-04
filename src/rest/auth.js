import axios from "axios";

const registerUser = async (email, password) => {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    return await axios.post(endpoint, {
        email,
        password,
        returnSecureToken: true,
    });
};

const loginUser = async (email, password) => {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

    return await axios.post(endpoint, {
        email,
        password,
        returnSecureToken: true,
    });
};

const resetPassword = async (email) => {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

    return await axios.post(endpoint, {
        requestType: "PASSWORD_RESET",
        email: email,
    });
};

export { registerUser, loginUser, resetPassword };
