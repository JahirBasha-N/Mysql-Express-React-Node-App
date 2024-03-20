const express = require("express");
const router = express.Router();
const db = require("../db");
const Status = {
  APPLIED: 1,
  APPROVED: 2,
  CHALLENGE: 3,
  COMPLETED: 4,
};

router.get("/:rollNumber", async (req, res) => {
  let { rollNumber } = req.params;
  let query = `SELECT students.id as Student_Id, students.roll_number as Roll_Number, 
    subjects.name as Subject_Name, subjects.id as Subject_Id, script.id as Script_Id,
    script.marks as Marks
    FROM students join script on students.id = script.student_id 
    join subjects on script.subject_id = subjects.id where students.roll_number = "${rollNumber}"`;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get("/revaluationData/:rollNumber", async (req, res) => {
  let { rollNumber } = req.params;
  let query = `SELECT students.id as Student_Id, students.roll_number as Roll_Number, 
  subjects.name as Subject_Name, revaluation_requests.status as status, 
  script.marks as Marks
  FROM students join script on students.id = script.student_id join revaluation_requests on students.id = revaluation_requests.student_id
  join subjects on script.subject_id = subjects.id where students.roll_number = "${rollNumber}"`;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post("/revaluation", async (req, res) => {
  let {
    body: { data },
  } = req;
  console.log(data);
  let { Student_Id, Script_Id } = data;
  let query = `INSERT INTO revaluation_requests(script_id, student_id, status) Values(${Script_Id}, ${Student_Id}, "${Status.APPLIED}")`;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

module.exports = router;
