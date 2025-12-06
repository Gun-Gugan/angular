const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');                     
const Application = require('../models/Applications');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);                       
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'image-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const apps = await Application.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', upload.array('images', 10), async (req, res) => {
  const imagePaths = req.files?.map(f => `/uploads/${f.filename}`) || [];

  const appData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
    images: imagePaths
  };

  try {
    const newApp = await Application.create(appData);
    res.status(201).json(newApp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', upload.array('images', 10), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files?.length) {
      updateData.images = req.files.map(f => `/uploads/${f.filename}`);
    }

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;