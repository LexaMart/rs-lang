// https://github.com/rolling-scopes-school/react-rslang-be/wiki/%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80%D1%8B-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D0%BE%D0%B2-%D0%BA-API
import { RS_LANG_API } from './rs-lang-api';
export const getUserWord = async ({ userId, token }) => {
  const rawResponse = await fetch(
    // `https://<your-app-name>.herokuapp.com/users/${userId}/words/${wordId}`,
    `${RS_LANG_API}users/${userId}/words`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  )
    .then((res) => res)
    .catch((error) => {
      console.log('Something went wrong', error.message);
    });
  const content = await rawResponse.json();
  return content;
};

export const getUserWordID = async ({ token, wordId }) => {
  const rawResponse = await fetch(
    // `https://<your-app-name>.herokuapp.com/words/{id}`,

    `${RS_LANG_API}words/${wordId}`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  )
    .then((res) => res)
    .catch((error) => {
      console.log('Something went wrong', error.message);
    });
  const content = await rawResponse.json();
  return content;
};

export const getWords = async (token, userId, words) => {
  const result = {
    learn: [],
    hard: [],
    deleted: [],
  };
  await getUserWord({
    token: token,
    userId: userId,
  })
    .then((res) => {
      const arrLearnWords = words.learn
        ? res
            .filter((item) => item.difficulty === 'learned')
            .map((item) => item.wordId)
        : [];
      const arrHardWords = words.hard
        ? res
            .filter((item) => item.difficulty === 'hard')
            .map((item) => item.wordId)
        : [];
      const arrDelWords = words.deleted
        ? res
            .filter((item) => item.difficulty === 'deleted')
            .map((item) => item.wordId)
        : [];

      result.learn.push(...arrLearnWords);
      result.hard.push(...arrHardWords);
      result.deleted.push(...arrDelWords);
    })
    .catch((error) => {
      console.log('Something went wrong', error.message);
    });

  return result;
};
