import axios from "axios";

export const RS_LANG_API = "https://rs-lang-74-api.herokuapp.com/";

export const rsLangApi = {
  getAllWords() {
    return axios.get(`${RS_LANG_API}words`).then((response) => {
      return response.data;
    });
  },

  login(email, password) {
    return axios
      .post(`${RS_LANG_API}signin`, {
        email: email,
        password: password,
      })
      .then((response) => {
        return response;
      })
      .catch((er) => {
        console.log("error: ", er.message);
      });
  },

  register(userName, email, password, image) {
    const formData = new FormData();
    formData.append("name", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", image);
    return axios({
      method: "post",
      url: `${RS_LANG_API}users`,
      data: formData,
    })
      .then((response) => {
        return response;
      })
      .catch((er) => {
        console.log("error: ", er.message);
      });
  },

  getStatistic(userId, token) {
    return axios
      .get(`${RS_LANG_API}users/${userId}/statistics`,{
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      })
      .then((response) => {
        return response;
      })
      .catch((er) => {
        console.log("error: ", er.message);
      });
  },

  sendStatistic(userId, token, numberOfLearnedWords, optionalObject) {
    return axios
      .put(`${RS_LANG_API}users/${userId}/statistics`,
      {
        learnedWords: numberOfLearnedWords,
        optional: optionalObject
      },
      {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      })
      .then((response) => {
        return response;
      })
      .catch((er) => {
        console.log("error: ", er.message);
      });
  },
};
