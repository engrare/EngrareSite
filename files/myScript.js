/* Copyright 2023 Kaya Sertel. All Rights Reserved. */

body {
    margin: 0px !important;
	color: white;
	font-family: Atkinson Hyperlegible, sans-serif;
}

/* width */
::-webkit-scrollbar {
	display: block;
	position: relative;
	right: 2px;
	border-radius: 8px;
	border: solid  black 2px;
	width: 14.5px;
}

/* Track */
::-webkit-scrollbar-track {
	border-radius: 2px;
	background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
	border: solid #f1f1f1 3.5px;
	border-radius: 8px;
	background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555; 
}

.noselect {
  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}

p {
	text-align: center;
	font-family: Atkinson Hyperlegible, sans-serif;
}

.main_div {
	width: 100%;
	overflow-x: hidden;
	height: auto;
	position: relative;
	z-index: 0;
}

.fixed_menu_space {
	width: 100%;
	height: 40px;
}

.menu_closer {
	position: fixed;
	height: 100vh;
	width: 100vw;
	z-index: 9;
	display: none;
	background:rgba(0, 0, 0, 0.4);
}

.fixed_menu_top {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 40px;
	background: #000000;
    box-shadow: 0px 4px 0px 0px rgb(13 57 82 / 46%);
	z-index: 10;
}


.fixed_menu_cont {
	height: 100%;
	display: flex;
	justify-content: space-between;
}

.fixed_menu_button {
	display: flex;
	align-items: center;
	padding: 0px 14px;
	cursor: pointer;
	height: 100%;
}

.fixed_menu_button_selected {
	text-decoration: underline 3px;
}

.fixed_menu_left_cont {
	display: flex;
	border-radius: 0px 10px 10px 0px;
	overflow: hidden;
}

.fixed_menu_right_cont {
	border-radius: 10px 0px 0px 10px;
	overflow: hidden;
	display: none;
}

.notification_num {
	position: relative;
    top: 8px;
    right: -4px;
	border-radius: 20px;
	height: 13px;
	width: 13px;
	font-size: 13px;
	display: flex;
	align-items: center;
    justify-content: center;
}

/*.fixed_menu_button:hover {
	background: white;
	color: black;
}*/

.fixed_menu_button:hover {
	animation: button_background_hover_ani 0.2s ease-in-out;
	background: white;
	color: black;
}

@keyframes button_background_hover_ani {
	from {	
		background: black;
		color: white;
	}
	to {
		background: white;
		color: black;
	}
}

.bar_button {
	display: none;
	width: 24.5px;
	justify-content: center;
}

.fixed_menu_all_buttons_cont  {
	display: flex;
	overflow: hidden;
}

@media only screen and (max-width: 1100px) {
	.bar_button {
		display: flex;
	}
	
	.fixed_menu_all_buttons_cont {
		left: -200px;
		top: 90px;
		position: absolute;
		background: black;
		flex-direction: column;
		border-radius: 0px 20px 20px 0px;
	}
	
	.fixed_menu_right_cont  {
		display: block;
	}
}

.fixed_menu_logo_part {
	height: 100%;
	display: flex;
	align-items: center;
	position: relative;
	padding: 0px 20px;
}

.fixed_menu_logo_text_part {
	display: flex;
	align-items: center;
    flex-direction: column;
	margin-left: 5px;
}

.fixed_menu_logo_text {
	margin-block-start: 0em;
	margin-block-end: 0em;
}

.fixed_menu_logo_hr {
	width: 100%;
	margin-block-start: 0.1em;
    margin-block-end: 0.1em;
}

.menu_opener {
	font-size: 28px;
}

.search_logo {
	font-size: 20px;
	padding: 15px;
	padding-right: 15px;
	padding-top: 14px;
	
}



.navicon_button {
	cursor: pointer;
}

.top_button {
	position: fixed;
	bottom: 10px;
	right: 10px;
	cursor: pointer;
	display: block;
	z-index: 10;
}

.contect a {
	display: block;
}

.contect {
	white-space: nowrap;
	display: inline-flex;
	flex-direction: row-reverse;
}

.navicon_button {
	display: inline-block;
	cursor: pointer;
}



.close_button_all_screen {
	position: fixed;
	background-color: rgba(48, 48, 48);
	height: 100%;
	width: 100%;
	z-index: 7;
	opacity: 0.4;
	display: none;
}

.navicon_button_container {
	padding-top: 48px;
	    padding-left: 3px;
		
}

.bar1, .bar2, .bar3 {
  width: 39px;
  height: 6px;
  background-color: white;
  margin: 8px 0;
  transition: 0.4s;
  border-radius: 2px;
}
/*background-image: url("https://static.moooi.com/static/images/nav-button.png");*/
.navi_change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-12px, 10px);
  transform: rotate(-45deg) translate(-12px, 10px);
}

.navi_change .bar2 {opacity: 0;}

.navi_change .bar3 {
  -webkit-transform: rotate(45deg) translate(-9px, -6px);
  transform: rotate(45deg) translate(-9px, -6px);
}

.navi_change_2 .bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 8px);
  transform: rotate(-45deg) translate(-9px, 8px);
}

.navi_change_2 .bar2 {opacity: 0;}

.navi_change_2 .bar3 {
  -webkit-transform: rotate(45deg) translate(-7px, -5px);
  transform: rotate(45deg) translate(-7px, -5px);
}

.top_part_logo {
	color: white !important;
}


.fixed_menu_top a {
	border-radius: 8px;
	display: block;
	color: white;
	text-align: center;
	margin: 12px 20px;
	text-decoration: none;
	font-size: 25px;
	font-family: Bebas Neue, sans-serif;
	cursor: pointer;
}

.search_part_a {
	padding-top: 0px !important;
	padding-bottom: 0px !important;
	display: block;
}



@media only screen and (max-width: 350px) {
	.fixed_menu_top a {
		font-size: 13px;
		margin: 6px 1px;
	}
	.fixed_menu_top {
		height: 50px;
	}
	
	.main_container_2 {
		height: calc(100vh - 50px);
	}
	
	.fixed_menu_space {
		height: 50px;
	}
	
	.icon_top_div {
		width: 17px;
		padding: 5px;
	}
	.fixed_menu_container {
		margin-left: 2px;
		margin-right: 2px;
	}
	
	.top_part_logo {
		height: 30px;
		font-size: 15px;
	}
	
	.notification_number {
		left: 16px;
		top: 11px;
		font-size: 11px;
		height: 12px;
    width: 12px;
	}
	
	.small_slogan_text {
		font-size: 20px;
	}
	
	.big_slogan_text {
		font-size: 60px;
	}
			.small_slogan_text {
		font-size: 40px;
		margin-top: 5px;
		margin-bottom: 5px;
		-webkit-text-stroke: 1.5px black;
		text-shadow: 13px 13px 13px black,
        1px 1px 1px black,
	}
	
	.big_slogan_text {
		font-size: 70px;
		-webkit-text-stroke: 2px black;
		text-shadow: 1px 1px 1px black,
        1px 2px 1px black,
        1px 3px 1px black,
        1px 4px 1px black,
        1px 5px 1px black,
        1px 6px 1px black,
    1px 5px 6px rgba(16,16,16,0.4),
    1px 10px 10px rgba(16,16,16,0.2),
    1px 15px 35px rgba(16,16,16,0.2),
    1px 20px 60px rgba(16,16,16,0.4);
	}
}

@media only screen and (max-width: 600px) and (min-width: 351px){
	.fixed_menu_top a {
		font-size: 15px;
		margin: 6px 8px;
	}
	.fixed_menu_top {
		height: 45px;
	}
	
	
	
	.main_container_2 {
		height: calc(100vh - 45px);
	}
	
	.fixed_menu_space {
		height: 45px;
	}
	
	.icon_top_div {
		width: 19px;
		padding: 5px;
	}
	.fixed_menu_container {
		margin-left: 5px;
		margin-right: 5px;
	}
	
	.top_part_logo {
		height: 30px;
		font-size: 15px;
	}
	
	.notification_number {
		left: 19px;
		top: 13px;
		font-size: 14px;
		height: 16px;
		width: 16px;
	}
	
	.small_slogan_text {
		font-size: 30px;
	}
	
	.big_slogan_text {
		font-size: 100px;
	}
	
		.small_slogan_text {
		font-size: 40px;
		margin-top: 5px;
		margin-bottom: 5px;
		-webkit-text-stroke: 1.5px black;
		text-shadow: 13px 13px 13px black,
        1px 1px 1px black,
	}
	
	.big_slogan_text {
		font-size: 90px;
		-webkit-text-stroke: 3px black;
		text-shadow: 1px 1px 1px black,
        1px 2px 1px black,
        1px 3px 1px black,
        1px 4px 1px black,
        1px 5px 1px black,
        1px 6px 1px black,
        1px 7px 1px black,
        1px 8px 1px black,
    1px 10px 6px rgba(16,16,16,0.4),
    1px 15px 10px rgba(16,16,16,0.2),
    1px 20px 35px rgba(16,16,16,0.2),
    1px 25px 60px rgba(16,16,16,0.4);
	}
}

@media only screen and (min-width: 601px) and (max-width: 1000px) {/*1000px TEN SONRA ÇALIŞIR VE 601PX DE DURUR*/
	.fixed_menu_top a {
		font-size: 17px;
		margin: 6px 8px;
	}
	
	.fixed_menu_top {
		height: 55px;
	}
	
	.main_container_2 {
		height: calc(100vh - 55px);
	}
	
	.fixed_menu_space {
		height: 55px;
	}
	
	.icon_top_div {
		width: 22px;
		padding: 10px;
	}
	
	.fixed_menu_container {
		margin-left: 15px;
		margin-right: 15px;
	}
	
	.top_part_logo {
		height: 40px;
		font-size: 20px;
	}
	
	.notification_number {
		left: 27px;
		top: 20px;
		font-size: 14px;
		height: 16px;
		width: 16px;
	}
	
	.mini_logo_top {
		
	}
	
		
	.small_slogan_text {
		font-size: 40px;
		margin-top: 5px;
		margin-bottom: 5px;
		-webkit-text-stroke: 1.5px black;
		text-shadow: 13px 13px 13px black,
        1px 1px 1px black,
	}
	
	.big_slogan_text {
		font-size: 120px;
		-webkit-text-stroke: 3px black;
		text-shadow: 1px 1px 1px black,
        1px 2px 1px black,
        1px 3px 1px black,
        1px 4px 1px black,
        1px 5px 1px black,
        1px 6px 1px black,
        1px 7px 1px black,
        1px 8px 1px black,
        1px 9px 1px black,
    1px 15px 6px rgba(16,16,16,0.4),
    1px 20px 10px rgba(16,16,16,0.2),
    1px 23px 35px rgba(16,16,16,0.2),
    1px 28px 60px rgba(16,16,16,0.4);
	}
}
/*$(".fixed_menu_container").css("margin-right", 25);*/

@media only screen and (max-width: 1000px) { /*1000px TEN SONRA ÇALIŞIR VE 0PX E KADAR DEVAM EDER*/
	.search_part_a {
		display: none !important;
	}
	
	
}

@media only screen and (min-width: 1001px) { 
	.fixed_menu_container {
		margin-left: 50px;
		margin-right: 50px;
	}


	.notification_number {
		left: 38px;
		top: 30px;
		font-size: 17px;
		height: 20px;
		width: 20px;
	}
	
	.notification_bell {
		padding-bottom: 0px !important;
	}
	
	.fixed_menu_top {
		height: 60px;
	}
	
	.main_container_2 {
		height: calc(100vh - 60px);
	}
	
	.fixed_menu_space {
		height: 60px;
	}
	
	.top_part_logo {
		height: 50px;
		font-size: 22px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.icon_top_div {
		top: 0px;
		width: 33px;
		padding: 15px;
		margin: 0px;
	}
	
	.mini_logo_top {
		position: relative;
		top: 2px;
	}
	
	.small_slogan_text {
		font-size: 40px;
		margin-top: 5px;
		margin-bottom: 5px;
		-webkit-text-stroke: 1.5px black;
		text-shadow: 13px 13px 13px black,
        1px 1px 1px black,
	}
	
	.big_slogan_text {
		font-size: 150px;
		-webkit-text-stroke: 3px black;
		text-shadow: 1px 1px 1px black,
        1px 2px 1px black,
        1px 3px 1px black,
        1px 4px 1px black,
        1px 5px 1px black,
        1px 6px 1px black,
        1px 7px 1px black,
        1px 8px 1px black,
        1px 9px 1px black,
        1px 10px 1px black,
    1px 18px 6px rgba(16,16,16,0.4),
    1px 22px 10px rgba(16,16,16,0.2),
    1px 25px 35px rgba(16,16,16,0.2),
    1px 30px 60px rgba(16,16,16,0.4);
	}
}



.notification_number {
	position: absolute;
	border-radius: 50%;
	background-color: red;
	color: white;
}

.icon_top_div {
	position: relative;
}




.submit_button {
	padding: 15px;
	margin-top: 0px;
	margin-right: 20px;
	border-radius: 100px;
}

.microphone_button_top_a {
	border-radius: 50px;
}

.microphone_button_top {
	padding: 20px;
}

.fixed_menu_top a:hover {
	animation: button_background_hover_ani 0.13s ease-in-out;
	background: rgba(255, 255, 255, 0.2);
}
.transition_sign_cont {
	width: fit-content;
}


.category {
	float: left;
    display: block;
	position: relative;
}

@keyframes button_background_hover_ani {
  from {background: none;}
  to {background: rgba(255, 255, 255, 0.3) !important;}
}

.img_slogan {
	position: absolute;
    bottom: 70px;
	z-index: 11;
	width: 100%;
	text-align: center;
}

.img_slogan_cont {
	display: flex;
	justify-content: center;
	margin: 20px;
}

.img_slogan_txt {
	margin: 0px;
	font-size: 70px;
	font-family: Atkinson Hyperlegible, sans-serif;
}

.go_furniture_detail_outer {
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
}

.go_furniture_detail {
	bottom: 43px;
	display: block;
	position: absolute;
	width: 100%;
	z-index: 12;
}

.go_furniture_detail_cont_1 {
	display: flex;
	align-content: center;
    justify-content: center;
    align-items: center;
	flex-direction: column;
	width: 100%;
}



.go_furniture_detail_a {
	color: black;
    cursor: pointer;
    text-decoration: none;
	background-color: white;
	border-radius: 100px;

}

.go_furniture_detail_a:hover {
	text-decoration: underline;
	background-color: #efefef;
	animation: go_furniture_detail_a_backgorund_ani 0.3s;
   -webkit-text-decoration-color: rgba(0, 0, 0, 0.4); /* Safari */   
   text-decoration-color: rgba(0, 0, 0, 0.4);
}


@keyframes go_furniture_detail_a_backgorund_ani {
	from {
		background-color: white;
		-webkit-text-decoration-color: rgba(255, 0, 0, 0); /* Safari */   
		text-decoration-color: rgba(0, 0, 0, 0);
	
	}
	to	{
		background-color: #efefef;
		-webkit-text-decoration-color: rgba(0, 0, 0, 0.4); /* Safari */   
		text-decoration-color: rgba(0, 0, 0, 0.4);
	
	}
}

.transition_sign {
	display: flex;
	justify-content: center;
	position: absolute;
	width: 100%;
	z-index: 13;
	bottom: 10px;
}

.transition_sign_cont {
	display: flex;
}

.trans_click {
	border-radius: 20px;
	height: 9px;
	width: 9px;
	border: 2px solid black;
	cursor: pointer;
	margin: 1px 4px;
	background: none;
}

.trans_click:hover {
	/*border: 2px solid grey;*/
	/*background: black;*/
	animation: trans_click_ani 0.3s;
}

@keyframes trans_click_ani {
	from {
		/*border: 2px solid black;*/
		/*background: none;*/
	}
	to	{
		/*border: 2px solid black;*/
		/*background: grey;*/
	}
}

.trans_active {
	border: 2px solid black !important;
	background: black !important;
	cursor: default;
}

.go_furniture_detail_cont_2 {
	padding: 12px;
}

.go_furniture_detail_txt {
	margin: 0px;
	font-family: Montserrat, sans-serif;
}

.main_container_2 {
	position: relative;
	width: 100%;
}

.main_container_2_bg_photo_part {
	overflow: hidden;
	z-index: 4;
	position: absolute;
	width: 100%;
	height: 100%;
}

.main_container_2_bg_photo {
	top: 0px;
	width: 120%;
    height: 120%;
    object-fit: cover;
	position: relative;
}

.main_container_2_text_part {
	font-family: Montserrat, sans-serif;
	text-align: center;
	position: relative;
	color: white;
	display: flex;
	justify-content: center;
    align-items: center;
	flex-direction: column;
	z-index: 5;
	background-color: rgba(0, 0, 0, 0.6);
	width: 100%;
	height: 100%;
}

.text_part_inner_cont {
	display: flex;
	flex-direction: column;
    align-items: center;
}



.sponsorship_form_iframe {
	margin: 20px;
	
}

.sponsorship_form_iframe_outer {
	display: none;
    width: 100%;
    height: 100%;
	    flex-direction: column;
    align-items: center;
	
}

.membership_form_iframe {
	margin: 20px;
	
}

.membership_form_iframe_outer {
	display: none;
    width: 100%;
    height: 100%;
	flex-direction: column;
    align-items: center;
}


.wrapper {
	
	display: inline-flex;
	margin-top: 0px;
	margin-right: 70px;
}

.wrapper .icon {
	font-family: Atkinson Hyperlegible, sans-serif;
	position: relative;
	/*background-color: #ffffff;*/
	color: white;
	border-radius: 50px;
	padding: 15px;
	margin: 10px;
	width: 50px;
	height: 50px;
	font-size: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip {
  position: absolute;
  top: 0;
  font-size: 14px;
  background-color: #ffffff;
  color: #ffffff;
  padding: 5px 8px;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}



.wrapper .tooltip::before {
  position: absolute;
  content: "";
  height: 8px;
  width: 8px;
  background-color: #ffffff;
  bottom: -3px;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon:hover .tooltip {
  top: -45px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.wrapper .icon:hover span,
.wrapper .icon:hover .tooltip {
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
}

.wrapper .linkedin:hover,
.wrapper .linkedin:hover .tooltip,
.wrapper .linkedin:hover .tooltip::before {
  background-color: #004182;
  color: #ffffff;
}

.wrapper .mail:hover,
.wrapper .mail:hover .tooltip,
.wrapper .mail:hover .tooltip::before {
  background-color: #de5347;
  color: #ffffff;
}




.wrapper .xtwitter:hover,
.wrapper .xtwitter:hover .tooltip,
.wrapper .xtwitter:hover .tooltip::before {
  background-color: #000000;
  color: #ffffff;
}

.wrapper .instagram:hover,
.wrapper .instagram:hover .tooltip,
.wrapper .instagram:hover .tooltip::before {
  /*background-color: #e1306c;*/
    background: #f09433; 
background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
background-position: 20%;
  color: #ffffff;
}

.wrapper .telegram:hover,
.wrapper .telegram:hover .tooltip,
.wrapper .telegram:hover .tooltip::before {
  /*background: linear-gradient(139deg, rgba(43,133,193,1) 0%, rgba(49,169,219,1) 100%);*/
  background-color: #35ade1;
  color: #ffffff;
}

.wrapper .youtube:hover,
.wrapper .youtube:hover .tooltip,
.wrapper .youtube:hover .tooltip::before {
  background-color: red;
  color: #ffffff;
}

.wrapper .whatsapp:hover,
.wrapper .whatsapp:hover .tooltip,
.wrapper .whatsapp:hover .tooltip::before {
  background-color: #008000;
  color: #ffffff;
}

.wrapper .map:hover,
.wrapper .map:hover .tooltip,
.wrapper .map:hover .tooltip::before {
  background-color: #498ee3;
  color: #ffffff;
}

.wrapper .menu_button_clickk:hover,
.wrapper .menu_button_clickk:hover .tooltip,
.wrapper .menu_button_clickk:hover .tooltip::before {
  background-color: black;
  color: #ffffff;
}

.mail_button {
	border: 0px;
    background: none;
	    padding-block: 0px;
	padding: 0px;
		
    padding-inline: 0px;
}

.wrapper .mail {
	margin-top: 0px;
}

.swiper-container-wrapper {
	z-index: 6;
	position: relative;
	width: 100%;
}
.swiper-container {
	height: 100%;
}

:root {
    --swiper-theme-color: white !important;
}
.swiper-container:hover .swiper-button-prev,
.swiper-container:hover .swiper-button-next {
	opacity: 1;
	visibility: visible;
}
.swiper-container .swiper-button-disabled {
	opacity: 1;
	visibility: visible;
}
.swiper-container .swiper-button-prev {
	left: 10px;
}
.swiper-container .swiper-button-next {
	right: 10px;
}
.swiper-button-prev:hover,
.swiper-button-next:hover {
	transform: translateY(-5px);
	animation: hover_on_buttons_ani 0.3s;
}
@keyframes hover_on_buttons_ani {
	from {transform: translateY(0px);}
	to	{transform: translateY(-5px);}
}

.contect_part {
	overflow: hidden;
	width: 100%;
	background-color: #2d3633;
	color: white;
	position: relative;
	display: flex;
	    flex-direction: column;
    justify-content: space-between;
	z-index: 6;
}

.contect_part_cont {
	position: relative;
}

.contect_part_cont_2 {
	display: relative;
}

.swiper_slide_img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.social_media_part {
	z-index: 5;
	position: relative;
}

.mapouter {
	z-index: 4;
	/*position: absolute;
	margin-top: -72px;
	margin-left: 10px;*/
}

.maps {
	display: block;
}

.maps_cont {
	display: flex;
	justify-content: space-around;
}

.social_and_text_part {
	padding: 40px 0px;
	display: flex; 
    justify-content: space-around;
}

.contect_social_header { 
	font-family: Atkinson Hyperlegible, sans-serif;
	text-decoration: underline;
	position: relative;
	text-align: center;
}

@mixin stroke($color: #000, $size: 1px) {
  text-shadow:
    -#{$size} -#{$size} 0 $color,
     0        -#{$size} 0 $color,
     #{$size} -#{$size} 0 $color,
     #{$size}  0        0 $color,
     #{$size}  #{$size} 0 $color,
     0         #{$size} 0 $color,
    -#{$size}  #{$size} 0 $color,
    -#{$size}  0        0 $color;
}

.fix_stroke {
   paint-order: stroke fill;
}

.img_slogan_txt {
	text-align: center;
	   text-decoration: none;
	   paint-order: stroke fill;
   border-bottom: 1px solid rgba(255, 255, 255, 0.4);
   display: inline-block;
}



@media only screen and (max-width: 701px) {
	.contect_social_header {
		font-size: 50px;
		right: 0px;
		position: relative;
		margin-bottom: 5px;
		padding-top: 20px;
		margin-top: 0px;
	}	
	
	.social_and_text_part {
		justify-content: space-around;
		flex-direction: column;
		align-items: center;
	}
	.maps {
		padding-bottom: 10px; 
	}
	
	.maps_cont {
		justify-content: flex-start;
		flex-direction: column;
		align-items: center;
	}
}



@media only screen and (min-width: 701px) and (max-width: 1301px) { 
	.contect_social_header {
		font-size: 50px;
		right: 0px;
		position: relative;
		margin-bottom: 5px;
		padding-top: 20px;
		margin-top: 0px;
	}
	
	.maps {
	}
	
	.maps_cont {
		justify-content: space-around;
		flex-direction: column;
		align-items: center;
	}
}

@media only screen and (min-width: 1301px) {
	.contect_social_header {
		font-size: 50px;
		right: 0px;
		margin-bottom: 5px;
		padding-top: 20px;
		margin-top: 0px;
	}
	
	.social_media_part {
		margin-right: 0px !important;
	}
	
	.maps {
		padding: 20px 20px;
	}
	
	.maps_cont {
	}
}


.copywrite_part {
	display: block;
	position: relative;
	width: 100%;
	background-color: #555a63;
}

.copywrite_text {
	color: white;
	font-size: 20px;
	margin: 0px;
	text-align: center;
	padding-top: 12px;
	padding-bottom: 12px;
}
