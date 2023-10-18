//Copyright 2023 Kaya Sertel. All Rights Reserved.
var ismenuopen = false;
var is_member_open = false, is_sponsor_open = false;
var st;
var window_height, window_width, old_active_index = 0;
var is_mobile_phone = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;

$( document ).ready(function() {
	var mySwiper = new Swiper('.swiper-container', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		autoplay: {
			delay: 3000, // change delay as needed
		},
		/*on: {
			slideNextTransitionEnd: (swiper) => {
				//console.log('SWIPED RIGHT');
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
				//console.log('SWIPED LEFT');
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
	$( ".fixed_menu_right_cont" ).hover(
  function() {
    $( ".settings_button_top" ).addClass( "fa-spin" );
  }, function() {
    $( ".settings_button_top" ).removeClass( "fa-spin" );
  }
);
	
	


	
	$(".fixed_menu_button").on('click', function(){
		$('html, body').stop();
		var button_index = $(this).attr('id').slice(15, 16);
		ScrollPart(button_index);
		//console.log($(".main_container_2:eq(" + (button_index) + ")").offset().top);
		
		if(ismenuopen)
			openLeftMenu();
		//console.log($(this).eq(1));
	});
	

	
	function changeTransClick(old_index, new_index) {
		var elementID = "transClick_";
		document.getElementById(elementID + old_index).className = "trans_click";
		document.getElementById(elementID + new_index).className = "trans_click trans_active";
	}
	
	$(".left_right_buttons_swipper").on('click', function(){
		setTimeout(function() { mySwiper.autoplay.start();}, 6000);
	});
	
	$(".trans_click").on('click', function(){
		var index = $(this).attr('id').slice(11, 12);
		if(index == mySwiper.realIndex)
			return;
		mySwiper.slideToLoop(index);
	});
	
	beReadyPage();
	
	
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
			mySwiper.autoplay.stop();
		}
		else {
			mySwiper.autoplay.start();
		}
	});
	
	var mySwiper = $(".swiper-container")[0].swiper;
	//mySwiper.autoplay.stop();
	mySwiper.autoplay.start();
	$('.go_furniture_detail_a').mouseenter(function() {
		mySwiper.autoplay.stop();
	}).mouseleave(function() {
		mySwiper.autoplay.start();
	})
	
	mySwiper.on('slideChange', function () {
		if (mySwiper.autoplay.running) {
			//console.log('Slide changed automatically');
		} else {
			mySwiper.autoplay.stop();
			setTimeout(function() { mySwiper.autoplay.start();}, 6000);
			//console.log('Slide changed by user');
		}
		
		mySwiper.slideToLoop(mySwiper.realIndex);
		changeTransClick(old_active_index, mySwiper.realIndex);
		old_active_index = mySwiper.realIndex;
			
	});
});


	function ScrollPart(index) {
		$('html, body').animate({scrollTop: $(".main_container_2:eq(" + index + ")").offset().top - $(".fixed_menu_top").height()}, 400);
	}



	function OpenCloseForm(num) {
		if(num == 2) {
			if(is_sponsor_open) {
			
				$('#sponsorship_cont_outer').css("height", "");
				$('#sponsorship_cont').css("display", "");
				$('.sponsorship_form_iframe_outer').css("display", "");

			} else {
				$('#sponsorship_cont_outer').css("height", "1600px");
				$('#sponsorship_cont').css("display", "none");
				$('.sponsorship_form_iframe_outer').css("display", "flex");

			}

			is_sponsor_open = !is_sponsor_open;
		
		} else {
			if(is_member_open) {
			
				$('#membership_cont_outer').css("height", "");
				$('#membership_cont').css("display", "");
				$('.membership_form_iframe_outer').css("display", "");

			} else {
				$('#membership_cont_outer').css("height", "3400px");
				$('#membership_cont').css("display", "none");
				$('.membership_form_iframe_outer').css("display", "flex");

			}

			is_member_open = !is_member_open;
		}
}

//if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {
	$(window).scroll(function(event){
		st = $(this).scrollTop();
		//$(".main_container_2_bg_photo").css("top", (st*(150.0/(window_height*2))-150));
		st - $("#sliding_photo_1").offset().top
		$("#sliding_photo_1").css('transform', 'translate3d(0px, ' + (st/1*(150.0/(window_height*2))-150) + 'px, 0px)');
		$("#sliding_photo_2").css('transform', 'translate3d(0px, ' + (st/2*(150.0/(window_height*2))-150) + 'px, 0px)');
		$("#sliding_photo_3").css('transform', 'translate3d(0px, ' + (st/3*(150.0/(window_height*2))-150) + 'px, 0px)');
		$("#sliding_photo_4").css('transform', 'translate3d(0px, ' + (st/4*(150.0/(window_height*2))-150) + 'px, 0px)');
		$("#sliding_photo_5").css('transform', 'translate3d(0px, ' + (st/5*(150.0/(window_height*2))-150) + 'px, 0px)');
		
		var lastbtnindex = 0, newbtnindex = 0;
		console.log($(".main_container_2").length);
		while(st - $(".main_container_2:eq(" + newbtnindex + ")").offset().top + $(".fixed_menu_top").height() >= -1) {
			newbtnindex++;
			if($(".main_container_2").length == newbtnindex)
				break;
		}
		//newbtnindex = Math.floor(st/(window_height - 60)) + 1;
		
		if(lastbtnindex != newbtnindex) {
			$(".fixed_menu_button").removeClass("fixed_menu_button_selected");
			$(".fixed_menu_button:eq( " + newbtnindex + " )").addClass("fixed_menu_button_selected");
			lastbtnindex = newbtnindex;
		}
		
		
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
	$(".swiper-container-wrapper").css("height", window_height - parseInt($( ".fixed_menu_top" ).height()));
	//$(".main_container_2").css("height", window_height);
	$(".main_container_2_bg_photo").css("height", window_height + 150);
	//$(".main_container_2_bg_photo").css("height", window_width);
	
	st = $(window).scrollTop();
	$(".main_container_2_bg_photo").css('transform', 'translate3d(0px, ' + (st*(150.0/(window_height*2))-150) + 'px, 0px)');
		$("#map1").css("height", window_height - $(".social_and_text_part").outerHeight( true ) - $(".copywrite_part").outerHeight( true ) - $(".fixed_menu_top").height() - 40);
	
	if(window_width < 620) { 
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
		console.log(is_mobile_phone);
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

/*setTimeout(function() { changeImgg(); }, 5000);

function changeImgg() {
	if(is_change_on_going && !is_trans_button_clicked)
		transImg(transNum+1);
	is_trans_button_clicked = false;
	setTimeout(function() { changeImgg(); }, 5000);
}*/

setTimeout(function() { beReadyPage();}, 200);
setTimeout(function() { beReadyPage();}, 500);
