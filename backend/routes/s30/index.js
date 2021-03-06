const router = require("express").Router();
const scrapper = require("../../scrappers/jp Morgan/scraper");
const Job = require("../../models/Job");
const data = [];

router.get("/s30", async (req, res)=> {
  let data = [];
  await scrapper().then((jobs) => {
    for(let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].name || null,
        Category: jobs[i].type || null,
        DatePosted: jobs[i].publishedDate || null,
        Company: jobs[i].company,
        LinktoJobPost: jobs[i].link || null,
        JobId: null,
        Description: jobs[i].description || null,
        Location: jobs[i].location || null,
      };
      data.push(new_job);
    }
  })
  .then(async (ans)=>{
    const newData = await new Job({
      CompanyName: "JP Morgan",
      DateScrap: Date.now(),
      UID: "jpMorgan_30",
      Data: data,
    });
    await newData.save();

    console.log("Scrapped 30-----------------------------------DONE---------------------------------");
    res.send('Done');
    // console.log(newData)
    
  });
});

module.exports = router;
