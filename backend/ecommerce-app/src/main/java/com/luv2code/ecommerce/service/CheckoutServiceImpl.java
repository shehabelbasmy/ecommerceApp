package com.luv2code.ecommerce.service;

import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.Purchase;
import com.luv2code.ecommerce.dto.PurchaseResponse;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.entity.Order;

@Service
public class CheckoutServiceImpl implements CheckoutService{

	@Autowired
	private CustomerRepository customerRepository;
	
	@Override
	@Transactional
	public PurchaseResponse placeOrder(Purchase purchase) {
		
		//retrieve the order info from dto
		Order theOrder = purchase.getOrder();
		
		//generate tracking number
		String orderTrackingNumber=generateTrackingNumber();
		theOrder.setOrderTrackingNumber(orderTrackingNumber);
		
		//populate order with orderItems
		theOrder.setOrderItems(purchase.getOrderItems());
		
		//populate order with billingAddress and shippingAddress
		theOrder.setBillingAddress(purchase.getBillingAddress());
		theOrder.setShippingAddress(purchase.getShippingAddress());
		
		
		//populate customer with order
		Customer customer=purchase.getCustomer();
		customer.addOrder(theOrder);
		
		//save to the database
		customerRepository.save(customer);
		
		//return a response 
		return new PurchaseResponse(orderTrackingNumber);
	
	}

	private String generateTrackingNumber() {

		return UUID.randomUUID().toString();
	}
}
