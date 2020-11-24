//import the route in the folder adummy1 here.
const scrapper = require("../../scrappers/kpmg scraper/scraper");
const Job = require("../../models/Job");
const data = [];
router.get("/h1", function (req, res) {
  scrapper().then((jobs) => {
    for (let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].title,
        Category: null,
        DatePosted: jobs[i].date,
        Company: jobs[i].companyName,
        LinkToJobPosted: jobs[i].Url,
        JobId: null,
        Description: null,
        Location: jobs[i].location,
      };
      data.push(new_job);
    }
  });
  const newData = new Job({
    CompanyName: "KPMG",
    DateScrap: Date.now(),
    UID: "kpmg_1",
    Data: data,
  });

  newData.save();
});
