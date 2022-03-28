package com.patrickmoura.dscatalog.repositories;

import com.patrickmoura.dscatalog.entities.Category;
import com.patrickmoura.dscatalog.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

    @Query( "SELECT DISTINCT obj FROM Product obj INNER JOIN obj.categories cat WHERE( COALESCE(:listCategories) IS NULL OR cat IN :listCategories  ) AND (UPPER(obj.name) LIKE CONCAT('%',:productName,'%')) ")
    Page<Product> find(List<Category> listCategories, String productName, Pageable pageable);


    @Query( "SELECT obj FROM Product obj JOIN FETCH obj.categories cat WHERE obj IN :listProducts")
    List<Product> findProductWithCategories(List<Product> listProducts);
}
