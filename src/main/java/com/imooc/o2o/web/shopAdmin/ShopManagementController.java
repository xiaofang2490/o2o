package com.imooc.o2o.web.shopAdmin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value="/shopManager")
public class ShopManagementController {
	
	
	@RequestMapping("/shopOperation")
	public String shopOperation() {
		return "shop/shopOperation";
	}
	
	@RequestMapping("/shopList")
	public String shopList() {
		return "shop/shopList";
	}
	
	@RequestMapping(value = "/shopManagement")
	public String shopManagement() {
		// 转发至店铺管理页面
		return "shop/shopManagement";
	}

	@RequestMapping(value = "/productCategoryManagement", method = RequestMethod.GET)
	private String productCategoryManage() {
		// 转发至商品类别管理页面
		return "shop/productCategoryManagement";
	}

	@RequestMapping(value = "/productOperation")
	public String productOperation() {
		// 转发至商品添加/编辑页面
		return "shop/productOperation";
	}

	@RequestMapping(value = "/productManagement")
	public String productManagement() {
		// 转发至商品管理页面
		return "shop/productManagement";
	}
	


}
