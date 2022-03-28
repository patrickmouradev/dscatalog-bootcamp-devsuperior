package com.patrickmoura.dscatalog.reseources;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.transaction.Transactional;

import com.patrickmoura.dscatalog.tests.TokenUtil;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.patrickmoura.dscatalog.dto.ProductDTO;
import com.patrickmoura.dscatalog.repositories.ProductRepository;
import com.patrickmoura.dscatalog.services.ProductService;
import com.patrickmoura.dscatalog.tests.Factory;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ProductResourceIntegrationTests {
	
	
	private long exintingId;
	private long nonExintingId;
	private long dependentId;
	private long countTotalProducts;
	private String userName;
	private String password;
	
	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private TokenUtil tokenUtil;



	@Autowired
	private ProductService service;
	
	@Autowired
	private ObjectMapper objMapper;
	
	@Autowired
	private ProductRepository repository;
	
	@BeforeEach
	void setUp() throws Exception {
		
		exintingId = 1L;
		nonExintingId = 1000L;
		dependentId = 4L;
		countTotalProducts = 25L;
		userName = "alex@gmail.com";
		password = "123456";
		
	
	}
	
	@Test
	public void findAllShouldReturnSortedPageWhenSortByName() throws Exception {
		
		ResultActions result = mockMvc.perform(
					get("/products?page=0&size=12&sort=name,asc")
					.accept(MediaType.APPLICATION_JSON)
					);
		
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.totalElements").value(countTotalProducts));
		result.andExpect(jsonPath("$.content").exists());
		result.andExpect(jsonPath("$.content[0].name").value("Macbook Pro"));
		result.andExpect(jsonPath("$.content[1].name").value("PC Gamer"));
		result.andExpect(jsonPath("$.content[2].name").value("PC Gamer Alfa"));
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenWhenIdExists() throws Exception{
		ProductDTO productDTO = Factory.createProductDTO();
		String jsonBody = objMapper.writeValueAsString(productDTO);
		String expectedName = productDTO.getName();
		String expectedDescription = productDTO.getDescription();

		String accessToken = tokenUtil.obtainAccessToken(mockMvc, userName, password);
		
		ResultActions result = mockMvc.perform(
					put("/products/{id}",exintingId)
					.content(jsonBody)
					.contentType(MediaType.APPLICATION_JSON)
							.header("Authorization", "Bearer " + accessToken)
					.accept(MediaType.APPLICATION_JSON)
					);
		
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").value(exintingId));
		result.andExpect(jsonPath("$.name").value(expectedName));
		result.andExpect(jsonPath("$.description").value(expectedDescription));
	}
	
	
	@Test
	public void updateShouldReturnNotFoundWhenWhenIdDoesNotExists() throws Exception{
		ProductDTO productDTO = Factory.createProductDTO();
		String jsonBody = objMapper.writeValueAsString(productDTO);
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, userName, password);
		
		
		ResultActions result = mockMvc.perform(
					put("/products/{id}",nonExintingId)
					.content(jsonBody)
							.header("Authorization", "Bearer " + accessToken)
					.contentType(MediaType.APPLICATION_JSON)
					.accept(MediaType.APPLICATION_JSON)
					);
		
		result.andExpect(status().isNotFound());
		
	}
	

}
