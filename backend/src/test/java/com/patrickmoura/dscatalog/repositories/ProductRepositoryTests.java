package com.patrickmoura.dscatalog.repositories;

import java.util.Optional;

import com.patrickmoura.dscatalog.entities.Product;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;

import com.patrickmoura.dscatalog.tests.Factory;

@DataJpaTest
public class ProductRepositoryTests {

	@Autowired
	private ProductRepository repository;
	
	private long exintingId;
	private long nonExintingId;
	private long countTotalProducts;
	
	
	@BeforeEach
	void setUp() throws Exception{
		exintingId = 1L;
		nonExintingId = 1000L;
		countTotalProducts = 25L;
	}

	//@Test
	public void deleteShouldDeleteObjectWhenIdExists() {
	
		repository.deleteById(exintingId);

		Optional<Product> result = repository.findById(exintingId);

		Assertions.assertFalse(result.isPresent());
		
	}

	
	//@Test
	public void saveShouldPersistWhithAutoIncrementWhenIdIsNull() {
		Product product = Factory.creatProduct();
		product.setId(null);
		
		product = repository.save(product);

		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts+1, product.getId());
		
	}
	
	//@Test
	public void findByIdShouldreturnOptionalNoEmptyWhenIdNotNull() {
		
		Optional<Product> result = repository.findById(exintingId);

		Assertions.assertTrue(result.isPresent());
		
	}
	
	
	//@Test
	public void findByIdShouldreturnOptionalEmptyWhenIdIsNotPresent() {
		Optional<Product> result = repository.findById(nonExintingId);

		Assertions.assertFalse(result.isPresent());
		
	}


	
	//@Test
	public void deleteShouldThrowEmpyResultDataAccessExeptionWhenIdDoesNotExists() {

		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonExintingId);
		});
	}
}
