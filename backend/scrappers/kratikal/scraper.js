const puppeteer = require('puppeteer');

async function scraper (){
    const extractJobs= async(url)=>{
        const page = await browser.newPage();
        
        await page.goto(url,{waitUntil:"networkidle2"});
        
        let jobData = await page.evaluate(() => {
          let jobs = [];
          
          let jobElms = document.querySelectorAll('div.careers-card');
          
          jobElms.forEach((job) => {
              let jobJson = {};
              try {
                jobJson.name = job.querySelector('h3').innerText;
                jobJson.location = job.querySelector('h4').innerText.trim();
                jobJson.type=job.querySelector('div.btn-tag').innerText.trim();
                
                jobJson.link="https://www.kratikal.com/careers.php"
                }
              catch (exception){
      
              }
              jobs.push(jobJson);
            });
          return jobs;
        });
        return jobData;        
        
      }
    
    
      const browser = await puppeteer.launch();
      
      const url="https://www.kratikal.com/careers.php"
    
      const jobData= await extractJobs(url)
      if(jobData.length==0){
          console.log("No jobs available");
      }
      else{
          console.log(jobData)
      }
        

      await browser.close();
}

module.exports=scraper;