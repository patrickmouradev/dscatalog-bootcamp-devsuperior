package  com.patrickmoura.dscatalog.tests;

import java.time.Instant;

import com.patrickmoura.dscatalog.dto.ProductDTO;
import com.patrickmoura.dscatalog.entities.Category;
import com.patrickmoura.dscatalog.entities.Product;

public class Factory {
	
	public static Product creatProduct() {
		
		Product product = new Product(1L,"Phone","Good Phone",800.0, "https://img.com/img.png", Instant.parse("2020-10-20T03:00:00Z"));
		product.getCategories().add(new Category(2L,"Eletronics"));
		return product;
		
	}
	
	public static ProductDTO createProductDTO() {
		Product product = creatProduct();
		return new ProductDTO(product, product.getCategories());
	}

}
