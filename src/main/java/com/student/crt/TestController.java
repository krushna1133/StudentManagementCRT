package com.student.crt;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
	@RequestMapping("/test")
	public String handleTest() {
		return "Hi Krushna";
	}
}
