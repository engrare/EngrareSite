//Copyright 2023 Kaya Sertel. All Rights Reserved.

var window_height, window_width, old_active_index = 0, current_active_index = 0, trans_click_pressed = false, ismenuopen = false;
var is_mobile_phone = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;

$( document ).ready(function() {
	var url = window.location.href;
    var params = url.split('?')[1]; // ? den sonrasını alır
	console.log(params);
    if (params) {
		$(".container_1").css("display", "");
		$(".main_container_inner h1").text("DİĞER ÜRÜNLERİMİZ");
        if (params === "eightlever") {
			$("#product_header").text("Eightlever");
			$("#product_info").text("Sekizgen tasarımı ile sanayideki en özgün araçlardan biri olan bu robotik sistem, sahip olduğu ileri düzey otonom yazılım sayesinde hem yüksek performans hem de istikrarlı bir çalışma sunmaktadır. Sistemin temel işlevi, dahili konveyör mekanizması ile yükleri almak ve çift kamera destekli otonom navigasyon sistemi ile söz konusu yükleri belirlenen hedef noktalara taşıyarak bırakmaktır. Robotun kontrolü, bir Grafiksel Kullanıcı Arayüzü (GUI) aracılığıyla sağlanmakta olup, Raspberry Pi tabanlı kontrolcüsü Firebase altyapısını kullanarak veri iletişimi ve komut aktarımını gerçekleştirmektedir. Tüm bu sistem, yerli kaynaklarla geliştirilmiş olan sdt.engrare.com web adresindeki kontrol paneli üzerinden uzaktan yönetilebilmektedir.");
			$(".swiper_slide_img:eq(0)").attr("src","./files/photos/sdt_photo.jpg");
			$(".swiper_slide_img:eq(1)").attr("src","./files/photos/sdt_photo_2.jpg");
			$(".swiper_slide_img:eq(2)").attr("src","./files/photos/sdt_photo_3.jpg");
			$(".swiper_slide_img:eq(3)").attr("src","./files/photos/sdt_photo_4.jpg");
			$(".trans_button_img:eq(0)").attr("src","./files/photos/sdt_photo.jpg");
			$(".trans_button_img:eq(1)").attr("src","./files/photos/sdt_photo_2.jpg");
			$(".trans_button_img:eq(2)").attr("src","./files/photos/sdt_photo_3.jpg");
			$(".trans_button_img:eq(3)").attr("src","./files/photos/sdt_photo_4.jpg");
        } else if(params === "tasimacim") {
			$("#product_header").text("Taşımacım");
			$("#product_info").text("Bu taşıyıcı robot, engebeli ve zorlu arazilerde görev yapabilmek üzere tasarlanmıştır. Temel olarak manuel kontrol ile kullanılmakta ve üzerinde bulunan robot kolu sayesinde küçük ölçekli taşıma, yerleştirme ve düzeltme gibi görevleri yerine getirebilmektedir. Robotun ön kısmında entegre edilmiş döner bir top toplama mekanizması bulunur. Bu sistem, aracın hareket halindeyken topları toplayarak haznesine aktarmasını sağlamakta olup, hazne aynı anda 10 adet topu depolayacak kapasiteye sahiptir. Arazi kabiliyetini artırmak amacıyla, yüksek torklu Fırçasız Doğru Akım (BLDC) motorlar ve özel bir süspansiyon sistemi ile donatılmıştır. Bu teknik altyapı, aracın aşırı yüksek engeller ve engebeli zeminlerde takılmadan ilerlemesine ve görevlerini kesintisiz sürdürmesine olanak tanımaktadır.");
			$(".swiper_slide_img:eq(0)").attr("src","./files/photos/robolig_photo.jpg");
			$(".swiper_slide_img:eq(1)").attr("src","./files/photos/robolig_photo_2.jpg");
			$(".swiper_slide_img:eq(2)").attr("src","./files/photos/robolig_photo_3.jpg");
			$(".swiper_slide_img:eq(3)").attr("src","./files/photos/robolig_photo_4.jpg");
			$(".trans_button_img:eq(0)").attr("src","./files/photos/robolig_photo.jpg");
			$(".trans_button_img:eq(1)").attr("src","./files/photos/robolig_photo_2.jpg");
			$(".trans_button_img:eq(2)").attr("src","./files/photos/robolig_photo_3.jpg");
			$(".trans_button_img:eq(3)").attr("src","./files/photos/robolig_photo_4.jpg");
		} else if(params === "dronox"){
			$("#product_header").text("Dronox");
			$("#product_info").text("Döner kanatlı İnsansız Hava Aracımız (İHA), 15 dakikaya varan uçuş süresi ve 1.3 kilograma kadar taşıma kapasitesi ile dikkat çeken, tam otonom bir sistem olarak tasarlanmıştır. Taşıma mekanizması olarak, iki adet elektromıknatıs ile donatılmıştır. Bu sistem, her biri 650 grama kadar ağırlık alabilen ve cırt cırt ile açılıp kapanan özel kutuları taşımak için kullanılmaktadır. Söz konusu kutuların, elektromıknatıslar ile etkileşime girebilmesi amacıyla üzerlerinde demir levha bulunmaktadır. İHA'nın otonom uçuş misyonu iki temel aşamadan oluşmaktadır: İlk Görev: İHA, görev gereği olarak, öncelikle tamamen otonom bir şekilde \"sonsuzluk\" işareti formunda bir uçuş rotasını başarıyla tamamlamaktadır. \n İkinci Görev: Bu aşamada, bir Raspberry Pi bilgisayarı ve Global Shutter özellikli bir kamera ile entegre bir şekilde çalışarak belirli bir alanın taramasını gerçekleştirmekte ve nesne tespiti yapmaktadır. Bu verileri işleyerek, otonom uçuş kararları almakta ve görevini sürdürmektedir.");
			$(".swiper_slide_img:eq(0)").attr("src","./files/photos/drone_photo.png");
			$(".swiper_slide_img:eq(1)").attr("src","./files/photos/drone_photo_2.jpg");
			$(".swiper_slide_img:eq(2)").attr("src","./files/photos/drone_photo_3.jpg");
			$(".swiper_slide_img:eq(3)").attr("src","./files/photos/drone_photo_4.jpg");
			$(".trans_button_img:eq(0)").attr("src","./files/photos/drone_photo.png");
			$(".trans_button_img:eq(1)").attr("src","./files/photos/drone_photo_2.jpg");
			$(".trans_button_img:eq(2)").attr("src","./files/photos/drone_photo_3.jpg");
			$(".trans_button_img:eq(3)").attr("src","./files/photos/drone_photo_4.jpg");
		}
    } else {
		$(".container_1").css("display", "none");
		$(".main_container_inner h1").text("ÜRÜNLERİMİZ");
		
	}
	
	
	var mySwiper = new Swiper('.swiper-container', {
		speed: 200,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		autoplay: {
			delay: 3000, // change delay as needed
		},
		keyboard: {
			enabled: true,
			onlyInViewport: false,
		},
		zoom: {
			maxRatio: 6,
		},
		/*on: {
			slideNextTransitionEnd: (swiper) => {
				console.log('SWIPED RIGHT');
				if(!trans_click_pressed) {
					if(current_active_index == mySwiper.slides.length - 1)
						current_active_index = 0;
					else
						current_active_index++;
				}
				trans_click_pressed = false;
				//new_active_index = current_active_index;//mySwiper.activeIndex;
				changeTransClick(old_active_index, current_active_index);
				old_active_index = current_active_index;
			},
			slidePrevTransitionEnd: (swiper) => {
				console.log('SWIPED LEFT');
				if(!trans_click_pressed) {
					if(current_active_index == 0)
						current_active_index = mySwiper.slides.length - 1;
					else
						current_active_index--;
				}
				trans_click_pressed = false;
				//new_active_index = current_active_index;//mySwiper.activeIndex;
				changeTransClick(old_active_index, current_active_index);
				old_active_index = current_active_index;
				console.log(current_active_index + " " + mySwiper.realIndex);
			}
		},*/
		loop: true,
	});
	
	/*$( ".left_right_buttons_swipper" ).hover(function() {
		$(this).css({"-webkit-transform": "translateY(-5px)"});
		$(this).addClass("swiper_button_hover");
	}, function() {
		$(this).css({"-webkit-transform": "translateY(0px)"});
		$(this).removeClass("swiper_button_hover");
	});
	*/
	
	$(".icon.whatsapp").on('click', function(){
		window.open('https://wa.me/xxxxxxxxxxxxx', '_blank');
	});
	
	$(".icon.map.TURKEY").on('click', function(){
		window.open('https://goo.gl/maps/4X9SkuMErJdEcfG67', '_blank');
	});
	
	function changeTransClick(old_index, new_index) {
		var elementID = "transClick_";
		document.getElementById(elementID + old_index).className = "trans_click";
		document.getElementById(elementID + new_index).className = "trans_click trans_active";
	}
	
	$(".left_right_buttons_swipper").on('click', function(){
		//setTimeout(function() { mySwiper.autoplay.start();}, 6000);
	});
	
	$(".trans_click").on('click', function(){
		var index = $(this).attr('id').slice(11, 12);
		if(index == mySwiper.realIndex)
			return;
		//alert(index + " " + mySwiper.realIndex);
		mySwiper.slideToLoop(index);
	});
	
	beReadyPage();
	
	mySwiper.zoom.enable();
	/*
	// Define the function to go to the last slide from the first slide
	function goToLastSlide() {
		mySwiper.slideTo(mySwiper.slides.length - 1);
	}

	// Define the function to go to the first slide from the last slide
	function goToFirstSlide() {
		mySwiper.slideTo(0);
	}

// Add a click event listener to the first slide to go to the last slide
	var firstSlide = document.querySelector('.swiper-slide:first-of-type');
	firstSlide.addEventListener('click', function() {
		if (mySwiper.activeIndex == 0) {
			for(var i = 0; i < mySwiper.slides.length - 1; i++)
				mySwiper.slideNext(i*30);
			current_active_index = 3;
			alert(mySwiper.activeIndex);
		}
	});

	// Add a click event listener to the last slide to go to the first slide
	var lastSlide = document.querySelector('.swiper-slide:last-of-type');
	lastSlide.addEventListener('click', function() {
		if (mySwiper.activeIndex == mySwiper.slides.length - 1) {
			goToFirstSlide();
			current_active_index = 0;
		}
	});*/
	
	$(window).scroll(function(event){
		if($(this).scrollTop() > window_height) {
			//mySwiper.autoplay.stop();
		}
		else {
			//mySwiper.autoplay.start();
		}
	});
	
	var mySwiper = $(".swiper-container")[0].swiper;
	mySwiper.autoplay.stop();
	//mySwiper.autoplay.start();
	$('.go_furniture_detail_a').mouseenter(function() {
		//mySwiper.autoplay.stop();
	}).mouseleave(function() {
		//mySwiper.autoplay.start();
	})
	mySwiper.zoom.enable();
	mySwiper.zoom.in();
	setTimeout(function() { mySwiper.zoom.disable();}, 6000);
	setTimeout(function() { mySwiper.zoom.out();}, 6000);
	mySwiper.on('slideChange', function () {
		
		/*if (mySwiper.autoplay.running) {
			//console.log('Slide changed automatically');
		} else {
			//mySwiper.autoplay.stop();
			//setTimeout(function() { mySwiper.autoplay.start();}, 6000);
			//console.log('Slide changed by user');
		}*/
		mySwiper.slideToLoop(mySwiper.realIndex);
		changeTransClick(old_active_index, mySwiper.realIndex);
		old_active_index = mySwiper.realIndex;
	});
	

});

//if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {
	$(window).scroll(function(event){
		st = $(this).scrollTop();
		//$(".main_container_2_bg_photo").css("top", (st*(150.0/(window_height*2))-150));
		$(".main_container_2_bg_photo").css('transform', 'translate3d(0px, ' + (st*(150.0/(window_height*2))-150) + 'px, 0px)');
	});
//}

/*$(window).scroll(function(event){
	st = $(this).scrollTop();
	$(".main_container_2_bg_photo").css("top", (st*(150.0/(window_height*2))-150));
});*/



$( window ).resize(function() {
	beReadyPage();
	setTimeout(function() { beReadyPage();}, 100);
});



function beReadyPage() {
	window_height = parseInt($( window ).height());
	window_width = parseInt($( window ).width());
	if(ismenuopen) 
		$(".menu_closer").css("display", window_width > 1086 ? "none" : "block");
	//$(".swiper-container-wrapper").css("height", window_height - parseInt($( ".fixed_menu_top" ).height()));
	//$(".main_container_2").css("height", window_height);
	$(".main_container_2_bg_photo").css("height", window_height + 150);
	//$(".main_container_2_bg_photo").css("height", window_width);
	
	st = $(window).scrollTop();
	$("#map1").css("height", window_height - $(".social_and_text_part").outerHeight( true ) - $(".copywrite_part").outerHeight( true ) - $(".fixed_menu_top").height() - 40);
	
	if(window_width < 700) { 
		//$(".mapouter").css("width", window_width - 20);
		//$(".gmap_iframe").css("width", window_width - 20);
		//$(".gmap_canvas").css("width", window_width - 20);
		//document.getElementById('map1').style.width = ((window_width - 20) + "px");
		$("#map1").css("width", window_width - 20);
		
	} else {
		//$(".mapouter").css("width", 600);
		//$(".gmap_iframe").css("width", 600);
		//$(".gmap_canvas").css("width", 600);
		$("#map1").css("width", window_width - 300);
	}
}

function openLeftMenu() {
	$(".fixed_menu_all_buttons_cont").stop();
	$(".menu_closer").stop();
	$('.fixed_menu_all_buttons_cont').animate(
		{ left: ismenuopen ? -200 : 0 }, 200);
	if(ismenuopen) {
		$(".menu_closer").fadeOut(200);
		$(".menu_opener").addClass('fa-bars');
		$(".menu_opener").addClass('fa');
		
		$(".menu_opener").removeClass('fa-regular');
		$(".menu_opener").removeClass('fa-solid');
		$(".menu_opener").removeClass('fa-xmark');
		
		$("html body").css("overflow-y", "auto");
		if(!is_mobile_phone) {
			$(".main_div").css("width", "100%");
			$(".fixed_menu_right_cont").css("width", parseInt($( ".fixed_menu_right_cont" ).width()) - 14);
		}
		//console.log(is_mobile_phone);
	}
	else {
		$(".menu_closer").fadeIn(200);
		$(".menu_opener").removeClass('fa-bars');
		$(".menu_opener").removeClass('fa');
		
		$(".menu_opener").addClass('fa-regular');
		$(".menu_opener").addClass('fa-solid');
		$(".menu_opener").addClass('fa-xmark');
		$("html body").css("overflow-y", "hidden");
		if(!is_mobile_phone) {
			$(".main_div").css("width", "calc(100% - 14px)");
			$(".fixed_menu_right_cont").css("width", parseInt($( ".fixed_menu_right_cont" ).width()) + 14.5);
		}
	}
	//fa-regular fa-solid fa-xmark

	ismenuopen = !ismenuopen;

	//overflow: hidden;
}

setTimeout(function() { beReadyPage();}, 200);
setTimeout(function() { beReadyPage();}, 500);
