package com.projects.courseApp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projects.courseApp.entity.Course;
import com.projects.courseApp.service.CourseService;


@RestController
@CrossOrigin
public class CourseController {
	@Autowired
	private CourseService courseService;
	
	@GetMapping("/home")
	public String home() {
		return "Hello";
	}
	
	//Get all courses
	@GetMapping("/courses")
	public List<Course> getCourses(){
		return courseService.getCourses();
	}
	
	//Get course by id
	@GetMapping("/courses/{courseId}")
	public Optional<Course> getCourse(@PathVariable long courseId) {
		return courseService.getCourse(courseId);
	}
	
	//Add a new course
	@PostMapping("/courses")
	public Course addCourse(@RequestBody Course course) {
		return courseService.addCourse(course);
	}
	
	
	//Update a course
	@PutMapping("/courses/{courseId}")
	public Course updateCourse(@PathVariable long courseId, @RequestBody Course course) {
		Course existingCourse=courseService.getCourseById(courseId);
		existingCourse.setId(courseId);
		existingCourse.setTitle(course.getTitle());
		existingCourse.setDescription(course.getDescription());
		return courseService.updateCourseById(existingCourse);
	}
	
	
	//Delete a course
	@DeleteMapping("/courses/{courseId}")
	public ResponseEntity<HttpStatus> deleteCourse(@PathVariable long courseId){
		try {
			courseService.deleteCourse(courseId);
			return new ResponseEntity<>(HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

}
}
