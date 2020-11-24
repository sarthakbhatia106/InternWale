const scrapper = require("../../scrappers/WellsFargo/scraper");
const router = require("express").Router();
const Job = require("../../models/Job");
const data = [];
router.get("/h21", function (req, res) {
  scrapper().then((jobs) => {
    for (let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].title,
        Category: jobs[i].category || null,
        DatePosted: jobs[i].date || null,
        Company: jobs[i].CompanyName,
        LinkToJobPost: jobs[i].link || null,
        JobId: null,
        Description: jobs[i].desc || null,
        Location: jobs[i].location || null,
      };
      data.push(new_job);
    }
  }).then((ans) => {
  const newData = new Job({
    CompanyName: "WellsFargo",
    DateScrap: Date.now(),
    UID: "WellsFargo_1",
    Data: data,
  });

  newData.save();
  res.redirect('/scrap/data/h22');
      console.log("Scrapped 21");
});
});
module.exports = router;