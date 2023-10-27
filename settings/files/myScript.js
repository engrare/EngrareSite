//Copyright 2023 Kaya Sertel. All Rights Reserved.
var ismenuopen = false;
var is_member_open = false, is_sponsor_open = false;
var st;
var window_height, window_width, old_active_index = 0;
var is_mobile_phone = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;

var usernames = [];
var passwords = [];
var encrypted_key = null;
var final_repo_key;
var JSONdata = null;
const key_cookie = "repokeycookie";
//var final_repo_key = "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";

function encodeString(inputString, shiftString) {
  let encodedString = '';

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString.charAt(i);
    const charCode = char.charCodeAt(0);

    const shiftChar = shiftString.charAt(i % shiftString.length);
    const shiftValue = shiftChar.charCodeAt(0);

    // Calculate the shifted character and ensure it's within the ASCII range (32-126)
    let shiftedCharCode = charCode + shiftValue;

    // Ensure the shifted character is within the ASCII range (32-126)
    while (shiftedCharCode > 126) {
      shiftedCharCode -= 95;
    }

    while (shiftedCharCode < 32) {
      shiftedCharCode += 95;
    }

    // Check if the shifted character is a double-quote (") and adjust it
    if (shiftedCharCode === 34) {
      shiftedCharCode++;
      // Ensure it's still within the ASCII range (32-126)
      if (shiftedCharCode > 126) {
        shiftedCharCode = 32;
      }
    }

    // Append the shifted character to the encoded string
    encodedString += String.fromCharCode(shiftedCharCode);
  }

  return encodedString;
}

function decodeString(encodedString, shiftString) {
  let decodedString = '';

  for (let i = 0; i < encodedString.length; i++) {
    const char = encodedString.charAt(i);
    const charCode = char.charCodeAt(0);

    const shiftChar = shiftString.charAt(i % shiftString.length);
    const shiftValue = shiftChar.charCodeAt(0);

    // Reverse the shifting to get the original character
    let originalCharCode = charCode - shiftValue;

    // Ensure the original character is within the ASCII range (32-126)
    while (originalCharCode > 126) {
      originalCharCode -= 95;
    }

    while (originalCharCode < 32) {
      originalCharCode += 95;
    }

    // Check if the original character is a double-quote (") and adjust it
    if (originalCharCode === 34) {
      originalCharCode--;
      // Ensure it's still within the ASCII range (32-126)
      if (originalCharCode < 32) {
        originalCharCode = 126;
      }
    }

    // Append the original character to the decoded string
    decodedString += String.fromCharCode(originalCharCode);
  }

  return decodedString;
}



function repoGetRestrictedData(real_key, state) {
    // const apiKey = "ghp_asdafadgsfgadfadsadasd"; // Replace with your actual GitHub API key
    const apiKey = real_key; // Replace with your actual GitHub API key
    const repoOwner = "eylulberil";
    const repoName = "ristrecded-engrare-data";
    const filePath = "data.json";
    const branchName = "main";

    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=${branchName}`;

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${apiKey}`);

    fetch(url, { headers })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Request failed with status: ${response.status}`);
            }
        })
        .then(data => {
            const content = data.content;
            // Explicitly set character encoding to handle special characters
            const decodedContent = decodeBase64Content(content);
            const gottenjsonData = JSON.parse(decodedContent);
			if(readCookie(key_cookie) == "") {
				menuState(2);
				setCookie(key_cookie, real_key, 365);
			}
			JSONdata = gottenjsonData;
        })
        //.catch(error => $( "#login_warning_msg" ).text("giriş bilgisi hatalı.").show().fadeOut(1500));
        .catch(error => {
    console.log(error);
    	$( "#login_warning_msg" ).text("giriş bilgisi hatalı.").show().fadeOut(1500);
	});
}

function decodeBase64Content(content) {
    const decoded = atob(content);
    // Convert the decoded content to UTF-8
    const text = new TextDecoder("utf-8").decode(new Uint8Array(decoded.split('').map(c => c.charCodeAt(0))));

    return text;
}


fetch('https://raw.githubusercontent.com/eylulberil/encoded_key/main/keys.json')
  .then(response => response.json())
  .then(myObj => {
	//var objlen = Object.keys(myObj).length;
	//console.log(objlen);
	//console.log(myObj[1].username);
	
	
	/*for(var i = 0; i < objlen; i++) {
		usernames.push(myObj[i].username);
		passwords.push(myObj[i].password);
	}
	
	console.log(usernames);*/
	encrypted_key = myObj[0];
	console.log(encrypted_key);
	
  })
  .catch(error => {
    // Handle any errors that occur during the fetch request
    console.log('Error:', error);
  });
	
	
function menuState(state) {
	if(state == 0) {
		$( "#login_part" ).css( "display", "none" );
		$( "#loading_part" ).css( "display", "flex" );
		$( "#main_menu" ).css( "display", "none" );
		
	} else if(state == 1) {
		$( "#login_part" ).css( "display", "flex" );
		$( "#loading_part" ).css( "display", "none" );
		$( "#main_menu" ).css( "display", "none" );
	} else if(state == 2) {
		$( "#login_part" ).css( "display", "none" );
		$( "#loading_part" ).css( "display", "none" );
		$( "#main_menu" ).css( "display", "flex" );
		
	}
	
}




$( document ).ready(function() {
	$( ".fixed_menu_right_cont" ).hover(
  function() {
    $( ".settings_button_top" ).addClass( "fa-spin" );
  }, function() {
    $( ".settings_button_top" ).removeClass( "fa-spin" );
  }
);

	console.log(readCookie("repokeycookie"));
	
if(readCookie("repokeycookie") == "") {
	menuState(1);
} else {
	menuState(2);
}


	
	$(".fixed_menu_button").on('click', function(){
		$('html, body').stop();
		var button_index = $(this).attr('id').slice(15, 16);
		ScrollPart(button_index);
		//console.log($(".main_container_2:eq(" + (button_index) + ")").offset().top);
		
		if(ismenuopen)
			openLeftMenu();
		//console.log($(this).eq(1));
	});
	
	$(".trans_click").on('click', function(){
		var index = $(this).attr('id').slice(11, 12);
		if(index == mySwiper.realIndex)
			return;
		mySwiper.slideToLoop(index);
	});
	
	beReadyPage();
	
	
	
	$(window).scroll(function(event){
		if($(this).scrollTop() > window_height) {
		}
		else {
		}
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
				$('.sponsorship_form_iframe_outer').fadeOut(500);

			} else {
				$('#sponsorship_cont_outer').css("height", "auto");
				$('#sponsorship_cont').css("display", "none");
				$('.sponsorship_form_iframe_outer').fadeIn(500);
				$('.sponsorship_form_iframe_outer').css("display", "flex");
				

			}

			is_sponsor_open = !is_sponsor_open;
		
		} else {
			if(is_member_open) {
			
				$('#membership_cont_outer').css("height", "");
				$('#membership_cont').css("display", "");
				$('.membership_form_iframe_outer').fadeOut(500);

			} else {
				$('#membership_cont_outer').css("height", "auto");
				$('#membership_cont').css("display", "none");
				$('.membership_form_iframe_outer').fadeIn(500);
				$('.membership_form_iframe_outer').css("display", "flex");

			}

			is_member_open = !is_member_open;
		}
}


function GoToSettingsPage() {
	//window.location.href = window.location.href + "../settings/set.html";
	
}

function loginPressed() {
	if(encrypted_key != null) {
		let key = $( "#password" ).first().val();
		if(key.length) {
			console.log(key);
			final_repo_key = decodeString(encrypted_key, key);
			console.log(final_repo_key);
			repoGetRestrictedData(final_repo_key, 1);
		}
	}
	else
		setTimeout(function() { loginPressed(); }, 500);
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

$(document).keydown(function(e) {
	if(e.keyCode == 13) {
		loginPressed();
	}
});


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
			//$(".main_div").css("width", "100%");
			//$(".fixed_menu_right_cont").css("width", parseInt($( ".fixed_menu_right_cont" ).width()) - 14);
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
			//$(".main_div").css("width", "calc(100% - 14px)");
			//$(".fixed_menu_right_cont").css("width", parseInt($( ".fixed_menu_right_cont" ).width()) + 14.5);
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


function deleteCookie(cookieName) {
    document.cookie = cookieName + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function readCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function Logout() {
	deleteCookie(key_cookie);
	menuState(1);
}

