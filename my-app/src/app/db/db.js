const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',       // หรือ 127.0.0.1
  port: 3306,              // พอร์ต MySQL
  user: 'root',            // ชื่อผู้ใช้งาน MySQL
  password: '',            // รหัสผ่าน MySQL (ถ้าไม่มี ให้ปล่อยว่าง)
  database: 'databaseStudent' // ชื่อฐานข้อมูล
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

module.exports = connection;
