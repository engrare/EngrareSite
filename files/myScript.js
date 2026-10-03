// Copyright 2025 ENGRARE. All Rights Reserved.
var ismenuopen = false;
var st;
var window_height, window_width, old_active_index = 0, formnum = -1;
var is_mobile_phone = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;

function topMenuGo(num) {
	$('html, body').stop();
	ScrollPart(num);
	if (ismenuopen)
		openLeftMenu();
}

$.fn.multiline = function(text) {
	this.text(text);
	this.html(this.html().replace(/\n/g, '<br/>'));
	return this;
};

function ScrollToSection(selector) {
	if (ismenuopen)
		openLeftMenu();
	var $target = $(selector);
	if ($target.length) {
		var navHeight = $('.fixed_menu_top').outerHeight() || 60;
		$('html, body').animate({
			scrollTop: Math.max(0, $target.offset().top - navHeight)
		}, 450);
	}
}

function ScrollPart(index) {
	if (ismenuopen)
		openLeftMenu();

	var navHeight = $('.fixed_menu_top').outerHeight() || 60;
	var scroll_pos = 0;

	if (index == 1) {
		scroll_pos = 0;
	} else if (index == 2) {
		var $ref = $('#ref_section');
		scroll_pos = $ref.length ? ($ref.offset().top - navHeight) : ($('body').height() - window_height);
	} else {
		var $contact = $('#contact_section');
		scroll_pos = $contact.length ? ($contact.offset().top - navHeight) : ($('body').height() - window_height);
	}

	$('html, body').animate({ scrollTop: Math.max(0, scroll_pos) }, 450);
}

$(document).ready(function() {
	var mySwiper = new Swiper('.swiper-container', {
		slidesPerView: 1,
		observer: true,
		observeParents: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		autoplay: {
			delay: 4500,
			disableOnInteraction: false
		},
		loop: true
	});

	function changeTransClick(old_index, new_index) {
		var oldEl = document.getElementById("transClick_" + old_index);
		var newEl = document.getElementById("transClick_" + new_index);
		if (oldEl) oldEl.className = "trans_click";
		if (newEl) newEl.className = "trans_click trans_active";
	}

	$(".trans_click").on('click', function() {
		var index = parseInt($(this).attr('id').slice(11, 12), 10);
		if (index === mySwiper.realIndex)
			return;
		mySwiper.slideToLoop(index);
	});

	beReadyPage();

	$(window).scroll(function() {
		if ($(this).scrollTop() > window_height) {
			mySwiper.autoplay.stop();
		} else {
			mySwiper.autoplay.start();
		}
	});

	$('.go_furniture_detail_a').mouseenter(function() {
		mySwiper.autoplay.stop();
	}).mouseleave(function() {
		mySwiper.autoplay.start();
	});

	mySwiper.on('slideChange', function() {
		changeTransClick(old_active_index, mySwiper.realIndex);
		old_active_index = mySwiper.realIndex;
	});

	var url = window.location.href;
	var params = url.split('?')[1];
	if (params) {
		var cleanParam = params.split('#')[0];
		if (cleanParam === "ref") {
			setTimeout(function() { ScrollPart(2); }, 200);
		} else if (cleanParam === "contact") {
			setTimeout(function() { ScrollPart(3); }, 200);
		}
	}
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
