const express = require('express');
const multer = require('multer');
const fs = require('fs');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(express.json({ limit: '10mb' }));

// multipart endpoint
app.post('/generate', upload.single('template'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'template file is required' });
  try {
    const filePath = req.file.path;
    const template = fs.readFileSync(filePath, 'binary');
    const zip = new PizZip(template);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

    const data = req.body;
    doc.render(data);

    const buf = doc.getZip().generate({ type: 'nodebuffer' });

    res.setHeader('Content-Disposition', 'attachment; filename=output.docx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.send(buf);
  } catch (error) {
    if (error.properties && error.properties.errors) {
      console.error('Docxtemplater errors:', JSON.stringify(error.properties.errors, null, 2));
    } else {
      console.error(error);
    }
    res.status(500).send({ error: error.message });
  } finally {
    if (req.file) fs.unlink(req.file.path, ()=>{});
  }
});

// json+base64 endpoint
app.post('/generate-json', (req, res) => {
  const { fileBase64, data } = req.body;
  if (!fileBase64 || !data) return res.status(400).json({ error: 'fileBase64 and data are required' });
  try {
    const template = Buffer.from(fileBase64, 'base64').toString('binary');
    const zip = new PizZip(template);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

    doc.render(data);

    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    res.json({ fileBase64: buf.toString('base64') });
  } catch (error) {
    if (error.properties && error.properties.errors) {
      console.error('Docxtemplater errors:', JSON.stringify(error.properties.errors, null, 2));
    } else {
      console.error(error);
    }
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Word merge API running on port ${PORT}`));
