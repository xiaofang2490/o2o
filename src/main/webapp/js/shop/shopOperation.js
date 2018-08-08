/**
 * 
 */
$(function(){
	var initUrl = '/o2o/shopAdmin/getShopInitInfo';
	var registerShopUrl = '/o2o/shopAdmin/registerShop';
	getShopInitInfo();
	// 取得所有二级店铺类别以及区域信息，并分别赋值进类别列表以及区域列表
	function getShopInitInfo() {
		$.getJSON(initUrl, function(data) {
			if (data.success) {
				var tempHtml = '';
				var tempAreaHtml = '';
				data.shopCategoryList.map(function(item, index) {
					tempHtml += '<option data_id="' + item.shopCategoryId
							+ '">' + item.shopCategoryName + '</option>';
				});
				data.areaList.map(function(item, index) {
					tempAreaHtml += '<option data_id="' + item.areaId + '">'
							+ item.areaName + '</option>';
				});
				$('#shop_category').html(tempHtml);
				$('#shop_area').html(tempAreaHtml);
			}
		});
	}
	
	$("#submit").click(function(){
		var shop = {};
		shop.shopName = $("#shop_name").val();
		shop.shopAddr = $("#shop_addr").val();
		shop.phone = $("#shop_phone").val();
		shop.shopDesc = $("#shop_desc").val();
		shop.shopCategory = {
				shopCategoryId : $("#shop_category").find('option').not(function(){
					return !this.selected;
				}).data('id')
		};
		shop.area = {
				areaId : $("#shop_area").find('option').not(function(){
					return !this.selected;
				}).data('id')
		};
//		var shopImg = $("#shop_img")[0].files[0];
//		var formData = new FormData();
//		formData.append('shopImg',shopImg);
//		formData.append('shopStr',JSON.stringify(shop));
//		var verifyCodeActual = $("#j_captcha").val();
//		if(!verifyCodeActual){
//			$.toast('请输入验证码！');
//			return ;
//		}
//		formData.append('verifyCodeActual',verifyCodeActual);
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
		
		console.log('shop--->>>'+shop);
		// 将数据提交至后台处理相关操作
		$.ajax({
//			url : registerShopUrl,
			type : 'POST',
			data : formData,
			contentType : false,
			processData : false,
			cache : false,
			success : function(data) {
				if (data.success) {
					$.toast('提交成功！');
				} else {
					$.toast('提交失败！' + data.errMsg);
				}
				// 点击验证码图片的时候，注册码会改变
				$('#captcha_img').click();
			}
		});
	});
})