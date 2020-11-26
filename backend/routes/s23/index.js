const router = require("express").Router();
const scrapper = require("../../scrappers/cognizant Chennai scraper/scraper");
const Job = require("../../models/Job");
const data = [];

router.get("/s23", async (req, res)=> {
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
        Description: jobs[i].description || null,
        Location: jobs[i].location || null,
      };
      data.push(new_job);
    }
  })
  .then(async (ans)=>{
    const newData = await new Job({
      CompanyName: "Cognizant",
      DateScrap: Date.now(),
      UID: "cognizant_23",
      Data: data,
    });
    console.log(newData)
    
  });
});

module.exports = router;