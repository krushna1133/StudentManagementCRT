package com.student.crt.controller;

import java.net.http.HttpClient;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.client.RestClientResponseException;
//import org.springframework.web.service.annotation.PutExchange;
//
//import com.student.crt.repository.StudentRepository;
import com.student.crt.service.StudentService;
//import com.student.crt.service.StudentServiceImpl;
import com.student.crt.model.Student;
//
//import com.student.crt.model.Student;
//import com.student.crt.model.Student;
//import com.student.crt.model.Student;
//import com.student.crt.model.Student;

@RestController
@RequestMapping("/api/student")
public class StudentController {
	@Autowired
	private StudentService studentService;
	
	@PostMapping
	public ResponseEntity<Student> createStudent(@RequestBody Student student){
		Student createdStudent = studentService.createStudent(student);
		return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Student> getStudentById(@PathVariable Long id){
		Student student = studentService.getStudentById(id);
		return new ResponseEntity<>(student, HttpStatus.OK);
	}
	@GetMapping
	public ResponseEntity<List<Student>> getAllStudents() {
	    List<Student> students = studentService.getAllStudents();
	    return new ResponseEntity<>(students, HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
	    Student updatedStudent = studentService.updateStudent(id, student);
	    return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
	    studentService.deleteStudent(id);
	    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	
	
	
	
	
//	@Autowired
//	StudentRepository repository;
//	
//	@PostMapping("/add")
//	public Student addStudent(@RequestBody Student student) {
//		return repository.save(student);
//	}
//	
//	@GetMapping("/all")
//	public Object getAllStudents() {
//		return repository.findAll();
//	}
	
//	@GetMapping("/home")
//	public String Name() {
//		return "Krushna";
//	}
//	@PostMapping("/home")
//	public String PostName() {
//		return "OK";
//	}
}
