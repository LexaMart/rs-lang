import axios from "axios";

export const RS_LANG_API = "https://rs-lang-api.herokuapp.com/";

export const rsLangApi = {
  getAllWords() {
    return axios.get(`${RS_LANG_API}words`).then((response) => {
      return response.data;
    });
  },

  login(email, password) {
    return axios
      .get(`${RS_LANG_API}users`, {
        email: email,
        password: password,
      })
      .then((response) => {
        return response.data;
      })
      .catch((er) => {
        console.log("error: ", er.message);
      });
  },

  register(userName, email, password, image) {
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("image", image);
    }
    return axios({
      method: "post",
      url: `${RS_LANG_API}users`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        return response.data;
      })
      .catch((er) => {
        console.log("error: ", er.message);
      });
  },
};
