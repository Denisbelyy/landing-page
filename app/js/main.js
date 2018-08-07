$(document).ready(function(){
	$(".block-header__a:not(.active)").click(function(){
		$(".block-header__a").removeClass("block-header__a_active");
		$(this).addClass('block-header__a_active');
	});
	$(".owl-carousel").owlCarousel({
		items:5,
		loop:true,
		nav:true,
		dots:false,
		center: true,
		responsive: {
			0: {
				items:2,
				nav:false,
				autoplay: true,
				autoWidth: true
			},
			768: {
				items:3,
				nav:false,
				autoplay: true,
				autoWidth: true
			},
			1024: {
				items:5
			}
		}
	})
})
