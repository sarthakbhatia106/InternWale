const scrapper = require("../../scrappers/Samsung/scraper");
const router = require("express").Router();
const Job = require("../../models/Job");
const data = [];
router.get("/h13", function (req, res) {
  scrapper()
    .then((jobs) => {
      for (let i = 0; i < jobs.length && i < 20; i++) {
        const new_job = {
          Title: jobs[i].title,
          Category: null,
          DatePosted: jobs[i].date || null,
          Company: jobs[i].CompanyName,
          LinktoJobPost: jobs[i].link,
          JobId: null,
          Description: null,
          Location: jobs[i].location,
        };
        data.push(new_job);
      }
    })
    .then((ans) => {
      const newData = new Job({
        CompanyName: "Samsung",
        DateScrap: Date.now(),
        UID: "Samsung_1",
        Data: data,
      });

      newData.save();
      res.redirect("/scrap/data/h14");
      console.log("Scrapped 13");
    });
});
module.exports = router;
