const router = require("express").Router();
const scrapper = require("../../scrappers/Ever Data/scraper");
const Job = require("../../models/Job");
const data = [];

router.get("/s9", async (req, res)=> {
  let data = [];
  await scrapper().then((jobs) => {
    for(let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].name || null,
        Category: jobs[i].sector || null,
        DatePosted: jobs[i].publishedDate || null,
        Company: jobs[i].company,
        LinktoJobPost: jobs[i].link || null,
        JobId: null,
        Description: jobs[i].desc || null,
        Location: jobs[i].location || null,
      };
      data.push(new_job);
    }
  })
  .then(async (ans)=>{
    const newData = await new Job({
      CompanyName: "Ever Data",
      DateScrap: Date.now(),
      UID: "everData_9",
      Data: data,
    });
    await newData.save();

    // console.log(newData)
    res.redirect('/scrap/data/s10');
    console.log("Scrapped 9");
  });
});

module.exports = router;
