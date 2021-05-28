package com.patrickmoura.dscatalog.services;

import static org.mockito.Mockito.times;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.patrickmoura.dscatalog.repositories.ProductRepository;

@ExtendWith(SpringExtension.class)
public class ProductTestServices {
	
	@InjectMocks
	private ProductService service;
	
	@Mock
	private ProductRepository repository;
	
	private long exintingId;
	private long nonExintingId;
	
	
	@BeforeEach
	void setUp() throws Exception{
		exintingId = 1L;
		nonExintingId = 1000L;
		
		Mockito.doNothing().when(repository).deleteById(exintingId);
	
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(exintingId);
		
		
		}
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		
		Assertions.assertDoesNotThrow(()->{
			service.delete(exintingId);
		});
		
		Mockito.verify(repository,times(1)).deleteById(exintingId);
	
	}
}
