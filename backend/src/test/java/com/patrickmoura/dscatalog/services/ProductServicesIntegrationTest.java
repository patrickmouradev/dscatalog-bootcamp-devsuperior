package com.patrickmoura.dscatalog.services;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.patrickmoura.dscatalog.dto.ProductDTO;
import com.patrickmoura.dscatalog.repositories.ProductRepository;
import com.patrickmoura.dscatalog.services.exceptions.ResourceNotFoundException;

@SpringBootTest
@Transactional
public class ProductServicesIntegrationTest {

	
	private long exintingId;
	private long nonExintingId;
	private long dependentId;
	private long countTotalProducts;
	private long categoryId;
	private String productName;
	
	
	@Autowired
	private ProductService service;
	
	@Autowired
	private ProductRepository repository;
	
	@BeforeEach
	void setUp() throws Exception {
		
		exintingId = 1L;
		nonExintingId = 1000L;
		dependentId = 4L;
		countTotalProducts = 25L;
		categoryId = 2l;
		productName = "";
		
	
	}
	
	@Test
	public void deleteShouldDeleteResourceWhenIdExists() {
		
			service.delete(exintingId);
			Assertions.assertEquals(countTotalProducts - 1, repository.count());
	}
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptinWhenIdDoesNotExists() {
		Assertions.assertThrows(ResourceNotFoundException.class,()->{
			service.delete(nonExintingId);
		});
	}
	
	@Test
	public void findAllPagedShouldReturnPageWhenPage0Size10() {
		Pageable pageable = PageRequest.of(0, 10);
		Page<ProductDTO> result = service.findAllPaged(pageable,categoryId,productName);
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(0, result.getNumber());
		Assertions.assertEquals(10, result.getSize());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	@Test
	public void findAllPagedShouldReturnEmpytPageWhenPagedoesNotExist() {
		Pageable pageable = PageRequest.of(50, 10);
		Page<ProductDTO> result = service.findAllPaged(pageable,categoryId,productName);
		Assertions.assertTrue(result.isEmpty());
		
	}
	
	@Test
	public void findAllPagedShouldReturnSortededPageWhenSortedByName() {
		Pageable pageable = PageRequest.of(0, 10,Sort.by("name"));
		Page<ProductDTO> result = service.findAllPaged(pageable,categoryId,productName);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals("Macbook Pro", result.getContent().get(0).getName());
		Assertions.assertEquals("PC Gamer", result.getContent().get(1).getName());
		Assertions.assertEquals("PC Gamer Alfa", result.getContent().get(2).getName());
		
	}
	
	
}
