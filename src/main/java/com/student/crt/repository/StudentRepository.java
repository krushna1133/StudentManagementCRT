package com.student.crt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.student.crt.model.Student;

//this file work between database and logic
public interface StudentRepository extends JpaRepository<Student, Long> {

}

//public class StudentRepository{
//
//}