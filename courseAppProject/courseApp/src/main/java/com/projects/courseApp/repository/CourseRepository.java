package com.projects.courseApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projects.courseApp.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long>{

}
