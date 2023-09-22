import express from "express";
import {
  AddLecture,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseLectures,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, authorizeSubscribers, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
//get all lecture
router.route("/courses").get(getAllCourses);
// create new course - only admin
router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

router
  .route("/course/:id")
  .get(isAuthenticated,authorizeSubscribers, getCourseLectures)
  .post(isAuthenticated,authorizeAdmin,  singleUpload, AddLecture)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse)

  router.route("/lecture")
  .delete(isAuthenticated, authorizeAdmin, deleteLecture)
export default router;
