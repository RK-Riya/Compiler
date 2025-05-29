const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    const command = `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && "./${jobId}.out"`;
    exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
      if (error) {
        return reject({ error: error.message, stderr });
      }
      if (stderr) {
        console.warn("stderr:", stderr);
      }
      resolve(stdout);
    });
  });
};

module.exports = {
  executeCpp,
};
