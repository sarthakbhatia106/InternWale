const puppeteer = require("puppeteer");

async function scraper() {
  const extractJobs = async (url) => {
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    let jobData = await page.evaluate(() => {
      let jobs = [];

      let jobElms = document.querySelectorAll("tr.data-row.clickable");

      jobElms.forEach((job) => {
        let jobJson = {};
        try {
          jobJson.title = job.querySelector(
            "span.jobTitle.hidden-phone"
          ).innerText;
          jobJson.location = job
            .querySelector("td.colLocation.hidden-phone span")
            .innerText.trim();
          jobJson.date = job
            .querySelector("span.jobDate.visible-phone")
            .innerText.trim();

          var link = job.querySelector("span.jobTitle.hidden-phone a");
          jobJson.link = "https://careers.airvistara.com/".concat(
            link.getAttribute("href")
          );
        } catch (exception) {}
        jobs.push({ CompanyName: "Air Vistara", ...jobJson });
      });
      return jobs;
    });
    return jobData;
  };

  const browser = await puppeteer.launch();

  const url =
    "https://careers.airvistara.com/go/Engineering/536844/?_ga=2.241028171.958309201.1605791820-778143022.1605791820";

  const jobData = await extractJobs(url);
  if (jobData.length == 0) {
    console.log("No jobs available");
  }

  await browser.close();
  return jobData;
}

module.exports = scraper;
