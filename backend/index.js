const express = require('express');
const cors = require('cors');
const app = express();
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { executePy } = require('./executePy'); // ✅ import this

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/run", async (req, res) => {
    const { language = "cpp", code } = req.body;
    console.log(language,code.length);

    if (code===undefined) {
        return res.status(400).json({ error: "Code is required" });
    }

    try {
        const filepath = await generateFile(language, code);
        let output;

        if (language === "cpp") {
            output = await executeCpp(filepath);
        } else if (language === "py") {
            output = await executePy(filepath); 
        } else {
            return res.status(400).json({ error: "Unsupported language" });
        }

        return res.json({ filepath, output });
    } catch (err) {
        return res.status(500).json({ error: "Execution failed", details: err });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
