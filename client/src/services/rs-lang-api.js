import axios from "axios";

export const RS_LANG_API = "https://rs-lang-74-api.herokuapp.com/";

export const rsLangApi = {
  getAllWords() {
    return axios.get(`${RS_LANG_API}words`).then((response) => {
      return response.data;
    });
  },

  getPageOfWords(page, group) {
    return axios.get(`${RS_LANG_API}words?group=${group}&page=${page}`).then((response) => {
      return response.data
    });
  },

  removeUserDeleted(token, userId, wordId) {
    return axios
      .delete(`${RS_LANG_API}users/${userId}/words/${wordId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
  },

  postUserWord(token, userId, wordId, difficult) {
    return axios
      .post(`${RS_LANG_API}users/${userId}/words/${wordId}`, {
        "difficulty": `${difficult}`
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
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
};
