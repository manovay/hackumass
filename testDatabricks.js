const { trigger } = require('./services/databricks');
require('dotenv').config();
(async () => {
    const s3FilePath = "sample_data.csv"; // Replace with a valid path in your S3 bucket
    const options = { remove_na: true };
    console.log("DATABRICKS_HOST:", process.env.DATABRICKS_HOST);
console.log("DATABRICKS_TOKEN:", process.env.DATABRICKS_TOKEN);
console.log("DATABRICKS_JOB_ID:", process.env.DATABRICKS_JOB_ID);
    const result = await trigger(s3FilePath, options);
    console.log("Databricks Trigger Result:", result);
})();
