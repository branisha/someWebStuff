function toggleMenu() {
    $("body").toggleClass("body-disable-scroll");
    $(".nav-item:not(.nav-dummy-data):not(:first-child)").toggleClass("nav-item-extended");
}

$(document).ready(function() {
    // handler for menu toggle
    $(".icon-outer-div").on("click", function (e) {
        toggleMenu();
        $(this).toggleClass("icon-border-toggled");
        $(this).toggleClass("icon-border-toggled-shadow");
        $(".icon-wrapper").toggleClass("icon-wrapper-toggled");
        setTimeout(function () {
            $(".icon-outer-div").toggleClass("icon-border-toggled-shadow");
            $(".icon-wrapper").toggleClass("icon-wrapper-toggled");
        }, 300);
    });
});


