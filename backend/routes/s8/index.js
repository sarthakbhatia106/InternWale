const router = require("express").Router();
const scrapper = require("../../scrappers/Deutsche Bank/scrapperDeutscheBank");
const Job = require("../../models/Job");
const data = [];

router.get("/s8", async (req, res)=> {
  let data = [];
  await scrapper().then((jobs) => {
    for(let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].nameOfJob || null,
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
      CompanyName: "Deutsche Bank",
      DateScrap: Date.now(),
      UID: "deutscheBank_8",
      Data: data,
    });
    await newData.save();

    // console.log(newData)
    res.redirect('/scrap/data/s9');
    console.log("Scrapped 8");
  });
});

module.exports = router;
