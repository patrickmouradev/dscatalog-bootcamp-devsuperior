package com.patrickmoura.dscatalog.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.patrickmoura.dscatalog.entities.Category;
import com.patrickmoura.dscatalog.services.CategoryService;

@RestController
@RequestMapping(value = "/categories")
public class CategoryResource {

	@Autowired
	CategoryService service;
	
	@GetMapping
	public ResponseEntity<List<Category>> findall (){
		
		List<Category> list = service.findAll();

		
		return new ResponseEntity<>(list,HttpStatus.OK);
		
	}
}
