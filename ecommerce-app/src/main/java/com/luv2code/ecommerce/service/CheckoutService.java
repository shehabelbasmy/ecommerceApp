package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dto.Purchase;
import com.luv2code.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

	public PurchaseResponse placeOrder(Purchase purchase);
}
