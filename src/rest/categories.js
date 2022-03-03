import axios from "axios";

const addCategory = async (category, token, userId) => {
    const endpoint = `https://financepro-4ff68-default-rtdb.europe-west1.firebasedatabase.app/categories.json?auth=${token}`;

    return await axios.post(endpoint, {
        ...category,
        userId,
    });
};

export { addCategory };
