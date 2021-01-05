const router = require("express").Router();
const scrapper = require("../../scrappers/dell scraper/scraper");
const CompanyName = "Dell";
const CompanyUID = "dell_25";
const NewJobs = require("../NewJobs");
router.get("/s25", async (req, res) => {
  let data = [];
  await scrapper().then((jobs) => {
    for (let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].title || null,
        Category: jobs[i].category || null,
        DatePosted: jobs[i].date || null,
        Company: jobs[i].CompanyName,
        LinktoJobPost: jobs[i].link || null,
        JobId: null,
        Description: jobs[i].desc || null,
        Location: jobs[i].location || null,
      };
      data.push(new_job);
    }
    NewJobs(CompanyName, CompanyUID, data);
  });
});

module.exports = router;