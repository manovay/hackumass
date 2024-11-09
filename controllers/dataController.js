// Upload file to S3, trigger DataBricks, retrieve cleaned data
const {uploads3, downloads3 } = require ('../services/s3');
//const {trigger} = require('../services/databricks');


exports.uploadFile = async (req, res) =>{
    const file = req.file;
    const selectedOptions = JSON.parse(req.body.selectedOptions);

    try{
        const S3FilePath = await uploads3(file);
        console.log("File uploaded to S3:", S3FilePath);
        // const databricksResponse = await trigger(S3FilePath, selectedOptions);

        // if(databricksResponse.success){
        //     res.json({message: 'File is being processed'})
        // }
        // else{
        //     res.status(500).json({message:' Failed with connecting to Databricks'});

        // }
        res.json({message: 'File is uploaded', filePath: S3FilePath });
    } 
    catch(error)
{
    console.error("Error uploading or processing file with s3, databaricks", error);
    res.status(500).json({message: 'an error occurred'});

}};
exports.getCleanedData = async (req,res) => {
    try{
        const cleanedURL = await downloads3(req.params.filename);
        res.json({cleanedURL});
    } catch(error)
{
    console.error("Error with retrieving cleaned data", error);
    res.status(500).json({message: "Error retrieving cleaned file"});
}}