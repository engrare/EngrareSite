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

    	$( "#login_warning_msg" ).text("Giriş bilgisi hatalı.").show().fadeOut(1500);
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
	
	

function menuStateButton(state) {
	if(readCookie("repokeycookie") == "") {
		menuState(1);
	} else {
		menuState(state);
	}
}

function menuState(state) {
	$( "#buttons_outer_div, #main_menu, #login_part, #loading_part, #website_design_outer, #social_media_acc_outer" ).css( "display", "none" );
	$( ".fixed_menu_button" ).removeClass('fixed_menu_button_selected');
	
	if(state == 0) {
		$( "#loading_part" ).css( "display", "flex" );
		$( "#fixed_menu_but_2" ).addClass("fixed_menu_button_selected");
	} else if(state == 1) {
		$( "#login_part" ).css( "display", "flex" );
		$( "#fixed_menu_but_2" ).addClass("fixed_menu_button_selected");
	} else if(state == 2) {
		$( "#main_menu" ).css( "display", "flex" );
		$( "#fixed_menu_but_2" ).addClass("fixed_menu_button_selected");
	} else if(state == 3) {
		$( "#website_design_outer" ).css( "display", "flex" );
		$( "#fixed_menu_but_3" ).addClass("fixed_menu_button_selected");
		
	} else if (state == 4) {
		$( "#social_media_acc_outer" ).css( "display", "flex" );
		$( "#fixed_menu_but_4" ).addClass("fixed_menu_button_selected");
		
	} else if(state == 5) {
		$( "#buttons_outer_div" ).css( "display", "flex" );
		$( "#fixed_menu_but_5" ).addClass("fixed_menu_button_selected");
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
	
	menuStateButton(2);


	
	$(".fixed_menu_button").on('click', function(){
		$('html, body').stop();
		var button_index = $(this).attr('id').slice(15, 16);
		menuStateButton(button_index);
		//ScrollPart(button_index);
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
		
		
	});


//}

/*$(window).scroll(function(event){
	st = $(this).scrollTop();
	$(".main_container_2_bg_photo").css("top", (st*(150.0/(window_height*2))-150));
});*/

$(document).keydown(function(e) {
	var key = e.keyCode;
	
		switch(key) {
			case 13:
				loginPressed();
				break;
			case 87:

			case 38:
				PressGoButtons(1);
				break;
			case 65:
			case 37:
				PressGoButtons(2);
				break;
			case 68:
			case 39:
				PressGoButtons(4);
				break;
			case 83:
			case 40:
				PressGoButtons(5);
				break;
			case 32:
				PressGoButtons(3);
				break;
		}
	console.log(key);
});

function PressGoButtons(index) {
	$("#forward_button, #stop_button, #left_button, #right_button, #backward_button").css("color", "");
	var id;
	switch(index) {
		case 1:
			id = "#forward_button";
			break;
		case 2:
			id = "#left_button";
			break;
		case 3:
			id = "#stop_button";
			break;
		case 4:
			id = "#right_button";
			break;
		case 5:
			id = "#backward_button";
			break;
	}
	$(id).css("color", "red");
}


$( window ).resize(function() {
	beReadyPage();
	setTimeout(function() { beReadyPage();}, 100);
});



function beReadyPage() {
	window_height = parseInt($( window ).height());
	window_width = parseInt($( window ).width());
	if(ismenuopen) 
		$(".menu_closer").css("display", window_width > 1086 ? "none" : "block");
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
