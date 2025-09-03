const express = require('express');
const multer = require('multer');
const fs = require('fs');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(express.json());

// API endpoint
app.post('/generate', upload.single('template'), (req, res) => {
    try {
        const filePath = req.file.path;
        const template = fs.readFileSync(filePath, 'binary');
        const zip = new PizZip(template);
        const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

        const data = req.body; // JSON with placeholder replacements
        doc.render(data);

        const buf = doc.getZip().generate({ type: 'nodebuffer' });

        // Set response headers to download file
        res.setHeader('Content-Disposition', 'attachment; filename=output.docx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.send(buf);

        // Cleanup uploaded template
        fs.unlinkSync(filePath);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
app.post('/generate-json', (req, res) => {
  try {
    const { fileBase64, data } = req.body;

    const template = Buffer.from(fileBase64, 'base64').toString('binary');
    const zip = new PizZip(template);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

    doc.render(data);

    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    const fileBase64Out = buf.toString('base64');

    res.json({ fileBase64: fileBase64Out });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Word merge API running on port ${PORT}`);
});
