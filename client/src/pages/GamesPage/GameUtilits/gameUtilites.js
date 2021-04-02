const sendStatistic = async (isAuthenticated, userId, token) => {
    if (isAuthenticated) {
      const statistics = await request(
        `${urls.API}/users/${userId}/statistics`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      );
      let now = moment().format("DD-MM-YYYY");
      const optionalObject = statistics.optional || {};
      const updatedLearnedWords = statistics.learnedWords + numberOfLearnedWords;
      if (!optionalObject[now]) {
        optionalObject[now] = {
          date: now,
          learnedWords: numberOfLearnedWords,
          correctAnswers: numberOfLearnedWords,
          incorrectAnswers: 5 - livesArray.length,
        };
      } else
        optionalObject[now] = {
          date: now,
          learnedWords: updatedLearnedWords,
          correctAnswers:
            optionalObject[now].correctAnswers + numberOfLearnedWords,
          incorrectAnswers:
            optionalObject[now].incorrectAnswers + 5 - livesArray.length,
        };
      const statistics2 = await request(
        `${urls.API}/users/${userId}/statistics`,
        "PUT",
        {
          learnedWords: updatedLearnedWords,
          optional: optionalObject,
        },
        {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      );
      console.log(statistics);
      console.log(statistics2);
    }
  };