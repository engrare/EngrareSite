//Copyright 2023 Kaya Sertel. All Rights Reserved.
var ismenuopen = false;
var st;
var window_height, window_width, old_active_index = 0;
var is_mobile_phone = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;

var temp_acc_id;
var temp_web_id;
var is_acc_edit = false;
var encrypted_key = null;
var JSONdata = null;
var websiteJSON = null;
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



function repoGetRestrictedData(real_key) {
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
	encrypted_key = myObj[0];
	console.log(encrypted_key);
	
  })
  .catch(error => {
    // Handle any errors that occur during the fetch request
    console.log('Error:', error);
  });


fetch('https://raw.githubusercontent.com/eylulberil/engrare-data/main/data.json')
  .then(response => response.json())
  .then(myObj => {
	websiteJSON = myObj;
	var objlen = websiteJSON.website.slide.content.length;
	for(var i = 0; i < objlen; i++) {
		if(i > 0) {
			$( '#slayt_select_num_' + (i - 1)).clone().insertAfter( '#slayt_select_num_' + (i - 1) ).prop('id', 'slayt_select_num_' + i).text(i + 1).attr("onclick","numSelectionChange('#slayt_select_num_" + i + "')");
		}
		//$('#main_container_' + i).children( ".main_container_2_text_part" ).children( "#content_part" ).text(website_data_obj.website.corner[i].text);
	}
	
	objlen = websiteJSON.website.corner.length;
	
	for(var i = 0; i < objlen; i++) {
		if(i > 0) {
			$( '#container_select_num_' + (i - 1)).clone().insertAfter( '#container_select_num_' + (i - 1) ).prop('id', 'container_select_num_' + i).text(i + 1).attr("onclick","numSelectionChange('#container_select_num_" + i + "')");
		}
	}
	//websiteJSON.website.slide.content.length
	
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
		repoGetRestrictedData(readCookie("repokeycookie"));
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
		$( "#tw_nick" ).text(JSONdata.account.twitterX.nickname);
		$( "#tw_pass" ).text(JSONdata.account.twitterX.password);
		$( "#map_link" ).text(JSONdata.account.maps.link);
		$( "#ig_nick" ).text(JSONdata.account.instagram.nickname);
		$( "#ig_pass" ).text(JSONdata.account.instagram.password);
		$( "#mail_address" ).text(JSONdata.account.mail.nickname);
		$( "#mail_pass" ).text(JSONdata.account.mail.password);
		$( "#dc_nick" ).text(JSONdata.account.discord.nickname);
		$( "#dc_pass" ).text(JSONdata.account.discord.password);
		$( "#git_name" ).text(JSONdata.account.github.nickname);
		$( "#git_pass" ).text(JSONdata.account.github.password);
		$( "#spoti_name" ).text(JSONdata.account.spotify.nickname);
		$( "#spoti_pass" ).text(JSONdata.account.spotify.password);
		
		
	} else if(state == 5) {
		$( "#buttons_outer_div" ).css( "display", "flex" );
		$( "#fixed_menu_but_5" ).addClass("fixed_menu_button_selected");
	}
	
}


function numSelectionChange(elementid) {
	temp_web_id = elementid;
	$(".num_selection_button").removeClass("num_btn_selected");
	$(elementid).addClass( "num_btn_selected" );
	$(".website_edit_info_part").css("display", "flex");
	
	
	var strlength = elementid.length;
	element_index = elementid.substr(strlength - 1, strlength);
	
	if(strlength == 19) {
		$("#websiteNameInput").val(websiteJSON.website.slide.name);
		$("#websiteHeaderInput").val(websiteJSON.website.slide.content[element_index].header);
		$("#websiteTextInput").val("");
		$("#websitebtntextInput").val(websiteJSON.website.slide.content[element_index].buttontext);
		$("#websitewheretogoInput").val(websiteJSON.website.slide.content[element_index].gocorner);
		$("#websitebgLinkInput").val(websiteJSON.website.slide.content[element_index].bgimglink);
	} else {
		$("#websiteNameInput").val(websiteJSON.website.corner[element_index].name);
		$("#websiteHeaderInput").val(websiteJSON.website.corner[element_index].header);
		$("#websiteTextInput").val(websiteJSON.website.corner[element_index].text);
		$("#websitebtntextInput").val(websiteJSON.website.corner[element_index].buttontext);
		$("#websitewheretogoInput").val(websiteJSON.website.corner[element_index].btnlink);
		$("#websitebgLinkInput").val(websiteJSON.website.corner[element_index].bgimglink);
	}
	
	createPreview(elementid);
	//$("#websiteNameInput").text(websiteJSON.website.corner[].name);
	
	//
	//$(".website_edit_info_part").css("display", "flex");
}

function createPreview(elementid) {
	var strlength = elementid.length;
	element_index = elementid.substr(strlength - 1, strlength);
	
	if(strlength == 19) {
		$(".go_furniture_detail_cont_1").css("display", "");
		$("#cont_header").css("display", "none");
		$("#cont_text").css("display", "none");
		$("#go_detail_button_preview").css("display", "none");
		$("#main_container_2_text_part_mini").css("justify-content", "");
		$(".img_slogan_txt").multiline(websiteJSON.website.slide.content[element_index].header);
		$("#slide_textbox").multiline(websiteJSON.website.slide.content[element_index].buttontext);
		$('#preview_bg_img').attr('src', "");
		$('#preview_bg_img').attr('src', websiteJSON.website.slide.content[element_index].bgimglink);
	} else {
		$(".go_furniture_detail_cont_1").css("display", "none");
		$("#cont_header").css("display", "");
		$("#cont_text").css("display", "");
		if(websiteJSON.website.corner[element_index].buttontext != "")
			$("#go_detail_button_preview").css("display", "");
		else 
			$("#go_detail_button_preview").css("display", "none");
		$("#main_container_2_text_part_mini").css("justify-content", "center");
		$("#cont_header").multiline(websiteJSON.website.corner[element_index].header);
		$("#cont_text").multiline(websiteJSON.website.corner[element_index].text);
		$("#cont_textbox").multiline(websiteJSON.website.corner[element_index].buttontext);
		$('#preview_bg_img').attr('src', "");
		$('#preview_bg_img').attr('src', websiteJSON.website.corner[element_index].bgimglink);
	}
}

$.fn.multiline = function(text){
    this.text(text);
    this.html(this.html().replace(/\n/g,'<br/>'));
    return this;
}

function submitOneWebPart() {
	
	var strlength = temp_web_id.length;
	element_index = temp_web_id.substr(strlength - 1, strlength);
	
	if(strlength == 19) {
		websiteJSON.website.slide.name = $("#websiteNameInput").val();
		websiteJSON.website.slide.content[element_index].header = $("#websiteHeaderInput").val();
		websiteJSON.website.slide.content[element_index].buttontext = $("#websitebtntextInput").val();
		websiteJSON.website.slide.content[element_index].gocorner = $("#websitewheretogoInput").val();
		var link_temp = $("#websitebgLinkInput").val();
		if(!link_temp.includes("https://drive.google.com/uc?export=view&id=")) {
			websiteJSON.website.slide.content[element_index].bgimglink = "https://drive.google.com/uc?export=view&id=" + link_temp.slice(link_temp.indexOf("/d/") + 3, link_temp.lastIndexOf("/"));
			//console.log(websiteJSON.website.slide.content[element_index].bgimglink);
		} else {
			websiteJSON.website.slide.content[element_index].bgimglink = link_temp;
		}
	} else {
		websiteJSON.website.corner[element_index].name = $("#websiteNameInput").val();
		websiteJSON.website.corner[element_index].header = $("#websiteHeaderInput").val();
		websiteJSON.website.corner[element_index].text = $("#websiteTextInput").val();
		websiteJSON.website.corner[element_index].buttontext = $("#websitebtntextInput").val();
		websiteJSON.website.corner[element_index].btnlink = $("#websitewheretogoInput").val();
		var link_temp = $("#websitebgLinkInput").val();
		if(!link_temp.includes("https://drive.google.com/uc?export=view&id=")) {
			websiteJSON.website.corner[element_index].bgimglink = "https://drive.google.com/uc?export=view&id=" + link_temp.slice(link_temp.indexOf("/d/") + 3, link_temp.lastIndexOf("/"));
			console.log(websiteJSON.website.corner[element_index].bgimglink);
		} else {
			websiteJSON.website.corner[element_index].bgimglink = link_temp;
		}
	}
	
	
	createPreview(temp_web_id);
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
	
	
	
	$(".copy_button").on('click', function(){
		if(!is_acc_edit) {
			copyToClipboard("#" + $(this).attr('id'));
		} else {
			$("#editing_div").css("display", "flex");
			temp_acc_id = "#" + $(this).parent().attr("id");
			$("#account_adding_info").text("Editing: " + $(temp_acc_id).children(".social_header").text());
			$("#AccountNameInput").attr("placeholder", $(temp_acc_id).children(".copy_button:eq(0)").text());
			$("#AccountPassInput").attr("placeholder", $(temp_acc_id).children(".copy_button:eq(1)").text());
		}
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
			var final_repo_key = decodeString(encrypted_key, key);
			console.log(final_repo_key);
			repoGetRestrictedData(final_repo_key);
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


function copyToClipboard(element) {
	var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
  
}

function accEditMode() {
	if(!is_acc_edit) {
		$("#social_media_edit_button").text("Stop Editing");
		
	} else {
		$("#social_media_edit_button").text("Editle");
		$("#editing_div").css("display", "none");
	}
		
	
	
	is_acc_edit = !is_acc_edit;
}


function submitACC_JSON() {
	
	JSONdata.account.twitterX.nickname = $( "#tw_nick" ).text();
	JSONdata.account.twitterX.password = $( "#tw_pass" ).text();
	JSONdata.account.maps.link = $( "#map_link" ).text();
	JSONdata.account.instagram.nickname = $( "#ig_nick" ).text();
	JSONdata.account.instagram.password = $( "#ig_pass" ).text();
	JSONdata.account.mail.nickname = $( "#mail_address" ).text();
	JSONdata.account.mail.password = $( "#mail_pass" ).text();
	JSONdata.account.discord.nickname = $( "#dc_nick" ).text();
	JSONdata.account.discord.password = $( "#dc_pass" ).text();
	JSONdata.account.github.nickname = $( "#git_name" ).text();
	JSONdata.account.github.password = $( "#git_pass" ).text();
	JSONdata.account.spotify.nickname = $( "#spoti_name" ).text();
	JSONdata.account.spotify.password = $( "#spoti_pass" ).text();
	uploadJSON(JSONdata, readCookie(key_cookie));
}


function submitOneAcc() {
	if($('#AccountNameInput').val() != "")
		$(temp_acc_id).children(".copy_button:eq(0)").text($('#AccountNameInput').val());
	if($('#AccountPassInput').val() != "")
		$(temp_acc_id).children(".copy_button:eq(1)").text($('#AccountPassInput').val());
	$("#editing_div").css("display", "none");
}

function cancelWebsiteEdit() {
	$(".website_edit_info_part").css("display", "none");
	$(".num_selection_button").removeClass( "num_btn_selected" );
}

function SubmitWebContentJSON() {
	uploadJSON(websiteJSON, readCookie(key_cookie), 1);
}


function uploadJSON(json_object, key, isWebUpload) {
  // Update the data as desired
  /*const updatedData = {
    someKey: 'çok seviyorum'
  };*/

  //const token = 'ghp_ıaıjdfıoahjıthfq3hıahgıahegıfhıaehgodebngo';
  var token = key;
  const repoOwner = 'eylulberil';
  var repoName = 'ristrecded-engrare-data';
  var filePath = './data.json';
	if(arguments.length == 3) {
	  var repoName = 'engrare-data';
	  var filePath = './data.json';
	}

  // Convert the updated data to JSON
  const updatedJsonData = JSON.stringify(json_object, null, 2);

  // Fetch the current file details, including SHA
  fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      if (response.ok) {
		  return response.json();
      } else {
		throw new Error('Failed to fetch file details');
      }
    })
    .then((fileData) => {
      const currentSHA = fileData.sha;

      // Remove backslashes before quotes
      //const contentWithoutBackslashes = updatedJsonData.replace(/\\/g, '').replace(/^"(.*)"$/, '$1');
      //const contentWithoutBackslashes = updatedJsonData.replace(/^"(.*)"$/, '$1');
      const contentWithoutBackslashes = updatedJsonData;

      // Encode the JSON data to base64
      const encoder = new TextEncoder();
      const data = encoder.encode(contentWithoutBackslashes);
      const contentBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));

      // Make an HTTP request to update the file
      return fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update JSON file',
          content: contentBase64,
          sha: currentSHA
        })
      });
    })
    .then((response) => {
      if (response.ok) {
        console.log('JSON file updated successfully');
		  $("#warning_for_acc_upload").text("Başarıyla güncelleme yapıldı.").show().fadeOut(1500);
		  return 0;
      } else {
		  $("#warning_for_acc_upload").text("Güncelleme başarısız oldu.").show().fadeOut(1500);
        throw new Error('Failed to update JSON file');
		  return 1;
      }
    })
    .catch((error) => {
	  ("#warning_for_acc_upload").text("Güncelleme başarısız oldu.").show().fadeOut(1500);
      console.error('Error updating JSON file:', error.message);
    });
}
