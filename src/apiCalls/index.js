import axios from "axios";

export const postSignUp = async (data) => {
    const response = await axios({
        method: "POST",
        url: " https://webla-api.uc.r.appspot.com/api/v1/users/register",
        data: data,
        headers: {},
        params: {}

    })
    return response;
}
export const postLogin = async (data) => {
    return await axios({
        method: "POST",
        url: "https://webla-api.uc.r.appspot.com/api/v1/users/login",
        data: data,
        params: {},
        headers: {}
    })

}
export const loadProducts = async () => {
    const token = localStorage.getItem("ECOMM_TOKEN");
    return await axios({
        method: "GET",
        url: ' https://webla-api.uc.r.appspot.com/api/v1/products',
        headers: {
            " X-Authorization": `Bearer ${token}`

        },

    })
}