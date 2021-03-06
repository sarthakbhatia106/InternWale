const mongoose = require("mongoose");

const job_Data = new mongoose.Schema({
  CompanyName: {
    type: String,
  },
  DateScrap: {
    type: String,
    default: Date.now(),
  },
  UID: {
    type: String,
  },
  Data: [
    {
      Title: {
        type: String,
      },
      Category: {
        type: String,
      },
      DatePosted: {
        type: String,
      },
      Company: {
        type: String,
      },
      LinktoJobPost: {
        type: String,
      },
      JobId: {
        type: String,
      },
      Description: {
        type: String,
      },
      Location: {
        type: String,
      },
    },
  ],
});

module.exports = JobData = mongoose.model("JobData", job_Data);
