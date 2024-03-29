package com.patrickmoura.dscatalog.reseources;



import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import com.patrickmoura.dscatalog.tests.TokenUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.patrickmoura.dscatalog.dto.ProductDTO;

import com.patrickmoura.dscatalog.services.ProductService;
import com.patrickmoura.dscatalog.services.exceptions.DataBaseException;
import com.patrickmoura.dscatalog.services.exceptions.ResourceNotFoundException;
import com.patrickmoura.dscatalog.tests.Factory;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductResourceTests {

	@Autowired
	private MockMvc mockMvc;

	private ProductDTO productDTO;
	private PageImpl<ProductDTO> page;
	private long exintingId;
	private long nonExintingId;
	private long dependentId;
	private String productName;
	private long categoryId;
	private String userName;
	private String password;

	@MockBean
	private ProductService productService;
	
	@Autowired
	private ObjectMapper objMapper;

	@Autowired
	private TokenUtil tokenUtil;

	@BeforeEach
	void setUp() throws Exception {
		
		exintingId = 1L;
		nonExintingId = 1000L;
		dependentId = 4L;
		categoryId = 2l;
		productName = "";
		userName = "alex@gmail.com";
		password = "123456";
		
		productDTO = Factory.createProductDTO();
		page = new PageImpl<>(List.of(productDTO));
		
		when(productService.findAllPaged(any(),any(),any())).thenReturn(page);
		
		when(productService.findById(exintingId)).thenReturn(productDTO);
		when(productService.findById(nonExintingId)).thenThrow(ResourceNotFoundException.class);
		
		when(productService.update(eq(exintingId), any())).thenReturn(productDTO);
		when(productService.update(eq(nonExintingId),any())).thenThrow(ResourceNotFoundException.class);
		
		when(productService.insert(any())).thenReturn(productDTO);
		
		//Quando o metodo é void e não retorna nada
		doNothing().when(productService).delete(exintingId);
		
		//Quando o metodo é void e vai cair em uma Exception
		doThrow(ResourceNotFoundException.class).when(productService).delete(nonExintingId);
		doThrow(DataBaseException.class).when(productService).delete(dependentId);
	}
	
	@Test
	public void findAllShouldReturnPage() throws Exception {
		
		ResultActions result = mockMvc.perform(
					get("/products")
					.accept(MediaType.APPLICATION_JSON)
					);
		
		result.andExpect(status().isOk());
	}
	
	@Test
	public void findByIdShouldReturnProductDTOWhenIdExists() throws Exception{
		
		ResultActions result = mockMvc.perform(
					get("/products/{id}",exintingId)
					.accept(MediaType.APPLICATION_JSON)
					);
		
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
	}
	
	@Test
	public void findByIdShouldReturnNotFoundWhenDoesNotExists() throws Exception{
		
		ResultActions result = mockMvc.perform(
					get("/products/{id}",nonExintingId)
					.accept(MediaType.APPLICATION_JSON)
					);
		
		result.andExpect(status().isNotFound());
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenWhenIdExists() throws Exception{

		String accessToken = tokenUtil.obtainAccessToken(mockMvc, userName, password);
		String jsonBody = objMapper.writeValueAsString(productDTO);
		
		ResultActions result = mockMvc.perform(
					put("/products/{id}",exintingId)
					.content(jsonBody)
							.header("Authorization", "Bearer " + accessToken)
					.contentType(MediaType.APPLICATION_JSON)
					.accept(MediaType.APPLICATION_JSON)
					);
		
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenWhenDoesNotExists() throws Exception{
		
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
	
	@Test
	public void insertShouldReturnProductDTO() throws Exception{
		
		String jsonBody = objMapper.writeValueAsString(productDTO);
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, userName, password);
		
		ResultActions result = mockMvc.perform(
					post("/products")
					.content(jsonBody)
							.header("Authorization", "Bearer " + accessToken)
					.contentType(MediaType.APPLICATION_JSON)
					.accept(MediaType.APPLICATION_JSON)
					);
		
		result.andExpect(status().isCreated());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
	}
	
	@Test
	public void deletShouldReturnNoContentWhenWhenIdExists() throws Exception{
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, userName, password);
		ResultActions result = mockMvc.perform(
					delete("/products/{id}",exintingId)
							.header("Authorization", "Bearer " + accessToken)
					.accept(MediaType.APPLICATION_JSON)
					);
		
		result.andExpect(status().isNoContent());
	}
	
	@Test
	public void deletShouldReturnNotFoundWhenWhenDoesNotExists() throws Exception{
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, userName, password);
		ResultActions result = mockMvc.perform(
					delete("/products/{id}",nonExintingId)
							.header("Authorization", "Bearer " + accessToken)
					.accept(MediaType.APPLICATION_JSON)
					);
		
		result.andExpect(status().isNotFound());
	}


}
;