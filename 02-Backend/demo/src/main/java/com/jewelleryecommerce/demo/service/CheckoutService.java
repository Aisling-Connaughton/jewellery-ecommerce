package com.jewelleryecommerce.demo.service;

import com.jewelleryecommerce.demo.dto.Purchase;
import com.jewelleryecommerce.demo.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

}
