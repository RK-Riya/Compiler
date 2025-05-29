const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes");

// Create the "codes" directory if it doesn't exist
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
    const jobId = uuid();
    const filename = `${jobId}.${format}`;
    const filepath = path.join(dirCodes, filename);
    
    // Write the code content to the file
    await fs.promises.writeFile(filepath, content);
    
    return filepath;
};

module.exports = {
    generateFile,
};
