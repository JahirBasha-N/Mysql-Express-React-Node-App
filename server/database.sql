create database node_react_interview_app;

use node_react_interview_app;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    roll_number VARCHAR(50)
);

CREATE TABLE subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    code VARCHAR(50)
);

CREATE TABLE script (
	id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    marks BIGINT,
    subject_id INT,
    FOREIGN KEY (student_id) REFERENCES students(id),
	FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

CREATE TABLE staffs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    handling_subject_id INT,
    FOREIGN KEY (handling_subject_id) REFERENCES subjects(id)
);

CREATE TABLE revaluation_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    script_id INT,
    student_id INT,
    status VARCHAR(50),
    FOREIGN KEY (script_id) REFERENCES script(id),
    FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE TABLE revaluation_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT,
    marks_before INT,
    marks_after INT,
    reviewed_by INT,
    FOREIGN KEY (request_id) REFERENCES revaluation_requests(id),
    FOREIGN KEY (reviewed_by) REFERENCES staff(id)
);