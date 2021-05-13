package com.patrickmoura.dscatalog.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.patrickmoura.dscatalog.dto.CategoryDTO;
import com.patrickmoura.dscatalog.services.CategoryService;

@RestController
@RequestMapping(value = "/categories")
public class CategoryResource {

	@Autowired
	CategoryService service;
	
	@GetMapping
	public ResponseEntity<List<CategoryDTO>> findall (){
		
		List<CategoryDTO> list = service.findAll();

		
		return new ResponseEntity<>(list,HttpStatus.OK);
		
	}
}
