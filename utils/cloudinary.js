const { v2 } = require("cloudinary");
const fs = require("fs");
v2.config({
  cloud_name: "dhtpfzupa",
  api_key: "862894541335844",
  api_secret: "xgTG1Ecq9kg8_TUAgblHHD4qO3A", // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log(localFilePath);
    const name = localFilePath.split("\\");
    console.log(name);
    if (!localFilePath) return null;

    const response = await v2.uploader.upload(localFilePath, {
      transformation: [
        { width: 1000, crop: "scale" },
        { quality: "auto" },
        { fetch_format: "jpg" },
        { quality: 30 },
        { background: "white" },
      ],
      resource_type: "auto",
      public_id: name[4],
    });
    console.log("file is uploaded and url is --> " + response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

// const uploadResult = await cloudinary.uploader
//   .upload(
//     "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
//     {
//       public_id: "shoes",
//     }
//   )
//   .catch((error) => {
//     console.log(error);
//   });

module.exports = {
  uploadOnCloudinary,
};
