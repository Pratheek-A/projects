package com.projects.courseApp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projects.courseApp.entity.Course;
import com.projects.courseApp.repository.CourseRepository;

@Service
public class CourseServiceImpl implements CourseService {
	@Autowired
	private CourseRepository courseRepository;

	@Override
	public List<Course> getCourses() {
		return courseRepository.findAll();
	}
	
	@Override
	public Optional<Course> getCourse(long courseId) {
		return courseRepository.findById(courseId);
	}
	
	@Override
	public Course addCourse(Course course) {
		courseRepository.save(course);
		return course;
	}
	
	@Override
	public void deleteCourse(long courseId) {
		//Course entity=courseRepository.getReferenceById(courseId);
		Course entity=courseRepository.findById(courseId).get();
		courseRepository.delete(entity);
		
	}

	@Override
	public Course getCourseById(long courseId) {
		return courseRepository.findById(courseId).get();
	}

	@Override
	public Course updateCourseById(Course course) {
		return courseRepository.save(course);
	}

}
