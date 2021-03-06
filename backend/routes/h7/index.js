const scrapper = require("../../scrappers/Myntra/scraper");
const router = require("express").Router();
const Job = require("../../models/Job");
const data = [];
router.get("/h7", function (req, res) {
  scrapper()
    .then((jobs) => {
      for (let i = 0; i < jobs.length && i < 20; i++) {
        const new_job = {
          Title: jobs[i].title,
          Category: jobs[i].category || null,
          DatePosted: null,
          Company: jobs[i].CompanyName,
          LinktoJobPost: jobs[i].link || null,
          JobId: null,
          Description: jobs[i].desc || null,
          Location: jobs[i].location || null,
        };
        data.push(new_job);
      }
    })
    .then((ans) => {
      const newData = new Job({
        CompanyName: "Myntra",
        DateScrap: Date.now(),
        UID: "Myntra",
        Data: data,
      });

      newData.save();
      res.redirect("/scrap/data/h8");
      console.log("Scrapped 7");
    });
});
module.exports = router;
