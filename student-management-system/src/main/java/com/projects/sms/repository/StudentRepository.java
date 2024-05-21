package com.projects.sms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projects.sms.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long>{

}