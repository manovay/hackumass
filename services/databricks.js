// handles interactrions with databricks 

const axios = require('axios');

exports.trigger = async(s3FilePath, options) =>{
    const url = `${process.env.DATABRICKS_HOST}/api/2.0/jobs/run-now`;
    const headers = {
        Authorization: `Bearer ${process.env.DATABRICKS_TOKEN}`,
        'Content-Type': 'application/json'
    };

    const data = {
        job_id: process.env.DATABRICKS_JOB_ID,
        notebook_params: {file_path: s3FilePath,options: JSON.stringify(options)
        }
    };

    try {
        const response = await axios.post(url, data, { headers });
        return { success: true, runId: response.data.run_id };
        
    } 
    
    catch (error) {
        console.error("Error triggering Databricks job:", error);
        return { success: false, error };
    }
};