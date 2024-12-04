const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const studentsRoutes = require('./routes/students');
const teachersRoutes = require('./routes/teachers');
const staffRoutes = require('./routes/staff');
const coursesRoutes = require('./routes/courses');
const gradesRoutes = require('./routes/grades');

app.use('/api/students', studentsRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/grades', gradesRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
