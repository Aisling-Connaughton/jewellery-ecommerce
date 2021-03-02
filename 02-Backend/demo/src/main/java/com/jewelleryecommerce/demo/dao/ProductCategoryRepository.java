package com.jewelleryecommerce.demo.dao;

import com.jewelleryecommerce.demo.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
// collection Resource Rel will be the name of the JSON entry, path then is /product-category
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
