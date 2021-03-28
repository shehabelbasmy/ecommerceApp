package com.luv2code.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.luv2code.ecommerce.entity.Country;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;
import com.luv2code.ecommerce.entity.State;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	@Autowired
	private EntityManager entityManager;

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

		onlyGetMethod(config, Product.class);

		onlyGetMethod(config, ProductCategory.class);
		
		onlyGetMethod(config, Country.class);

		onlyGetMethod(config, State.class);

		exposeIds(config);
	}

	private void onlyGetMethod(RepositoryRestConfiguration config, Class<?> theClass) {

		HttpMethod[] theUnsupportedMethods = { HttpMethod.DELETE, HttpMethod.POST, HttpMethod.PUT };

		config.getExposureConfiguration().forDomainType(theClass)
				.withItemExposure((metedata, httpMethod) -> httpMethod.disable(theUnsupportedMethods))
				.withCollectionExposure((metedata, httpMethod) -> httpMethod.disable(theUnsupportedMethods));
	}

	private void exposeIds(RepositoryRestConfiguration config) {

		// -gets List of all entity classes form the EntityManager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

		// -create an array of the entity types
		List<Class<?>> entitiesClasses = new ArrayList<>();

		// -get the entity types for the entities
		for (EntityType<?> tempEntity : entities) {
			entitiesClasses.add(tempEntity.getJavaType());
		}

		// -exposes th entity ids for the array of entity/domain types
		Class<?>[] domainType = entitiesClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainType);

	}

}
