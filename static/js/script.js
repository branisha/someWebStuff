
let last_known_scroll_position;
let ticking;
let main_navbar;
let css_sticky_class;


let navbar_init;
let window_height_init;
let navbar_breakpoint;
let lastState;





function isNavbarSticky(element, css_class) {
    return element.hasClass(css_class);
}

function isMobile(element) {
    // we check it using display: none on dummy item in nav bar
    // $(element).css(" ") === "none";
    return window.innerWidth < 768;
}

function bgImageTranslate(scroll_pos){
    if($(".item-3").offset().top - scroll_pos <= 1){
        $(".bg-image").removeClass("bg-image-active");
        $(".item-255").addClass("bg-image-active");
    }
    else if($(".item-2").offset().top - scroll_pos <= 1){
        $(".bg-image").removeClass("bg-image-active");
        $(".item-25").addClass("bg-image-active");
    }
    else if($(".item-0").offset().top - scroll_pos <= 1){
        $(".bg-image").removeClass("bg-image-active");
        $(".item-1").addClass("bg-image-active");
    }
}

function doSomething(scroll_pos) {
    // because of chrome
    /*
        if (scroll_pos > $(".item-2").offset().top && !$(".item-1").hasClass("t-image")) {
            console.log("chnage me");
    
            $(".item-1").addClass("t-transition");
            setTimeout(function () {
                $(".item-1").addClass("t-image");
                $(".item-1").removeClass("t-transition");
            }, 350);
        }
    */
    // if (isMobile(11))
    //     return;

    /* bg images handler */

    bgImageTranslate(scroll_pos);

    if ($("#main-navbar").offset().top - scroll_pos > 0 && $(".nav-dummy-data").hasClass("nav-dummy-grow")) {
        $(".nav-dummy-data").removeClass("nav-dummy-grow");
    } else if ($("#main-navbar").offset().top - scroll_pos <= 1 && !$(".nav-dumy-data").hasClass("nav-dummy-grow")) {
        $(".nav-dummy-data").addClass("nav-dummy-grow");
    }

}

function scrollHandler() {
    last_known_scroll_position = window.scrollY;
    // TODO FIX THIS
    if (!ticking) {
        window.requestAnimationFrame(function () {
            doSomething(last_known_scroll_position);
            ticking = false;
        });

        ticking = true;
    }
}

function removeScrollHandler() {
    // $(window).off('scroll');
}

function addScrollHandler() {
    updateNavbarPc();
    $(window).on("scroll", scrollHandler);
    $(window).scroll();
}

function updateNavbarPc() {
    navbar_init = $(".nav-list").offset().top;
    window_height_init = window.innerHeight;
    navbar_breakpoint = navbar_init / window_height_init;
}

function toggleMenu() {

    // this is done because of jumping animation

    $("body").toggleClass("body-disable-scroll");
    $($(".nav-list").children().splice(2)).toggleClass("nav-item-extended");


}


function removeSticky() {
    $(".nav-dummy-data").removeClass("nav-dummy-grow");
    $("#main-navbar").removeClass("nav-sticky");
}

$(document).ready(function () {
    last_known_scroll_position = 0;
    ticking = false;
    main_navbar = $("#main-navbar");
    css_sticky_class = "nav-sticky";
    lastState = isMobile($(".nav-dummy-data"));

    navbar_init = $(".nav-list").offset().top;
    window_height_init = window.innerHeight;
    navbar_breakpoint = navbar_init / window_height_init;


    console.log(isMobile($(".nav-dummy-data")));

    addScrollHandler();


    // TODO: dok se changa iz jednog u drugog, treba navbar u default vratiti
    // treba scroll fierati

    // treba fixat breakpoint

    $(window).on('resize', function (e) {
        if (lastState != isMobile($(".nav-dummy-data"))) {
            lastState = isMobile($(".nav-dummy-data"));
            if (lastState) {
                removeScrollHandler();

            } else {

                addScrollHandler();
            }
        }

        console.log("out: " + $("#main-navbar").hasClass("nav-sticky"));
    });

    // everything after 2 index
    $(".icon-outer-div").on("click", function (e) {
        toggleMenu();
        $(this).toggleClass("icon-border-toggled");
    });

    setTimeout(function () {

        $(".tweentest").addClass("t-transition");
        setTimeout(
            function () {
                $(".tweentest").addClass("t-image");
                $(".tweentest").removeClass("t-transition");

            }, 600);
    }, 2000);

    console.log($(".item-2").offset());

});