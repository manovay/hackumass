// Upload file to S3, trigger DataBricks, retrieve cleaned data
const {uploads3, downloads3 } = require ('../services/s3');
const {trigger} = require('../services/databricks');
let latestFilePath = null; 


exports.uploadFile = async (req, res) =>{
    const file = req.file;
    const selectedOptions = JSON.parse(req.body.selectedOptions);

    try{
        const S3FilePath = await uploads3(file);
        console.log("File uploaded to S3:", S3FilePath);
        const databricksResponse = await trigger(S3FilePath, selectedOptions);

        if(databricksResponse.success){
            console.log("databricks has recieved file. ");
            latestFilePath = S3FilePath;
            res.json({message: 'File is being processed'});
        }
        else{
            res.status(500).json({message:' Failed with connecting to Databricks'});

        }
    }
    catch(error)
{
    console.error("Error uploading or processing file with s3, databaricks", error);
    res.status(500).json({message: 'an error occurred'});

}};


exports.getCleanedData = async (req, res) => {
    const maxAttempts = 10; // Maximum polling attempts
    const pollInterval = 3000; // Polling interval in milliseconds (3 seconds)
  
    let attempts = 0;
  
    const checkForFile = async () => {
      try {
        if (latestFilePath) { 
          console.log("retrieving file");
          const processedFilename = latestFilePath.replace("uploads/", "processed/");
          const cleanedURL = await downloads3(processedFilename);
          console.log("download link acquired");
          console.log("Download Link:", cleanedURL)
          latestFilePath = null; // Reset for next upload
          res.json({ cleanedURL }); 
        } else {
          attempts++;
          if (attempts < maxAttempts) {
            console.log(`File not ready, attempt ${attempts}, trying again in ${pollInterval / 1000} seconds...`);
            setTimeout(checkForFile, pollInterval); // Retry after the interval
          } else {
            console.error("Error: Max polling attempts reached.");
            res.status(500).json({ message: "File processing timed out. Please try again later." });
          }
        }
      } catch (error) {
        console.error("Error with retrieving cleaned data", error);
        res.status(500).json({ message: "Error retrieving cleaned file" });
      }
    };
  
    checkForFile(); // Start the polling process
  };