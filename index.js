const { default: axios } = require("axios");
const { CronJob } = require("cron");
const rwClient = require("./twitterClient.js");

const tweet = async () => {
  const { data } = await axios.get(
    "https://api.quotable.io/random?tag=technology"
  );
  var quote = data.content;
  try {
    await rwClient.v2.tweet(quote);
  } catch (error) {
    console.log(error);
  }
  console.log(`${quote} posted`);
};

const job = new CronJob("31 * * * *", () => {
  tweet();
});

job.start();
