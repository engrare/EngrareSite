// Copyright 2025 ENGRARE. All Rights Reserved.
var ismenuopen = false;
var window_height, window_width, old_active_index = 0;
var isSubmittingForm = false;

function topMenuGo(num) {
	$('html, body').stop();
	ScrollPart(num);
	if (ismenuopen)
		openLeftMenu();
}

function ScrollPart(index) {
	if (ismenuopen)
		openLeftMenu();

	var navHeight = $('.fixed_menu_top').outerHeight() || 60;
	var scroll_pos = 0;

	if (index == 1 || index == 0) {
		scroll_pos = 0;
	} else if (index == 2) {
		var $form = $('#basvuru');
		scroll_pos = $form.length ? ($form.offset().top - navHeight) : 350;
	} else if (index == 3) {
		var $contact = $('#contact_section');
		scroll_pos = $contact.length ? ($contact.offset().top - navHeight) : ($('body').height() - window_height);
	}

	$('html, body').animate({ scrollTop: Math.max(0, scroll_pos) }, 450);
}

// Clean any Turkish phone input into a 10-digit number starting with 5 (between 4900000000 and 5900000000)
function sanitizeTurkishPhone(raw) {
	if (!raw) return "";
	var digits = String(raw).replace(/\D/g, "");
	if (digits.length === 12 && digits.indexOf("90") === 0) {
		digits = digits.slice(2);
	} else if (digits.length === 11 && digits.indexOf("0") === 0) {
		digits = digits.slice(1);
	}
	return digits;
}

function isValidTurkishMobile(cleanDigits) {
	if (!cleanDigits || cleanDigits.length !== 10) return false;
	var num = parseInt(cleanDigits, 10);
	return num >= 4900000000 && num <= 5900000000;
}

function toggleOtherInput(wrapperId, show) {
	var $wrap = $('#' + wrapperId);
	if (show) {
		$wrap.slideDown(180);
		$wrap.find('input').focus();
	} else {
		$wrap.slideUp(180);
		$wrap.find('input').val('');
	}
}

function toggleSkillBox(cat) {
	var $box = $('#skill_box_' + cat);
	$box.toggleClass('open');
}

function updateSkillSections() {
	var selectedCats = {};
	$('#role_checkbox_group input[type="checkbox"]:checked').each(function() {
		var cat = $(this).attr('data-skill-cat');
		if (cat) selectedCats[cat] = true;
	});

	['yazilim', 'elektronik', 'mekanik'].forEach(function(cat) {
		var $box = $('#skill_box_' + cat);
		if (selectedCats[cat]) {
			$box.addClass('open highlighted');
		} else {
			$box.removeClass('highlighted');
		}
	});
}

function showFormError(msg, $focusEl) {
	$('#form_error_text').text(msg);
	$('#form_error_alert').fadeIn(200);
	if ($focusEl && $focusEl.length) {
		var navHeight = $('.fixed_menu_top').outerHeight() || 65;
		$('html, body').animate({
			scrollTop: Math.max(0, $focusEl.offset().top - navHeight - 30)
		}, 350);
		$focusEl.focus();
	}
}

function onHiddenFormLoad() {
	if (!isSubmittingForm) return;
	isSubmittingForm = false;
	showApplicationSuccess();
}

function showApplicationSuccess() {
	$('#native_submit_btn').prop('disabled', false).html('<i class="fa-solid fa-paper-plane"></i><span>Başvurumu Gönder</span>');
	$('#engrare_native_form').hide();
	$('#form_success_view').fadeIn(300);
	ScrollPart(2);
}

function resetNativeForm() {
	$('#engrare_native_form')[0].reset();
	$('#input_phone_clean').val('');
	$('#phone_hint_text').removeClass('valid invalid').text('');
	$('.other_input_wrap').hide();
	$('.skill_accordion').removeClass('open highlighted');
	$('#form_error_alert').hide();
	$('#form_success_view').hide();
	$('#engrare_native_form').fadeIn(250);
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
			delay: 5000,
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

	mySwiper.on('slideChange', function() {
		changeTransClick(old_active_index, mySwiper.realIndex);
		old_active_index = mySwiper.realIndex;
	});

	// Live phone number formatting & validation
	$('#input_phone_display').on('input blur', function() {
		var raw = $(this).val();
		var clean = sanitizeTurkishPhone(raw);
		$('#input_phone_clean').val(clean);

		var $hint = $('#phone_hint_text');
		if (!raw.trim()) {
			$hint.removeClass('valid invalid').text('');
		} else if (isValidTurkishMobile(clean)) {
			var formatted = '0 (' + clean.slice(0, 3) + ') ' + clean.slice(3, 6) + ' ' + clean.slice(6, 8) + ' ' + clean.slice(8, 10);
			$hint.removeClass('invalid').addClass('valid').html('<i class="fa-solid fa-check"></i> ' + formatted);
		} else {
			$hint.removeClass('valid').addClass('invalid').text('Geçerli bir cep telefonu giriniz (Örn: 05XX XXX XX XX).');
		}
	});

	// Handle Native Form Submit
	$('#engrare_native_form').on('submit', function(e) {
		$('#form_error_alert').hide();

		var fullName = $('#input_fullname').val().trim();
		if (!fullName) {
			e.preventDefault();
			showFormError('Lütfen adınızı ve soyadınızı giriniz.', $('#input_fullname'));
			return false;
		}

		var email = $('#input_email').val().trim();
		var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email || !emailRegex.test(email)) {
			e.preventDefault();
			showFormError('Lütfen geçerli bir e-posta adresi giriniz.', $('#input_email'));
			return false;
		}

		var cleanPhone = sanitizeTurkishPhone($('#input_phone_display').val());
		$('#input_phone_clean').val(cleanPhone);
		if (!isValidTurkishMobile(cleanPhone)) {
			e.preventDefault();
			showFormError('Lütfen geçerli bir cep telefonu numarası giriniz (Örn: 0541 298 98 03).', $('#input_phone_display'));
			return false;
		}

		// Check University Other
		if ($('input[name="entry.272986949"]:checked').val() === '__other_option__' && !$('#uni_other_input').val().trim()) {
			e.preventDefault();
			showFormError('Lütfen üniversitenizin adını yazınız.', $('#uni_other_input'));
			return false;
		}

		// Check Grade
		if (!$('input[name="entry.1073494278"]:checked').length) {
			e.preventDefault();
			showFormError('Lütfen kaçıncı sınıfta olduğunuzu seçiniz.', $('input[name="entry.1073494278"]').first().closest('.form_field_group'));
			return false;
		}

		// Check Faculty
		if (!$('input[name="entry.865468748"]:checked').length) {
			e.preventDefault();
			showFormError('Lütfen fakültenizi seçiniz.', $('input[name="entry.865468748"]').first().closest('.form_field_group'));
			return false;
		}
		if ($('input[name="entry.865468748"]:checked').val() === '__other_option__' && !$('#fak_other_input').val().trim()) {
			e.preventDefault();
			showFormError('Lütfen fakültenizin adını yazınız.', $('#fak_other_input'));
			return false;
		}

		// Check Department
		if (!$('input[name="entry.1434885314"]:checked').length) {
			e.preventDefault();
			showFormError('Lütfen okuduğunuz bölümü seçiniz.', $('input[name="entry.1434885314"]').first().closest('.form_field_group'));
			return false;
		}
		if ($('input[name="entry.1434885314"]:checked').val() === '__other_option__' && !$('#bolum_other_input').val().trim()) {
			e.preventDefault();
			showFormError('Lütfen bölümünüzün adını yazınız.', $('#bolum_other_input'));
			return false;
		}

		// Check Vehicle Selection
		if (!$('input[name="entry.998547666"]:checked').length) {
			e.preventDefault();
			showFormError('Lütfen çalışmak istediğiniz en az bir proje/araç seçiniz.', $('#vehicle_checkbox_group'));
			return false;
		}

		// Check Role Selection
		if (!$('input[name="entry.1141400972"]:checked').length) {
			e.preventDefault();
			showFormError('Lütfen çalışmak istediğiniz en az bir alan seçiniz.', $('#role_checkbox_group'));
			return false;
		}

		isSubmittingForm = true;
		$('#native_submit_btn').prop('disabled', true).html('<i class="fa-solid fa-circle-notch fa-spin"></i><span>Gönderiliyor...</span>');

		// Fallback timer in case iframe onload is delayed
		setTimeout(function() {
			if (isSubmittingForm) {
				isSubmittingForm = false;
				showApplicationSuccess();
			}
		}, 2200);

		return true;
	});

	// Pre-fill options from URL query parameters (?vehicle=Dronox, ?role=yazilim, etc.)
	try {
		var searchParams = new URLSearchParams(window.location.search);
		var vehicleParam = searchParams.get('vehicle');
		if (vehicleParam) {
			$('#vehicle_checkbox_group input[type="checkbox"]').each(function() {
				if ($(this).val().toLowerCase() === vehicleParam.toLowerCase()) {
					$(this).prop('checked', true);
				}
			});
		}

		var roleParam = searchParams.get('role');
		if (roleParam) {
			if (roleParam === 'yazilim') {
				$('#role_checkbox_group input[value="Gömülü Yazılım"], #role_checkbox_group input[value="Görüntü İşleme Yazılımı"]').prop('checked', true);
			} else if (roleParam === 'elektronik') {
				$('#role_checkbox_group input[value="Elektronik"]').prop('checked', true);
			} else if (roleParam === 'mekanik') {
				$('#role_checkbox_group input[value="Mekanik Çizim"]').prop('checked', true);
			} else if (roleParam === 'organizasyon') {
				$('#role_checkbox_group input[value="Sponsor Bulma"], #role_checkbox_group input[value="Sosyal Medya"]').prop('checked', true);
			}
			updateSkillSections();
		}

		if (window.location.hash === '#basvuru' || vehicleParam || roleParam || window.location.search.indexOf('uyebasvuru') !== -1) {
			setTimeout(function() { ScrollPart(2); }, 250);
		}
	} catch (err) {
		console.log(err);
	}

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
