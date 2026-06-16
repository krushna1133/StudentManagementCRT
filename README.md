# Student Management System

A web-based Student Management System built using **Spring Boot**, **Spring MVC**, **Spring Data JPA**, **Thymeleaf**, and **MySQL**. The application provides complete CRUD operations for managing student records efficiently.

## Features

* Add new students
* View all students
* Update student information
* Delete student records
* Responsive user interface using Thymeleaf templates
* Database integration with MySQL
* MVC architecture using Spring Boot

## Tech Stack

### Backend

* Java
* Spring Boot
* Spring MVC
* Spring Data JPA
* Hibernate

### Frontend

* Thymeleaf
* HTML5
* CSS3
* Bootstrap

### Database

* MySQL

### Build Tool

* Maven

## Project Structure

```text
src
├── main
│   ├── java
│   │   ├── controller
│   │   ├── service
│   │   ├── repository
│   │   ├── entity
│   │   └── StudentManagementApplication
│   └── resources
│       ├── templates
│       ├── static
│       └── application.properties
```

## Installation

### Clone Repository

```bash
git clone https://github.com/krushna1133/StudentManagementCRT.git
cd StudentManagementCRT
```

### Configure Database

Create a MySQL database:

```sql
CREATE DATABASE student_management;
```

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_management
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Run Application

Using Maven:

```bash
mvn spring-boot:run
```

Or:

```bash
mvn clean install
java -jar target/*.jar
```

## Screenshots

Add screenshots of:

* Student List Page
* Add Student Form
* Update Student Form
* Delete Student Operation

## API Operations

| Operation | Description                |
| --------- | -------------------------- |
| Create    | Add a new student          |
| Read      | View student details       |
| Update    | Modify student information |
| Delete    | Remove student record      |

## Learning Objectives

This project demonstrates:

* Spring Boot fundamentals
* MVC Architecture
* CRUD Operations
* Database Integration with JPA/Hibernate
* Thymeleaf Template Engine
* Maven Project Management

## Future Enhancements

* Student search functionality
* Pagination and sorting
* Authentication and authorization
* REST API support
* Docker deployment
* Cloud hosting




# Spring Project

** To autocomplete code and auto add import file click **
#### ctrl + space  
* Install STS software for direct access the dependency of spring project
```

	https://spring.io/tools#eclipse

* download maven
```

	https://dlcdn.apache.org/maven/maven-3/3.9.16/binaries/apache-maven-3.9.16-bin.zip

Set environment MAVEN_HOME and their value, and also JAVA_HOME
 
```
	Go> C:\sts-5.2.0.RELEASE
			SpringToolForEclipse click send to desktop for shortcut	
```

** Webconfig:** use for to connect frontend using API

** Repository:** database and services connect, and also business logic

** Model:** is use for create database

** Service:** 



when you need to create getter setter then write click on the model file like package com.student.crt.model; and Student.java
right click > source > Generate getter and setter