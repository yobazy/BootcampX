const { Pool } = require('pg');
let cohort_name = process.argv[2];
let limit = process.argv[3];

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${cohort_name}%'
LIMIT ${limit || 5};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort}:${user.teacher}`);
  })
}).catch(err => console.error('query error', err.stack));