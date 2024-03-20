const express = require("express");
const router = express.Router();
const db = require("../db");
const Status = {
  APPLIED: 1,
  APPROVED: 2,
  CHALLENGE: 3,
  COMPLETED: 4,
};

router.get("/:staffId", async (req, res) => {
  let { staffId } = req.params;
  let query = `SELECT script.id as Script_Id, staffs.id as Staff_Id, staffs.name as Staff_Name, revaluation_requests.student_id as Student_Id,
  revaluation_requests.id as Revaluation_Id FROM staffs join script 
  on staffs.handling_subject_id = script.subject_id join revaluation_requests on 
  script.id = revaluation_requests.script_id where staffs.id = ${staffId}`;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.patch("/revaluationApprove", async (req, res) => {
  let {
    body: { data },
  } = req;
  console.log(data);
  let { Script_Id } = data;
  let query = `UPDATE revaluation_requests SET status = "${Status.APPROVED}" where script_id = ${Script_Id}`;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

module.exports = router;
