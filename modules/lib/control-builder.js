class ControlBuilder {
  createRecordButton() {
    var ctrlTmplt = `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    >
    <defs>
    <style>
    .a {
      opacity: 0.123;
      fill: url(#a1);
    }
    .b,
    .e {
      fill: none;
    }
    .b1 {
      stroke: #fff;
      stroke-width: 1.5px;
    }
    .c1 {
      fill: #fff;
    }
    .d {
      stroke: none;
    }
    </style>
    <linearGradient
    id="a1"
    x1="0.851"
    y1="0.241"
    x2="0.299"
    y2="0.843"
    gradientUnits="objectBoundingBox"
    >
    <stop offset="0" stop-color="#808486" />
    <stop offset="1" stop-color="#182024" />
    </linearGradient>
    </defs>
    <circle class="a" cx="16" cy="16" r="16" />
    <g class="b1" transform="translate(5 5)">
    <rect class="d" width="22" height="22" rx="11" />
    <rect
    class="e"
    x="0.75"
    y="0.75"
    width="20.5"
    height="20.5"
    rx="10.25"
    />
    </g>
    <rect
    class="c1"
    width="14"
    height="14"
    rx="7"
    transform="translate(9 9)"
    />
    </svg>
    Start Record`; //<button class="record-btn">
    var recordBtn = document.createElement("button");
    recordBtn.id = "epic_RecordBtn";
    recordBtn.classList = "record-btn";
    recordBtn.innerHTML = ctrlTmplt;
    return recordBtn;
  }
  stopRecordSvg() {
    return $(`<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    >
    <defs>
    <style>
    .a {
      opacity: 0.123;
      fill: url(#a);
    }
    .b,
    .e {
      fill: none;
    }
    .b {
      stroke: #ff6767;
      stroke-width: 1.5px;
    }
    .c {
      fill: url(#b);
    }
    .d {
      stroke: none;
    }
    </style>
    <linearGradient
    id="a"
    x1="0.851"
    y1="0.241"
    x2="0.299"
    y2="0.843"
    gradientUnits="objectBoundingBox"
    >
    <stop offset="0" stop-color="#808486" />
    <stop offset="1" stop-color="#182024" />
    </linearGradient>
    <linearGradient
    id="b"
    x1="0.949"
    y1="0.086"
    x2="0.046"
    y2="0.928"
    gradientUnits="objectBoundingBox"
    >
    <stop offset="0" stop-color="#ff6767" />
    <stop offset="1" stop-color="#ff2851" />
    </linearGradient>
    </defs>
    <circle class="a" cx="16" cy="16" r="16" />
    <g class="b" transform="translate(5 5)">
    <rect class="d" width="22" height="22" rx="11" />
    <rect
    class="e"
    x="0.75"
    y="0.75"
    width="20.5"
    height="20.5"
    rx="10.25"
    />
    </g>
    <rect
    class="c"
    width="10"
    height="10"
    rx="2"
    transform="translate(11 11)"
    />
    </svg>`);
  }
  startRecordBtn() {
    var tmplt = `00:00:00`;
    var btn = document.createElement("button");
    btn.id = "epic_StopRecording";
    //btn.click = stopRecording;
    btn.classList = "record-btn-start";
    $(btn).append(this.stopRecordSvg()).append(tmplt);
    return btn;
  }
  createRecordButtonContainer() {
    // return $(
    //   '<div class="record-btn-container" id="recordBtnDiv"></div>'
    // ).append([this.createRecordButton(), this.startRecordBtn()]);
  }

  createMobileMenuBtn() {
    var tmplt = `<button class="mobile-menu-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="45" viewBox="0 0 32 45">
    <defs>
    <style>
    .mob-menu-svg-a {
      fill: #18191c;
      opacity: 0;
    }
    .mob-menu-svg-b,
    .mob-menu-svg-d {
      fill: none;
    }
    .mob-menu-svg-b {
      stroke: #fff;
      stroke-width: 1.5px;
    }
    .mob-menu-svg-c {
      stroke: none;
    }
    </style>
    </defs>
    <g transform="translate(-344 -573)">
    <rect class="mob-menu-svg-a" width="32" height="45" transform="translate(344 573)" />
    <g transform="translate(356.5 582)">
    <g class="mob-menu-svg-b" transform="translate(7.5) rotate(90)">
    <circle class="mob-menu-svg-c" cx="3.5" cy="3.5" r="3.5" />
    <circle class="mob-menu-svg-d" cx="3.5" cy="3.5" r="2.75" />
    </g>
    <g class="mob-menu-svg-b" transform="translate(7.5 10) rotate(90)">
    <circle class="mob-menu-svg-c" cx="3.5" cy="3.5" r="3.5" />
    <circle class="mob-menu-svg-d" cx="3.5" cy="3.5" r="2.75" />
    </g>
    <g class="mob-menu-svg-b" transform="translate(7.5 20) rotate(90)">
    <circle class="mob-menu-svg-c" cx="3.5" cy="3.5" r="3.5" />
    <circle class="mob-menu-svg-d" cx="3.5" cy="3.5" r="2.75" />
    </g>
    </g>
    </g>
    </svg>
    </button>
    <div class="mobile-menu-view-content">
    </div>
    `;

    return $(tmplt);
  }
  createMobileMenuCloseBtn() {
    return $(`<button class="mobile-menu-close-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
    <defs>
    <style>
    .mobile-menu-close-a {
      fill: #fff;
      stroke-width: 0.4px;
      opacity: 0;
    }
    
    .mobile-menu-close-a,
    .mobile-menu-close-b {
      stroke: #808486;
    }
    
    .mobile-menu-close-b,
    .mobile-menu-close-d {
      fill: none;
    }
    
    .mobile-menu-close-b {
      stroke-width: 1.5px;
    }
    
    .mobile-menu-close-c {
      stroke: none;
    }
    </style>
    </defs>
    <g transform="translate(-1222 -430)">
    <g class="mobile-menu-close-a" transform="translate(1222 430)">
    <rect class="mobile-menu-close-c" width="22" height="22" />
    <rect class="mobile-menu-close-d" x="0.2" y="0.2" width="21.6" height="21.6" />
    </g>
    <g transform="translate(1233.122 431.407) rotate(45)">
    <line class="mobile-menu-close-b" y2="13.739" transform="translate(6.869)" />
    <line class="mobile-menu-close-b" y2="13.739"
    transform="translate(13.739 6.869) rotate(90)" />
    </g>
    </g>
    </svg>
    </button>`);
  }
  createMobileMenuShareScreenBtn() {
    return $(`<button class="mobile-view-share-btn">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="36"
    height="36" viewBox="0 0 36 36">
    <defs>
    <style>
    .mobile-share-screen-svg-a {
      opacity: 0;
      fill: url(#a);
    }
    
    .mobile-share-screen-svg-b,
    .mobile-share-screen-svg-c,
    .mobile-share-screen-svg-f {
      fill: none;
    }
    
    .mobile-share-screen-svg-b,
    .mobile-share-screen-svg-c {
      stroke: #fff;
      stroke-width: 1.2px;
    }
    
    .mobile-share-screen-svg-c {
      stroke-linecap: round;
    }
    
    .mobile-share-screen-svg-d {
      fill: #fff;
    }
    
    .mobile-share-screen-svg-e {
      stroke: none;
    }
    </style>
    <linearGradient id="svgMobileShareScren" x1="0.788" y1="0.211" x2="0.269" y2="0.822"
    gradientUnits="objectBoundingBox">
    <stop offset="0" stop-color="#ffc741" />
    <stop offset="1" stop-color="#b27e00" />
    </linearGradient>
    </defs>
    <g transform="translate(0 -0.479)">
    <rect class="mobile-share-screen-svg-a" width="36" height="36" rx="18"
    transform="translate(0 0.479)" />
    <g transform="translate(7 8)">
    <g class="mobile-share-screen-svg-b" transform="translate(0 0.48)">
    <rect class="mobile-share-screen-svg-e" width="23" height="17" rx="4" />
    <rect class="mobile-share-screen-svg-f" x="0.6" y="0.6" width="21.8" height="15.8"
    rx="3.4" />
    </g>
    <line class="mobile-share-screen-svg-c" x2="16.98" transform="translate(3.009 21.303)" />
    <path class="mobile-share-screen-svg-d"
    d="M5,19.646a.444.444,0,0,1-.144-.023.465.465,0,0,1-.321-.465c0-.07.479-6.818,7.246-7.348V9.383a.465.465,0,0,1,.8-.325l4.587,4.685a.465.465,0,0,1,0,.651l-4.587,4.685a.465.465,0,0,1-.8-.325v-2.38A7.94,7.94,0,0,0,5.4,19.43.465.465,0,0,1,5,19.646Zm7.711-9.124v1.722a.465.465,0,0,1-.449.465,6.592,6.592,0,0,0-6.507,4.952,9.613,9.613,0,0,1,6.463-2.231h.021a.465.465,0,0,1,.465.465v1.722l3.486-3.546Z"
    transform="translate(0.652 -5.59)" />
    </g>
    </g>
    </svg>
    Screen Share
    </button>`);
  }
  createMobileMenuRecordBtn() {
    return $(`<button class="mobile-view-record-btn">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32"
    height="32" viewBox="0 0 32 32">
    <defs>
    <style>
    .a {
      opacity: 0.123;
      fill: url(#a1);
    }
    
    .b,
    .e {
      fill: none;
    }
    
    .b1 {
      stroke: #fff;
      stroke-width: 1.5px;
    }
    
    .c1 {
      fill: #fff;
    }
    
    .d {
      stroke: none;
    }
    </style>
    <linearGradient id="a1" x1="0.851" y1="0.241" x2="0.299" y2="0.843"
    gradientUnits="objectBoundingBox">
    <stop offset="0" stop-color="#808486" />
    <stop offset="1" stop-color="#182024" />
    </linearGradient>
    </defs>
    <circle class="a" cx="16" cy="16" r="16" />
    <g class="b1" transform="translate(5 5)">
    <rect class="d" width="22" height="22" rx="11" />
    <rect class="e" x="0.75" y="0.75" width="20.5" height="20.5" rx="10.25" />
    </g>
    <rect class="c1" width="14" height="14" rx="7" transform="translate(9 9)" />
    </svg>
    Start Record
    </button>`);
  }

  createMobileMenuRecordStart() {
    return $(`<button class="mobile-view-record-btn-start">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32"
    height="32" viewBox="0 0 32 32">
    <defs>
    <style>
    .mobile-screen-record-a {
      opacity: 0.123;
      fill: url(#svgMobileScreenRecordA);
    }
    
    .mobile-screen-record-b,
    .mobile-screen-record-e {
      fill: none;
    }
    
    .mobile-screen-record-b {
      stroke: #ff6767;
      stroke-width: 1.5px;
    }
    
    .mobile-screen-record-c {
      fill: url(#svgMobileScreenRecordB);
    }
    
    .mobile-screen-record-d {
      stroke: none;
    }
    </style>
    <linearGradient id="svgMobileScreenRecordA" x1="0.851" y1="0.241" x2="0.299" y2="0.843"
    gradientUnits="objectBoundingBox">
    <stop offset="0" stop-color="#808486" />
    <stop offset="1" stop-color="#182024" />
    </linearGradient>
    <linearGradient id="svgMobileScreenRecordB" x1="0.949" y1="0.086" x2="0.046" y2="0.928"
    gradientUnits="objectBoundingBox">
    <stop offset="0" stop-color="#ff6767" />
    <stop offset="1" stop-color="#ff2851" />
    </linearGradient>
    </defs>
    <circle class="mobile-screen-record-a" cx="16" cy="16" r="16" />
    <g class="mobile-screen-record-b" transform="translate(5 5)">
    <rect class="mobile-screen-record-d" width="22" height="22" rx="11" />
    <rect class="mobile-screen-record-e" x="0.75" y="0.75" width="20.5" height="20.5" rx="10.25" />
    </g>
    <rect class="mobile-screen-record-c" width="10" height="10" rx="2" transform="translate(11 11)" />
    </svg>
      <p class="mb-0 record-active" style="position: relative;bottom: 25px;left: 50px;font-size: 13px;font-weight: 400;color: #808486;">00:00:00</p>
    </button>`);
  }

  createMobileMenuContentDiv() {
    return $(`<div class=""></div>`).append([this.mobileMenuCloseBtn()]);
  }
  createMobileMenu() {
    return $('<div class="mobile-menu"></div>').append([
      this.mobileMenuBtn(),
      this.mobileMenuContentDiv(),
    ]);
  }
  createCameraSwitchButton() {
    return $(`<button class="camera-switch-btn" id="epic_CameraSwitch">
          <img  src="modules/images/camera_switch_icon.svg" class="img-default"/>
          <img  src="modules/images/camera_switch_icon_hover.svg" class="img-hover"/>
    </button>`);
  }
  createRaiseHandBtn() {
    return $(`<button class="raise-btn" id="epic_HandRaiseBtn">
    <img  src="modules/images/hand_raise_defult.svg" class="img-default" />
    <img  src="modules/images/hand_raise_hover.svg" class="img-hover" />
    <img  src="modules/images/hand_raise_active.svg" class="img-active" />
      </button>`);
  }
  createMessageBtn() {
    return $(`<button class="chat-btn" id="epic_ChatBtn">
          <div id="highlight-indicator" class="highlight-indicator"></div>
          <img  src="modules/images/chat_default.svg" class="img-default" />
          <img  src="modules/images/chat_hover.svg" class="img-hover" />
      </button>`);
  }
  createChatView() {
    return $(`
    <div class="chat-view-wrapper" id="eppic_ChatView">
              <div class="chat-view-header">
                <h6>Chat</h6>
                <button class="btn chat-close-btn">
                  <img src="modules/images/chat_close.svg" alt="" />
                </button>
              </div>
              <div class="chat-view-body">
                <ul class="chat-ul" >
                  <!-- <li class="chat-date-view">
                    <div>
                      <p>23/10/2023</p>
                    </div>
                  </li>
                  <li class="chat-receiver">
                    <img src="modules/images/receiver.png" alt="" />
                    <div class="chat-receiver-message">
                      <p>Hey guys good morning!!</p>
                      <p class="chat-message-time">03:59 Pm</p>
                    </div>
                  </li>
                  <li class="chat-sender">
                    <img src="modules/images/receiver.png" alt="" />
                    <div class="chat-sender-message">
                      <p>Hey guys good morning!!</p>
                      <p class="chat-message-time">03:59 Pm</p>
                    </div>
                  </li> -->
                </ul>
              </div>
              <div class="chat-view-footer">
              <div class="attached-files-list-wrapper">
                  <ul class="attachedFilesUl"></ul>
                </div>
                <div class="input-group">
                  <input
                    class="chat-text-area form-control"
                    type="text"
                    placeholder="Type here"
                    aria-label="Type here"
                    aria-describedby="basic-addon2"
                  />
                  <div class="message-attachment-btn">
                  <input type="file" multiple class="d-none chatAttachment" id="chatAttachment" />
                  <label
                    class="btn input-group-text p-0"
                    for="chatAttachment"
                  >
                    <img src="modules/images/msg_attachment_icon.svg" alt="" />
                  </label>
                </div>
                  <button id="" class="chat-send-btn btn input-group-text p-0 message-send-btn shadow-none">
                    <img src="modules/images/send_icon.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
    `);
  }
  createLocalRaiseHandPopupDiv() {
    return $(
      '<div class="raise-hand-popup local-raise-hand-popup"> <div class="d-flex align-items-center gap-2"><img  src="modules/images/hand_raise_defult.svg"/> <p>You Raised Hand</p> </div> </div>'
    );
  }
  createParticipantsHandPopup() {
    return $(
      `<ul class="participants-raise-hand-popup">
        <!-- <li>
            <div class="raise-hand-popup ">
              <div class="d-flex align-items-center gap-2">
                <img  src="modules/images/hand_raise_defult.svg"/>
                <p id="participants-raise-hand-p" > abc raise hand</p>
              </div>
            </div> 
        </li> -->
      </ul> `
    );
  }
  createVideoCameraBtn() {
    return $(`<button id="epic_MuteVideoCam" class="video-camera-btn active">
        <img  src="modules/images/video_cam_icon.svg" class="img-default" />
       <img  src="modules/images/video_cam_icon_hover.svg" class="img-hover" />
       <img  src="modules/images/video_cam_icon_active.svg" class="img-active" />
    </button>`);
  }
  createVolUp() {
    return $(`<button class="volume-btn" id="silence-btn">
       <img  src="modules/images/audio_btn_icon.svg" class="img-default" />
       <img  src="modules/images/audio_btn_icon_hover.svg" class="img-hover" />
       <img  src="modules/images/audio_btn_icon_active.svg" class="img-active" />
    </button>`);
  }

  createStopCallBtn() {
    return $(`<button class="stop-call-btn" id="epic_StopCall">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="54"
    height="54" viewBox="0 0 54 54">
    <defs>
    <style>
    .stop-call-a {
      fill: url(#svg-stop-call);
    }
    
    .stop-call-b {
      fill: #fff;
    }
    
    .stop-call-c {
      opacity: 0;
      fill: #fff;
    }
    </style>
    <linearGradient id="svg-stop-call" x1="0.183" y1="0.862" x2="0.924" y2="0.23"
    gradientUnits="objectBoundingBox">
    <stop offset="0" stop-color="#ff2851" />
    <stop offset="1" stop-color="#ff9090" />
    </linearGradient>
    </defs>
    <rect class="stop-call-a" width="54" height="54" rx="27" />
    <rect class="stop-call-b" width="18" height="18" transform="translate(18 18)" />
    <rect class="stop-call-c" width="22" height="22" transform="translate(16 16)" />
    </svg>
    </button>`);
  }
  createMicBtn() {
    return $(`<button id="epic_AudioMute" class="mic-btn">
    <img  src="modules/images/mic_active_mute.svg" />
  </button>`);
  }
  createShareScreenBtnDump() {
    return $(`<button class="share-screen-btn" data-toggle="modal" data-target="#sharePopup">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="54"
    height="54" viewBox="0 0 54 54">
    <defs>
    <style>
    .share-screen-a {
      fill: url(#svg-share-screen);            
      
      .share-screen-b,
      .share-screen-c,
      .share-screen-f {
        fill: none;
      }
      
      .share-screen-b,
      .share-screen-c {
        stroke: #fff;
        stroke-width: 1.5px;
      }
      
      .share-screen-c {
        stroke-linecap: round;
      }
      
      .share-screen-d {
        fill: #fff;
      }
      
      .share-screen-e {
        stroke: none;
      }
      </style>
      <linearGradient id="svg-share-screen" x1="0.788" y1="0.211" x2="0.269" y2="0.822"
      gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#ffc741" />
      <stop offset="1" stop-color="#b27e00" />
      </linearGradient>
      </defs>
      <rect class="share-screen-a" width="54" height="54" rx="27" />
      <g transform="translate(-296.496 -98.332)">
      <g class="share-screen-b" transform="translate(308.495 112.332)">
      <rect class="share-screen-e" width="31" height="22" rx="4" />
      <rect class="share-screen-f" x="0.75" y="0.75" width="29.5" height="20.5" rx="3.25" />
      </g>
      <line class="share-screen-c" x2="24" transform="translate(311.995 138.832)" />
      <path class="share-screen-d"
      d="M5.2,24.138a.63.63,0,0,1-.2-.033.659.659,0,0,1-.455-.659c0-.1.679-9.674,10.28-10.425V9.578a.659.659,0,0,1,1.131-.462l6.508,6.647a.659.659,0,0,1,0,.923L15.95,23.334a.659.659,0,0,1-1.131-.462V19.5c-6.41.244-9.037,4.286-9.064,4.336A.659.659,0,0,1,5.2,24.138Zm10.94-12.944v2.443a.659.659,0,0,1-.636.659,9.352,9.352,0,0,0-9.232,7.026,13.639,13.639,0,0,1,9.169-3.165h.03a.659.659,0,0,1,.659.659V21.26l4.946-5.031Z"
      transform="translate(310.496 106.222)" />
      </g>
      </svg>
      </button>`);
  }
  createAddParticipantBtn() {
    return $(`<button class="add-participants-btn p-0">
    <img  src="modules/images/add_new_user.svg" />
  </button>`);
  }
  createAddParticipantsListCloseBtn() {
    return $(`
    <button class="btn p-0 border-0 add-participants-close-btn box-shadow-none">
        <img src="modules/images/popup_close.svg" alt="" />
    </button>`);
  }
  createParticipantsListRowHeader() {
    return $(`<div class="row">
      <div class="col-12">
      <h5>Add Friends</h5>
      <!--close-btn-->                      
      </div>
      </div>`);
  }
  createParticipantsVideoBtn() {
    // var UserDetails = getCookie();
    // if (UserDetails != undefined) {
    //   UserDetails = JSON.parse(UserDetails);
    // }
    const name = "user_details=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split("; ");
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    let UserDetails = JSON.parse(res); // to be noted

    return $(`<button class="participants-video-btn btn border-0 p-0 box-shadow-none" id="video_Master${UserDetails.userID}" onclick="pauseResumeProducer('${UserDetails.userID}','${UserDetails.clientID}','video')">
        <img
        src="modules/images/all_video_mute.svg"
        class="img-default"
        alt=""
      />
      <img
        src="modules/images/all_video_muted.svg"
        class="img-active"
        alt=""
      />
  </button>`);
  }
  createParticipantsMicBtn() {
    // var UserDetails = getCookie();
    // if (UserDetails != undefined) {
    //   UserDetails = JSON.parse(UserDetails);
    // }
    const name = "user_details=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split("; ");
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    let UserDetails = JSON.parse(res); // to be noted

    return $(`<button class="participants-mic-btn btn border-0 p-0 box-shadow-none" id="audio_Master${UserDetails.userID}" onclick="pauseResumeProducer('${UserDetails.userID}','${UserDetails.clientID}','audio')">
        <img
        src="modules/images/all_audio_mute.svg"
        class="img-default"
        alt=""
      />
      <img
        src="modules/images/all_audio_muted.svg"
        class="img-active"
        alt=""
      />
      </button>`);
  }
  createParticipantListVideoBtns() {
    return $(`<button class="participant-list-video-btns">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26"
      height="26" viewBox="0 0 26 26">
      <defs>
      <style>
      .participant-list-svg-video-a {
        opacity: 0;
        fill: url(#participantListSvgVideo);
      }
      
      .participant-list-svg-video-b {
        fill: none;
        stroke: #182024;
      }
      
      .participant-list-svg-video-c {
        opacity: 0.978;
      }
      </style>
      <linearGradient id="participantListSvgVideo" x1="0.818" y1="0.136" x2="0.236" y2="0.873"
      gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#a7a3ff" />
      <stop offset="1" stop-color="#4a43e3" />
      </linearGradient>
      </defs>
      <rect class="participant-list-svg-video-a" width="26" height="26" rx="13" />
      <g transform="translate(6.973 8.255)">
      <path class="participant-list-svg-video-b"
      d="M2,6v9.881h9.873V13.046L15.509,14.4V7.482L11.873,8.835V6Z"
      transform="translate(-2 -6)" />
      <g class="participant-list-svg-video-c" transform="translate(4.925 0.598) rotate(45)">
      <line class="participant-list-svg-video-b" x2="0.254" y2="6.104"
      transform="translate(2.925 0)" />
      <line class="participant-list-svg-video-b" x1="0.254" y2="6.104"
      transform="translate(6.104 2.925) rotate(90)" />
      </g>
      </g>
      </svg>
      </button>`);
  }
  createParticipantListMicBtns() {
    return $(`  <button class="participant-list-mic-btns">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26"
      height="26" viewBox="0 0 26 26">
      <defs>
      <style>
      .participant-list-svg-mic-a,
      .participant-list-svg-mic-d {
        opacity: 0;
      }
      
      .participant-list-svg-mic-a {
        fill: url(#participantListSvgmic);
      }
      
      .participant-list-svg-mic-b,
      .participant-list-svg-mic-c,
      .participant-list-svg-mic-d,
      .participant-list-svg-mic-f {
        fill: none;
      }
      
      .participant-list-svg-mic-b,
      .participant-list-svg-mic-c,
      .participant-list-svg-mic-d {
        stroke: #182024;
      }
      
      .participant-list-svg-mic-b {
        stroke-linejoin: round;
      }
      
      .participant-list-svg-mic-e {
        stroke: none;
      }
      </style>
      <linearGradient id="participantListSvgmic" x1="0.829" y1="0.155" x2="0.232" y2="0.875"
      gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#e472ff" />
      <stop offset="1" stop-color="#b529d6" />
      </linearGradient>
      </defs>
      <rect class="participant-list-svg-mic-a" width="26" height="26" rx="13" />
      <g transform="translate(8.328 5.431)">
      <path class="participant-list-svg-mic-b"
      d="M9.607,4.65A4.729,4.729,0,0,0,4.8,0,4.729,4.729,0,0,0,0,4.65"
      transform="translate(9.607 11.642) rotate(180)" />
      <line class="participant-list-svg-mic-c" y2="2.617" transform="translate(4.786 12.073)" />
      <line class="participant-list-svg-mic-c" x2="3.192" transform="translate(3.191 14.69)" />
      <g class="participant-list-svg-mic-c" transform="translate(1.172)">
      <rect class="participant-list-svg-mic-e" width="7.131" height="9.983" rx="3.565" />
      <rect class="participant-list-svg-mic-f" x="0.5" y="0.5" width="6.131" height="8.983"
      rx="3.065" />
      </g>
      <line class="participant-list-svg-mic-d" x1="9.032" y2="13.31"
      transform="translate(0.238 0.238)" />
      </g>
      </svg>
      </button>`);
  }
  createParticipantListFullscreenBtns() {
    return $(`<button class="participant-list-fullscreen-btns">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26"
      height="26" viewBox="0 0 26 26">
      <defs>
      <style>
      .participant-list-svg-fullscreen-a {
        opacity: 0;
        fill: url(#participantListSvgfullscreen);
      }
      
      .participant-list-svg-fullscreen-b,
      .participant-list-svg-fullscreen-c {
        fill: none;
        stroke: #182024;
      }
      
      .participant-list-svg-fullscreen-b {
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      </style>
      <linearGradient id="participantListSvgfullscreen" x1="0.829" y1="0.158" x2="0.206" y2="0.88"
      gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#58d379" />
      <stop offset="1" stop-color="#008e27" />
      </linearGradient>
      </defs>
      <rect class="participant-list-svg-fullscreen-a" width="26" height="26" rx="13" />
      <g transform="translate(7 7)">
      <rect class="participant-list-svg-fullscreen-b" width="12.159" height="12.159" />
      <path class="participant-list-svg-fullscreen-c" d="M7.873,6.288H4.288v3.9"
      transform="translate(-1.146 -2.871)" />
      <path class="participant-list-svg-fullscreen-c" d="M3.585,0H0V3.9"
      transform="translate(9.001 9.787) rotate(180)" />
      </g>
      </svg>
      </button>`);
  }
  createOpenCloseCameraBtn() {
    return $(`  <button class="open-close-camera-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="16.879" height="19" viewBox="0 0 16.879 19">
      <defs>
      <style>
      .cameras-view-btns-a {
        fill: #182024;
        opacity: 0.6;
      }
      
      .cameras-view-btns-b {
        fill: none;
        stroke: #fff;
        stroke-width: 2px;
      }
      </style>
      </defs>
      <path class="cameras-view-btns-a"
      d="M5,0h9a4.852,4.852,0,0,1,5,4.689v12.19H0V4.689A4.852,4.852,0,0,1,5,0Z"
      transform="translate(0 19) rotate(-90)" />
      <path class="cameras-view-btns-b" d="M6.692,0V6.692H0"
      transform="translate(16.053 9.433) rotate(135)" />
      </svg>
      </button>`);
  }
  createCameraOne() {
    return $(`<li><button class="active camera-one"></button></li>`);
  }
  createMicBtn() {
    return $(`<button id="epic_AudioMute" class="mic-btn active">
    <img  src="modules/images/mic_active_mute.svg" class="img-default"/>
    <img  src="modules/images/mic_active_mute_hover.svg" class="img-hover"/>
    <img  src="modules/images/mic_active_mute_active.svg" class="img-active"/>
  </button>`);
  }
  // createStopCallBtn() {
  //   return $(`<button class="stop-call-btn">
  //   <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="54" height="54"
  //     viewBox="0 0 54 54">
  //     <defs>
  //       <style>
  //         .stop-call-a {
  //           fill: url(#svg-stop-call);
  //         }

  //         .stop-call-b {
  //           fill: #fff;
  //         }

  //         .stop-call-c {
  //           opacity: 0;
  //           fill: #fff;
  //         }
  //       </style>
  //       <linearGradient id="svg-stop-call" x1="0.183" y1="0.862" x2="0.924" y2="0.23"
  //         gradientUnits="objectBoundingBox">
  //         <stop offset="0" stop-color="#ff2851" />
  //         <stop offset="1" stop-color="#ff9090" />
  //       </linearGradient>
  //     </defs>
  //     <rect class="stop-call-a" width="54" height="54" rx="27" />
  //     <rect class="stop-call-b" width="18" height="18" transform="translate(18 18)" />
  //     <rect class="stop-call-c" width="22" height="22" transform="translate(16 16)" />
  //   </svg>
  // </button>`);
  // }
  createShareScreenBtn() {
    return $(`<button id="epi_ShareScreenBtn" class="share-screen-btn ">
    <img  src="modules/images/share_screen_icon.svg" class="img-default"/>
    <img  src="modules/images/share_screen_icon_hover.svg" class="img-hover"/>
    <img  src="modules/images/Active_Screen_share_new.svg" class="img-active"/>
  </button>`);
  }
  createCancelBtn() {
    return $(`<button type="button" class="btn cancel-btn" data-dismiss="modal">
      Cancel
      </button>`);
  }
  createShareBtn() {
    return $(` <button type="button" class="btn share-btn">
      Start Sharing
      </button>`);
  }
  createAddVideoCallBtn() {
    return $(` <button class=" add-video-call-btn">
    <img src="images/video_call_icon.svg" alt="" />
    Add
  </button>`);
  }
  createParticipantsViewBtn() {
    return $(` <button class="participants-view-btn rotate0">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <defs>
      <style>
      .participants-view-a {
        fill: #18191c;
        opacity: 0.3;
      }
      
      .participants-view-b {
        fill: none;
        stroke: #fff;
        stroke-width: 2px;
      }
      </style>
      </defs>
      <g transform="translate(320.885 128.723) rotate(180)">
      <rect class="participants-view-a" width="32" height="32" rx="16" transform="translate(288.885 96.723)" />
      <path class="participants-view-b" d="M8.768,0V8.768H0"
      transform="translate(304.998 105.112) rotate(45)" />
      </g>
      </svg>
      </button>`);
  }
  createVideoContainer() {
    return $(`<div class="video-container"></div>`);
  }
  createVideoElement() {
    return $(`<video autoplay class="">
      <source src="modules/images/mov_bbb.mp4" type="video/mp4" />
      </video>`);
  }
  addVideoElement() {
    return $(`<video autoplay playsinline></video>`);
  }
  checkIfParticipantsExistinList(email) {
    var retVal = false;
    $("#participantsListView li").each(function () {
      var userEmail = $(this).find(".participant-details p").text();
      //console.log('checkIfParticipantsExistinList: ', userEmail);
      //console.log('userEmail === email', userEmail === email)
      if (userEmail === email) {
        retVal = true;
        return false;
      }
      //console.log('Loop Continue...');
    });
    return retVal;
  }
  // createAddParticipantsListItem(participant) {
  //   //console.error(participant);
  //   var _ParticipantsList = "";

  //   this.CreateAvatar(participant);

  //   const name = "user_details=";
  //   const cDecoded = decodeURIComponent(document.cookie); //to be careful
  //   const cArr = cDecoded.split("; ");
  //   let res;
  //   cArr.forEach((val) => {
  //     if (val.indexOf(name) === 0) res = val.substring(name.length);
  //   });
  //   let UserDetails = JSON.parse(res); // to be noted

  //   participant.forEach((element) => {
  //     _ParticipantsList += `<li>
  //     <div class="participants-list-wrapper">
  //       <div class="participants-list-details-wrapper">
  //         <div class="d-flex align-items-center">
  //           <div class="participant-pic">
  //           <img src=${element.profileImg == null || element.profileImg == ""
  //         ? "modules/images/default_user.svg"
  //         : "uploads/" + element.profileImg
  //       }
  //           />
  //           </div>
  //           <div class="participant-details">
  //             <h6>${element.name}</h6>
  //             <!--<p>test@gmail.com</p>-->
  //             <p>${element.email}</p>
  //           </div>
  //         </div>
  //       </div>`;
  //     if (element.email != UserDetails.email) {
  //       _ParticipantsList += `
  //       <div class="participants-list-actions-wrapper">
  //         <div
  //           class="participant-list-btns btn-active d-flex justify-content-end gap-1"
  //         >
  //         <button class="participant-list-fullscreen-btns" onclick="fullScreenFunc('${element.userid}')">
  //         <img
  //         src="modules/images/expand_default.svg"
  //         class="img-default"
  //         alt=""
  //       />
  //       <img
  //         src="modules/images/expand_active.svg"
  //         class="img-active"
  //         alt=""
  //       />
  //           </button>
  //           <button class="participant-list-video-btns" id="video_List${element.userid}" onclick="closeRemoteProducer('${element.clientid}','video')">
  //               <img
  //               src="modules/images/mute_video.svg"
  //               class="img-default"
  //               alt=""
  //             />
  //             <img
  //               src="modules/images/muted_video.svg"
  //               class="img-active"
  //               alt=""
  //             />
  //           </button>
  //           <button class="participant-list-mic-btns" id="audio_List${element.userid}" onclick="closeRemoteProducer('${element.clientid}','audio')">
  //           <img
  //           src="modules/images/mute_audio.svg"
  //           class="img-default"
  //           alt=""
  //         />
  //         <img
  //           src="modules/images/muted_audio.svg"
  //           class="img-active"
  //           alt=""
  //         />
  //           </button>

  //         </div>
  //         </div>`;
  //     } else {
  //       _ParticipantsList += `
  //     <div class="participants-list-actions-wrapper">
  //       <div
  //         class="participant-list-btns btn-active d-flex justify-content-end gap-1">
  //         <h6 style="color: #182024" class="mb-0">(You)</h6>
  //       </div>
  //     </div>`;
  //     }
  //     _ParticipantsList += ` </div >
  //       </li > `;
  //   });

  //   return _ParticipantsList;
  // }

  async createAddParticipantsListItem(CurrentParticipants) {
    this.CreateAvatar(CurrentParticipants);
    const name = "user_details=";
    const cDecoded = decodeURIComponent(await getCookie()); //to be careful
    const cArr = cDecoded.split("; ");
    let res;
    // cArr.forEach((val) => {
    //   if (val.indexOf(name) === 0) res = val.substring(name.length);
    // });
    let UserDetails = JSON.parse(await getCookie()); // to be noted

    let prevUserEmails = [];
    let currentParticipantsEmails = [];
    let liList = $("#participantsListView").find("li");
    if (liList.length > 0) {
      liList.toArray().forEach((li) => {
        prevUserEmails.push($(li).find("p").text());
      });
    }
    CurrentParticipants.forEach((Participant) => {
      currentParticipantsEmails.push(Participant.email);
    });
    const leftParticipant = prevUserEmails.filter(
      (value) => !currentParticipantsEmails.includes(value)
    );
    leftParticipant.forEach((left) => {
      if ($("#participantsListView").length > 0) {
        if (left != UserDetails.email) {
          $("#participantsListView")
            .find("p:contains('" + left + "')")
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .remove();
          $(".mobile-active-participants-list")
            .find("p:contains('" + left + "')")
            .parent()
            .parent()
            .remove();
        }
      }
    });
    const addParticipants = currentParticipantsEmails.filter(
      (value) => !prevUserEmails.includes(value)
    );
    addParticipants.forEach(async (emailId) => {
      let element = CurrentParticipants.find((e) => e.email == emailId);
      let _ParticipantsList = "";
      let _ParticipantListMob = "";
      var firstNumber = parseInt(element.userid.match(/\d/)[0]);
      let backgroundColor = await getcolor(firstNumber);
      _ParticipantsList += `<li>
      <div class="participants-list-wrapper">
        <div class="participants-list-details-wrapper">
          <div class="d-flex align-items-center">
            <div class="participant-pic">
            ${element.profileImg
          ? `<div class="add-participant-pic position-relative border border-secondary rounded-circle">
                  <img src="${fileUploadPath}${element.profileImg}" alt="Profile Image" /> 
                 </div>`
          : `<div class="add-participant-pic position-relative border border-secondary rounded-circle" style=" background-color: ${backgroundColor}36; height:50px;width:50px;">
                    <h6 class="mb-0 noselect" style="text-indent: 0px; position: relative; color: ${backgroundColor}; left:15px; top: 15px;">
                      ${element.name
            .split(" ")
            .filter((word) => word !== "")
            .map((word) => word[0].toUpperCase())
            .slice(0, 2)
            .join("")}
                    </h6>
                </div>`
        }
            </div>
            <div class="participant-details">
              <h6>${element.email != UserDetails.email
          ? element.name
          : element.name + " (You)"
        }</h6>
              <!--<p>test@gmail.com</p>--> 
              ${element.email.includes("@guest")
          ? '<p style="display:none;">' +
          element.email +
          '</p><h4 style="color:#808486;font-size: 12px;">Guest</h4>'
          : "<p>" + element.email + "</p>"
        }
            </div>
          </div>
        </div>`;
      if (element.email != UserDetails.email) {
        _ParticipantsList += `
        <div class="participants-list-actions-wrapper">
          <div
            class="participant-list-btns btn-active d-flex justify-content-end gap-1"
          >
          <button class="participant-list-fullscreen-btns" onclick="fullScreenFunc('${element.userid}')">
          <img
          src="modules/images/expand_default.svg"
          class="img-default"
          alt=""
        />
        <img
          src="modules/images/expand_active.svg"
          class="img-active"
          alt=""
        />
            </button>
            <button class="participant-list-video-btns active" id="video_List${element.userid}" onclick="closeRemoteProducer('${element.clientid}','video')">
                <img
                src="modules/images/mute_video.svg"
                class="img-default"
                alt=""
              />
              <img
                src="modules/images/muted_video.svg"
                class="img-active"
                alt=""
              />
            </button>
            <button class="participant-list-mic-btns active" id="audio_List${element.userid}" onclick="closeRemoteProducer('${element.clientid}','audio')">
            <img
            src="modules/images/mute_audio.svg"
            class="img-default"
            alt=""
          />
          <img
            src="modules/images/muted_audio.svg"
            class="img-active"
            alt=""
          />
            </button>
            
          </div>
          </div>`;
      } else {
        //   _ParticipantsList += `
        // <div class="participants-list-actions-wrapper">
        //   <div
        //     class="participant-list-btns btn-active d-flex justify-content-end gap-1">
        //     <h6 style="color: #182024" class="mb-0">(You)</h6>
        //   </div>
        // </div>`;
      }
      _ParticipantsList += ` </div >
        </li > `;
      $("#participantsListView").append(_ParticipantsList);
      _ParticipantListMob += `<li>
        ${element.profileImg
          ? `<div class="add-participant-pic position-relative border border-secondary rounded-circle">
          <img src="${fileUploadPath}${element.profileImg}" alt="Profile Image" />
        </div>`
          : `<div class="add-participant-pic position-relative border border-secondary rounded-circle"
          style=" background-color: ${backgroundColor}36; height:50px;width:50px;">
          <h6 class="mb-0 noselect"
            style="text-indent: 0px; position: relative; color: ${backgroundColor}; left:15px; top: 15px;">
            ${element.name
            .split(" ")
            .filter((word) => word !== "")
            .map((word) => word[0].toUpperCase())
            .slice(0, 2) // Take only the first two initials
            .join("")}
          </h6>
        </div>`
        }
      <div class="participant-info">
        <h6>${element.email != UserDetails.email
          ? element.name
          : element.name + " (You)"
        }</h6>
        ${element.email.includes("@guest")
          ? '<p style="display:none;">' +
          element.email +
          '</p><h4 style="color:#808486;font-size: 12px;">Guest</h4>'
          : "<p>" + element.email + "</p>"
        }
      </div>`;
      if (element.email != UserDetails.email) {
        _ParticipantListMob += `  <div class="d-flex">
          <!-- <button class="btn mobile-expand-btn" onclick="fullScreenFunc('$      {element.userid}')">
            <img
              src="modules/images/mobile_expand.svg"
              class="img-default"
              alt=""
            />
            <img
              src="modules/images/mobile_minimize.svg"
              class="img-active"
              alt=""
            />
          </button> -->
          <button class="btn mobile-video-btn" id="video_List${element.userid}Mob"
            onclick="closeRemoteProducer('${element.clientid}','video')">
            <img
              src="modules/images/mobile_video_mute.svg"
              class="img-default"
              alt=""
            />
            <img
              src="modules/images/mobile_video_muted.svg"
              class="img-active"
              alt=""
            />
          </button>
          <button class="btn mobile-mic-mute-btn" id="audio_List${element.userid}Mob"
            onclick="closeRemoteProducer('${element.clientid}','audio')">
            <img
              src="modules/images/mobile_audio_mute.svg"
              class="img-default"
              alt=""
            />
            <img
              src="modules/images/mobile_audio_muted.svg"
              class="img-active"
              alt=""
            />
          </button>
        </div>`;
      } else {
        // _ParticipantListMob += `
        //   <div class="participants-list-actions-wrapper">
        //     <div class="participant-list-btns btn-active d-flex       justify-content-end gap-1">
        //       <h6 style="color: #182024" class="mb-0">(You)</h6>
        //     </div>
        //   </div>`;
      }
      _ParticipantListMob += `
        </div>
      </li> `;

      $(".mobile-active-participants-list").append(_ParticipantListMob);
    });
  }

  async SearchParticipantListItem(participant) {
    var list = "";
    var listMob = "";
    if (participant && participant.length > 0) {
      for (const element of participant) {
        var firstNumber = parseInt(element.userid.match(/\d/)[0]);
        await getcolor(firstNumber).then((backgroundColor) => {
          list += `<li>
          <div class="row">
              <div class="col-md-9 col-sm-8 col-8 d-flex align-items-center">
                 
                      ${element.profileImg
              ? `<div class="add-participant-pic position-relative border border-secondary rounded-circle">
              <img src="${fileUploadPath}${element.profileImg}" alt="Profile Image" /> 
              ${element.status === "Active"
                ? '<div class="online-status-icon online-view" style="right: 0;left: 45px;top: 45px;bottom:0;"></div>'
                : ""
              }
             </div>`
              : `<div class="add-participant-pic position-relative border border-secondary rounded-circle"style=" background-color: ${backgroundColor}36; height:50px;width:50px;flex-shrink: 0;">
                <h6 class="mb-0 noselect" style="text-indent: 0px; position: relative; color: ${backgroundColor}; left:15px; top: 15px;">
                  ${element.username
                .split(" ")
                .filter((word) => word !== "")
                .map((word) => word[0].toUpperCase())
                .slice(0, 2) // Take only the first two initials
                .join("")}
                </h6>
                ${element.status === "Active"
                ? '<div class="online-status-icon online-view" style="right: 0;left: 45px;top: 45px;bottom:0;"></div>'
                : ""
              }
            </div>`
            }
                  <div class="add-participant-details">
                      <h6>${element.username}</h6>
                      <p>${element.email}</p>
                  </div>
              </div>
              <div class="col-md-3 col-sm-4 col-4 pl-0">
                  <button class="pull-right add-video-call-btn" onclick="RequestToJoin('${element.clientid
            }','${element.userid}')">
                      <img src="modules/images/video_call_icon.svg" alt="Video Call Icon"/>
                      Add
                  </button>
              </div>
          </div>
      </li>`;

          listMob += `
                      <li>
                      ${element.profileImg
              ? `<div class="add-participant-pic position-relative border border-secondary rounded-circle">
                <img src="${fileUploadPath}${element.profileImg}" alt="Profile Image" />
                ${element.status === "Active"
                ? '<div class="online-status-icon online-view" style="right: 0;left: 45px;top: 45px;bottom:0;"></div>'
                : ""
              }
              </div>`
              : `<div class="add-participant-pic position-relative border border-secondary rounded-circle"
                style=" background-color: ${backgroundColor}36; height:50px;width:50px;flex-shrink: 0;">
                <h6 class="mb-0 noselect"
                  style="text-indent: 0px; position: relative; color: ${backgroundColor}; left:15px; top: 15px;">
                  ${element.username
                .split(" ")
                .filter((word) => word !== "")
                .map((word) => word[0].toUpperCase())
                .slice(0, 2) // Take only the first two initials
                .join("")}
                </h6>
                ${element.status === "Active"
                ? '<div class="online-status-icon online-view" style="right: 0;left: 45px;top: 45px;bottom:0;"></div>'
                : ""
              }
              </div>`
            }
                        <div class="participant-info">
                          <h6>${element.username}</h6>
                          <p>${element.email}</p>
                        </div>
                        <button class="btn" onclick="RequestToJoin('${element.clientid
            }','${element.userid}')">
                            <img src="modules/images/video_call_icon.svg" alt="Video Call Icon" />
                            Add
                        </button>
                      </li>`;
        });
      }
    } else {
      list = `
        <div class="participant-not-found-div">
          </br>
          <h6 style="color: black;">No results found</h6>
        </div>
        <ul id="participantsListView">
        </ul>`
    }

    await $("#addParticipantsList").empty().append(list);
    await $(".mobile-add-Participants-list").empty().append(listMob);
  }

  createParticipantsListView() {
    return $(`
    <div class="participant-not-found-div" style="display: none;">
      </br>
      <h6 style="color: black;">No results found</h6>
    </div>
    <ul id="participantsListView">
    </ul>`);
  }

  createAddParticipantPic() {
    return $(`<div class="add-participant-pic">
    <img src="images/pro_img1.png" />
    </div>`);
  }

  createFriendsListItem(data) {
    if (!data) return;

    return $(`<li>
    <div class="row align-items-center g-2">
      <div class="col-md-9 col-sm-8 col-8">
      <div class="add-participant-pic">
      <img src="images/pro_img1.png" />
    </div>
        <div class="add-participant-details">
          <h6>${data.name}</h6>
          <p>${data.email}</p>
        </div>
      </div>
      <div class="col-md-3 col-sm-4 col-4 d-flex justify-content-end">
        <!-- pull-right add-video-call-btn -->
        <button class=" add-video-call-btn">
        <img
          src="images/video_call_icon.svg"
          alt=""
        />
        Add
      </button>
      </div>
    </div>
    </div>
    <div class="col-md-3 col-sm-4 col-4 pl-0">
    <!-- pull-right add-video-call-btn -->
    <button class="pull-right add-video-call-btn">
    <img
    src="images/video_call_icon.svg"
    alt=""
    />
    Add
    </button>
    </div>
    </div>
    </li>`);
  }

  createImgBlock() {
    return $(`<div class="img-block">
    <img src="images/screenshot.jpg" class="img-fluid" />
    </div>`);
  }

  updateParticipantsCount() {
    var count = $("#participantsListView li").length;
    //console.log('particiapants count: ',count);
    $("#participants-count").text(count | 0);
    $("#list-count").text(count | 0);
  }

  createUlElement(option) {
    return $(
      `<ul ${option.id ? "id='" + option.id + "'" : ""} ${option.class ? "class='" + option.class + "'" : ""
      }></ul>`
    );
  }

  createOlElement(option) {
    return $(
      `<ol ${option.id ? "id='" + option.id + "'" : ""} ${option.class ? "class='" + option.class + "'" : ""
      }></ol>`
    );
  }

  createDivElement(option) {
    var div = $(
      `<div ${option.id ? "id='" + option.id + "'" : ""} ${option.name ? "name='" + option.name + "'" : ""
      } ${option.class ? "class='" + option.class + "'" : ""} >${option.text ? option.text : ""
      }</div>`
    );
    if (option.attr) {
      for (const key in option.sttr) {
        $(div).attr(key, option.attr[key]);
      }
    }
    return div;
  }

  createATag(option) {
    let aTag = $(
      `<a ${option.id ? "id='" + option.id + "'" : ""} ${option.name ? "name='" + option.name + "'" : ""
      } ${option.class ? "class='" + option.class + "'" : ""} >${option.text ? option.text : ""
      }</a>`
    );

    if (option.attr) {
      for (const key in option.sttr) {
        $(aTag).attr(key, option.attr[key]);
      }
    }

    return aTag;
  }

  createPElement(option) {
    return $(
      `<p ${option.id ? "id='" + option.id + "'" : ""} ${option.class ? "class='" + option.class + "'" : ""
      }>${option.text}</p>`
    );
  }

  createImgElement(option) {
    return $(
      `<img ${option.id ? "id='" + option.id + "'" : ""} src='${option.src}' ${option.class ? "class='" + option.class + "'" : ""
      }/>`
    );
  }

  createH5Element(option) {
    return $(
      `<h5 ${option.class ? "class='" + option.class + "'" : ""}>${option.text
      }</h5>`
    );
  }
  createH6Element(option) {
    return $(
      `<h6 ${option.class ? "class='" + option.class + "'" : ""}>${option.text
      }</h6>`
    );
  }

  createSpanElement(option) {
    let span = $(
      `<span ${option.id ? "id='" + option.id + "'" : ""} ${option.class ? "class='" + option.class + "'" : ""
      }>${option.text}</span>`
    );
    if (option.attr) {
      for (const key in option.sttr) {
        $(span).attr(key, option.attr[key]);
      }
    }

    return span;
  }

  createCameraSvg() {
    return $(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <defs>
      <style>
      .user-cameras-svg-a,
      .user-cameras-svg-b,
      .user-cameras-svg-c,
      .user-cameras-svg-e {
        fill: none;
      }
      
      .user-cameras-svg-a,
      .user-cameras-svg-b {
        stroke: #808486;
      }
      
      .user-cameras-svg-b {
        stroke-width: 1.2px;
      }
      
      .user-cameras-svg-c {
        opacity: 0.12;
      }
      
      .user-cameras-svg-d {
        stroke: none;
      }
      </style>
      </defs>
      <g class="user-cameras-svg-a">
      <rect class="user-cameras-svg-d" width="32" height="32" rx="16" />
      <rect class="user-cameras-svg-e" x="0.5" y="0.5" width="31" height="31" rx="15.5" />
      </g>
      <g transform="translate(-21198 156)">
      <g transform="translate(21205.502 -146.232)">
      <g transform="translate(0 0)">
      <path class="user-cameras-svg-b"
      d="M16.149,17.171H14.732l-.307-.8a1.363,1.363,0,0,0-1.27-.869H6.9a1.363,1.363,0,0,0-1.27.869l-.307.8H3.905A2.208,2.208,0,0,0,1.7,19.376V26.26a2.193,2.193,0,0,0,2.192,2.192H16.136a2.193,2.193,0,0,0,2.192-2.192V19.376A2.168,2.168,0,0,0,16.149,17.171Z"
      transform="translate(-1.7 -15.5)" />
      </g>
      </g>
      <g class="user-cameras-svg-b" transform="translate(21211 -142)">
      <circle class="user-cameras-svg-d" cx="3" cy="3" r="3" />
      <circle class="user-cameras-svg-e" cx="3" cy="3" r="2.4" />
      </g>
      </g>
      <rect class="user-cameras-svg-c" width="32" height="32" rx="16" />
      </svg>`);
  }

  createButtonElement(option) {
    return $(
      `<button ${option.id ? "id='" + option.id + "'" : ""} ${option.onclick ? "onclick='" + option.onclick + "'" : ""
      } ${option.class ? "class='" + option.class + "'" : ""}></button>`
    );
  }

  createLiElement(option) {
    let li = $(
      `<li ${option.class ? "class='" + option.class + "'" : ""} ${option.id ? "id='" + option.id + "'" : ""
      } ${option.onclick ? "onclick='" + option.onclick + "'" : ""}></li>`
    );

    if (option.attr) {
      for (const key in option.sttr) {
        $(li).attr(key, option.attr[key]);
      }
    }

    return li;
  }

  createRemoteLeftArrowSvg() {
    return $(`<svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      class="rotate0"
      >
      <defs>
      <style>
      .a {
        opacity: 0.287;
        fill: url(#a);
      }
      .svg-arrow {
        fill: none;
        stroke: #fff;
        stroke-width: 1.5px;
      }
      </style>
      <linearGradient
      id="a"
      x1="0.166"
      y1="0.126"
      x2="0.846"
      y2="0.81"
      gradientUnits="objectBoundingBox"
      >
      <stop offset="0" stop-color="#808486" />
      <stop offset="1" stop-color="#182024" />
      </linearGradient>
      </defs>
      <g transform="translate(1272.001 35) rotate(180)">
      <g transform="translate(1151.688 321.885) rotate(-90)">
      <rect
      class="a"
      width="26"
      height="26"
      rx="13"
      transform="translate(286.885 94.313)"
      />
      </g>
      <path
      class="svg-arrow"
      d="M7.225,0V7.224H0"
      transform="translate(1252.144 22.128) rotate(-45)"
      />
      </g>
      </svg>`);
  }

  createRemoteAudioMuteSvg() {
    return $(` <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      >
      <defs>
      <style>
      .audio-mute-cls-1 {
        opacity: 0.961;
      }
      
      .audio-mute-cls-2 {
        fill: url(#audio-mute-linear-gradient);
      }
      
      .audio-mute-cls-3,
      .audio-mute-cls-4,
      .audio-mute-cls-6 {
        fill: none;
      }
      
      .audio-mute-cls-3,
      .audio-mute-cls-4 {
        stroke: #fff;
        stroke-width: 1.2px;
      }
      
      .audio-mute-cls-3 {
        stroke-linejoin: round;
      }
      
      .audio-mute-cls-5 {
        stroke: none;
      }
      </style>
      <linearGradient
      id="audio-mute-linear-gradient"
      x1="0.829"
      y1="0.155"
      x2="0.232"
      y2="0.875"
      gradientUnits="objectBoundingBox"
      >
      <stop offset="0" stop-color="#e472ff" />
      <stop offset="1" stop-color="#b529d6" />
      </linearGradient>
      </defs>
      <g id="Group_2740" data-name="Group 2740" class="audio-mute-cls-1">
      <rect
      id="Rectangle_147"
      data-name="Rectangle 147"
      class="audio-mute-cls-2"
      width="26"
      height="26"
      rx="13"
      />
      <g
      id="Group_2721"
      data-name="Group 2721"
      transform="translate(7.918 4.914)"
      >
      <path
      id="Path_280"
      data-name="Path 280"
      class="audio-mute-cls-3"
      d="M10.368,5.018A5.1,5.1,0,0,0,5.184,0,5.1,5.1,0,0,0,0,5.018"
      transform="translate(10.368 12.565) rotate(180)"
      />
      <line
      id="Line_193"
      data-name="Line 193"
      class="audio-mute-cls-4"
      y2="2.824"
      transform="translate(5.166 13.03)"
      />
      <line
      id="Line_194"
      data-name="Line 194"
      class="audio-mute-cls-4"
      x2="3.445"
      transform="translate(3.444 15.854)"
      />
      <g
      id="Rectangle_133"
      data-name="Rectangle 133"
      class="audio-mute-cls-4"
      transform="translate(1.265)"
      >
      <rect
      class="audio-mute-cls-5"
      width="7.696"
      height="10.774"
      rx="3.848"
      />
      <rect
      class="audio-mute-cls-6"
      x="0.6"
      y="0.6"
      width="6.496"
      height="9.574"
      rx="3.248"
      />
      </g>
      <line
      id="Line_201"
      data-name="Line 201"
      class="audio-mute-cls-4"
      x1="9.748"
      y2="14.365"
      transform="translate(0.256 0.257)"
      />
      </g>
      </g>
      </svg>`);
  }

  createRemoteVideoMuteSvg() {
    return $(`   <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      >
      <defs>
      <style>
      .video-mute-cls-1 {
        opacity: 0.961;
      }
      
      .video-mute-cls-22 {
        fill: url(#video-mute-linear-gradient1);
      }
      
      .video-mute-cls-3,
      .video-mute-cls-4 {
        fill: none;
        stroke: #fff;
        stroke-width: 1.2px;
      }
      
      .video-mute-cls-3 {
        stroke-linejoin: round;
      }
      </style>
      <linearGradient
      id="video-mute-linear-gradient1"
      x1="0.818"
      y1="0.136"
      x2="0.236"
      y2="0.873"
      gradientUnits="objectBoundingBox"
      >
      <stop offset="0" stop-color="#a7a3ff" />
      <stop offset="1" stop-color="#4a43e3" />
      </linearGradient>
      </defs>
      <g
      id="Group_2739"
      data-name="Group 2739"
      class="video-mute-cls-1"
      transform="translate(-31)"
      >
      <rect
      id="Rectangle_147"
      data-name="Rectangle 147"
      class="video-mute-cls-22"
      width="26"
      height="26"
      rx="13"
      transform="translate(31)"
      />
      <g
      id="Group_2722"
      data-name="Group 2722"
      transform="translate(37.516 7.876)"
      >
      <path
      id="Path_570"
      data-name="Path 570"
      class="video-mute-cls-3"
      d="M2,6V16.326H12.318V13.363l3.8,1.414V7.549l-3.8,1.414V6Z"
      transform="translate(-1.884 -5.876)"
      />
      <g
      id="Group_2730"
      data-name="Group 2730"
      transform="translate(5.264 0.749) rotate(45)"
      >
      <line
      id="Line_201"
      data-name="Line 201"
      class="video-mute-cls-4"
      x2="0.266"
      y2="6.379"
      transform="translate(3.057 0)"
      />
      <line
      id="Line_202"
      data-name="Line 202"
      class="video-mute-cls-4"
      x1="0.266"
      y2="6.379"
      transform="translate(6.379 3.057) rotate(90)"
      />
      </g>
      </g>
      </g>
      </svg>`);
  }

  createRemoteFullScreenSvg() {
    return $(` <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      >
      <defs>
      <style>
      .full-screen-cls-1 {
        opacity: 0.961;
      }
      
      .full-screen-cls-2-full-screen {
        fill: url(#full-screen-linear-gradient-full-screen);
      }
      
      .full-screen-cls-3,
      .full-screen-cls-4 {
        fill: none;
        stroke: #fff;
        stroke-width: 1.2px;
      }
      
      .full-screen-cls-3 {
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      </style>
      <linearGradient
      id="full-screen-linear-gradient-full-screen"
      x1="0.829"
      y1="0.158"
      x2="0.206"
      y2="0.88"
      gradientUnits="objectBoundingBox"
      >
      <stop offset="0" stop-color="#58d379" />
      <stop offset="1" stop-color="#008e27" />
      </linearGradient>
      </defs>
      <g
      id="Group_2738"
      data-name="Group 2738"
      class="full-screen-cls-1"
      transform="translate(-62)"
      >
      <rect
      id="Rectangle_147"
      data-name="Rectangle 147"
      class="full-screen-cls-2-full-screen"
      width="26"
      height="26"
      rx="13"
      transform="translate(62)"
      />
      <g
      id="Group_2720"
      data-name="Group 2720"
      transform="translate(68.945 6.946)"
      >
      <rect
      id="Rectangle_148"
      data-name="Rectangle 148"
      class="full-screen-cls-3"
      width="12.429"
      height="12.429"
      />
      <path
      id="Path_542"
      data-name="Path 542"
      class="full-screen-cls-4"
      d="M7.953,6.288H4.288v3.983"
      transform="translate(-1.232 -3.25)"
      />
      <path
      id="Path_544"
      data-name="Path 544"
      class="full-screen-cls-4"
      d="M3.664,0H0V3.983"
      transform="translate(9.198 9.463) rotate(180)"
      />
      </g>
      </g>
      </svg>`);
  }

  participantCamerasBtnSvg() {
    return $(`<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33">
      <defs>
      <style>
      .participant-camera-svg-a {
        fill: #182024;
        opacity: 0;
      }
      
      .participant-camera-svg-b,
      .participant-camera-svg-d {
        fill: none;
      }
      
      .participant-camera-svg-b {
        stroke: #fff;
        stroke-width: 1.2px;
      }
      
      .participant-camera-svg-c {
        stroke: none;
      }
      </style>
      </defs>
      <rect class="participant-camera-svg-a" width="33" height="33" rx="16.5" />
      <g transform="translate(-21199.502 156)">
      <g transform="translate(21205.502 -146.232)">
      <g transform="translate(0 0)">
      <path class="participant-camera-svg-b"
      d="M16.149,17.171H14.732l-.307-.8a1.363,1.363,0,0,0-1.27-.869H6.9a1.363,1.363,0,0,0-1.27.869l-.307.8H3.905A2.208,2.208,0,0,0,1.7,19.376V26.26a2.193,2.193,0,0,0,2.192,2.192H16.136a2.193,2.193,0,0,0,2.192-2.192V19.376A2.168,2.168,0,0,0,16.149,17.171Z"
      transform="translate(-1.7 -15.5)" />
      </g>
      </g>
      <g class="participant-camera-svg-b" transform="translate(21211 -142)">
      <circle class="participant-camera-svg-c" cx="3" cy="3" r="3" />
      <circle class="participant-camera-svg-d" cx="3" cy="3" r="2.4" />
      </g>
      <path class="participant-camera-svg-b" d="M4.323,0V4.323H0"
      transform="translate(21221.641 -139.128) rotate(-45)" />
      </g>
      </svg>`);
  }

  createVideoMuteSvg() {
    return $(``);
  }
  createJoinRequestList() {
    return $(`<div class="join-request-wrapper d-none">
    <div class="join-request-header">
      <h6>Join Request</h6>
      <button class="btn p-0 close-request-btn">
        <img src="modules/images/chat_close.svg" alt="" />
      </button>
    </div>
    <div class="join-request-body">
      <ul class="guest-request-ul" >
      <!-- <li>
          <img src="modules/images/request_avathar.svg" alt="" />
          <p>Roshan Martinez</p>
          <button class="btn reject-btn">Reject</button>
          <button class="btn admit-btn">Admit</button>
        </li> -->
      </ul>
    </div>
  </div>`);
  }
  createSectionElement(option) {
    return $(
      `<section ${option.class ? "class='" + option.class + "'" : ""
      }></section>`
    );
  }
  createCarouselIndicatorsForMainSlider() {
    return $(`
    <ol class="carousel-indicators-main-slider">
    <li type="button" data-bs-target="#carousel-thumb" data-bs-slide-to="0" class="active"></li>
    <li type="button" data-bs-target="#carousel-thumb" data-bs-slide-to="1"></li>
  </ol>
    `);
  }
  initialize(containerDiv) {
    $(containerDiv)
      .append(
        this.createSectionElement({ id: "", class: "video-section" }).append(
          this.createDivElement({
            id: "carouselContainer",
            class: "carousel-container",
          })
            .append(
              this.createDivElement({ id: "videoRow", class: "row video-row" })
            )
            .append(this.createCarouselIndicatorsForMainSlider)
        )
      )
      .append(this.createVideoControlsSection());
  }

  addLocalVideo(stream, clientID) {
    var videoRow = $("#videoRow");
    $(videoRow).append(
      this.createDivElement({ id: `div_localVideo_${clientID}` }).append(
        this.createDivElement({ class: "video-container" }).append(
          this.createLocalVideoElement(stream)
        )
      )
    );
    this.resetVideoLayout();
    this.resetMultipleVideoLayout();
  }

  removeLocalVideo(clientID) {
    var localVideoElem = $("#div_localVideo_" + clientID)[0];
    //console.log("Local Video Eleme To Remove: ", localVideoElem);
    $(localVideoElem).remove();
    this.resetVideoLayout();
    this.resetMultipleVideoLayout();
  }

  removeRemoteVideo(streamID, targetPeer) {
    streamID = this.getStreamIDString(streamID);

    var grpRemoteVideo = $(`#grp_remoteVideo_${streamID}`);
    console.log("Remote Group Video Eleme To Remove: ", grpRemoteVideo);
    if (grpRemoteVideo) {
      $(grpRemoteVideo).parent().parent().parent().remove();
    }

    var innerRemoteVideoElm = $(`#inner_remoteVideo_${streamID}`)[0];
    console.log("Remote Inner Video Eleme To Remove: ", innerRemoteVideoElm);
    $(innerRemoteVideoElm).parent().remove();
    if (innerRemoteVideoElm) {
      $(innerRemoteVideoElm).parent().remove();
    }
    this.updateGroupVideoCount(targetPeer);
    this.resetVideoLayout();
    this.resetMultipleVideoLayout();
  }

  addCameraBtn(elm, camDevice, camIndex) {
    elm.append(
      this.createLiElement({
        id: camDevice.deviceId,
        onclick: `addStreamToWindow("${camDevice.deviceId}",${camIndex})`,
      }).append(this.createButtonElement({}).append(this.createCameraSvg()))
    );
  }

  addCameraView(elm, camDevice) {
    elm.append(
      this.createDivElement({
        id: `camView_${camDevice.deviceId}`,
        class: "user-cameras-view-ul-li",
      }).append(
        this.createDivElement({ class: "video-container" })
        //.append(this.createVideoElement())
      )
    );
  }
  // Local Camera
  createLocalVideoElement(stream) {
    var newVideoElement = document.createElement("video");
    newVideoElement.id = `${this.getStreamIDString(stream.id)}`;
    newVideoElement.className = "video-content-max-height";
    newVideoElement.autoplay = true;
    newVideoElement.playsInline = true;
    newVideoElement.srcObject = stream;
    newVideoElement.muted = "muted";
    return newVideoElement;
  }

  // function to show multiple videos on hover
  multipleVideoShowInButtonHover(user, elem, stream, producerId) {
    var videoCount = $(
      `[data-username=video_${user.user_id}] .participant-cameras-list > ul  li`
    ).length;

    if ($(`.parentDiv_${user.user_id}`).children().length > 0) {
      // var liElement = $("<li>")
      //   .addClass(`list-li-${user.user_id}`)
      //   .click(function (event) {
      //     event.preventDefault();

      //     const videoElement = document.createElement("video");
      //     videoElement.srcObject = stream;
      //     videoElement.id = $(elem).attr("id");
      //     videoElement.setAttribute("data-user_name", user.name);
      //     videoElement.setAttribute("data-producer_id", producerId);
      //     videoElement.setAttribute("data-user_id", user.user_id);
      //     videoElement.playsinline = false;
      //     videoElement.autoplay = true;
      //     videoElement.className = "vidRem";

      //     videoHoverButtonClick(user.user_id, videoElement);
      //   });

      var colElement = $("<li>")
        .addClass(`list-li-${user.user_id}`)
        .click(function (event) {
          event.preventDefault();

          const videoElement = document.createElement("video");
          videoElement.srcObject = stream;
          videoElement.id = $(elem).attr("id");
          videoElement.setAttribute("data-user_name", user.name);
          videoElement.setAttribute("data-producer_id", producerId);
          videoElement.setAttribute("data-user_id", user.user_id);
          videoElement.playsinline = false;
          videoElement.autoplay = true;
          videoElement.className = "vidRem";

          videoHoverButtonClick(user.user_id, videoElement, $(this));
        });

      if (videoCount > 0) {
        $(".videos-list-" + user.user_id).append(
          $(colElement).append(
            $("<div>")
              .addClass("participant-first-camera")
              .append(
                $("<div>").addClass("video-container").append($(elem))
                // .append(this.createParticipantCameraActiveImg)
              )
          )
        );
      } else {
        $(".videos-list-" + user.user_id).append(
          $(colElement).append(
            $("<div>")
              .addClass("participant-first-camera")
              .append(
                $("<div>").addClass("video-container active").append($(elem))
                // .append(this.createParticipantCameraActiveImg)
              )
          )
        );
      }

      var result = isVideoOnArray.find((obj) => obj.name === user.name);

      if (result && result.data) {
        result.data.push({ id: $(elem).attr("id"), value: false });
      } else {
        isVideoOnArray.push({
          name: user.name,
          data: [{ id: $(elem).attr("id"), value: true }],
        });
      }
    }
    setTimeout(() => {
      $(colElement).click();
    }, 500);
  }
  createParticipantCameraActiveImg() {
    return $(`
    <img
    src="modules/images/video_active_icon.svg"
    class="video-active-icon"
    alt=""
  />
    `);
  }
  RemoteVideoController(username, userId = "", clientId = "") {
    return `<div class="participant-video-controls">
    <div class="row align-items-center">
      <div class="col-6 d-flex align-items-center">
      <div id="audiostatus_${userId}" class="me-2">
        <img src='modules/images/remote_mic_muted.svg'>
      </div>
      <p class="small-text">
        
        ${username}
      </p>
      <img src="modules/images/audio_raise_hand.svg" class="video-raise-hand ms-2 d-none" />
      </div>
      <div class="col-6 d-flex justify-content-end">
      <div class="participant-cameras-container">
          <button class="participant-cameras-btn" id="user-multi-camera-button${userId}">
              <img
                src="modules/images/participant_cameras_default.svg"
                class="img-default"
                alt=""
              />
              <div id="Camera-indicator${userId}" class="Camera-indicator"></div>
              <img
                src="modules/images/participant_cameras_active.svg"
                class="img-active"
                alt=""
              />
          </button>
          <div class="participant-cameras-list">
              <ul class=" videos-list-${userId}" >

              </ul>
          </div>
      </div>
      <div class="participant-video-controls-btns ">
        <button onclick="listViewButtonClick(this)"
          class="btn-apperence list-view-btn" >
          <img src="modules/images/participant_video_controls_btn.svg" alt="" />
        </button>
        <div class="participant-video-controls-btns-list">
        <ul>
        <li>
            <button
              class=" participant-expand-view-btn p-0" onclick="toggleFullscreen('${userId}')"
              >
              <img
              src="modules/images/participant_expand.svg"
              class="img-default"
              alt=""
            />
            <img
              src="modules/images/participant_expanded.svg"
              class="img-active"
              alt=""
            />
            </button>
          </li>
          <li>
            <button class=" participant-mute-camera-btn p-0" id="video_${userId}" onclick="closeRemoteProducer('${clientId}','video')">
              <img
              src="modules/images/participant_mute_camera.svg"
              class="img-default"
              alt=""
            />
            <img
              src="modules/images/participant_muted_camera.svg"
              class="img-active"
              alt=""
            />
            </button>
          </li>
          <li>

            <button class="participant-mute-audio-btn p-0 " id="audio_${userId}" onclick="closeRemoteProducer('${clientId}','audio')">
                <img
                src="modules/images/participant_mute_audio.svg"
                class="img-default"
                alt=""
              />
              <img
                src="modules/images/participant_audio_muted.svg"
                class="img-active"
                alt=""
              />
            </button>
          </li>
      </ul>
        </div>
      </div>
    </div>
    </div>
    
  </div>`;
  }

  RemoteVideoControllerAvatar(username, userId = "", clientId = "") {
    return `<div class="participant-video-controls">
    <div class="row align-items-center">
      <div class="col-6 d-flex align-items-center">
      <div id="audiostatus_${userId}" class="me-2">
        <img src='modules/images/remote_mic_muted.svg'>
      </div>
      <p class="small-text">
       
        ${username}
      </p>
      </div>
      <div class="col-6 d-flex justify-content-end">
      <div class="participant-video-controls-btns ">
        <button onclick="listViewButtonClick(this)"
          class="btn-apperence list-view-btn" >
          <img src="modules/images/participant_video_controls_btn.svg" alt="" />
        </button>
        <div class="participant-video-controls-btns-list">
        <ul>
        <li>
            <button
              class=" participant-expand-view-btn p-0" onclick="toggleFullscreen('${userId}')"
              >
              <img
              src="modules/images/participant_expand.svg"
              class="img-default"
              alt=""
            />
            <img
              src="modules/images/participant_expanded.svg"
              class="img-active"
              alt=""
            />
            </button>
          </li>
          <li>
            <button class=" participant-mute-camera-btn p-0" id="video_${userId}" onclick="closeRemoteProducer('${clientId}','video')">
              <img
              src="modules/images/participant_mute_camera.svg"
              class="img-default"
              alt=""
            />
            <img
              src="modules/images/participant_muted_camera.svg"
              class="img-active"
              alt=""
            />
            </button>
          </li>
          <li>

            <button class="participant-mute-audio-btn p-0 " id="audio_${userId}" onclick="closeRemoteProducer('${clientId}','audio')">
                <img
                src="modules/images/participant_mute_audio.svg"
                class="img-default"
                alt=""
              />
              <img
                src="modules/images/participant_audio_muted.svg"
                class="img-active"
                alt=""
              />
            </button>
          </li>
      </ul>
        </div>
      </div>
    </div>
    </div>
    
  </div>`;
  }

  addRemoteVideo(remoteStream, targetPeer, remoteUser) {
    console.log("remoteUser:", remoteUser);
    console.log("remoteStream:", remoteStream);
    var remoteUsername = targetPeer;
    if (remoteUser && remoteUser.name) {
      remoteUsername = remoteUser.name;
    }
    $(videoRow).append(
      this.createDivElement({
        id: `div_remoteVideo_${this.getStreamIDString(remoteStream.id)}`,
        name: `div_remoteVideo_${targetPeer}`,
      }).append(
        this.createDivElement({
          class: "video-container",
          name: "epic_video-container",
        })
          // .append(
          //   this.createDivElement({ class: "participant-video-controls" })
          //     .append(
          //       this.createDivElement({ class: "row" })
          //         .append(
          //           this.createDivElement({ class: "col-6" }).append(
          //             this.createPElement({
          //               class: "small-text",
          //               text: remoteUsername,
          //             })
          //           )
          //         )
          //         .append(
          //           this.createDivElement({ class: "col-6" }).append(
          //             this.createDivElement({
          //               class: "participant-video-controls-btns",
          //             })
          //               .append(
          //                 this.createButtonElement({
          //                   class: "btn-apperence list-view-btn pull-right",
          //                   onclick: `participantVideoControlsBtnClick(this)`,
          //                 }).append(this.createRemoteLeftArrowSvg())
          //               )
          //               .append(
          //                 this.createDivElement({
          //                   class: "participant-video-controls-btns-list",
          //                 }).append(
          //                   this.createUlElement({})
          //                     .append(
          //                       this.createLiElement({}).append(
          //                         this.createButtonElement({
          //                           id: "btnRemoteAudioMute",
          //                           onclick: `remoteAudioMuteClick("${targetPeer}")`,
          //                         }).append(this.createRemoteAudioMuteSvg())
          //                       )
          //                     )
          //                     .append(
          //                       this.createLiElement({}).append(
          //                         this.createButtonElement({
          //                           id: "btnRemoteVideoMute",
          //                           onclick: `remoteVideoMuteClick("${targetPeer}")`,
          //                         }).append(this.createRemoteVideoMuteSvg())
          //                       )
          //                     )
          //                     .append(
          //                       this.createLiElement({}).append(
          //                         this.createButtonElement({
          //                           id: "btnRemoteFullScreen",
          //                           onclick: `remoteVideoFullScreenClick("${targetPeer}")`,
          //                         }).append(this.createRemoteFullScreenSvg())
          //                       )
          //                     )
          //                 )
          //               )
          //           )
          //         )
          //     )

          //     .append(
          //       this.createDivElement({
          //         class: "participant-cameras-container",
          //       })
          //         .append(
          //           this.createDivElement({
          //             class: "btn-with-count display-inline-show",
          //           })
          //             .append(
          //               this.createButtonElement({
          //                 class: "participant-cameras-btn",
          //               }).append(this.participantCamerasBtnSvg())
          //             )
          //             .append(
          //               this.createDivElement({
          //                 class: "participant-cameras-count",
          //                 id: `div_remoteVideo_count_${targetPeer}`,
          //                 text: '0'
          //               })
          //             )
          //         )
          //         .append(
          //           this.createDivElement({
          //             class: "participant-cameras-list",
          //           }).append(
          //             this.createUlElement({
          //               id: `ul_remoteVideo_${targetPeer}`,
          //             })
          //           )
          //         )
          //     )
          // )
          .append(
            this.createDivElement({
              id: `div_rmt_splitter_${targetPeer}`,
              class: "row remote-video-parent",
            }).append(
              this.createDivElement({}).append(
                this.createRemoteVideo(remoteStream, targetPeer)
              )
            )
          )
      )
    );
    this.resetVideoLayout();
    this.resetMultipleVideoLayout();
  }

  addRemoteGroupVideo(remoteStream, targetPeer) {
    var groupVideoContainer = $(`#ul_remoteVideo_${targetPeer}`);
    console.log("groupVideoContainer", remoteStream);
    $(groupVideoContainer).append(
      this.createLiElement({
        id: `remoteGrp_item_li_${remoteStream.id}`,
        onclick: `insertGroupVideo(this,"${targetPeer}")`,
      }).append(
        this.createDivElement({ class: "participant-camera" }).append(
          this.createDivElement({ class: "video-container" }).append(
            this.createRemoteVideo(remoteStream, targetPeer, "grp", true)
          )
        )
      )
    );
    //var remoteGroupVideoCount = $(groupVideoContainer).children().length;
    //$(`#div_remoteVideo_count_${targetPeer}`).text(remoteGroupVideoCount);
    this.updateGroupVideoCount(targetPeer);
  }

  updateGroupVideoCount(targetPeer) {
    var groupVideoContainer = $(`#ul_remoteVideo_${targetPeer}`);
    var remoteGroupVideoCount = $(groupVideoContainer).children().length;
    $(`#div_remoteVideo_count_${targetPeer}`).text(remoteGroupVideoCount);
  }

  addRemoteInnerVideo(remoteStream, targetPeer) {
    var remoteSplitter = $(`#div_rmt_splitter_${targetPeer}`);

    var innerRemoteVideo = this.createRemoteVideo(
      remoteStream,
      targetPeer,
      "inner"
    );
    var innerRemoteVideoId = innerRemoteVideo.id;
    innerRemoteVideo.srcObject = remoteStream;

    $(remoteSplitter).append(
      this.createDivElement({}).append(innerRemoteVideo)
    );
    this.resetVideoLayout();
    this.resetMultipleVideoLayout();
    //this.resetInnerLayout(`div_rmt_splitter_${targetPeer}`);
  }

  getStreamIDString(streamID) {
    return streamID.replace("{", "").replace("}", "");
  }

  createRemoteVideo(remoteStream, targetPeer, idPrefix, setSrcObjct) {
    idPrefix = idPrefix === undefined ? "" : `${idPrefix}_`;
    var remoteVideo = document.createElement("video");
    remoteVideo.id = `${idPrefix}remoteVideo_${this.getStreamIDString(
      remoteStream.id
    )}`;
    remoteVideo.name = `remoteVideo_${targetPeer}`;
    remoteVideo.autoplay = true;
    remoteVideo.playsInline = true;
    if (setSrcObjct == true) {
      remoteVideo.srcObject = remoteStream;
    }
    return remoteVideo;
  }

  // function to reset multiple video elements
  resetMultipleVideoLayout() {
    var userId;

    $("#remoteVideos .carousel-item").each(function (i, carousel) {
      $(carousel)
        .children(".video-container")
        .children()
        .each(function (j, user) {
          if (
            user.getAttribute("data-username") &&
            user.getAttribute("data-username").includes("video_")
          )
            userId = user.getAttribute("data-username").split("video_")[1];
          window.controlBuilder.resetInnerLayout(userId);
        });
    });

    this.setInnerHeight();
  }

  async resetVideoLayout() {
    // var videoRow = $("#remoteVideos");

    await $("#remoteVideos .carousel-item").each(function (index) {
      var videoRow = $(this).children(".video-container");
      if (
        $("#remoteVideos .carousel-item:last-child").is($(this)) &&
        deviceScreenWidth >= 768 &&
        !fullScreen
      ) {
        var elmCount = $(videoRow).children().length - 1;
        if (
          (lastSlideRemoteTileCount % 2 == 1 &&
            lastSlideRemoteTileCount !== 1) ||
          lastSlideRemoteTileCount == 0
        )
          elmCount++;
      } else {
        var elmCount = $(videoRow).children().length;
      }
      var screenWidth = $(window).width();
      console.log("Screen width:-", elmCount);
      var col = 12;
      var col_xl = 12;
      var col_lg = 12;
      var col_md = 12;
      var col_sm = 12;
      var outerVideoHeight = "video-content-max-height";
      //var rowHeightCss = "video-content-max-height";

      if (elmCount === 2) {
        col_xl = 6;
        col_lg = 6;
        col_md = 6;
        col_sm = 12;
        /* adjust video height for sm */
        if (screenWidth < 767) {
          outerVideoHeight = "video-content-min-height";
        }
      } else if (elmCount === 3) {
        col_xl = 6;
        col_lg = 6;
        col_md = 6;
        col_sm = 12;
        /* adjust video height for sm */
        outerVideoHeight = "video-content-min-height";
      } else if (elmCount === 4) {
        col_xl = 6;
        col_lg = 6;
        col_md = 6;
        col_sm = 12;
        /* adjust video height for sm */
        outerVideoHeight = "video-content-min-height";
      } else if (elmCount === 5 || elmCount === 6) {
        col_xl = 4;
        col_lg = 4;
        col_md = 6;
        col_sm = 12;
        /* adjust video height for sm */
        outerVideoHeight = "video-content-min-height";
      } else if (elmCount > 6) {
        col_xl = 3;
        col_lg = 4;
        col_md = 4;
        col_sm = 6;
        /* adjust video height for sm */
        outerVideoHeight = "video-content-min-height";
      }
      //heightCss = "video-content-min-height"
      var rowClass = `col-xl-${col_xl} col-lg-${col_lg} col-md-${col_md} col-sm-${col_sm} col-${col} video-col`;
      $(videoRow)
        .children()
        .each(function (i, elm) {
          $(elm).removeClass();
          $(elm).addClass(rowClass);
        });

      if (elmCount > 0) {
        var videoDivElmList = $(this).find(".video-col");

        $(videoDivElmList).each(function (i, elm) {
          $(elm).removeClass(
            "video-content-min-height video-content-max-height"
          );
          $(elm).addClass(`${outerVideoHeight}`);
        });
      }
      videoContainerHeight();
      function videoContainerHeight() {
        let windowHeight = window.innerHeight;

        let chatViewBodyHeight = windowHeight - 88;

        let videoContentMaxHeight = $(".video-content-max-height");
        let maxHeightVideoContent = $(
          ".video-content-max-height video[data-main_video_id]"
        );
        console.log({ maxHeightVideoContent });
        let videoContentMinHeight = $(".video-content-min-height");
        let minHeightVideoContent = $(
          ".video-content-min-height video[data-main_video_id]"
        );
        videoContentMaxHeight.css("height", `${chatViewBodyHeight}px`);
        // maxHeightVideoContent.css("height", `${chatViewBodyHeight}px`);
        videoContentMinHeight.css(
          "height",
          `${Math.floor((chatViewBodyHeight - 6) / 2)}px`
        );
        // minHeightVideoContent.css("height", `${chatViewBodyHeight / 2}px`);
        $(
          ".carousel-container .video-content-max-height video[data-localvideo='primary']"
        ).css("height", `${chatViewBodyHeight}px`);
      }
      $(window).resize(function () {
        videoContainerHeight();
      });
    });
    this.setCarouselButtons();
  }

  resetInnerLayout(userId = "") {
    if (userId != "") {
      if (
        $("#remoteVideos .carousel-item:last-child").is(
          $('div[class*="parentDiv_' + userId + '"]')
            .parent()
            .parent()
            .parent()
        )
      ) {
        var rootVideoElmCount =
          $('div[class*="parentDiv_' + userId + '"]')
            .parent()
            .parent()
            .children().length - 1;
        if (
          (lastSlideRemoteTileCount % 2 == 1 &&
            lastSlideRemoteTileCount !== 1) ||
          lastSlideRemoteTileCount == 0
        )
          rootVideoElmCount++;
      } else {
        var rootVideoElmCount = $('div[class*="parentDiv_' + userId + '"]')
          .parent()
          .parent()
          .children().length;
      }
      var elmCount = $('div[class*="parentDiv_' + userId + '"]').children()
        .length;
      var screenWidth = $(window).width();

      var col = 12;
      var col_xl = 12;
      var col_lg = 12;
      var col_md = 12;
      var col_sm = 12;
      var rowHeightCss = "video-content-max-height";
      var heightCss = "video-content-max-height"; //video-content-max-height

      /* start */
      if (rootVideoElmCount === 1 && elmCount === 1) {
        rowHeightCss = "video-content-max-height";
        heightCss = "video-content-max-height";
      } else if (rootVideoElmCount === 1 && elmCount === 2) {
        col_xl = 6;
        col_lg = 6;
        col_md = 6;
        col_sm = 12;
        col = 12;
        rowHeightCss = "video-content-max-height";
        heightCss = "video-content-max-height";
        if (screenWidth < 768) {
          rowHeightCss = "video-content-max-height";
          heightCss = "video-content-min-height";
        }
      } else if (rootVideoElmCount === 1 && elmCount > 2) {
        col_xl = 6;
        col_lg = 6;
        col_md = 6;
        col_sm = 6;
        col = 6;
        rowHeightCss = "video-content-max-height";
        heightCss = "video-content-min-height";
      } else if (rootVideoElmCount === 2 && elmCount === 1) {
        col_xl = 12;
        col_lg = 12;
        col_md = 12;
        col_sm = 12;
        col = 12;
        rowHeightCss = "video-content-max-height";
        heightCss = "video-content-max-height";
        if (screenWidth < 768) {
          rowHeightCss = "video-content-min-height";
          heightCss = "video-content-min-height";
        }
      } else if (rootVideoElmCount === 2 && elmCount === 2) {
        col_xl = 12;
        col_lg = 12;
        col_md = 12;
        col_sm = 6;
        col = 12;
        rowHeightCss = "video-content-min-height";
        heightCss = "video-content-min-height";
        if (screenWidth < 992 && screenWidth > 767) {
          rowHeightCss = "video-content-max-height";
          heightCss = "video-content-min-height";
        } else if (screenWidth < 768 && screenWidth > 575) {
          rowHeightCss = "video-content-min-height";
          heightCss = "video-content-min-height";
        } else if (screenWidth < 576) {
          rowHeightCss = "video-content-min-height";
          heightCss = "video-content-height-25vh";
        }
      } else if (rootVideoElmCount === 2 && elmCount > 2) {
        col_xl = 6;
        col_lg = 6;
        col_md = 6;
        col_sm = 6;
        col = 6;
        rowHeightCss = "video-content-max-height";
        heightCss = "video-content-min-height";
        if (screenWidth < 768) {
          rowHeightCss = "video-content-min-height";
          heightCss = "video-content-height-25vh";
        }
      } else if (rootVideoElmCount > 2 && elmCount === 1) {
        col_xl = 12;
        col_lg = 12;
        col_md = 12;
        col_sm = 12;
        col = 12;
        rowHeightCss = "video-content-min-height";
        heightCss = "video-content-min-height";
      } else if (rootVideoElmCount > 2 && elmCount === 2) {
        col_xl = 6;
        col_lg = 6;
        col_md = 6;
        col_sm = 6;
        col = 12;
        rowHeightCss = "video-content-min-height";
        heightCss = "video-content-min-height";
        if (screenWidth < 576) {
          rowHeightCss = "video-content-min-height";
          heightCss = "video-content-height-25vh";
        }
      } else if (rootVideoElmCount > 2 && elmCount > 2) {
        col_xl = 6;
        col_lg = 6;
        col_md = 6;
        col_sm = 6;
        col = 6;
        rowHeightCss = "video-content-min-height";
        heightCss = "video-content-height-25vh";
      }

      $('div[class*="parentDiv_' + userId + '"]')
        .removeClass()
        .addClass(
          `row g-2  parentDiv_${userId} remote-video-parent ${rowHeightCss}`
        );

      if (elmCount > 0) {
        var rowClass = `col-xl-${col_xl} col-lg-${col_lg} col-md-${col_md} col-sm-${col_sm} col-${col} video-cols`;

        $('div[class*="parentDiv_' + userId + '"]')
          .children()
          .each(function (i, elm) {
            $(elm).removeClass().addClass("col");
            $(elm).addClass(rowClass);
            $(elm).removeClass(
              "video-content-min-height video-content-max-height"
            );
            $(elm).addClass(`${heightCss}`);
          });
      }
    }

    if ($("div[data-username='video_'")) {
      $("div[data-username='video_'").remove();
    }

    this.setInnerHeight();
  }

  setInnerHeight() {
    $(".remote-video-parent .video-cols").css("height", "");
    $(".remote-video-parent").css("height", "");
    let windowHeight = window.innerHeight;
    // let chatViewHeaderHeight = $(".chat-view-header").innerHeight();
    // let chatViewFooterHeight = $(".chat-view-footer").innerHeight();
    // let chatViewBodyHeight = windowHeight - (72 + 92);
    let chatViewBodyHeight = windowHeight - 92;
    // $(".chat-view-body").css("height", `${chatViewBodyHeight}px`);
    let innerMaxHeight = $(".remote-video-parent .video-content-max-height");
    let innerMinHeight = $(".remote-video-parent .video-content-min-height");
    let innerMiddleHeight = $(
      ".remote-video-parent .video-content-height-25vh"
    );
    console.log(innerMinHeight, "innerMinHeight", innerMaxHeight);
    innerMaxHeight.css("height", `${chatViewBodyHeight}px`);
    innerMinHeight.css(
      "height",
      `${Math.floor((chatViewBodyHeight - 6) / 2)}px`
    );
    innerMiddleHeight.css(
      "height",
      `${Math.floor((chatViewBodyHeight - 4) / 4)}px`
    );
  }

  createVideoControlsSection() {
    return $(`<section class="video-controls-section"></section>`);
  }
  createMobileViewDrawer() {
    return $(`
    <div class="drawer-wrapper" id="drawer">
    <ul class="mobile-active-local-cameras">
      <li class="active local-audio-list">
        <img src="modules/images/local-camoff-avatar.svg">
      </li>
      <!-- <li class="active">
        <video autoplay class="">
          <source src="modules/images/mov_bbb.mp4" type="video/mp4" />
        </video>
      </li>
      <li class="">
        <video autoplay class="">
          <source src="modules/images/mov_bbb.mp4" type="video/mp4" />
        </video>
      </li> -->
    </ul>
    <div class="drawer-header">
      <button class="btn px-0 py-1 btn border-0 w-100 drag-btn shadow-none">
        <img src="modules/images/drag_icon.svg" alt="" />
      </button>
      <ul class="mobile-view-main-action-btns">
        <li class="d-none">
          <button class="mobile-drawer-camera-switch-btn">
            <img src="modules/images/camera_switch_icon.svg" class="img-default" />
            <img
              src="modules/images/camera_switch_icon_hover.svg"
              class="img-active"
            />
          </button>
        </li>
        ${jsonConfig.Chat
        ? `<li class="">
          <button class="mobile-chat-btn">
            <img src="modules/images/chat_default.svg" class="img-default" />
          </button>
        </li>`
        : ``
      }
        <li>
          <button class="mobile-drawer-video-camera-btn active" id="epic_MuteVideoCam_Mob">
            <img src="modules/images/video_cam_icon.svg" class="img-default" />
            <img
              src="modules/images/video_cam_icon_active.svg"
              class="img-active"
            />
          </button>
        </li>
        <li>
          <button class="stop-call-btn" id="epic_StopCallMob">
            <img src="modules/images/mobile_stop_call.svg"/>
          </button>
        </li>
        <li>
          <button class="mobile-drawer-mic-btn active" id="epic_AudioMute_Mob">
            <img src="modules/images/mic_active_mute.svg" class="img-default" />
            <img
              src="modules/images/mic_active_mute_active.svg"
              class="img-active"
            />
          </button>
        </li>
        <li>
          <button class="mobile-drawer-volume-btn">
            <img src="modules/images/audio_btn_icon.svg" class="img-default" />
            <img
              src="modules/images/audio_btn_icon_active.svg"
              class="img-active"
            />
          </button>
        </li>
      </ul>
    </div>
    <div class="drawer-content">
      <hr />
      <ul class="mobile-view-main-action-btns">
        <li>
          <button class="mobile-audio-settings-btn btn p-0">
            <img src="modules/images/mobile_settings_icon.svg" alt="" />
          </button>
        </li>
        <li class="d-none">
          <button class="share-screen-btn btn p-0" >
            <img src="modules/images/mobile_shareScreen_icon.svg" alt="" />
          </button>
        </li>
        ${jsonConfig.RaiseHand
        ? `<li class="">
          <button class="mobile-hand-raise-btn btn p-0">
            <img src="modules/images/hand_raise_hover.svg" class="img-default" />
            <img src="modules/images/hand_raise_active.svg" class="img-active" />
          </button>
        </li>`
        : ``
      }
        ${jsonConfig.AddParticipants
        ? `<li class="">
          <button class="add-participants-btn p-0 btn">
            <img src="modules/images/mobile_add_ participants_icon.svg" alt="" />
          </button>
        </li>`
        : ``
      }
        <li>
          <div class="position-relative">
            <h6 id="participants-count-mob" class="participants-count">0</h6>
            <button class="btn p-0 mobile-participants-list-btn">
              <img src="modules/images/mobile_participants_list.svg" alt="" />
            </button>
          </div>
        </li>
        
      </ul>
      <hr >
      <ul class="mobile-view-local-video">
        <!-- <li class="active">
          <video autoplay class="">
            <source src="modules/images/mov_bbb.mp4" type="video/mp4" />
          </video>
        </li>
        <li>
          <video autoplay class="">
            <source src="modules/images/mov_bbb.mp4" type="video/mp4" />
          </video>
        </li> -->
      </ul>
      <hr class="d-none"/>
      <div class="mobile-view-record-wrapper d-none">
        <button class="btn p-0 border-0 box-shadow-none mobile-record-btn">
          <div>
            <img
              src="modules/images/record_default.svg"
              class="img-default"
              alt=""
            />
            <img src="modules/images/record_active.svg" class="img-active" alt="" />
          </div>
          <span class="mobile-view-record-start">Start Record</span>
          <span class="mobile-view-record-end">End Record</span>
        </button>
        <p class="mb-0">05:23:45</p>
      </div>
      <hr />
      <div class="mobile-group-participant-list">
        <img src="modules/images/mobile_group_icon.svg" alt="" />
        <p id="callNameMob" >Connecting...</p>
      </div>
      <div class="mobile-hand-raise-wrapper">
        <div class="d-flex align-items-center gap-2">
          <img src="modules/images/hand_raise_defult.svg" />
          <p>You Raised Hand</p>
        </div>
      </div>
    </div>
  </div>
    
    `);
  }
  createMobileViewAddParticipant() {
    return $(`<div class="mobile-view-modal-drawer mobile-view-add-participants">
    <div class="mobile-view-modal-header">
      <div class="mobile-view-modal-title">
        <h4>Add Participants</h4>
        <button class="btn p-0 border-0 mobile-add-participants-close">
          <img src="modules/images/mobile_modal_close_icon.svg" alt="" />
        </button>
      </div>
      <div class="mobile-view-modal-searchbar">
        <input
          type="text"
          class="form-control"
          id="mobileAddParticipantsSearch"
          placeholder="Search by mail ID or name"
        />
      </div>
    </div>
    <div class="mobile-view-modal-body">
      <ul class="mobile-add-Participants-list">
        <!--<li>
          <img src="modules/images/default_user.svg" />
          <div class="participant-info">
            <h6>Jeslin John</h6>
            <p>jeslin.john@oneteamus.com</p>
          </div>
          <button class="btn">
            <img src="modules/images/video_call_icon.svg" alt="" />
            Add
          </button>
        </li>
        <li>
          <img src="modules/images/default_user.svg" />
          <div class="participant-info">
            <h6>Jeslin John</h6>
            <p>jeslin.john@oneteamus.com</p>
          </div>
          <button class="btn">
            <img src="modules/images/video_call_icon.svg" alt="" />
            Add
          </button>
        </li>-->
      </ul>
    </div>
  </div>`);
  }
  createMobileViewActiveParticipants() {
    return $(`<div class="mobile-view-modal-drawer mobile-view-active-participants">
    <div class="mobile-view-modal-header">
      <div class="mobile-view-modal-title">
        <h4>Participants</h4>
        <button class="btn p-0 border-0 mobile-participants-list-close">
          <img src="modules/images/mobile_modal_close_icon.svg" alt="" />
        </button>
      </div>
      <div class="mobile-view-modal-searchbar">
        <input
          type="text"
          class="form-control"
          id="mobileParticipantsSearch"
          placeholder="Search by mail ID or name"
        />
      </div>
      <!-- <div class="mobile-view-header-actions">
        <button class="btn p-0">Off Others Video</button>
        <button class="btn p-0">Mute Others Audio</button>
      </div> -->
    </div>
    <div class="mobile-view-modal-body">
      <div class="participant-not-found-div" style="display: none;">
        <h6 style="color: black;text-align: center;">No results found</h6>
      </div>
      <ul class="mobile-active-participants-list">
        <!-- <li>
          <img src="modules/images/default_user.svg" />
          <div class="participant-info">
            <h6>Jeslin John</h6>
            <p>jeslin.john@oneteamus.com</p>
          </div>
          <div class="d-flex">
            <button class="btn mobile-expand-btn">
              <img
                src="modules/images/mobile_expand.svg"
                class="img-default"
                alt=""
              />
              <img
                src="modules/images/mobile_minimize.svg"
                class="img-active"
                alt=""
              />
            </button>
            <button class="btn mobile-video-btn">
              <img
                src="modules/images/mobile_video_mute.svg"
                class="img-default"
                alt=""
              />
              <img
                src="modules/images/mobile_video_muted.svg"
                class="img-active"
                alt=""
              />
            </button>
            <button class="btn mobile-mic-mute-btn">
              <img
                src="modules/images/mobile_audio_mute.svg"
                class="img-default"
                alt=""
              />
              <img
                src="modules/images/mobile_audio_muted.svg"
                class="img-active"
                alt=""
              />
            </button>
          </div>
        </li>
        <li>
          <img src="modules/images/default_user.svg" />
          <div class="participant-info">
            <h6>Jeslin John</h6>
            <p>jeslin.john@oneteamus.com</p>
          </div>
          <div class="d-flex">
            <button class="btn mobile-expand-btn">
              <img
                src="modules/images/mobile_expand.svg"
                class="img-default"
                alt=""
              />
              <img
                src="modules/images/mobile_minimize.svg"
                class="img-active"
                alt=""
              />
            </button>
            <button class="btn mobile-video-btn">
              <img
                src="modules/images/mobile_video_mute.svg"
                class="img-default"
                alt=""
              />
              <img
                src="modules/images/mobile_video_muted.svg"
                class="img-active"
                alt=""
              />
            </button>
            <button class="btn mobile-mic-mute-btn">
              <img
                src="modules/images/mobile_audio_mute.svg"
                class="img-default"
                alt=""
              />
              <img
                src="modules/images/mobile_audio_muted.svg"
                class="img-active"
                alt=""
              />
            </button>
          </div>
        </li> -->
      </ul>
    </div>
  </div>`);
  }
  createMobileViewSpeakerSettings() {
    return $(`<div class="mobile-view-modal-drawer mobile-speaker-settings-wrapper">
    <div class="mobile-view-modal-header">
      <div class="mobile-view-modal-title mb-0">
        <h4>Audio & Speaker Settings</h4>
        <button class="btn p-0 border-0 mobile-speaker-settings-close">
          <img src="modules/images/mobile_modal_close_icon.svg" alt="" />
        </button>
      </div>
    </div>
    <div class="mobile-view-modal-body">
      <h5>Audio</h5>
      <div class="select-input-arrow mb-3">
        <label for="exampleFormControlSelect1" class="form-label mb-2"
          >Select Microphone</label
        >
        <select id="audioSelectMobile" class="form-select"
        onchange="roomObj.replace(RoomClient.mediaType.audio, audioSelect.value)"></select>
      </div>
      <div class="volumen-wrapper">
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
        <div class="led-mob"></div>
      </div>
      <div>
        <label
          for="mobileCustomRangeSpeaker"
          class="form-label secondary-text-color mt-2"
          >Volume</label
        >
        <input
          type="range"
          class="form-range"
          min="0"
          max="100"
          id="mobileCustomRangeSpeaker"
          value="100"
          style="
            background: linear-gradient(
              to right,
              rgb(0, 157, 255) 100%,
              rgb(234, 238, 240) 100%
            );
          "
        />
      </div>
    </div>
  </div>`);
  }
  createMobileViewChat() {
    return $(` <div class="mobile-view-modal-drawer mobile-view-chat-wrapper">
    <div class="mobile-view-modal-header">
      <div class="mobile-view-modal-title">
        <h4>Chat</h4>
        <button class="btn p-0 border-0 mobile-view-chat-close">
          <img src="modules/images/mobile_modal_close_icon.svg" alt="" />
        </button>
      </div>
    </div>
    <div class="chat-view-body">
    <ul class="chat-ul">
      <!--   <li class="chat-date-view">
            <div>
                <p>23/10/2023</p>
            </div>
        </li>
        <li class="chat-receiver">
            <img src="modules/images/receiver.png" alt="" />
            <div class="chat-receiver-message">
                <p>Hey guys good morning!!</p>
                <p class="chat-message-time">03:59 Pm</p>
            </div>
        </li>
        <li class="chat-sender">
            <img src="modules/images/receiver.png" alt="" />
            <div class="chat-sender-message">
                <p>Hey guys good morning!!</p>
                <p class="chat-message-time">03:59 Pm</p>
            </div>
        </li> -->
    </ul>
</div>
<!--<div class="mobile-view-modal-body"></div>-->
    <div class="mobile-view-modal-footer">
      <div class="attached-files-list-wrapper">
        <ul class="attachedFilesUl"></ul>
      </div>
      <div class="input-group">
        <input
          class="chat-text-area form-control"
          type="text"
          
          placeholder="Type here"
          aria-label="Type here"
          aria-describedby="basic-addon2"
        />
        <div class="message-attachment-btn">
          <input
            type="file"
            multiple=""
            class="d-none chatAttachment"
            id="chatAttachment"
          />
          <label class="btn input-group-text p-0" for="chatAttachment">
            <img src="modules/images/msg_attachment_icon.svg" alt="" />
          </label>
        </div>
        <button
          id=""
          class="chat-send-btn btn input-group-text p-0 message-send-btn shadow-none"
        >
          <img src="modules/images/send_icon.svg" alt="" />
        </button>
      </div>
    </div>
  </div>`);
  }
  createGroupParticipantList() {
    return $(`
    <div class="group-participant-list">
                <img src="modules/images/group_icon.svg" alt="" />
                <div class="overflow-hidden">
                  <h6 id="callName" >Connecting...</h6>
                  <p id="elapsedTime">00:00:00</p>
                </div>
              </div>
    `);
  }
  createAddLocalMultipleCameras() {
    return $(`
    <div class="participant-cameras-container  local-camera-list-wrapper">
    <button class="participant-cameras-btn">
        <img
          src="modules/images/local_cam_default.svg"
          class="img-default"
          alt=""
        />
        <img
        src="modules/images/local_cameras_hover.svg"
        class="img-default-hover"
        alt=""
      />
        <img
          src="modules/images/local_expanded.svg"
          class="img-active"
          alt=""
        />
        <img
          src="modules/images/local_expanded_hover.svg"
          class="img-expanded-hover"
          alt=""
        />
    </button>
    <div class="participant-cameras-list">
    <ul id="localMedia">
    </div>
</div>
    `);
  }
  createLocalVideosList() {
    return $(` <div class="local-camera-view-wrapper">
    <ul>
      <li class="active local-audio-list">
        <img src="modules/images/local-camoff-avatar.svg">
      </li>
      <!-- <li>
        <video autoplay class="">
          <source src="images/mov_bbb.mp4" type="video/mp4" />
        </video>
      </li>
      <li>
        <video autoplay class="">
          <source src="images/mov_bbb.mp4" type="video/mp4" />
        </video>
      </li>
      <li>
        <video autoplay class="">
          <source src="images/mov_bbb.mp4" type="video/mp4" />
        </video>
      </li> -->
    </ul>
  </div>`);
  }
  createParticipantsCloseBtn() {
    return $(`
    <button class="btn p-0 border-0 participants-close-btn box-shadow-none">
        <img src="modules/images/popup_close.svg" alt=""  class="img-default"/>
    </button>
    `);
  }
  //   createMinimiseVideoControlsBtn() {
  //     return $(`<button class="btn p-0 border-0 minimise-video-controls-btn box-shadow-none">
  //     <img src="modules/images/minimise.svg" alt="" class="img-default"/>
  //     <img src="modules/images/minimise_hover.svg" alt="" class="img-hover"/>
  // </button>`);
  //   }
  createMinimiseVideoControlsBtn() {
    const button = $(`
    <button class="btn border-0 minimise-video-controls-btn box-shadow-none">
      <img src="modules/images/minimise.svg" alt="" class="img-default"/>
      <img src="modules/images/minimise_hover.svg" alt="" class="img-hover"/>
    </button>
  `);

    button.click(function () {
      $(this).toggleClass("rotated");
    });

    return button;
  }
  createRecordBtn() {
    return $(`<button class="btn p-0 border-0  box-shadow-none record-btn pe-2">
    <div>
      <img src="modules/images/record_default.svg" class="img-default" alt="" />
      <img src="modules/images/record_active.svg" class="img-active" alt="" />
    </div>
    <div>
      <p class="mb-0 record-default">Start Record</p>
      <p class="mb-0 record-active">00:00:00</p>
    </div>
</button>`);
  }
  createRaisedHandParticipantsList() {
    return $(`
          <ul class="hand-raised-participants-list">
                     <!-- <li>
                        <img
                          src="modules/images/group_icon.svg"
                          class="participants-profile-img"
                          alt=""
                        />
                        <img
                          src="modules/images/hand_raised_icon.svg"
                          class="hand-raised-icon"
                          alt=""
                        />
                      </li> -->
          </ul>`);
  }
  buidVideoControlsSection(elm) {
    $(elm)
      .append(this.createJoinRequestList)
      .append(
        this.createDivElement({ class: "connection-room-header" }).append(
          this.createDivElement({ class: "row " })
            .append(
              this.createDivElement({ class: "col-4" }).append(
                this.createGroupParticipantList
              )
            )
            .append(
              this.createDivElement({ class: "col-4" }).append(
                this.createRaisedHandParticipantsList
              )
            )
            .append(
              this.createDivElement({ class: "col-4" }).append(
                this.createDivElement({ class: "d-flex justify-content-end" })
                  // .append(this.createAddLocalMultipleCameras)
                  // .append(this.createAddLocalMultipleCameras)
                  .append(jsonConfig.CallRecording ? this.createRecordBtn : "")
                  .append(
                    jsonConfig.Chat
                      ? this.createDivElement({
                        class: "chat-view-main-wrapper",
                      })

                        .append(this.createMessageBtn)
                        .append(this.createChatView)
                      : ""
                  )
                  .append(this.createAudioVideoSettingsBtn())
              )
            )
        )
      )
      .append(this.createRemoteVideoElement())
      .append(this.createParticipantsHandPopup)
      .append(this.createLocalVideosList())
      .append(this.createMinimiseVideoControlsBtn())
      .append(this.createMobileViewDrawer())
      .append(this.createMobileViewAddParticipant())
      .append(this.createMobileViewActiveParticipants())
      .append(this.createMobileViewSpeakerSettings())
      .append(this.createMobileViewChat())
      .append(
        this.createVideoControlsSection()
          .append(
            this.createDivElement({ class: "" }).append(
              this.createDivElement({
                class: "video-controls-container",
              })

                .append(
                  this.createDivElement({
                    class: "black-drop",
                  })
                )
                .append(
                  this.createDivElement({
                    class: "row align-items-center",
                  }).append(
                    this.createDivElement({ class: "col-3" }).append(
                      jsonConfig.MultipleCamera
                        ? this.createAddLocalMultipleCameras()
                        : `<ul id="localMedia" class="d-none">`
                    ),
                    this.createDivElement({ class: "col-6" }).append(
                      this.createDivElement({
                        class:
                          "center-control-btns btn-active d-flex justify-content-center align-items-center",
                      })
                        // .append(this.createRecordButtonContainer())
                        .append(
                          this.createDivElement({ class: "mobile-menu" })
                            .append(this.createMobileMenuBtn())
                            .append(
                              this.createDivElement({
                                class: "mobile-menu-view-content",
                              })
                                .append(this.createMobileMenuCloseBtn())
                                .append(this.createMobileMenuShareScreenBtn())
                                .append(
                                  jsonConfig.CallRecording
                                    ? this.createMobileMenuRecordBtn()
                                    : ""
                                )
                                .append(
                                  jsonConfig.CallRecording
                                    ? this.createMobileMenuRecordStart()
                                    : ""
                                )
                            )
                        )
                        .append(this.createCameraSwitchButton())
                        .append(this.createVideoCameraBtn())
                        .append(this.createVolUp())
                        .append(this.createStopCallBtn())
                        .append(this.createMicBtn())
                        .append(this.createShareScreenBtn())
                        .append(
                          jsonConfig.RaiseHand
                            ? this.createDivElement({
                              class: "position-relative",
                            })
                              .append(this.createLocalRaiseHandPopupDiv)
                              .append(this.createRaiseHandBtn)
                            : ""
                        )
                    ),
                    this.createDivElement({ class: "col-3" }).append(
                      this.createDivElement({
                        class:
                          "center-control-btns btn-active d-flex  align-items-center justify-content-center",
                      })
                        .append(
                          jsonConfig.AddParticipants
                            ? this.createDivElement({
                              class: "add-participants-container",
                            })
                              .append(this.createAddParticipantBtn())

                              .append(
                                this.createDivElement({
                                  class: "add-participants-list-container",
                                })

                                  .append(
                                    this.createDivElement({
                                      class:
                                        "add-participants-header sticky-top",
                                    })
                                      .append(
                                        this.createAddParticipantsListCloseBtn()
                                      )
                                      .append(
                                        this.createH6Element({
                                          text: "Add Friends",
                                        })
                                      )
                                      .append(
                                        this.createDivElement({
                                          class:
                                            "add-participants-header-actions",
                                        }).append(
                                          this.addParticipantsListsearch()
                                        )
                                      )
                                  )
                                  .append(
                                    this.createDivElement({
                                      class: "add-participants-body",
                                    }).append(
                                      this.createUlElement({
                                        id: "addParticipantsList",
                                      }).append(this.createFriendsListItem()) //
                                    )
                                  )
                              )
                            : ""
                        )
                        .append(
                          this.createDivElement({ class: "participants-view" })
                            // .append(this.createParticipantsViewBtn())

                            .append(
                              this.createButtonElement({
                                id: `participants-count`,
                                class:
                                  "participants-count participants-view-btn",
                              }).append(this.createSpanElement({ text: "0" }))
                            )
                            .append(
                              this.createDivElement({
                                class: "participants-list-container",
                              })

                                .append(
                                  this.createDivElement({
                                    class: "participants-header sticky-top",
                                  })
                                    .append(this.createParticipantsCloseBtn())
                                    .append(
                                      this.createH6Element({
                                        text: "Participants",
                                      }).append(
                                        this.createSpanElement({
                                          id: "list-count",
                                          class: "list-count",
                                          text: "0",
                                        })
                                      )
                                    )
                                    .append(
                                      this.createDivElement({
                                        class: "participants-header-actions",
                                      }).append(
                                        this.CreateParticipantsListSearch()
                                      )
                                      // .append(
                                      //   this.createParticipantsVideoBtn()
                                      // )
                                      // .append(this.createParticipantsMicBtn())
                                    )
                                )

                                .append(
                                  this.createDivElement({
                                    class: "participants-body",
                                  }).append(
                                    this.createUlElement({
                                      id: "guestListView",
                                    }),
                                    this.createParticipantsListView()
                                    // this.createUlElement({
                                    //   id: "participantsListView",
                                    // }) //.append(this.createAddParticipantsListItem())
                                  )
                                )
                            )
                        )
                    )
                  )
                )
            )
          )

          //local media
          // .append(
          //   this.createDivElement({
          //     id: "localCameras",
          //     class: "user-cameras-view",
          //   })
          //     .append(
          //       this.createDivElement({
          //         class: "user-cameras-view-container",
          //       }).append(
          //         this.createDivElement({
          //           class: "user-cameras-view-list",
          //         }).append(
          //           this.createDivElement({ class: "user-cameras-view-ul" })
          //             .append(
          //               this.createDivElement({
          //                 class: "user-cameras-view-ul-li display-inline-show",
          //               }).append(
          //                 this.createDivElement({
          //                   class: "video-container",
          //                   id: "localMedia",
          //                 })
          //               )
          //             )
          //             .append(this.createOpenCloseCameraBtn())
          //         )
          //       )
          //     )
          //     .append(
          //       this.createDivElement({
          //         class: "user-cameras-view-btn-list",
          //       }).append(
          //         this.createUlElement({
          //           id: "epi_camList",
          //           class: "camera-btn-active btn-active",
          //         })
          //       )
          //     )
          // )
          //local media end

          .append(this.createRemoteAudioElement())
      )
      .append(this.createaudioSettingsPopup())
      .append(this.createImageSlider());

    this.createInlineConsoleElement();
  }

  CreateParticipantsListSearch() {
    return `<input type="text" class="form-control" id="searchParticipants" placeholder="Search by name">`;
  }

  addParticipantsListsearch() {
    return `
  <input type="text" class="form-control w-100" id="usersSearch" aria-describedby="usersSearch" placeholder="Search by mail ID or name">
`;
  }

  activateFullScreen(remoteClientId) {
    var videoArray = $('#videoRow [name="epic_video-container"]');
    console.log(" Video Array 0", videoArray[0]);
    //div_rmt_splitter_6bc24da8-95f1-46e0-85d7-d80aafe36339
    console.log("Nokia", videoArray.find(remoteClientId));
    if (videoArray) {
      let fullScreenVideo = $(videoArray).filter(function (index) {
        return $(`#div_rmt_splitter_${remoteClientId}`, this).length === 1;
      })[0];
      let thumbnailVideos = $(videoArray).filter(function (index) {
        return $(`#div_rmt_splitter_${remoteClientId}`, this).length === 0;
      });

      $("#videoRow")
        .empty()
        .append(
          this.createDivElement({ class: "col-12" }).append(
            this.createDivElement({
              class: "carousel slide carousel-thumbnails",
              id: "epic_carouselThumb",
              attr: { "data-ride": "carousel" },
            })
              // Slide
              .append(
                this.createDivElement({
                  class: "carousel-inner",
                  attr: { role: "listbox" },
                }).append(
                  this.createDivElement({
                    class: "carousel-item active",
                  }).append($(fullScreenVideo))
                )
              )
              // Slide
              .append(
                this.createATag({
                  class: "carousel-control-prev",
                  attr: {
                    href: "#carousel-thumb",
                    role: "button",
                    "data-slide": "prev",
                  },
                })
                  .append(
                    this.createSpanElement({
                      class: "carousel-control-prev-icon",
                      attr: { "aria-hidden": true },
                    })
                  )
                  .append(
                    this.createSpanElement({
                      class: "sr-only",
                      text: "Previous",
                    })
                  )
              )
              .append(
                this.createATag({
                  class: "carousel-control-next",
                  attr: {
                    href: "#carousel-thumb",
                    role: "button",
                    "data-slide": "next",
                  },
                })
                  .append(
                    this.createSpanElement({
                      class: "carousel-control-next-icon",
                      attr: { "aria-hidden": true },
                    })
                  )
                  .append(
                    this.createSpanElement({ class: "sr-only", text: "Next" })
                  )
              )
              .append(
                this.createOlElement({
                  id: "epic_carouselSlider",
                  class: "carousel-indicators carouselSlider",
                })
              )
              .append(this.createCarouselIndicatorsForMainSlider)
          )
        );
      console.log("Full Video Array after clear", thumbnailVideos.length);
      for (let index = 0; index < thumbnailVideos.length; index++) {
        const element = thumbnailVideos[index];
        this.addSlideVideo(element);
      }
      //div_rmt_splitter_6bc24da8-95f1-46e0-85d7-d80aafe36339

      configureSlider();
    }
  }

  exitFullScreen() { }

  addSlideVideo(elm, elmcss) {
    var videoLen = $("#epic_carouselSlider li").length;
    $("#epic_carouselSlider").append(
      this.createLiElement({
        class: elmcss,
        attr: { "data-target": "#carousel-thumb", " data-slide-to": videoLen },
      }).append(elm)
    );
  }

  createAudioVideoSettingsBtn() {
    return `<button class="audio-settings-btn active" data-bs-toggle="modal" data-bs-target="#audioSettingsPopup">
    <svg id="settings" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48" viewBox="0 0 48 48">
    <defs>
      <linearGradient id="linear-gradient" x1="0.851" y1="0.241" x2="0.299" y2="0.843" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#808486"/>
        <stop offset="1" stop-color="#182024"/>
      </linearGradient>
    </defs>
    <circle id="Ellipse_55" data-name="Ellipse 55" cx="24" cy="24" r="24" transform="translate(48 48) rotate(180)" opacity="0" fill="url(#linear-gradient)"/>
    <g id="Layer_2" data-name="Layer 2" transform="translate(10.317 11.648)">
      <path id="Path_409" data-name="Path 409" d="M20.757,27.387H10.37A3.059,3.059,0,0,1,7.7,25.933L2.24,16.49a2.455,2.455,0,0,1,0-2.483L7.7,4.564A3.059,3.059,0,0,1,10.37,3.11H20.757A3.059,3.059,0,0,1,23.43,4.63l5.458,9.443a2.455,2.455,0,0,1,0,2.483L23.43,26a3.059,3.059,0,0,1-2.672,1.388ZM10.37,4.592a1.671,1.671,0,0,0-1.454.746L3.458,14.781a1.039,1.039,0,0,0,0,1.067l5.458,9.443a1.671,1.671,0,0,0,1.454.746H20.757a1.671,1.671,0,0,0,1.454-.746l5.458-9.443a1.039,1.039,0,0,0,0-1.067L22.211,5.338a1.671,1.671,0,0,0-1.454-.746Z" transform="translate(-1.903 -3.109)" fill="#808486" stroke="#808486" stroke-width="0.2"/>
      <path id="Path_410" data-name="Path 410" d="M15.585,20.181a4.965,4.965,0,1,1,4.965-4.965A4.965,4.965,0,0,1,15.585,20.181Zm0-8.635a3.67,3.67,0,1,0,3.67,3.67A3.67,3.67,0,0,0,15.585,11.545Z" transform="translate(-1.924 -3.042)" fill="#808486" stroke="#808486" stroke-width="0.2"/>
    </g>
  </svg>
  
            </button>`;
  }

  createaudioSettingsPopup() {
    return `
    <div class="modal fade audio-settings-popup" id="audioSettingsPopup" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">

            <div class="modal-header">
                <h1 class="modal-title fs-5 text-dark" id="staticBackdropLabel">Audio &amp; Speaker Settings</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <h6 class="secondary-text-color fs-15 fw-400 mb-3">Audio</h6>
                <div class=" select-input-arrow mb-3">
                    <label for="exampleFormControlSelect1" class="form-label mb-2">Select Microphone</label>
                    <select id="audioSelect" class="form-select"
                        onchange="roomObj.replace(RoomClient.mediaType.audio, audioSelect.value)"></select>
                </div>

                <div class=" select-input-arrow mb-3" style="display: none;">
                    <label for="exampleFormControlSelect1" class="form-label">Video</label>
                    <select id="videoSelect" class="form-select" onchange="roomObj.replace(RoomClient.mediaType.video, videoSelect.value)"></select>
                </div>

               
                    <div class="volumen-wrapper">
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                        <div class="led"></div>
                    </div>
                
                <label for="customRangeSpeaker" class="form-label secondary-text-color mt-2">Volume</label>
                <input type="range" class="form-range" min="0" max="100" id="customRangeSpeaker" value="100">
            </div>
        </div>
    </div>
</div>
    `;
  }

  createInlineConsoleElement() {
    $(`<div style="
    position: absolute;
    top: 10px;
    left: auto;
    right: 10px;
    bottom: auto;
    border: 1px solid #333;
    width: 250px;
    height: 200px;
    padding: 10px;
    overflow: auto;
    font-size: 10px;
    background-color: black;
    color: #fff;
    z-index: 999;
    display:none;
    " id="alert_box">
    </div>`).insertAfter("#audioSettingsPopup");
  }

  createRemoteAudioElement() {
    return `<div id="remoteAudios" class="d-none"></div>`;
  }

  createRemoteVideoElement() {
    return `
    <div class="carousel-container">
    <div class="row">
    <div class="col-12">
    <div
    id="carousel-thumb"
    class="carousel slide carousel-thumbnails"
    data-bs-interval="false"
    data-bs-wrap="false"
    >
    <div class="carousel-inner" id="remoteVideos">
    <div class="carousel-item active">
    <div class="video-container row g-2"></div>
    </div>
    </div>
    <div class="slider-nav-wrapper">
    <button
    class="carousel-control-prev"
    disabled
    type="button"
    data-bs-target="#carousel-thumb"
    data-bs-slide="prev"
    data-carousel="carousel-thumb"
    id="main-carousel-prev"
    >
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
    </button>

    <ul class="carousel-indicators-main-slider">
      <li type="button" data-bs-target="#carousel-thumb" data-bs-slide-to="0" aria-label="Slide 1" aria-current="true" class="active"></li>
      <!-- <li data-bs-target="#carousel-thumb" data-bs-slide-to="1"></li> -->
    </ul>
    <button
    class="carousel-control-next"
    type="button"
    data-bs-target="#carousel-thumb"
    data-bs-slide="next"
    data-carousel="carousel-thumb"
    id="main-carousel-next"
    >
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
    </button>
    </div>
    </div>
    
    <div class="carousel-indicators">
    <ol class=" carouselSlider" id="thumb-ol" >
    
    </ol>
    <!--    <button id="thumbScrollLeftButton" class="btn thumb-scrolls-left-btn">
    <img src="modules/images/thumb_left.svg" alt="" />
    </button>
    <button id="thumbScrollRightButton" class="btn thumb-scrolls-right-btn">
    <img src="modules/images/thumb_right.svg" alt="" />
    </button> -->
    </div>
    </div>
    </div>
    </div>
    
    `;
  }

  createRemoteVideoSlider() {
    return `
     <div class="carousel-indicators">
     <ol class="carousel-indicators carouselSlider">
     <li data-bs-target="#carousel-thumb" data-bs-slide-to="0" class="active">
     <div class="video-container">
     <div class="participant-video-controls">
     <div class="row">
     <div class="col-12">
     <p class="small-text">Brown Smith</p>
     </div>
     </div>
     </div>
     <video controls="false" class="d-block">
     <source src="modules/images/mov_bbb.mp4" type="video/mp4">
     </video>
     </div>
     </li>
     
     <li data-bs-target="#carousel-thumb" data-bs-slide-to="1">
     <div class="video-container">
     <div class="participant-video-controls">
     <div class="row">
     <div class="col-12">
     <p class="small-text">Brown Smith</p>
     </div>
     </div>
     </div>
     <video controls="false" class="d-block">
     <source src="modules/images/mov_bbb.mp4" type="video/mp4">
     </video>
     </div>
     </li>
     <li data-bs-target="#carousel-thumb" data-bs-slide-to="2">
     <div class="video-container">
     <div class="participant-video-controls">
     <div class="row">
     <div class="col-12">
     <p class="small-text">Brown Smith</p>
     </div>
     </div>
     </div>
     <video controls="false" class="d-block">
     <source src="modules/images/mov_bbb.mp4" type="video/mp4">
     </video>
     </div>
     </li>
     <li data-bs-target="#carousel-thumb" data-bs-slide-to="3">
     <div class="video-container">
     <div class="participant-video-controls">
     <div class="row">
     <div class="col-12">
     <p class="small-text">Brown Smith</p>
     </div>
     </div>
     </div>
     <video controls="false" class="d-block">
     <source src="modules/images/mov_bbb.mp4" type="video/mp4">
     </video>
     </div>
     </li>
     <li data-bs-target="#carousel-thumb" data-bs-slide-to="4">
     <div class="video-container">
     <div class="participant-video-controls">
     <div class="row">
     <div class="col-12">
     <p class="small-text">Brown Smith</p>
     </div>
     </div>
     </div>
     <video controls="false" class="d-block">
     <source src="modules/images/mov_bbb.mp4" type="video/mp4">
     </video>
     </div>
     </li>
     </ol> 
     <button id="thumbScrollLeftButton" class="btn thumb-scrolls-left-btn" > 
     <img src="modules/images/thumb_left.svg" alt="" />
     </button>
     <button id="thumbScrollRightButton" class="btn thumb-scrolls-right-btn">
     <img src="modules/images/thumb_right.svg" alt="" />
     </button>
     </div>`;
  }

  createMultipleCameraButton(index) {
    return `<li>
    <button class="camera-${index}" id="epic_MultipleCameraSwitch${index}" onClick="multipleCameraShiftOnButton(this)">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <defs>
    <style>
    .user-cameras-svg-a,
    .user-cameras-svg-b,
    .user-cameras-svg-c,
    .user-cameras-svg-e {
      fill: none;
    }
    
    .user-cameras-svg-a,
    .user-cameras-svg-b {
      stroke: #808486;
    }
    
    .user-cameras-svg-b {
      stroke - width: 1.2px;
    }
    
    .user-cameras-svg-c {
      opacity: 0.12;
    }
    
    .user-cameras-svg-d {
      stroke: none;
    }
    </style>
    </defs>
    <g class="user-cameras-svg-a">
    <rect class="user-cameras-svg-d" width="32" height="32" rx="16"></rect>
    <rect class="user-cameras-svg-e" x="0.5" y="0.5" width="31" height="31" rx="15.5"></rect>
    </g>
    <g transform="translate(-21198 156)">
    <g transform="translate(21205.502 -146.232)">
    <g transform="translate(0 0)">
    <path class="user-cameras-svg-b" d="M16.149,17.171H14.732l-.307-.8a1.363,1.363,0,0,0-1.27-.869H6.9a1.363,1.363,0,0,0-1.27.869l-.307.8H3.905A2.208,2.208,0,0,0,1.7,19.376V26.26a2.193,2.193,0,0,0,2.192,2.192H16.136a2.193,2.193,0,0,0,2.192-2.192V19.376A2.168,2.168,0,0,0,16.149,17.171Z" transform="translate(-1.7 -15.5)"></path>
    </g>
    </g>
    <g class="user-cameras-svg-b" transform="translate(21211 -142)">
    <circle class="user-cameras-svg-d" cx="3" cy="3" r="3"></circle>
    <circle class="user-cameras-svg-e" cx="3" cy="3" r="2.4"></circle>
    </g>
    </g>
    <rect class="user-cameras-svg-c" width="32" height="32" rx="16"></rect>
    </svg>
    </button>
    </li>`;
  }

  async CreateAvatar(participantList, calling = false) {
    var newparticipantList = [];

    if (participantList.length == 2) {
      $(".participant-expand-view-btn, .participant-list-fullscreen-btns").prop(
        "disabled",
        true
      );
    } else {
      $(".participant-expand-view-btn, .participant-list-fullscreen-btns").prop(
        "disabled",
        false
      );
    }

    lastSlideRemoteTileCount = (participantList.length - 1) % userPerSlide;
    callParticiapantsCount = participantList.length - 1;

    // await participantList.forEach(async (element) => {
    for (const element of participantList) {
      if ($(`[data-username="video_${element.userid}"]`).find("h2")) {
        $(`[data-username="video_${element.userid}"]`).find("h2").remove();
      }

      if (
        deviceScreenWidth < 768 &&
        element.userid == await getCookieDetails("userID") &&
        participantList.length > 1
      ) {
        // return;
        await $("#carousel-thumb")
          .find("div[data-username='" + element + "']")
          .parent()
          .parent()
          .parent()
          .parent()
          .remove();

        continue;
      }

      if ($(`[data-username="video_${element.userid}"]`).length == 0) {
        if (!participantListUpdateFirst) {
          var firstNumber = parseInt(element.userid.match(/\d/)[0]);
          let backgroundColor = await getcolor(firstNumber);

          if (
            element.userid != await getCookieDetails("userID") &&
            element.name != "You" &&
            !calling
          ) {
            var ulToastr = $(".participants-raise-hand-popup");
            ulToastr.append(`
            <li id="jr-toastr-${element.userid}">
                <div class="raise-hand-popup">
                    <div class="d-flex align-items-center gap-2">
                        ${element.profileImg
                ? `<div class="rounded-circle d-flex justify-content-center align-items-center" style="width: 35px; height: 35px;">
                                <img src="uploads/${element.profileImg}" alt="Profile Image">
                            </div>`
                : `<div class="rounded-circle d-flex justify-content-center align-items-center" style="width: 35px; height: 35px; background-color: ${backgroundColor}36;">
                              <h6 class="noselect" style="text-indent: 0px; margin: 0px; position: absolute; left: 11px; color: ${backgroundColor}">
                                ${element.name
                  .split(" ")
                  .filter((word) => word !== "")
                  .map((word) => word[0].toUpperCase())
                  .slice(0, 2) // Take only the first two initials
                  .join("")}
                              </h6>
                            </div>`
              }
                        <p>${element.name} joined room</p>
                    </div>
                </div>
            </li>
        `);
            ulToastr.addClass("active");
            setTimeout(() => {
              if (ulToastr.children().length == 1)
                ulToastr.removeClass("active");
              $(`#jr-toastr-${element.userid}`).remove();
            }, 5000);
          }
        }

        if (
          $(
            "#remoteVideos .carousel-item:last-child > .video-container"
          ).children().length < userPerSlide &&
          !fullScreen
        ) {
          await this.avatarHtml(
            element.name,
            element.userid,
            calling,
            element.clientid,
            element.profileImg
          );
        } else {
          $("#remoteVideos").append(
            "<div class='carousel-item'><div class='video-container row g-2'></div></div>"
          );
          await this.avatarHtml(
            element.name,
            element.userid,
            calling,
            element.clientid,
            element.profileImg
          );
        }

        if (fullScreen) {
          var smallText = $($(`[data-username="video_${element.userid}"]`))
            .find(".small-text")
            .text();
          var participantVideoControls = $("<div>")
            .addClass("participant-video-controls")
            .append(
              $("<div>")
                .addClass("row")
                .append(
                  $("<div>")
                    .addClass("col-12 d-flex")
                    .append($("<p>").addClass("small-text").text(smallText))
                )
            );
          var avatarContainer = $(
            $(`[data-username="video_${element.userid}"]`)
          )
            .find(".audio-container")
            .clone();
          $(avatarContainer).prepend(participantVideoControls);
          var newLi = $("<li>")
            .attr("data-bs-target", "#carousel-thumb")
            .addClass("active")
            .append($(avatarContainer));

          $(newLi).attr("id", `fsli_${element.userid}`);
          $(newLi).click(function () {
            switchFsUser(element.userid);
          });
          $("#thumb-ol").append(newLi);
          checkOverflow();
        }
      }

      newparticipantList.push("avatar_" + element.userid);
      // });
    }
    if (calling) {
      this.resetVideoLayout();
      return;
    }
    await this.RemoveInactiveUserAvatar(newparticipantList, calling);
    await this.manageLocalTile();
    await this.resetVideoLayout();
    participantListUpdateFirst = false;

    if (callParticiapantsCount == 0) {
      if ($(".waiting-h6").length == 0) {
        $('[data-username="video_' + JSON.parse(await getCookie()).userID + '"]')
          .find(".audio-container")
          .append(
            `<h6 class="mb-0 mt-2 waiting-h6" style="padding: 5px; background: black; border-radius: 2px;">Waiting for other participants to join</h6>`
          );
        $(".video-waiting-h6").remove();
      }
    } else {
      $(".waiting-h6").remove();
      $(".video-waiting-h6").remove();
    }
  }

  // async avatarHtml(name, userid, calling, clientid, profileImg) {
  //   var firstNumber = parseInt(userid.match(/\d/)[0]);
  //   let backgroundColor = await getcolor(firstNumber);

  //   $(".carousel-item:last-child > .video-container").append(
  //     controlBuilder
  //       .createDOMElement({
  //         tag: "div",
  //         attribute: [
  //           { class: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6" },
  //           { data_username: "video_" + userid },
  //         ],
  //       })
  //       .append(
  //         $("<div>")
  //           .addClass(`row g-3 h-100 ps-2 parentDiv_${userid}`)
  //           .attr("id", "multipleInnerVideos")
  //           .append(
  //             $("<div>").addClass("col").append(`
  //           <!--  <h3 class=" text-white mt-1" style="font-size:14px" data-username="avatar_${userid}">
  //           <span id="audiostatus_${userid}">
  //             <img src="modules/images/remote_mic_muted.svg" />
  //           </span>
  //           ${name}
  //         </h3> -->
  //         ${this.RemoteVideoControllerAvatar(name, userid, clientid)}

  //         <div class="audio-container">
  //           ${profileImg
  //                 ? `<div class="rounded-circle d-flex mb-1 justify-content-center align-items-center hand-raised-icon" data-username="avatar_${userid}"
  //                   style="width: 122px; height: 122px;">
  //                   <img class="rounded-circle d-flex mb-1 justify-content-center align-items-center" style="width: 122px; height: 122px;" src="uploads/${profileImg}" alt="Profile Image" />
  //                   <img id="hand-raised${userid}" src="modules/images/audio_raise_hand.svg" class="audio-raise-hand d-none" />
  //               </div>`
  //                 : `<div class="rounded-circle d-flex mb-1 justify-content-center align-items-center" data-username="avatar_${userid}"
  //                   style="width: 122px; height: 122px; background-color: ${backgroundColor}36; position: relative;">
  //                   <h6 class="fs-1 mb-0 noselect" style="text-indent: 0px; position : absolute; color : ${backgroundColor}">
  //                     ${name
  //                   .split(" ")
  //                   .filter(word => word !== "")
  //                   .map(word => word[0].toUpperCase())
  //                   .slice(0, 2) // Take only the first two initials
  //                   .join("")}
  //                   </h6>
  //                   <img id="hand-raised${userid}" src="modules/images/audio_raise_hand.svg" class="audio-raise-hand d-none" style="position: absolute;"/>
  //               </div>`
  //               }
  //       </div>
  //         ${calling
  //                 ? `<h2 style="margin: 0 !important;" class="m-auto text-white mt-2 connecting">Connecting...</h2>`
  //                 : ``
  //               }
  //         </div>
  //         `)
  //           )
  //       )
  //   );
  //   await controlBuilder.resetVideoLayout();
  // }

  async avatarHtml(name, userid, calling, clientid, profileImg) {
    var firstNumber = parseInt(userid.match(/\d/)[0]);
    let backgroundColor = await getcolor(firstNumber);

    // Create the DOM elements for the avatar
    $("#remoteVideos .carousel-item:last-child > .video-container").append(
      controlBuilder
        .createDOMElement({
          tag: "div",
          attribute: [
            { class: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6" },
            { data_username: "video_" + userid },
          ],
        })
        .append(
          $("<div>")
            .addClass(`row g-3 h-100 ps-2 parentDiv_${userid}`)
            .attr("id", "multipleInnerVideos")
            .append(
              $("<div>").addClass("col").append(`
                            ${this.RemoteVideoControllerAvatar(
                name,
                userid,
                clientid
              )}
                            <div class="audio-container">
                                ${profileImg
                  ? `<div class="rounded-circle d-flex mb-1 justify-content-center align-items-center hand-raised-icon" data-username="avatar_${userid}"
                                        style="width: 122px; height: 122px;">
                                        <img class="rounded-circle d-flex mb-1 justify-content-center align-items-center" style="width: 122px; height: 122px;" src="${fileUploadPath}${profileImg}" alt="Profile Image" /> 
                                        <img id="hand-raised${userid}" src="modules/images/audio_raise_hand.svg" class="audio-raise-hand d-none" />
                                    </div>`
                  : `<div class="rounded-circle d-flex mb-1 justify-content-center align-items-center" data-username="avatar_${userid}"
                                        style="width: 122px; height: 122px; background-color: ${backgroundColor}36; position: relative;">
                                        <h6 class="fs-1 mb-0 noselect" style="text-indent: 0px; position : absolute; color : ${backgroundColor}">
                                            ${name
                    .split(" ")
                    .filter((word) => word !== "")
                    .map((word) =>
                      word[0].toUpperCase()
                    )
                    .slice(0, 2) // Take only the first two initials
                    .join("")}
                                        </h6>
                                        <img id="hand-raised${userid}" src="modules/images/audio_raise_hand.svg" class="audio-raise-hand d-none" style="position: absolute;"/>
                                    </div>`
                } 
                <!--<h6 style="margin: 0 !important;" class="m-auto text-white mt-2">${name}</h6>--> <!-- Participant's name -->
                                ${calling // Display "Connecting..." if calling is true
                  ? `<h2 style="margin: 0 !important;" class="m-auto text-white mt-2 connecting">Connecting...</h2>`
                  : ``
                }
                            </div>
                        `)
            )
        )
    );

    // Reset the video layout
    await controlBuilder.resetVideoLayout();
  }

  async RemoveInactiveUserAvatar(newparticipantList, calling = false) {
    var parentDiv = [];
    var Videodev = [];

    $("#remoteVideos .carousel-item").each(function () {
      $(this)
        .children(".video-container")
        .children()
        .each(function () {
          var elem = $(this).children(".row").find(".col").children();
          if ($(elem).find(".audio-container")) {
            parentDiv.push($(elem).find(".rounded-circle").data("username"));
          } else {
            Videodev.push($(elem).data("username"));
          }
        });
    });

    // $(".carousel-item").each(function () {
    //   $(this).children(".video-container").children().each(function () {
    //     var elem = $(this).children(".row").find(".col").children();
    //     if ($(elem).data("username") && !$(elem).data("username").includes("video_")) {
    //       parentDiv.push($(elem).data("username"));
    //     } else {
    //       Videodev.push($(elem).data("username"));
    //     }
    //   });
    // });

    parentDiv = parentDiv.filter(function (el) {
      return !newparticipantList.includes(el);
    });

    parentDiv.forEach(async (element) => {
      if (element) {
        let isConnecting = $("#carousel-thumb")
          .find(
            `div[data-username='video_${element.substring(
              7,
              element.length
            )}'] h2`
          )
          .text();
        if (fullScreen) {
          if (
            $("#thumb-ol").find("div[data-username='" + element + "']")
              .length == 0
          ) {
            toggleFullscreen(element.substring(7, element.length));
          } else {
            $("#thumb-ol")
              .find("div[data-username='" + element + "']")
              .parent()
              .parent()
              .remove();
          }
        }

        var name = $("#carousel-thumb")
          .find("div[data-username='" + element + "']")
          .parent()
          .parent()
          .parent()
          .parent()
          .find("p")
          .text()
          .trim();

        await $("#carousel-thumb")
          .find("div[data-username='" + element + "']")
          .parent()
          .parent()
          .parent()
          .parent()
          .remove();
        if (!fullScreen) this.arrangeSliderItems();
        this.removeEmptySlider();

        let user_id = element.replace("avatar_", "");
        var firstNumber = parseInt(user_id.match(/\d/)[0]);
        let backgroundColor = await getcolor(firstNumber);

        if (isConnecting != "Connecting...")
          if (element.userid != await getCookieDetails("userID") && name != "You") {
            var ulToastr = $(".participants-raise-hand-popup");
            ulToastr.append(`<li id="er-toastr-${element.substring(
              7,
              element.length
            )}" >
                          <div class="raise-hand-popup ">
                            <div class="d-flex align-items-center gap-2">
                            ${element.profileImg
                ? `<div class="rounded-circle d-flex justify-content-center align-items-center" style="width: 35px; height: 35px;">
                                    <img src="uploads/${element.profileImg}" alt="Profile Image">
                                </div>`
                : `<div class="rounded-circle d-flex justify-content-center align-items-center" style="width: 35px; height: 35px; background-color: ${backgroundColor}36;">
                                    <h6 class="noselect" style="text-indent: 0px; margin: 0px; position: absolute; left: 11px; color: ${backgroundColor};">
                                        ${name
                  .split(" ")
                  .filter((word) => word !== "")
                  .map((word) => word[0].toUpperCase())
                  .slice(0, 2) // Take only the first two initials
                  .join("")}
                                    </h6>
                                 </div>`
              }
                              <p> ${name} exited room</p>
                            </div>
                          </div> 
                        </li>`);
            ulToastr.addClass("active");

            setTimeout(() => {
              if (ulToastr.children().length == 1)
                ulToastr.removeClass("active");
              $(`#er-toastr-${element.substring(7, element.length)}`).remove();
            }, 5000);
          }
      }
    });

    this.resetVideoLayout();
    this.resetMultipleVideoLayout();
    this.manageLocalTile();
  }

  // function remove the rejected persons avatar showing on screen
  async removeRejectedPersonAvatar(userId) {
    await $("div[data-username='avatar_" + userId + "']")
      .parent()
      .parent()
      .parent()
      .parent()
      .remove();

    this.arrangeSliderItems();
    this.removeEmptySlider();
    this.resetMultipleVideoLayout();
    this.resetVideoLayout();
  }

  RemoveInactiveVideoWrapper() {
    $("div[data-username='video_']").remove();

    $("#remoteVideos .carousel-item").each(function () {
      $(this)
        .children(".video-container")
        .children()
        .each(function () {
          var user_video_wrapper = $(this).children(".row").find(".col");
          if (user_video_wrapper.length == 0) {
            $(this).remove();
          }
        });
    });

    this.arrangeSliderItems();
    this.removeEmptySlider();
  }

  async removeEmptySlider() {
    if ($("#remoteVideos").children().length > 1) {
      if (
        $("#remoteVideos .carousel-item:last-child")
          .find(".video-container")
          .children().length == 0
      ) {
        if ($("#remoteVideos .carousel-item:last-child").hasClass("active")) {
          $("#remoteVideos .carousel-item:last-child").removeClass("active");
          $("#remoteVideos .carousel-item:first-child").addClass("active");
        }
        $("#remoteVideos .carousel-item:last-child").remove();
      }
    }
    this.resetVideoLayout();
  }

  async arrangeSliderItems() {
    await $("#remoteVideos > .carousel-item").each(function (index) {
      if (!$(this).is(":last-child")) {
        if (
          $(this).find(".video-container").children("div").length < userPerSlide
        ) {
          var lastVideoContainer = $(
            "#remoteVideos .carousel-item:last-child > .video-container:last-child"
          );
          var targetVideoContainer = $(
            "#remoteVideos .carousel-item:nth-child(" +
            (index + 1) +
            ") > .video-container"
          );
          lastVideoContainer.children(":last").appendTo(targetVideoContainer);

          // lastVideoContainer.children().appendTo(targetVideoContainer);
          // lastVideoContainer.remove();

          return false;
        }
      }
    });
    this.resetVideoLayout();
    await this.manageLocalTile();
  }

  async setCarouselButtons() {
    let sliderCount = $("#remoteVideos .carousel-item").length;
    if (
      $("#remoteVideos .carousel-item:last-child")
        .find(".video-container")
        .children().length === 1 &&
      $('[data-username="video_' + JSON.parse(await getCookie()).userID + '"]')
        .parent()
        .is(
          $("#remoteVideos .carousel-item:last-child").children(
            ".video-container"
          )
        )
    ) {
      sliderCount--;
      if ($("#remoteVideos .carousel-item:last-child").hasClass("active")) {
        $("#remoteVideos .carousel-item:last-child").removeClass("active");
        $("#remoteVideos .carousel-item:first-child").addClass("active");

        $(".carousel-indicators-main-slider").children().removeClass("active");
        $(".carousel-indicators-main-slider")
          .children()
          .removeClass("aria-current");
        $(".carousel-indicators-main-slider")
          .children(":first")
          .addClass("active");
        $(".carousel-indicators-main-slider")
          .children(":first")
          .attr("aria-current", "true");
        setCarouselButtonState();
      }
    }
    let buttonCount = $(".carousel-indicators-main-slider").children().length;
    // if (sliderCount == buttonCount) return;
    if (sliderCount < 2) {
      $(".slider-nav-wrapper").addClass("d-none");
      $(".carousel-indicators-main-slider li:first").siblings("li").remove();
    } else {
      let createRemoveCount = sliderCount - buttonCount;
      if (createRemoveCount > 0) {
        for (let index = buttonCount; index < sliderCount; index++) {
          $(".carousel-indicators-main-slider").append(
            `<li type="button" data-bs-target="#carousel-thumb" aria-label="Slide ${index + 1
            }" data-bs-slide-to="${index}"></li>`
          );
        }
      } else if (createRemoveCount < 0) {
        for (let index = buttonCount; index > sliderCount; index--) {
          $(".carousel-indicators-main-slider li")
            .eq(index - 1)
            .remove();
        }
      }
      $(".slider-nav-wrapper").removeClass("d-none");
    }

    $(".carousel-indicators-main-slider").children().off("click");
    $(".carousel-indicators-main-slider")
      .children()
      .click(function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(this).siblings().removeAttr("aria-current");
        $(this).attr("aria-current", "true");
        setCarouselButtonState();
      });
  }

  async manageLocalTile() {
    var localTile = $(
      '[data-username="video_' + JSON.parse(await getCookie()).userID + '"]'
    );
    $(localTile).find("p").text("You");
    // $(localTile).find(".participant-video-controls-btns").hide();
    if (
      (lastSlideRemoteTileCount % 2 == 1 && lastSlideRemoteTileCount !== 1) ||
      (lastSlideRemoteTileCount == 0 && callParticiapantsCount == 0)
    ) {
      $(localTile).show();
    } else {
      $(localTile).hide();
      if (
        $(localTile).parent().children().length == 6 &&
        $(localTile).parent().next()
      ) {
        var lastUser = $(
          "#remoteVideos .carousel-item:last-child > .video-container:last-child"
        ).children(":last");
        $($(localTile).parent()).append(lastUser);
        $(
          "#remoteVideos .carousel-item:last-child > .video-container:last-child"
        ).append(localTile);
      }
    }
    $('[data-username="video_' + JSON.parse(await getCookie()).userID + '"]')
      .parent()
      .append(
        $('[data-username="video_' + JSON.parse(await getCookie()).userID + '"]')
      );
    await this.resetVideoLayout().then(() => {
      this.resetMultipleVideoLayout();
    });
    setCarouselButtonState();
    $('[data-username="video_' + JSON.parse(await getCookie()).userID + '"]')
      .find(".participant-video-controls-btns ")
      .hide();
    this.setCarouselButtons();
  }

  createImageSlider() {
    return `<div class="chat-carousel-wrapper">
              <div class="chat-carousel-header">
                <button class="image-carousel-download btn p-0">
                  <img src="modules/images/carousal_download_default.svg"  class="img-default" />
                  <img src="modules/images/carousal_download_hover.svg"  class="img-hover" />
                </button>
                <button class="image-carousel-close btn p-0">
                <img src="modules/images/carousal_close_default.svg"  class="img-default" />
                  <img src="modules/images/carousal_close_hover.svg"  class="img-hover" />
                </button>
              </div>
              <div id="image-carousel" class="carousel slide" data-bs-ride="false" data-bs-interval="false">
                <div class="carousel-inner">
                  <!-- <div class="carousel-item active"> -->
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#image-carousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#image-carousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
              </div>
              <div class="chat-carousel-footer">
                <div class="carousel-indicators">
                  <ol >
                    <!-- <button type="button" data-bs-target="#image-carousel" data-bs-slide-to="0" class="active" aria-current="true"
                            aria-label="Slide 1"></button> -->
                  </ol>
                </div>
              </div>
             
            </div>`;
  }

  createDOMElement(option) {
    var attr = "";
    option.attribute.forEach((element) => {
      attr += `${Object.keys(element)
        .toString()
        .replace("_", "-")} = "${Object.values(element).toString()}" `;
    });
    return $(`<${option.tag} ${attr}></${option.tag}>`);
  }
}
window.ControlBuilder = ControlBuilder;
