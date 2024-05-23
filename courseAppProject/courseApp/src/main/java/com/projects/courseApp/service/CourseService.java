package com.projects.courseApp.service;

import java.util.List;
import java.util.Optional;

import com.projects.courseApp.entity.Course;

public interface CourseService {
	public List<Course> getCourses();

	public Optional<Course> getCourse(long courseId);

	public Course addCourse(Course course);

	public void deleteCourse(long courseId);

	public Course getCourseById(long courseId);

	public Course updateCourseById(Course course);
	
	
}
