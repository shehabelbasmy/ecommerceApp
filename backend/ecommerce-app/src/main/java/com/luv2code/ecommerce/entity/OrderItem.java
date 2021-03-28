package com.luv2code.ecommerce.entity;

import java.math.BigDecimal;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="order_item")
@Data
public class OrderItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "image_url")
	private String imageUrl;
	
	@Column(name = "quantity")
	private int quantity;
	
	@Column(name = "unit_price")
	private BigDecimal unitPrice;
	
	
	@ManyToOne(fetch = FetchType.LAZY,
			   cascade = {CascadeType.DETACH,
						  CascadeType.MERGE,
						  CascadeType.PERSIST,
						  CascadeType.REFRESH})
	@JoinColumn(name="order_id")
	private Order order;
	
	@Column(name = "product_id")
	private Long product;
}
