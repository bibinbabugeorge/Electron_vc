$(document).ready(function () {
  $(".carousel").carousel({
    pause: true,
    interval: false,
  });
  $(".participant-cameras-list").hide();
  // $(".participant-video-controls-btns .list-view-btn").click(function () {
  //   // $(this).children("svg").toggleClass("rotate0");
  //   // $(this).children("svg").toggleClass("rotate180");
  //   $(this).siblings().toggle("slide", { direction: "up" }, 1000);
  //   // $(".participant-video-controls-btns-list").toggle(
  //   //   "slide",
  //   //   { direction: "right" },
  //   //   1000
  //   // );
  //   // $(".list-view-btn svg").toggleClass("rotate0");
  //   // $(".list-view-btn svg").toggleClass("rotate180");
  // });
  // function () {
  //   $(".participant-video-controls-btns-list").hide(
  //     "slide",
  //     { direction: "right" },
  //     1000
  //   );
  //   $(".list-view-btn svg").toggleClass("rotate180");
  //   $(".list-view-btn svg").toggleClass("rotate0");
  // }

  $(".record-btn ").click(function () {
    $(this).hide();
    $(".record-btn-start").show();
  });
  $(".record-btn-start ").click(function () {
    $(this).hide();
    $(".record-btn").show();
  });

  $(
    ".video-camera-btn,.mobile-drawer-video-camera-btn,.mic-btn,.mobile-drawer-mic-btn"
  ).click(function () {
    $(this).toggleClass("active");
    $(this).prop("disabled", true);
    setTimeout(() => {
      $(this).prop("disabled", false);
    }, 500);
  });

  // $(".btn-active button").click(function () {
  //   $(this).toggleClass("active");
  // });

  // list filter js start...................
  // $("ul#addParticipantsList").listfilter({
  //   alternate: true,
  //   alternateclass: "other",
  //   count: $("#count"),
  // });
  // $("ul#addParticipantsList input").attr(
  //   "placeholder",
  //   "Search by mail ID or name"
  // );
  // $("ul#participantsListView").listfilter({
  //   alternate: true,
  //   alternateclass: "other",
  //   count: $("#count"),
  // });
  // $("ul#participantsListView input").attr("placeholder", "Search by name");
  // list filter js end ...................
  $(".add-participants-btn,.add-participants-list-container .close-btn").click(
    function () {
      $(".participants-list-container").hide(700);
      $(".mobile-menu-view-content").hide("slide", { direction: "down" }, 1000);
      $(".add-participants-list-container").toggle(
        "slide",
        { direction: "right" },
        1000
      );
      $(".filter-clear").trigger("click");
      $(".black-drop").toggle();
    }
  );
  $(".add-participants-close-btn").click(function () {
    $(".add-participants-list-container").toggle(
      "slide",
      { direction: "right" },
      1000
    );
    $(".black-drop").hide();
  });
  $(".participants-view-btn,.participants-close-btn").click(function () {
    $(".add-participants-list-container").hide(
      "slide",
      { direction: "right" },
      1000
    );
    $(".mobile-menu-view-content").hide("slide", { direction: "down" }, 1000);
    $(".participants-list-container").toggle(
      "slide",
      { direction: "right" },
      1000
    );
    $(".black-drop").toggle();
  });
  $(".black-drop").click(function () {
    $(".participants-list-container").hide(
      "slide",
      { direction: "right" },
      1000
    );
    $(".add-participants-list-container").hide(
      "slide",
      { direction: "right" },
      1000
    );
    $(this).toggle();
  });
  $(".open-close-camera-btn").click(function () {
    $(".hide-cameras").toggle("slide", { direction: "left" }, 500);
    $(".open-close-camera-btn .cameras-view-btns-b").toggleClass(
      "svg-icon-transform"
    );
    $(".user-cameras-view .user-cameras-view-container").toggleClass(
      "left-align"
    );
  });

  $(".raise-btn").click(function () {
    $(this).toggleClass("active");
    $(".local-raise-hand-popup").toggle();
  });
  // $(".participant-cameras-container").hover(
  //   function () {
  //     $(".participant-cameras-list").show(300);
  //   },
  //   function () {
  //     $(".participant-cameras-list").hide(300);
  //   }
  // );
  $(".mobile-menu-btn,.mobile-menu-close-btn").click(function () {
    $(".add-participants-list-container").hide(
      "slide",
      { direction: "right" },
      1000
    );
    $(".participants-list-container").hide(700);
    $(".mobile-menu-view-content").toggle("slide", { direction: "down" }, 1000);
  });

  $(".mobile-view-record-btn").click(function () {
    $(".mobile-view-record-btn").toggle();
    $(".mobile-view-record-btn-start").toggle();
  });
  $(".mobile-view-record-btn-start").click(function () {
    $(".mobile-view-record-btn-start").toggle();
    $(".mobile-view-record-btn").toggle();
  });
  // dragable div js start .........................
  $("#draggable").draggable();
  // dragable div js end ...........................

  $(".camera-two").click(function () {
    $(".camera-view-two").toggleClass("camera-view-display-show");
  });
  $(".camera-three").click(function () {
    $(".camera-view-three").toggleClass("camera-view-display-show");
  });
  $(".camera-four").click(function () {
    $(".camera-view-four").toggleClass("camera-view-display-show");
  });
  $(".settings-btn").click(function () {
    $(".settings-list").toggle("slide", { direction: "up" }, 1000);
    $(".notification-list").hide("slide", { direction: "up" }, 1000);
  });
  $(".notification-btn").click(function () {
    $(".notification-list").toggle("slide", { direction: "up" }, 1000);
    $(".settings-list").hide("slide", { direction: "up" }, 1000);
    $(".mobile-view-side-menu").hide("drop", { direction: "right" }, 600);
  });
  $(".side-menu-btn").click(function () {
    $(".mobile-view-side-menu").toggle("drop", { direction: "right" }, 600);
    $(".mobile-view-shadow").show();
    $(".notification-list").hide("slide", { direction: "up" }, 1000);
  });
  $(".mobile-view-shadow").click(function () {
    $(".mobile-view-side-menu").toggle("drop", { direction: "right" }, 600);
    $(".mobile-view-shadow").hide();
  });
  $(".back-btn").click(function () {
    window.history.back();
  });
  $(".input-choose-btn").click(function () {
    $("#groupIcon").trigger("click");
  });

  $("#volume").slider({
    min: 0,
    max: 100,
    value: 0,
    range: "min",
    slide: function (event, ui) {
      setVolume(ui.value / 100);
    },
  });
  var myMedia = document.createElement("audio");
  $("#player").append(myMedia);
  myMedia.id = "myMedia";

  // playAudio("http://emilcarlsson.se/assets/Avicii%20-%20The%20Nights.mp3", 0);

  function playAudio(fileName, myVolume) {
    myMedia.src = fileName;
    myMedia.setAttribute("loop", "loop");
    setVolume(myVolume);
    myMedia.play();
  }

  function setVolume(myVolume) {
    var myMedia = document.getElementById("myMedia");
    myMedia.volume = myVolume;
  }

  // thumbnal scrol js start
  if ($(".carousel-container ol").length > 0) {
    var divElement = $(".carousel-container ol")[0]; // Get the DOM element
    var scrollableContent = $(".carousel-container ol");
    var scrollableWidth = scrollableContent[0].scrollWidth;
    var visibleWidth = scrollableContent.width();
    var scrollAmount = 100;

    // Scroll left button click handler
    $("#thumbScrollLeftButton").click(function () {
      scrollableContent.animate({ scrollLeft: "-=" + scrollAmount }, 1000);
      updateScrollButtons();
    });

    // Scroll right button click handler
    $("#thumbScrollRightButton").click(function () {
      scrollableContent.animate({ scrollLeft: "+=" + scrollAmount }, 1000);
      updateScrollButtons();
    });

    // Function to check overflow
    function checkOverflow() {
      if (divElement.scrollWidth > divElement.clientWidth) {
        // Horizontal overflow detected
        $(".carousel-indicators").addClass("horizontal-overflow");
      } else {
        $(".carousel-indicators").removeClass("horizontal-overflow");
      }
    }
    // Initial check
    checkOverflow();
    updateScrollButtons();

    // Check overflow on window resize
    $(window).resize(function () {
      checkOverflow();
      updateScrollButtons();
    });
    // Function to update scroll buttons
    function updateScrollButtons() {
      var currentScrollLeft = scrollableContent.scrollLeft();
      // Disable scroll left button if at the beginning
      if (currentScrollLeft <= 0) {
        $("#thumbScrollLeftButton").prop("disabled", true);
      } else {
        $("#thumbScrollLeftButton").prop("disabled", false);
      }

      // Disable scroll right button if at the end
      if (currentScrollLeft >= scrollableWidth - visibleWidth) {
        $("#thumbScrollRightButton").prop("disabled", true);
      } else {
        $("#thumbScrollRightButton").prop("disabled", false);
      }
    }
  }
  // thumbnal scrol js end
  $(".add-local-camera-btn").click(function () {
    $(this).toggleClass("active");
  });
  $(".chat-btn,.chat-close-btn").click(function () {
    chatViewResize();
    $(".chat-view-wrapper").toggle("slide", { direction: "right" }, 1000);
  });
  // $(document).click(function (e) {
  //   if (
  //     !$("#eppic_ChatView").find(e.target).length &&
  //     !$(".chat-btn").find(e.target).length
  //   ) {
  //     $(".chat-view-wrapper").hide("slide", { direction: "right" }, 1000);
  //   }
  // });
  setMainScreenHeight();
  function setMainScreenHeight() {
    let windowHeight = window.innerHeight;
    let chatViewHeaderHeight = $(".chat-view-header").innerHeight();
    let chatViewFooterHeight = $(".chat-view-footer").innerHeight();
    // let chatViewBodyHeight = windowHeight - (72 + 92);
    let chatViewBodyHeight = windowHeight - 72;
    // $(".chat-view-body").css("height", `${chatViewBodyHeight}px`);
    $(".video-content-max-height").css(
      "height",
      `${chatViewBodyHeight}px !important`
    );
    $(".video-content-min-height").css(
      "height",
      `${Math.floor((chatViewBodyHeight - 6) / 2)}px !important`
    );
  }
  participantsListHeight();

  function participantsListHeight() {
    let windowHeight = window.innerHeight;
    $(".participants-list-container").css("height", `${windowHeight}px`);
    $(".add-participants-list-container").css("height", `${windowHeight}px`);
  }
  videoContainerHeight();
  function videoContainerHeight() {
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    console.log("windowWidth", windowWidth < 768);
    let connectionRoomHeaderHeight = $(".connection-room-header").innerHeight();
    // let videoControlsSection = $(".video-controls-section").innerHeight();
    // let carouselContainerHeight = windowHeight - connectionRoomHeaderHeight;
    let carouselContainerHeight;

    if (windowWidth < 768) {
      carouselContainerHeight = windowHeight;
    } else {
      carouselContainerHeight = windowHeight - 80;
    }
    $(".carousel-container").css("height", `${carouselContainerHeight}px`);
  }

  // attachment carousal
  $(".close-attachment-carousal,.attached-files-wrapper li").click(function () {
    $(".attachment-carousal-wrapper").toggle();
  });

  attachmentCarouselView();
  function attachmentCarouselView() {
    let windowHeight = window.innerHeight;
    let carouselItemHeight = windowHeight - (76 + 82);
    $(".attachment-carousal-wrapper .carousel-inner").css(
      "height",
      `${carouselItemHeight}px`
    );
    $(
      ".attachment-carousal-wrapper .carousel .carousel-control-next,.attachment-carousal-wrapper .carousel .carousel-control-prev"
    ).css("top", `${(carouselItemHeight - 82) / 2}px`);
  }
  $(window).resize(function () {
    setMainScreenHeight();
    participantsListHeight();
    videoContainerHeight();
    checkOverflow();
    chatViewResize();
    attachmentCarouselView();
    chatAttachementCarousel();
  });
  $(".participants-video-btn,.participants-mic-btn").click(function () {
    $(this).toggleClass("active");
  });
  $(
    ".participant-expand-view-btn,.participant-mute-camera-btn,.participant-mute-audio-btn"
  ).click(function () {
    $(this).toggleClass("active");
  });
  chatAttachementCarousel();
  function chatAttachementCarousel() {
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    let carouselIndicators = $(
      ".chat-carousel-wrapper .carousel-indicators ol"
    )[0];
    console.log(
      "carouselIndicators",
      carouselIndicators.clientWidth,
      carouselIndicators.scrollWidth
    );
    let carouselHeaderHeight = $(
      ".chat-carousel-wrapper .chat-carousel-header"
    )[0].clientHeight;
    let carouselFooterHeight = $(
      ".chat-carousel-wrapper .chat-carousel-footer"
    )[0].clientHeight;
    $(".chat-carousel-wrapper .carousel .carousel-inner .carousel-item").css(
      "height",
      `${windowHeight - (carouselHeaderHeight + carouselFooterHeight)}px`
    );
    function checkOverflow() {
      if (carouselIndicators.scrollWidth > carouselIndicators.clientWidth) {
        // Horizontal overflow detected
        $(".carousel-indicators").addClass("horizontal-overflow");
      } else {
        $(".carousel-indicators").removeClass("horizontal-overflow");
      }
    }
    checkOverflow();

    let isDown = false;
    let startX;
    let scrollLeft;
    $(".carousel-indicators ol").on("mousedown", function (e) {
      isDown = true;
      startX = e.pageX - this.offsetLeft;
      scrollLeft = this.scrollLeft;
      $(this).addClass("active");
    });
    $(".carousel-indicators ol").on("mouseleave", function () {
      isDown = false;
      $(this).removeClass("active");
    });
    $(".carousel-indicators ol").on("mouseup", function () {
      isDown = false;
      $(this).removeClass("active");
    });
    $(".carousel-indicators ol").on("mousemove", function (e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - this.offsetLeft;
      const walk = (x - startX) * 2; // scroll-fast
      this.scrollLeft = scrollLeft - walk;
    });
    // Enable horizontal scroll for carousel indicators with touch events
    let touchStart;
    let touchScrollLeft;

    $(".carousel-indicators ol").on("touchstart", function (e) {
      touchStart = e.touches[0].pageX - this.offsetLeft;
      touchScrollLeft = this.scrollLeft;
    });

    $(".carousel-indicators ol").on("touchmove", function (e) {
      const x = e.touches[0].pageX - this.offsetLeft;
      const walk = (x - touchStart) * 2; // scroll-fast
      this.scrollLeft = touchScrollLeft - walk;
    });
  }
  // $(".record-btn").click(function () {
  //   $(this).toggleClass("active");
  // });
  // $(".participant-cameras-list .video-container").click(function () {
  //   $(this).toggleClass("active");
  // });
  $(".participant-cameras-btn").click(function () {
    $(this).toggleClass("active");
    $(this).siblings(".participant-cameras-list").toggle();
    $(".local-camera-view-wrapper").toggle();
  });
  const sliderEl = $("#customRangeSpeaker");
  const mobileViewRangeSlider = $("#mobileCustomRangeSpeaker");
  updateSlider();
  updateMobileViewRangeSlider();
  function updateSlider() {
    const tempSliderValue = sliderEl.val();
    const progress = (tempSliderValue / sliderEl.prop("max")) * 100;
    sliderEl.css(
      "background",
      `linear-gradient(to right, #009DFF ${progress}%, #EAEEF0 ${progress}%)`
    );
  }
  function updateMobileViewRangeSlider() {
    const tempSliderValue = mobileViewRangeSlider.val();
    const progress =
      (tempSliderValue / mobileViewRangeSlider.prop("max")) * 100;
    mobileViewRangeSlider.css(
      "background",
      `linear-gradient(to right, #009DFF ${progress}%, #EAEEF0 ${progress}%)`
    );
  }
  sliderEl.on("input", updateSlider);
  mobileViewRangeSlider.on("input", updateMobileViewRangeSlider);
  var isMouseOverExcludedDiv = false;
  var isMouseEnterLocalCameraList = false;
  // Detect mouse enter on the excludedDiv
  $(
    ".chat-view-wrapper,.add-participants-list-container,.participant-cameras-list,.black-drop"
  )
    .mouseenter(function () {
      isMouseOverExcludedDiv = true;
    })
    .mouseleave(function () {
      isMouseOverExcludedDiv = false;
    });
  $(
    ".participant-cameras-container.local-camera-list-wrapper .participant-cameras-list"
  )
    .mouseenter(function () {
      isMouseEnterLocalCameraList = true;
    })
    .mouseleave(function () {
      isMouseEnterLocalCameraList = false;
    });
  let touchOccurred = false;
  let footerDelay = null;
  $(document).on("mousemove", function (event) {
    if (!touchOccurred) {
      var mouseY = event.clientY;
      var windowHeight = $(window).height();
      // You can adjust this threshold value as needed
      var threshold = 100; // Number of pixels from the bottom to trigger the event

      // if (
      //   (mouseY >= windowHeight - threshold && !isMouseOverExcludedDiv) ||
      //   isMouseEnterLocalCameraList
      // ) {
      //   $(".video-controls-section").addClass("mouse-bottom");
      //   $(".local-camera-view-wrapper").addClass("bottom-controls-active");
      //   // Perform actions or trigger events when the mouse reaches the bottom
      // } else {
      //   $(".video-controls-section").removeClass("mouse-bottom");
      // $(
      //   ".local-camera-list-wrapper.participant-cameras-container .participant-cameras-list"
      // ).hide();
      // $(
      //   ".local-camera-list-wrapper.participant-cameras-container .participant-cameras-btn"
      // ).removeClass("active");
      //   $(".local-camera-view-wrapper").removeClass("bottom-controls-active");
      //   $(".local-camera-view-wrapper").show();
      // }
    }
  });
  $(".minimise-video-controls-btn, .carousel-container").click(function () {
    if (
      ($(this).is(".carousel-container") &&
        !$(".video-controls-section").hasClass("mouse-bottom")) ||
      $(this).is(".minimise-video-controls-btn")
    ) {
      $(".video-controls-section").toggleClass("mouse-bottom");
      $(".local-camera-view-wrapper").toggleClass("bottom-controls-active");
      if (!$(".video-controls-section").hasClass("mouse-bottom")) {
        $(
          ".local-camera-list-wrapper.participant-cameras-container .participant-cameras-list"
        ).hide();
        $(
          ".local-camera-list-wrapper.participant-cameras-container .participant-cameras-btn"
        ).removeClass("active");
      }
    }
  });
  // $(document).on("touchstart", function (event) {
  //   touchOccurred = true;
  //   // Handle touch start event
  //   clearInterval(footerDelay);
  //   $(".video-controls-section").addClass("mouse-bottom");
  //   footerDelay = setTimeout(() => {
  //     $(".video-controls-section").removeClass("mouse-bottom");
  //   }, 4000);
  //   // Reset the flag after a delay
  //   setTimeout(() => {
  //     touchOccurred = false;
  //   }, 500);
  // });
  $(".local-camera-view-wrapper ul li").click(function () {
    $(".local-camera-view-wrapper ul li").removeClass("active");
    $(this).addClass("active");
  });
  var carouselItems = $("#carousel-thumb .carousel-inner .carousel-item");
  var carouselControlPrev = $("#carousel-thumb .carousel-control-prev");
  var carouselControlNext = $("#carousel-thumb .carousel-control-next");
  var currentIndex = 0;
  function updateButtonsVisibility() {
    if (currentIndex === 0) {
      carouselControlPrev.hide();
    } else {
      carouselControlPrev.show();
    }

    if (currentIndex === carouselItems.length - 1) {
      carouselControlNext.hide();
    } else {
      carouselControlNext.show();
    }
  }
  carouselControlNext.on("click", function () {
    if (currentIndex < carouselItems.length - 1) {
      currentIndex++;
      updateButtonsVisibility();
    }
  });

  carouselControlPrev.on("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateButtonsVisibility();
    }
  });

  // updateButtonsVisibility(); // Initially, update button visibility
  $("#audioSelect option").each(function () {
    var optionText = this.text;
    var newOption = optionText.substring(0, 36);
    $(this).text(newOption + "...");
  });

  $(
    ".hand-raised-participants-list,.attached-files-list-wrapper ul,.attachment-carousal-wrapper .carousel-indicators"
  ).on("wheel", function (event) {
    event.preventDefault();
    const delta = event.originalEvent.deltaY; // Get the delta value

    // Adjust the horizontal scroll position based on the delta value
    $(this).scrollLeft($(this).scrollLeft() + delta);
  });
  $(".mobile-view-local-video li,.mobile-record-btn").click(function () {
    $(this).toggleClass("active");
  });
  $(
    ".mobile-view-main-action-btns .add-participants-btn,.mobile-add-participants-close "
  ).click(function () {
    mobileViewModalDrawerHeight();
    $(".mobile-view-modal-drawer.mobile-view-add-participants").toggleClass(
      "add-participants-show"
    );
    $(".drawer-wrapper").toggleClass("hide-drawer");
  });
  $(".mobile-participants-list-btn,.mobile-participants-list-close").click(
    function () {
      mobileViewActiveParticipantsHeight();
      $(
        ".mobile-view-modal-drawer.mobile-view-active-participants"
      ).toggleClass("active-participants-show");
      $(".drawer-wrapper").toggleClass("hide-drawer");
    }
  );
  $(
    ".mobile-view-main-action-btns .mobile-audio-settings-btn,.mobile-speaker-settings-close"
  ).click(function () {
    $(".mobile-view-modal-drawer.mobile-speaker-settings-wrapper").toggleClass(
      "mobile-speaker-settings-show"
    );
    $(".drawer-wrapper").toggleClass("hide-drawer");
  });
  $(
    ".mobile-view-main-action-btns .mobile-chat-btn,.mobile-view-chat-close"
  ).click(function () {
    $(".mobile-view-modal-drawer.mobile-view-chat-wrapper").toggleClass(
      "mobile-chat-show"
    );
    $(".drawer-wrapper").toggleClass("hide-drawer");
  });
  $(".mobile-video-btn,.mobile-expand-btn").click(function () {
    $(this).toggleClass("active");
  });
  $(
    ".mobile-drawer-camera-switch-btn,.mobile-hand-raise-btn,.mobile-mic-mute-btn"
  ).click(function () {
    $(this).toggleClass("active");
  });
  $(".mobile-hand-raise-btn").click(function () {
    $(".mobile-hand-raise-wrapper").toggleClass("active");
    setTimeout(() => {
      $(".mobile-hand-raise-wrapper").toggleClass("active");
      $(this).toggleClass("active");
    }, 2000);
  });
  $(".mobile-active-local-cameras li").click(function () {
    $(".mobile-active-local-cameras li").removeClass("active");
    $(this).toggleClass("active");
  });
  mobileViewModalDrawerHeight();
  mobileViewActiveParticipantsHeight();
  function mobileViewActiveParticipantsHeight() {
    let windowHeight = window.innerHeight;
    let mobileViewModalHeight = $(
      ".mobile-view-active-participants .mobile-view-modal-header"
    ).outerHeight();
    let mobileViewModalBodyHeight = windowHeight - (mobileViewModalHeight + 20);
    $(".mobile-view-active-participants .mobile-view-modal-body").css(
      "max-height",
      `${mobileViewModalBodyHeight}px`
    );
  }
  function mobileViewModalDrawerHeight() {
    let windowHeight = window.innerHeight;
    let mobileViewModalHeight = $(
      ".mobile-view-add-participants .mobile-view-modal-header"
    ).outerHeight();
    let mobileViewModalBodyHeight = windowHeight - (mobileViewModalHeight + 20);
    $(".mobile-view-add-participants .mobile-view-modal-body").css(
      "max-height",
      `${mobileViewModalBodyHeight}px`
    );
  }

  // // mobile view drawer js
  // var isDragging = false;
  // var startY;
  // var currentY;
  // var drawerHeight = $(".drawer-content").outerHeight();
  // console.log({ drawerHeight });
  // var drawer = $("#drawer");
  // var translateY = 0; // Initial translateY value

  // $(".drawer-header .drag-btn").on("mousedown touchstart", function (e) {
  //   isDragging = true;
  //   startY = e.type === "mousedown" ? e.clientY : e.touches[0].clientY;
  //   currentY = startY;

  //   // Change cursor to grabbing during drag
  //   $(this).css("cursor", "grabbing");

  //   // Prevent default drag behavior
  //   e.preventDefault();
  // });

  // $(document)
  //   .on("mousemove touchmove", function (e) {
  //     if (isDragging) {
  //       var pageY = e.type === "mousemove" ? e.clientY : e.touches[0].clientY;
  //       var dy = pageY - currentY;
  //       translateY += dy;
  //       currentY = pageY;

  //       // Ensure translateY does not go beyond drawer height
  //       translateY = Math.max(translateY, 0);
  //       translateY = Math.min(translateY, drawerHeight);

  //       // Apply the transform with the positive translateY value
  //       drawer.css("transform", "translateY(" + translateY + "px)");
  //     }
  //   })
  //   .on("mouseup touchend", function () {
  //     if (isDragging) {
  //       isDragging = false;
  //       $(".drawer-header .drag-btn").css("cursor", "grab");

  //       // Snap open or closed based on the drag distance
  //       if (translateY > drawerHeight / 2) {
  //         // If dragged down more than half of the drawer height, close it
  //         drawer.css("transform", "translateY(" + drawerHeight + "px)");
  //         translateY = drawerHeight; // Set translateY to match the drawer height (closed state)
  //       } else {
  //         // If dragged less than half of the drawer height, open it
  //         drawer.css("transform", "translateY(0px)");
  //         translateY = 0; // Reset translateY for the open state
  //       }
  //     }
  //   });
  // // mobile view drawer js end
});

function listViewButtonClick(element) {
  $(element).children("svg").toggleClass("rotate0");
  $(element).children("svg").toggleClass("rotate180");
  $(element).siblings().toggle("slide", { direction: "up" }, 1000);
}

function participantIconShow(elem) {
  $(elem).children(".participant-cameras-list").show(300);
}

function participantIconHide(elem) {
  $(elem).children(".participant-cameras-list").hide(300);
}

function chatViewResize() {
  let windowHeight = window.innerHeight;
  let chatViewHeaderHeight = $(".chat-view-header").innerHeight();
  let chatViewFooterHeight = $(".chat-view-footer").innerHeight();
  let chatViewBodyHeight = windowHeight - (72 + 92);
  // let chatViewBodyHeight = windowHeight - 72;
  $(".chat-view-body").css("height", `${chatViewBodyHeight}px`);

  let mobileChatViewHeaderHeight = $(".mobile-view-modal-header").innerHeight();
  let mobileChatViewFooterHeight = $(".mobile-view-modal-footer").innerHeight();
  let mobileChatViewBodyHeight =
    windowHeight - (mobileChatViewHeaderHeight + mobileChatViewFooterHeight);
  $(".mobile-view-chat-wrapper .chat-view-body").css(
    "height",
    `${mobileChatViewBodyHeight}px`
  );
}
