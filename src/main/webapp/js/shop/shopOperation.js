/**
 * 
 */
$(function() {
	// 取得所有二级店铺类别以及区域信息，并分别赋值进类别列表以及区域列表
	var shopId = getQueryString('shopId');
	var isEdit = shopId ? true : false;

	var shopInfoUrl = "/o2o/shopAdmin/getShopById?shopId=" + shopId;
	var editShopUrl = '/o2o/shopAdmin/modifyShop';
	
	getShopInitInfo();

	// 判断是编辑操作还是注册操作
	if (!isEdit) {
		getShopInitInfo();
	} else {
		getShopInfo(shopId, shopInfoUrl);
	}

	$('#submitShopInfo').click(function() {
		var registerShopUrl = '/o2o/shopAdmin/registerShop';
		var shop = {};
		if(isEdit){
			shop.shopId = shopId;
		}
		shop.shopName = $("#shop_name").val();
		shop.shopAddr = $("#shop_addr").val();
		shop.phone = $("#shop_phone").val();
		shop.shopDesc = $("#shop_desc").val();

		shop.shopCategory = {
			shopCategoryId : $('#shop_category').find('option').val()
		};
		shop.area = {
			areaId : $('#shop_area').find('option').val()
		};

		// 获取上传的图片文件流
		var shopImg = $('#shop_img')[0].files[0];
		// 生成表单对象，用于接收参数并传递给后台
		var formData = new FormData();
		// 添加图片流进表单对象里
		formData.append('shopImg', shopImg);
		// 将shop json对象转成字符流保存至表单对象key为shopStr的的键值对里
		formData.append('shopStr', JSON.stringify(shop));
		// 获取表单里输入的验证码
		var verifyCodeActual = $('#j_captcha').val();
		if (!verifyCodeActual) {
			$.toast('请输入验证码！');
			return;
		}
		formData.append('verifyCodeActual', verifyCodeActual);
		// 将数据提交至后台处理相关操作
		$.ajax({
			url : (isEdit ? editShopUrl : registerShopUrl),
			type : 'POST',
			data : formData,
			contentType : false,
			processData : false,
			cache : false,
			success : function(data) {
				if (data.success) {
					alert('提交成功！');
				} else {
					alert('提交失败！');
				}
				// 点击验证码图片的时候，注册码会改变
				$('#captcha_img').click();
			}
		});
	});
})

// 通过店铺Id获取店铺信息
function getShopInfo(shopId, shopInfoUrl) {
	$.getJSON(shopInfoUrl, function(data) {
		if (data.success) {
			// 若访问成功，则依据后台传递过来的店铺信息为表单元素赋值
			var shop = data.shop;
			$('#shop_name').val(shop.shopName);
			$('#shop_addr').val(shop.shopAddr);
			$('#shop_phone').val(shop.phone);
			$('#shop_desc').val(shop.shopDesc);
			// 给店铺类别选定原先的店铺类别值
			var shopCategory = '<option value="'
					+ shop.shopCategory.shopCategoryId + '" selected>'
					+ shop.shopCategory.shopCategoryName + '</option>';
			var tempAreaHtml = '';
			// 初始化区域列表
			data.areaList.map(function(item, index) {
				tempAreaHtml += '<option value="' + item.areaId + '">'
						+ item.areaName + '</option>';
			});
			$('#shop_category').html(shopCategory);
			// 不允许选择店铺类别
			$('#shop_category').attr('disabled', 'disabled');
			$('#shop_area').html(tempAreaHtml);
			// 给店铺选定原先的所属的区域
			$("#shop_area option[value='" + shop.area.areaId + "']").attr(
					"selected", "selected");
		}
	});
}

// 取得所有二级店铺类别以及区域信息，并分别赋值进类别列表以及区域列表
function getShopInitInfo() {
	var initUrl = '/o2o/shopAdmin/getShopInitInfo';
	$.getJSON(initUrl, function(data) {
		if (data.success) {
			var tempHtml = '';
			var tempAreaHtml = '';
			//option 属性为value 
			data.shopCategoryList.map(function(item, index) {
				tempHtml += '<option value="' + item.shopCategoryId + '">'
						+ item.shopCategoryName + '</option>';
			});
			data.areaList.map(function(item, index) {
				tempAreaHtml += '<option value="' + item.areaId + '">'
						+ item.areaName + '</option>';
			});
			$('#shop_category').html(tempHtml);
			$('#shop_area').html(tempAreaHtml);
		}
	});
}
