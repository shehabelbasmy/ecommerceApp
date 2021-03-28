package com.luv2code.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.luv2code.ecommerce.entity.Country;

@RepositoryRestResource(collectionResourceRel = "countries",path = "countries")
@CrossOrigin("http://localhost:4200")
public interface CountryRepositories extends JpaRepository<Country, Long> {

}
