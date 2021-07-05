package com.patrickmoura.dscatalog.services;



import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.patrickmoura.dscatalog.dto.ProductDTO;
import com.patrickmoura.dscatalog.entities.Category;
import com.patrickmoura.dscatalog.entities.Product;
import com.patrickmoura.dscatalog.repositories.CategoryRepository;
import com.patrickmoura.dscatalog.repositories.ProductRepository;
import com.patrickmoura.dscatalog.services.exeptions.DataBaseException;
import com.patrickmoura.dscatalog.services.exeptions.ResourceNotFoundException;
import com.patrickmoura.dscatalog.tests.Factory;

@ExtendWith(SpringExtension.class)
public class ProductServicesTests {
	
	@InjectMocks
	private ProductService service;
	
	@Mock
	private ProductRepository repository;
	
	@Mock
	private CategoryRepository categoryRepository;
	
	private long exintingId;
	private long nonExintingId;
	private long dependentId;
	private Product product;
	private Category category;
	private PageImpl<Product> page;
	
	
	@BeforeEach
	void setUp() throws Exception{
		exintingId = 1L;
		nonExintingId = 1000L;
		dependentId = 4L;
		product = Factory.creatProduct();
		category = Factory.creatCategory();
		page = new PageImpl<>(List.of(product));
		
		
		Mockito.doNothing().when(repository).deleteById(exintingId);
	
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExintingId);
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
		
		
		Mockito.when(repository.getOne(exintingId)).thenReturn(product);
		Mockito.when(repository.getOne(nonExintingId)).thenThrow(EntityNotFoundException.class);
		
		Mockito.when(categoryRepository.getOne(exintingId)).thenReturn(category);
		Mockito.when(categoryRepository.getOne(nonExintingId)).thenThrow(EntityNotFoundException.class);
		
		Mockito.when(repository.findAll((Pageable)ArgumentMatchers.any())).thenReturn(page);
		Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(product);
		Mockito.when(repository.findById(exintingId)).thenReturn(Optional.of(product));
		Mockito.when(repository.findById(nonExintingId)).thenReturn(Optional.empty());

		}
	
	
	@Test
	public void findAllPagedShouldReturnPage() {
		Pageable pageable = PageRequest.of(0, 10);
		Page<ProductDTO> result = service.findAllPaged(pageable);
		
		Assertions.assertNotNull(result);
		Mockito.verify(repository, Mockito.times(1)).findAll(pageable);
		
	}
	
	@Test
	public void deleteShouldThrowDataBaseExceptionWhenViolationOfIntegrity() {
		
		Assertions.assertThrows(DataBaseException.class,()->{
			service.delete(dependentId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(dependentId);
	
	}
	
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
		
		Assertions.assertThrows(ResourceNotFoundException.class,()->{
			service.delete(nonExintingId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(nonExintingId);
	
	}
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		
		Assertions.assertDoesNotThrow(()->{
			service.delete(exintingId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(exintingId);
	
	}
	
	@Test
	public void findByIdShouldReturnProductDTOWhenIdExists() {
		ProductDTO result = service.findById(exintingId);
		Assertions.assertNotNull(result);
		Mockito.verify(repository, Mockito.times(1)).findById(exintingId);
		
	}
	
	@Test
	public void findByIdShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
		
		Assertions.assertThrows(ResourceNotFoundException.class,()->{
			service.findById(nonExintingId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).findById(nonExintingId);
	
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenIdExists() {
		
		ProductDTO result =  service.update(exintingId,Factory.createProductDTO());
		Assertions.assertNotNull(result);
		
	}
	
	@Test
	public void updateShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
		
		Assertions.assertThrows(ResourceNotFoundException.class,()->{
			service.update(nonExintingId,Factory.createProductDTO());
		
		});
		
		
	
	}
	
	
	
}
