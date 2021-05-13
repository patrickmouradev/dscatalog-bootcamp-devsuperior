package com.patrickmoura.dscatalog.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.patrickmoura.dscatalog.dto.CategoryDTO;
import com.patrickmoura.dscatalog.entities.Category;
import com.patrickmoura.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository repository;
	
	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll(){
		List<Category> list = repository.findAll(); 
		List<CategoryDTO> listDTO = list.stream().map( x -> new CategoryDTO(x)).collect(Collectors.toList());
		return listDTO;
	}
}
