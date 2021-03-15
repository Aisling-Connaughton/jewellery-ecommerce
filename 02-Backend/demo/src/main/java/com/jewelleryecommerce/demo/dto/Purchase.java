package com.jewelleryecommerce.demo.dto;

import com.jewelleryecommerce.demo.entity.Address;
import com.jewelleryecommerce.demo.entity.Customer;
import com.jewelleryecommerce.demo.entity.Order;
import com.jewelleryecommerce.demo.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
