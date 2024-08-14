$(document).ready(function() {
    $('#autoCallBtn').click();

    $('.hide-show-btn').click(function() {
        $('.video-controls-section').toggle("slide", {direction: "down" }, 800);
    });
    $('.show-btns').click(function() {
        $(this).toggleClass('active');
        $('.btn-list').toggle("drop" ,{ direction: "down" },500);
    });
    $('.switch-cam-btn').click(function() {
        $('.camera-list').toggle("drop" ,{ direction: "down" },1000);
    });
    $('.center-control-btns button').click(function() {
        $(this).toggleClass('active');
    });
    $('.mob-record-btn ').click(function() {
        $(this).hide();
        $('.mob-record-start-btn').show();
    });
    $('.mob-record-start-btn ').click(function() {
        $(this).hide();
        $('.mob-record-btn').show();
    });
    $('.record-btn ').click(function() {
        $(this).hide();
        $('.record-btn-start').show();
    });
    $('.record-btn-start ').click(function() {
        $(this).hide();
        $('.record-btn').show();
    });
    // list filter js start...................
    $('ul#addMembersList').listfilter({
        'alternate': true,
        'alternateclass': 'other',
        'count': $('#count')
    });
    // list filter js end ...................
    $('.add-member-btn').click(function() {
        $('.add-members-list').toggle("slide", {direction: "down" }, 900);
        $('.participants-list-container').hide(100);
        $( ".filter-clear" ).trigger( "click" );
    });
    $('.add-members-list .close-btn').click(function() {
        $('.add-members-list').toggle("slide", {direction: "down" }, 900);
        $( ".filter-clear" ).trigger( "click" );
    });
    // dragable div js start .........................
    $("#draggable").draggable();
    // dragable div js end ...........................
    $('.share-screen-bts button').click(function() {
        $(this).toggleClass('active');
    });
    $('.participants-view-btn,.profile-view-btn').click(function() {
        $('.participants-view-btn img').toggleClass('rotate180');
        $('.participants-view-btn img').toggleClass('rotate0');
        $('.add-members-list').hide();
        $('.participants-list-container').toggle(700);
    });

    $('.participants-list-btns button').click(function() {
        $(this).toggleClass('active');
    });
    $('.mute-all-btn').click(function() {
        $(this).toggleClass('active');
        $('.participants-mic-btn').toggleClass('active');
    });
    $('.favourite-btn').click(function() {
        $(this).toggleClass('active');
    });
    $('.btn-list .close-btn,.mob-share-btn').click(function() {
        $('.btn-list').toggle("drop" ,{ direction: "down" },1000);
    });
    $('.settings-btn').click(function() {
        $('.settings-list').toggle("slide" ,{ direction: "up" },1000);
        $('.notification-list').hide("slide" ,{ direction: "up" },1000);
    });
    $('.notification-btn').click(function() {
        $('.notification-list').toggle("slide" ,{ direction: "up" },1000);
        $('.settings-list').hide("slide" ,{ direction: "up" },1000);
    });

});