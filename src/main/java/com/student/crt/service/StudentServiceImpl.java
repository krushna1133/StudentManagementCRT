package com.student.crt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.crt.model.Student;
import com.student.crt.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService {

	@Autowired
	private StudentRepository studentRepository;
	
	@Override
	public Student createStudent(Student student) {
		return studentRepository.save(student);
	}

	@Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

	@Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

	 @Override
	    public Student updateStudent(Long id, Student studentDetails) {
	        Student student = studentRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
	        
	        student.setFirstName(studentDetails.getFirstName());
	        student.setLastName(studentDetails.getLastName());
	        student.setEmail(studentDetails.getEmail());
	        student.setAge(studentDetails.getAge());
	        student.setCourse(studentDetails.getCourse());
	        
	        return studentRepository.save(student);
	    }

	 @Override
	    public void deleteStudent(Long id) {
	        Student student = studentRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
	        studentRepository.delete(student);
	    }

}
