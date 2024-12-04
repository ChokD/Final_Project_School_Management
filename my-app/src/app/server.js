const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db'); // เชื่อมต่อ MySQL
const app = express();

app.use(bodyParser.json());

// API ตัวอย่างสำหรับดึงข้อมูลนักเรียน
app.get('/api/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// เริ่มต้นเซิร์ฟเวอร์
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
