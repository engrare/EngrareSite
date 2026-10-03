// Copyright 2025 ENGRARE. All Rights Reserved.

var window_height, window_width, old_active_index = 0, ismenuopen = false;
var mySwiper = null;

function topMenuGo(num) {
	window.location.href = '../index.html';
}

function changeTransClick(old_index, new_index) {
	var oldEl = document.getElementById("transClick_" + old_index);
	var newEl = document.getElementById("transClick_" + new_index);
	if (oldEl) oldEl.className = "trans_click";
	if (newEl) newEl.className = "trans_click trans_active";
}

function renderProductDetail(slug) {
	var cleanSlug = (slug || "").toLowerCase();

	if (cleanSlug === "eightlever" || cleanSlug === "tasimacim" || cleanSlug === "dronox") {
		$(".container_1").css("display", "block");
		$("#products_list_heading").text("DİĞER ÜRÜNLERİMİZ");

		if (cleanSlug === "eightlever") {
			$("#product_header").text("Eightlever");
			$("#product_info").text("Sekizgen şasili otonom taşıma robotu. Dahili konveyör mekanizması ile yükleri alır, çift kamera destekli otonom navigasyon sistemiyle hedef noktalara taşır. Raspberry Pi ve Firebase tabanlı altyapısı sayesinde sdt.engrare.com üzerinden uzaktan yönetilebilir.");
			$("#product_join_btn").attr("href", "../our_team/index.html?vehicle=Eightlever#basvuru");
			$(".swiper_slide_img:eq(0), .trans_button_img:eq(0)").attr("src", "./files/photos/sdt_photo.jpg");
			$(".swiper_slide_img:eq(1), .trans_button_img:eq(1)").attr("src", "./files/photos/sdt_photo_2.jpg");
			$(".swiper_slide_img:eq(2), .trans_button_img:eq(2)").attr("src", "./files/photos/sdt_photo_3.jpg");
			$(".swiper_slide_img:eq(3), .trans_button_img:eq(3)").attr("src", "./files/photos/sdt_photo_4.jpg");
		} else if (cleanSlug === "tasimacim") {
			$("#product_header").text("Taşımacım");
			$("#product_info").text("Zorlu araziler için geliştirilen yüksek torklu BLDC motorlu ve özel süspansiyonlu taşıyıcı robot. Üzerindeki robot kolu ve 10 top kapasiteli döner toplama mekanizması ile engebeli zeminlerde taşıma ve yerleştirme görevlerini kesintisiz yerine getirir.");
			$("#product_join_btn").attr("href", "../our_team/index.html?vehicle=Ta%C5%9F%C4%B1mac%C4%B1m#basvuru");
			$(".swiper_slide_img:eq(0), .trans_button_img:eq(0)").attr("src", "./files/photos/robolig_photo.jpg");
			$(".swiper_slide_img:eq(1), .trans_button_img:eq(1)").attr("src", "./files/photos/robolig_photo_2.jpg");
			$(".swiper_slide_img:eq(2), .trans_button_img:eq(2)").attr("src", "./files/photos/robolig_photo_3.jpg");
			$(".swiper_slide_img:eq(3), .trans_button_img:eq(3)").attr("src", "./files/photos/robolig_photo_4.jpg");
		} else if (cleanSlug === "dronox") {
			$("#product_header").text("Dronox");
			$("#product_info").text("15 dakika uçuş süresi ve 1.3 kg faydalı yük kapasitesine sahip tam otonom döner kanatlı İHA. Elektromıknatıslı yük bırakma mekanizması, Raspberry Pi ve Global Shutter kamera entegrasyonu ile otonom rota takibi, alan taraması ve nesne tespiti gerçekleştirir.");
			$("#product_join_btn").attr("href", "../our_team/index.html?vehicle=Dronox#basvuru");
			$(".swiper_slide_img:eq(0), .trans_button_img:eq(0)").attr("src", "./files/photos/drone_photo.jpg");
			$(".swiper_slide_img:eq(1), .trans_button_img:eq(1)").attr("src", "./files/photos/drone_photo_2.jpg");
			$(".swiper_slide_img:eq(2), .trans_button_img:eq(2)").attr("src", "./files/photos/drone_photo_3.jpg");
			$(".swiper_slide_img:eq(3), .trans_button_img:eq(3)").attr("src", "./files/photos/drone_photo_4.jpg");
		}

		$(".main_container_card").each(function() {
			if ($(this).attr("data-product") === cleanSlug) {
				$(this).hide();
			} else {
				$(this).css("display", "flex");
			}
		});
		$(".main_container_card_outer").addClass("two_cols_desktop");

		if (mySwiper) {
			mySwiper.update();
			mySwiper.slideTo(0, 0);
			changeTransClick(old_active_index, 0);
			old_active_index = 0;
		}
	} else {
		$(".container_1").css("display", "none");
		$("#products_list_heading").text("ÜRÜNLERİMİZ");
		$(".main_container_card").css("display", "flex");
		$(".main_container_card_outer").removeClass("two_cols_desktop");
	}
}

function openProduct(slug) {
	if (window.history && window.history.pushState) {
		window.history.pushState({ product: slug }, "", "?" + slug);
	}
	renderProductDetail(slug);
	$("html, body").stop().animate({ scrollTop: 0 }, 300);
}

function getSlugFromUrl() {
	var url = window.location.href;
	var params = url.split('?')[1];
	if (params) {
		return params.split('#')[0].split('&')[0].split('=')[0].toLowerCase();
	}
	return "";
}

$(document).ready(function() {
	renderProductDetail(getSlugFromUrl());

	mySwiper = new Swiper('.swiper-container', {
		speed: 300,
		slidesPerView: 1,
		observer: true,
		observeParents: true,
		rewind: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		keyboard: {
			enabled: true,
			onlyInViewport: false
		}
	});

	$(".trans_click").on('click', function() {
		var index = parseInt($(this).attr('id').slice(11, 12), 10);
		if (index === mySwiper.activeIndex)
			return;
		mySwiper.slideTo(index);
	});

	mySwiper.on('slideChange', function() {
		changeTransClick(old_active_index, mySwiper.activeIndex);
		old_active_index = mySwiper.activeIndex;
	});

	$(window).on('popstate', function() {
		renderProductDetail(getSlugFromUrl());
	});

	beReadyPage();
});

$(window).resize(function() {
	beReadyPage();
});

function beReadyPage() {
	window_height = parseInt($(window).height(), 10);
	window_width = parseInt($(window).width(), 10);
	if (ismenuopen && window_width > 1100) {
		openLeftMenu();
	}
}

function openLeftMenu() {
	$(".fixed_menu_all_buttons_cont").stop();
	$(".menu_closer").stop();
	$('.fixed_menu_all_buttons_cont').animate(
		{ left: ismenuopen ? -280 : 0 }, 220
	);

	if (ismenuopen) {
		$(".menu_closer").fadeOut(200);
		$(".menu_opener").removeClass('fa-xmark').addClass('fa-solid fa-bars');
		$("html, body").css("overflow-y", "auto");
	} else {
		$(".menu_closer").fadeIn(200);
		$(".menu_opener").removeClass('fa-bars fa').addClass('fa-solid fa-xmark');
		$("html, body").css("overflow-y", "hidden");
	}

	ismenuopen = !ismenuopen;
}
