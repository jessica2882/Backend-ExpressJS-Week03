import express from 'express';
import courses from "./course.js";

import logger from './Middlewares/logger.js';
// import validateQuery from './Middlewares/validateQuery.js';
import checkToken from './Middlewares/auth.js';

const app = express();
const PORT = 3000;

app.use(logger);

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses'/*, validateQuery*/, checkToken, (req, res) => {
  const { dept } = req.params;
  const { level, minCredits, maxCredits, semester, instructor } = req.query;

  const min = minCredits ? parseInt(minCredits) : 0;
  const max = maxCredits ? parseInt(maxCredits) : Infinity;

  if (min > max) {
    return res.status(400).json({ message: "Invalid credit range: minCredits > maxCredits" });
  }

  const filteredCourses = courses.filter(course => {
    if (course.department.toLowerCase() !== dept.toLowerCase())
       return false;
    if (level && course.level.toLowerCase() !== level.toLowerCase()) 
      return false;
    if (course.credits < min || course.credits > max) 
      return false;
    if (semester && course.semester.toLowerCase() !== semester.toLowerCase()) 
      return false;
    if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) 
      return false;
    return true;
  });

  if (filteredCourses.length === 0) {
    return res.status(400).json({ message: "No matching courses found" });
  }

  res.json(filteredCourses);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
