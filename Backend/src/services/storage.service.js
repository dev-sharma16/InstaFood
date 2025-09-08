const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file){
    try {
        const response = await imagekit.upload({
            file: file.buffer,          
            fileName: file.originalname, 
            folder: "InstaFood"
        });
        return {
            success: true,
            fileId: response.fileId,
            name: response.name,
            url: response.url
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }

}

module.exports = {
    uploadFile
}