import axios from "axios";

const addCategory = async (category, token, userId) => {
    const endpoint = `https://financepro-4ff68-default-rtdb.europe-west1.firebasedatabase.app/categories.json?auth=${token}`;

    return await axios.post(endpoint, {
        ...category,
        userId,
    });
};

const deleteCategory = async (categoryId, token) => {
    const endpoint = `https://financepro-4ff68-default-rtdb.europe-west1.firebasedatabase.app/categories/${categoryId}.json?auth=${token}`;

    return await axios.delete(endpoint);
};

const editCategory = async (category, categoryId, token) => {
    const endpoint = `https://financepro-4ff68-default-rtdb.europe-west1.firebasedatabase.app/categories/${categoryId}.json?auth=${token}`;

    return await axios.put(endpoint, {
        ...category,
    });
};

const getUserCategories = async (token, userId) => {
    const endpoint = `https://financepro-4ff68-default-rtdb.europe-west1.firebasedatabase.app/categories.json?orderBy="userId"&equalTo="${userId}"&auth=${token}&print=pretty`;
    let result = await axios.get(endpoint);

    let resultArray = Object.entries(result.data);

    let categories = [];
    resultArray.map((item) =>
        categories.push({
            id: item[0],
            ...item[1],
        })
    );

    return categories;
};

export { addCategory, deleteCategory, editCategory, getUserCategories };
