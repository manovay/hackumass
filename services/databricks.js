// handles interactrions with databricks 

const axios = require('axios');

exports.trigger = async(s3FilePath, options) =>{
    try{
        const response = await axios.post( 'https://<databricks-instance>/api/2.0/jobs/run-now', 
            {
                job_id: process.env.DATABRICKS_JOB_ID,
                notebook_params: {
                    file_path: s3FilePath,
                    options: JSON.stringify(options)
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.DATABRICKS_TOKEN}`
                }
            }

        );
    return {success: response.status ==200 };
}
catch(error){
    console.error("Error with triggering databricks,", error);
    return{success:false};
}
}