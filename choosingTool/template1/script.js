$(document).ready(function () {

    $('#fullscreen-animation').fadeIn(1500, function () {
        // 在1秒后执行动画完成后的操作
        $('.content').fadeIn(1500, function () {
            $('#fullscreen-animation').fadeOut(1000);
            $('.header').css('opacity','1');
        });
    });



    // Initialize Swiper
    var swiper1 = new Swiper(".swiper1", {
        effect: "fade",
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        loop: true,
        speed: 800,
    });

    const swiper2 = new Swiper('.swiper2', {
        // Optional parameters
        effect: "flip",
        flipEffect: {
            slideShadows: false
        },
        loop: true,
        slidesPerView: 1,
        speed: 800,
        autoplay: {
            delay: 14000,
        },

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,

        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });

    const swiper3 = new Swiper('.swiper3', {
        // Optional parameters
        effect: "coverflow",
        coverflowEffect: {
            rotate: 60,
            stretch: getstretch(),
            depth:300,
            
            slideShadows: false
        },
        loop: true,
        slidesPerView: 1,
        speed: 800,
        autoplay: {
            delay: 14000,
        },

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,

        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


    /////////////////
    function getstretch() {
        if (window.innerWidth >= 1024) {
            return 300;
        } 
        else if (window.innerWidth < 1024 && window.innerWidth >= 768){
            return 200;
        }
        else {
            return 0;
        }
    }


    function updateStretch() {
        var newStretch = getstretch();
        if (newStretch !== swiper3.params.coverflowEffect.stretch) {
            swiper3.params.coverflowEffect.stretch = newStretch;
            swiper3.update();
        }
    }
    
    window.addEventListener('resize', updateStretch);

    /////////////////


    // Initialize AOS
    $(function () {
        AOS.init({
            offset: 200,
            duration: 700,
            // delay: 100,
            easing: 'ease-in-sine',
            once: true,
        });
    })


    $(window).scroll(function () {
        var header = $(".header");
        var body1 = $("#body1");
        var up = $(".bi-chevron-double-up");

        if ($(window).scrollTop() >= body1.offset().top) {
            header.css({
                position: "fixed",
                background: "linear-gradient(#000000b6, #00000000)"
            });
            up.show();
        } else {
            header.css({
                position: "absolute",
                background: "transparent"
            });
            up.hide();
        }
    });

    $('.link').on('click', function() {
        // 取消#menu_control的checked状态
        $('#menu_control').prop('checked', false);
    });



});