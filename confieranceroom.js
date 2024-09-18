var IsVideoOpen = false;
var IsAudioopen = false;
var IsShareScreen = false;
var IsCameraOnArray = [false];
var isVideoOnArray = [];
var silence = false;
let chatImageDictionary = {};

$("#silence-btn,.mobile-drawer-volume-btn").click(function () {
  silence = !silence;
  muteUnmuteOutput(silence);
  $("#silence-btn,.mobile-drawer-volume-btn").toggleClass("active");
});

$("#epic_MuteVideoCam,#epic_MuteVideoCam_Mob").click(function () {
  fn_VideoCam();
});

function fn_VideoCam() {
  if (IsVideoOpen) {
    CloseVideoProducer();
    IsCameraOnArray.forEach((element, i) => {
      IsCameraOnArray[i] = false;
      $(`.camera-${i}`).removeClass("active");
    });
  } else {
    OpenVideoProducer();
    IsCameraOnArray[0] = true;
    $(".camera-0").addClass("active");
  }
  IsVideoOpen = !IsVideoOpen;
}

$(".add-participants-btn").click(function () {
  $("#usersSearch,#mobileAddParticipantsSearch").val("");
  SearchParticipants("");
});

$(".add-participants-btn").mousedown(function (event) {
  //Show Live Console
  if (event.which == 2) {
    $("#alert_box").toggle();
  }
});

// function to toggle the audio stream
$("#epic_AudioMute,#epic_AudioMute_Mob").click(function () {
  fn_AudioMute();
});

function fn_AudioMute() {
  if (IsAudioopen) {
    CloseAudioProducer();
  } else {
    OpenAudioProducer();
  }
  IsAudioopen = !IsAudioopen;
}

// function to replace the camera connected to the device
$("#epic_CameraSwitch").click(function () {
  cameraSwitchReplace();
});

// function to stop call
$("#epic_StopCall,#epic_StopCallMob").click(async function () {
  if (recordingActive) {
    endTime = Date.now();
    await mediaRecorder.stop();
  }
  await stopCallSwitch();
});

// function to toggle the share screen stream
$("#epi_ShareScreenBtn, .mobile-view-share-btn").click(function () {
  // if (IsShareScreen) {
  //   CloseShareScreenProducer();
  // } else {
  //   ShareScreenProducer();
  // }
  // IsShareScreen = !IsShareScreen;
  unifiedScreenShare();
});

$("#epic_ChatBtn").click(function () {
  ChatHighlight();
});

$(".close-request-btn").click(function () {
  $(".join-request-wrapper").addClass("d-none");
});

async function updatepar(data) {
  $("#participants-count > span").text(data.length);
  $("#participants-count-mob").text(data.length);
  // $("#list-count").text(data.length + " Participants");
  $("#list-count").text(data.length);
  // $("#participantsListView")
  //   .empty()
  //   .append(controlBuilder.createAddParticipantsListItem(data));
  controlBuilder.createAddParticipantsListItem(data);
  const searchKey = $("#searchParticipants").val();
  filterCallParticipants(searchKey);
  const searchKeyMobile = $("#mobileParticipantsSearch").val();
  filterCallParticipantsMobile(searchKeyMobile);

  // updateProducerStatus()
}

// function to toggle multiple cameras on button click
function multipleCameraShiftOnButton(button) {
  if (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  ) {
    if ($(button).siblings().hasClass("active")) {
      $(button).siblings().click();
    }
  }

  var cameraId = button.id.toString().split("epic_MultipleCameraSwitch")[1];
  if (IsCameraOnArray[cameraId]) {
    roomObj.closeAllProducer(
      RoomClient.mediaType.video,
      videoDevices[cameraId].deviceId
    );

    IsCameraOnArray[cameraId] = false;
    if (IsCameraOnArray.every((value) => value === false)) {
      IsVideoOpen = false;
      $("#epic_MuteVideoCam,#epic_MuteVideoCam_Mob").toggleClass("active");
    }
    $(`.camera-${cameraId}`).removeClass("active");

    // $(`#${videoDevices[cameraId].deviceId}`).empty();
    // $(`#${videoDevices[cameraId].deviceId}`).removeClass("active");
    // $(`#${videoDevices[cameraId].deviceId}`).addClass("inactive");
    // $(`#${videoDevices[cameraId].deviceId}`).append(
    //   $(`<img src="modules/images/local_muted_video.svg" />`)
    // );
  } else {
    roomObj.produce(
      RoomClient.mediaType.video,
      videoDevices[cameraId].deviceId
    );

    IsCameraOnArray[cameraId] = true;
    if (!IsVideoOpen) {
      $("#epic_MuteVideoCam,#epic_MuteVideoCam_Mob").toggleClass("active");
      IsVideoOpen = true;
    }
    $(`.camera-${cameraId}`).addClass("active");
  }
}

$("#usersSearch,#mobileAddParticipantsSearch").keyup(function () {
  SearchParticipants(this.value);
});

async function videoHoverButtonClick(userId, elem, click) {
  if ($(`.parentDiv_${userId}`).children().length > 0) {
    var videoId = $(elem).attr("id");
    elem.setAttribute("data-main_video_id", videoId);
    var data_username = "video_" + userId;
    var $matchingElement = $('[data-username="' + data_username + '"]');
    var videoArray = isVideoOnArray.find(
      (it) => it.name === $(elem).attr("data-user_name")
    ).data;

    if ($(`.parentDiv_${userId} video[id="${videoId}"]`).length == 0) {
      click.find(".video-container").toggleClass("active");
      // if (!videoArray.find((it) => it.id == videoId.toString()).value) {
      $matchingElement
        .find(`.parentDiv_${userId}`)
        .append($("<div>").addClass("col").append($(elem)));
      videoArray.find((it) => it.id == videoId.toString()).value = true;
      // }
    } else {
      // if (videoArray.find((it) => it.id == videoId.toString()).value) {
      if ($(`.parentDiv_${userId}`).children().length > 1) {
        click.find(".video-container").toggleClass("active");
        $matchingElement
          .find(`.parentDiv_${userId}`)
          .find(`div:has(video[id="${videoId}"])`)
          .remove();
        videoArray.find((it) => it.id == videoId.toString()).value = false;
      }
      // }
    }
  }
  await controlBuilder.resetVideoLayout();
  await controlBuilder.resetMultipleVideoLayout();
  // controlBuilder.resetInnerLayout(userId);
}

function setElapsedTime(istStartTime) {
  const currentTime = new Date();
  const elapsedTime = currentTime - istStartTime;
  if (currentTime >= istStartTime) {
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    $("#elapsedTime").html(
      `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes
      }:${seconds > 9 ? seconds : "0" + seconds}`
    );
  }
  requestAnimationFrame(() => setElapsedTime(istStartTime));
}

$("#searchParticipants").keyup(function () {
  const searchKey = $(this).val();
  filterCallParticipants(searchKey);
});
$("#mobileParticipantsSearch").keyup(function () {
  const searchKey = $(this).val();
  filterCallParticipantsMobile(searchKey);
});
function filterCallParticipants(searchKey) {
  let isEmpty = true;
  $("#participantsListView li").each(function () {
    var listItem = $(this);
    var name = listItem.find("h6").text().toLowerCase();
    var email = listItem.find("p").text().toLowerCase();

    if (
      name.includes(searchKey.toLowerCase()) ||
      email.includes(searchKey.toLowerCase())
    ) {
      listItem.show();
      isEmpty = false;
    } else {
      listItem.hide();
    }
  });
  if (isEmpty) $(".participant-not-found-div").show();
  else $(".participant-not-found-div").hide();

  if (searchKey == "") $(".participant-not-found-div").hide();
}
function filterCallParticipantsMobile(searchKey) {
  let isEmpty = true;
  $(".mobile-active-participants-list li").each(function () {
    var listItem = $(this);
    var name = listItem.find("h6").text().toLowerCase();
    var email = listItem.find("p").text().toLowerCase();

    if (
      name.includes(searchKey.toLowerCase()) ||
      email.includes(searchKey.toLowerCase())
    ) {
      listItem.show();
      isEmpty = false;
    } else {
      listItem.hide();
    }
  });
  if (isEmpty) $(".participant-not-found-div").show();
  else $(".participant-not-found-div").hide();

  if (searchKey == "") $(".participant-not-found-div").hide();
}

var chatUl = $(".chat-ul");
$(".chat-send-btn").click(async function () {
  if (($(".chat-text-area").eq(1).val() == "" && $(".chat-text-area").eq(0).val() == "") && $(".attachedFilesUl li").length == 0)
    return;

  if ($(".attachedFilesUl li").length == 0) {
    sendChat([]);
    return;
  }

  const fetchPromises = [];
  let files = [{}];
  const formData = new FormData();

  $(".attachedFilesUl:first li").each(function (i) {
    let file = generateUUIDv4();
    let name = $(this).find("picture img").prop("alt");
    let extension = name.substring(name.lastIndexOf("."), name.length);
    file += extension;
    files[i] = { file: file, name };

    const fetchPromise = fetch($(this).find("picture source").prop("srcset"))
      .then((response) => response.blob())
      .then((blob) => {
        formData.append("files", blob, file);
      });
    fetchPromises.push(fetchPromise);
  });
  Promise.all(fetchPromises).then(() => {
    $(".attachedFilesUl").empty();

    ApiURL = apiUri + "uploadAttachments";
    var settings = {
      url: ApiURL,
      method: "POST",
      timeout: 0,
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: formData,
    };

    $.ajax(settings).done(async function (response) {
      response = JSON.parse(response);
      if (response.Message == "Upload Successful") {
        sendChat(files);
      }
    });
  });
});

async function sendChat(files) {
  const message = $(".chat-text-area").val();
  if ($(".chat-ul").find(".chat-date-view:last p").text() != "Today")
    chatUl.append(`<li class="chat-date-view">
                    <div>
                      <p>Today</p>
                    </div>
                  </li>`);

  var time = new Date();

  let groupId = generateUUIDv4();
  bindSenderChat(files, message, time, groupId);

  $(".chat-text-area").val("");

  chatUl.scrollTop(chatUl.prop("scrollHeight"));
  var dataObj = {
    commandType: "NewChatMessage",
    Data: {
      time: time,
      RoomId: localStorage.getItem("RoomId"),
      user_id: JSON.parse(await getCookie()).userID,
      message,
      files,
      groupId: groupId,
      referenceId: "",
    },
  };
  await server.sendCommand(JSON.stringify(dataObj));

  DocImgClick();
}

let input = document.getElementsByClassName("chat-text-area");

// if (jsonConfig.Chat)
//   input.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//       $(".chat-send-btn").click();
//     }
//   });

function ChatHighlight() {
  let chatBox = document.getElementById("eppic_ChatView");
  let highlightIndicator = document.getElementById("highlight-indicator");

  setTimeout(function () {
    if (chatBox.style.display === "none") {
      highlightIndicator.style.display = "block";
    } else {
      highlightIndicator.style.display = "none";
    }
    chatUl.scrollTop(chatUl.prop("scrollHeight"));
  }, 500);
}

function ParticipantCameraHighlight(UserId) {
  let highlightIndicator = document.getElementById(`Camera-indicator${UserId}`);
  highlightIndicator.style.display = "none";
}

function bindChat(Data) {
  let chatBox = document.getElementById("eppic_ChatView");
  let unreadindicator = document.getElementById("highlight-indicator");

  if (chatBox.style.display === "none") {
    unreadindicator.style.display = "block";
  } else {
    unreadindicator.style.display = "none";
  }

  if ($(".chat-ul").find(".chat-date-view:last p").text() != "Today")
    chatUl.append(`<li class="chat-date-view">
                    <div>
                      <p>Today</p>
                    </div>
                  </li>`);

  const istSendTime = new Date(Data.sendTime);
  const senderPic = !(Data.senderPic == null || Data.senderPic == "")
    ? `${fileUploadPath}${Data.senderPic}`
    : "modules/images/default_user.svg";

  bindRecieverChat(Data.sender, Data, senderPic, istSendTime);

  chatUl.scrollTop(chatUl.prop("scrollHeight"));

  DocImgClick();
}

async function bindChatHistory(Data) {
  let User_ID = JSON.parse(await getCookie()).userID;
  let chatDate = new Date(Data.chatHistory[0].sendTime).toLocaleDateString(
    "en-GB",
    { year: "numeric", month: "short", day: "numeric" }
  );
  chatUl.append(`<li class="chat-date-view">
                  <div>
                    <p>${chatDate}</p>
                  </div>
                </li>`);

  Data.chatHistory.forEach(async (chat) => {
    if (
      chatDate !=
      new Date(chat.sendTime).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    ) {
      chatDate = new Date(chat.sendTime).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      chatUl.append(`<li class="chat-date-view">
                      <div>
                        <p>${chatDate}</p>
                      </div>
                    </li>`);
    }

    const istSendTime = new Date(chat.sendTime);

    let senderPic = !(chat.sendUserPic == null || chat.sendUserPic == "")
      ? `${fileUploadPath}/${chat.sendUserPic}`
      : "modules/images/default_user.svg";


    if (chat.sendUserId == User_ID) {
      let bindSenderChatResp = await bindSenderChat(chat.files, chat.message, istSendTime, chat.groupId);
    } else {
      let bindRecieverChatResp = await bindRecieverChat(chat.sendUserName, chat, senderPic, istSendTime);
    }
  });

  if (
    $(".chat-ul").find(".chat-date-view:last p").text() ==
    new Date().toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  )
    $(".chat-ul").find(".chat-date-view:last p").text("Today");

  await DocImgClick();
}

function DocImgClick() {
  $(".document-download").off("click");

  $(".document-download").click(function () {
    debugger
    let a = document.createElement("a");
    a.href = fileUploadPath + $(this).prop("alt");
    a.download = $(this).siblings("p").text();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  $(".chat-attached-list").off("click");

  $(".chat-attached-list").click(function () {
    let imageUl = $(this).prop("id");
    let groupId = imageUl.slice(7, imageUl.length);
    bindChatImagesCarousel(chatImageDictionary[groupId]);
  });

  $(".attachemnt-download-btn-image-ul").off("click");
  $(".attachemnt-download-btn-image-ul").click(function () {
    let imageUl = $(this).siblings("ul").prop("id");
    let groupId = imageUl.slice(7, imageUl.length);
    chatImageDictionary[groupId].forEach((Image) => {
      let a = document.createElement("a");
      a.href = fileUploadPath + Image.file;
      a.download = Image.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  });
  mobileViewChatBodyHeight();
}
async function bindSenderChat(files, message, time, groupId) {
  let imageExtensions = [
    ".apng",
    ".gif",
    ".ico",
    ".cur",
    ".jpg",
    ".jpeg",
    ".jfif",
    ".pjpeg",
    ".pjp",
    ".png",
    ".svg",
    ".avif",
    ".webp",
    ".bmp",
  ];
  let documentArray = [];
  let imageCount = 0;
  chatImageDictionary[groupId] = [];

  let senderChat = `
    <li class="chat-sender">
    <!-- <img src="modules/images/receiver.png" alt="" /> -->
    <div class="chat-sender-message">
      ${files.length > 0
      ? `<ul class="chat-attached-list" id="images-${groupId}">
                  ${files
        .map((file) => {
          let extension = file.file.substring(
            file.file.lastIndexOf("."),
            file.file.length
          );
          if (imageExtensions.includes(extension)) {
            imageCount++;
            chatImageDictionary[groupId].push(file);
            // return `<li><img src="/uploads/${file.file}" alt="${file.name}" /></li>`;
            if (imageCount < 5)
              return `<li><picture>
                        <source srcset="${fileUploadPath}${file.file}" />
                        <img src="/modules/images/attachment.svg" alt="${file.name}" />
                      </picture></li>`;
            else return "";
          } else documentArray.push(file);
          return "";
        })
        .join("")}
                </ul>`
      : ""
    }
     ${message ? "<p>" + message + "</p>" : ""} 
      <p class="chat-message-time">${time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}</p>
    </div>
  </li>`;

  let senderDoc = `${documentArray.length > 0
    ? `${documentArray
      .map(
        (document) => `<li class="chat-sender" >
  <div class="chat-sender-message">
  <div class="attached-document-wrapper">
  <img src="./modules/images/attachment.svg" alt="${document.name}" />
  <p>${document.name}</p>
  <img class="document-download" src="./modules/images/download.svg" alt="${document.file
          }" />
  </div><p class="chat-message-time">${time.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}</p>
  </div></li>`
      )
      .join("")}`
    : ""
    }`;

  if (imageCount > 0 || message != "") chatUl.append(senderChat);
  chatUl.append(senderDoc);

  if (imageCount > 4)
    $(`#images-${groupId} li:last`).append(
      `<p class="attachment-count">+${imageCount - 4}</p>`
    );
}
function mobileViewChatBodyHeight() {
  let windowHeight = window.innerHeight;
  let chatViewHeaderHeight = $(".mobile-view-modal-header").innerHeight();
  let chatViewFooterHeight = $(".mobile-view-modal-footer").innerHeight();

  let chatViewBodyHeight =
    windowHeight - (chatViewHeaderHeight + chatViewFooterHeight);
  console.log({ chatViewBodyHeight });
  $(".mobile-view-chat-wrapper .chat-view-body").css(
    "height",
    `${chatViewBodyHeight}px`
  );
}
async function bindRecieverChat(sender, chat, senderPic, istSendTime) {
  let imageExtensions = [
    ".apng",
    ".gif",
    ".ico",
    ".cur",
    ".jpg",
    ".jpeg",
    ".jfif",
    ".pjpeg",
    ".pjp",
    ".png",
    ".svg",
    ".avif",
    ".webp",
    ".bmp",
  ];
  let documentArray = [];
  let imageCount = 0;
  chatImageDictionary[chat.groupId] = [];

  let recieverChat = `<li class="chat-receiver">
  <img src="${senderPic}" alt="" />
  <div>
  <h6>${sender}</h6>
  <div class="chat-receiver-message">
  ${chat.files.length > 0
      ? ` <div class="position-relative">
              <ul class="chat-attached-list" id="images-${chat.groupId}">
                ${chat.files
        .map((file) => {
          let extension = file.file.substring(
            file.file.lastIndexOf("."),
            file.file.length
          );
          if (imageExtensions.includes(extension)) {
            imageCount++;
            chatImageDictionary[chat.groupId].push(file);
            // return `<li><img src="/uploads/${file.file}" alt="${file.name}" /></li>`;
            if (imageCount < 5)
              return `<li><picture>
                            <source srcset="${fileUploadPath}${file.file}" />
                            <img src="/modules/images/attachment.svg" alt="${file.name}" />
                          </picture></li>`;
            else return "";
          } else documentArray.push(file);
          return "";
        })
        .join("")}
              </ul> 
              <button class="btn p-0 border-0 attachemnt-download-btn attachemnt-download-btn-image-ul">
                  <img  src="./modules/images/download.svg"/>
                </button>
          </div> `
      : ""
    }
  ${chat.message ? "<p>" + chat.message + "</p>" : ""} 
    <p class="chat-message-time">
      ${istSendTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}
    </p>
  </div>
  </div>
  </li>`;

  let recieverDoc = `${documentArray.length > 0
    ? `${documentArray
      .map(
        (document) => `<li class="chat-receiver" >
  <div class="chat-receiver-message">
  <div class="attached-document-wrapper">
  <img src="./modules/images/attachment.svg" alt="${document.name}" />
  <p>${document.name}</p>
  <img class="document-download" src="./modules/images/download.svg" alt="${document.file
          }" />
  </div><p class="chat-message-time">${istSendTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}</p>
  </div></li>`
      )
      .join("")}`
    : ""
    }`;

  if (imageCount > 0 || chat.message != "") chatUl.append(recieverChat);
  else
    recieverDoc =
      `<li class="chat-receiver" ><img src="${senderPic}" alt="" /><div class=" overflow-hidden" ><h6>${sender}</h6>` +
      recieverDoc.substring(27, recieverDoc.length) +
      `</div>`;
  chatUl.append(recieverDoc);

  if (imageCount > 4)
    $(`#images-${chat.groupId} li:last`).append(
      `<p class="attachment-count">+${imageCount - 4}</p>`
    );
}
function manageProducerButtonState(kind, closeUser) {
  if (kind == "audio") {
    $("#epic_AudioMute,#epic_AudioMute_Mob").addClass("active");
    if (IsAudioopen) CloseAudioProducer();
    else return;
    IsAudioopen = false;
  }
  if (kind == "video") {
    $("#epic_MuteVideoCam,#epic_MuteVideoCam_Mob").addClass("active");
    if (IsVideoOpen) {
      CloseVideoProducer();
      IsCameraOnArray.forEach((element, i) => {
        IsCameraOnArray[i] = false;
        $(`.camera-${i}`).removeClass("active");
      });
    } else return;
    IsVideoOpen = false;

    // if (roomObj.IsShareScreen)
    //   roomObj.closeProducer(RoomClient.mediaType.screen);
    // roomObj.IsShareScreen = false;
    // $("#epi_ShareScreenBtn").removeClass("active");
  }

  let message = kind == "audio" ? "muted you" : "turned off your video";
  let img = `<img src="modules/images/toastr_${kind === "audio" ? "audio" : "video"
    }.svg"/>`;
  var ulToastr = $(".participants-raise-hand-popup");
  ulToastr.append(`<li id="rpc-toastr-${kind}-${closeUser.replace(/\s/g, "")}" >
                    <div class="raise-hand-popup ">
                      <div class="d-flex align-items-center gap-2">
                        ${img}
                        <p> ${closeUser} ${message}</p>
                      </div>
                    </div> 
                  </li>`);
  ulToastr.addClass("active");

  setTimeout(() => {
    if (ulToastr.children().length == 1) ulToastr.removeClass("active");
    $(`#rpc-toastr-${kind}-${closeUser.replace(/\s/g, "")}`).remove();
  }, 5000);
}

function checkOverflow() {
  let indicatorsOverflow = $(".carousel-indicators");
  let carouselIndicatorOl = $(".carousel-indicators ol");
  const hasOverflowY =
    carouselIndicatorOl[0].scrollHeight > indicatorsOverflow[0].clientHeight;

  if (hasOverflowY) {
    indicatorsOverflow.addClass("carousel-indicator-overflow");
  } else {
    indicatorsOverflow.removeClass("carousel-indicator-overflow");
  }
}

let raiseHandFlag = false;
$("#epic_HandRaiseBtn").click(async function () {
  raiseHandFlag = !raiseHandFlag;
  var dataObj = {
    commandType: "RaiseHandCommand",
    Data: {
      RoomId: localStorage.getItem("RoomId"),
      user_id: JSON.parse(await getCookie()).userID,
      raisedHand: raiseHandFlag,
    },
  };
  await server.sendCommand(JSON.stringify(dataObj));
});

$(window).resize(function () {
  controlBuilder.resetMultipleVideoLayout();
});

async function raiseHand(user_id, user_name, status, profileImg) {
  const userDiv = $(`[data-username="video_${user_id}"]`);

  if (status) {
    userDiv.find(".audio-raise-hand").length > 0
      ? userDiv.find(".audio-raise-hand").removeClass("d-none")
      : userDiv.find(".video-raise-hand").removeClass("d-none");

    $(`#hand-raised${user_id}`).removeClass("d-none");
    $(`#rh-bubble-${user_id}`).find("img").show();

    //imgDiv.find(".hand-raised-icon").show();
    var ulToastr = $(".participants-raise-hand-popup");
    ulToastr.append(`<li id="rh-toastr-${user_id}" >
                      <div class="raise-hand-popup ">
                        <div class="d-flex align-items-center gap-2">
                          <img  src="modules/images/hand_raise_defult.svg"/>
                          <p> ${user_name} raised hand</p>
                        </div>
                      </div> 
                    </li>`);
    ulToastr.addClass("active");

    var ulBubble = $(".hand-raised-participants-list");

    var firstNumber = parseInt(user_id.match(/\d/)[0]);
    let backgroundColor = await getcolor(firstNumber);

    ulBubble.append(`
        <li id="rh-bubble-${user_id}">
            ${profileImg
        ? `<div class="rounded-circle d-flex justify-content-center align-items-center">
                    <img src="${fileUploadPath}/${profileImg}" style="width: 48px; height: 48px" class="rounded-circle d-flex mb-1 justify-content-center align-items-center" alt="" />
                </div>`
        : `<div class="rounded-circle d-flex justify-content-center align-items-center" style="width: 48px; height: 48px; background-color: ${backgroundColor}36;">
                    <h6 class="initials noselect" style="margin: 0; position: relative; color: ${backgroundColor};">
                        ${user_name
          .split(" ")
          .filter((word) => word !== "")
          .map((word) => word[0].toUpperCase())
          .slice(0, 2)
          .join("")}
                    </h6>
                </div>`
      }
            <img src="modules/images/hand_raised_icon.svg" class="hand-raised-icon" alt="" />
        </li>
    `);

    setTimeout(() => {
      if (ulToastr.children().length == 1) ulToastr.removeClass("active");
      $(`#rh-toastr-${user_id}`).remove();
    }, 5000);
  } else {
    $(`#hand-raised${user_id}`).addClass("d-none");
    $(`#rh-bubble-${user_id}`).find("img").show();
    if (userDiv.find(".audio-raise-hand").length > 0)
      userDiv.find(".audio-raise-hand").addClass("d-none");
    else userDiv.find(".video-raise-hand").addClass("d-none");

    $(`#rh-bubble-${user_id}`).remove();
  }
}

$("#remoteVideos .carousel-control-next").click(function () {
  if (
    $(".carousel-indicators-main-slider").find("li.active").next().length > 0
  ) {
    let oldActive = $(".carousel-indicators-main-slider").find("li.active");
    let newActive = $(".carousel-indicators-main-slider")
      .find("li.active")
      .next();
    oldActive.removeClass("active");
    newActive.addClass("active");
    oldActive.removeAttr("aria-current");
    newActive.attr("aria-current", "true");
  }
});

$("#remoteVideos .carousel-control-prev").click(function () {
  if (
    $(".carousel-indicators-main-slider").find("li.active").prev().length > 0
  ) {
    let oldActive = $(".carousel-indicators-main-slider").find("li.active");
    let newActive = $(".carousel-indicators-main-slider")
      .find("li.active")
      .prev();
    oldActive.removeClass("active");
    newActive.addClass("active");
    oldActive.removeAttr("aria-current");
    newActive.attr("aria-current", "true");
  }
});

// $(".chat-text-area").on("input", function () {
//   var inputValue = $(this).val();
//   if (inputValue.length > 0) {
//     $(".chat-view-footer .message-send-btn").show();
//   } else
//     $(".chat-view-footer .message-send-btn").hide();
// });

$(".chatAttachment").change(function () {
  $(".attachedFilesUl").empty();
  let closeBtnHtml = `<button class="btn border-0 p-0"><img src="modules/images/attachment_close.svg"/></button>`;

  let imageExtensions = [
    ".apng",
    ".gif",
    ".ico",
    ".cur",
    ".jpg",
    ".jpeg",
    ".jfif",
    ".pjpeg",
    ".pjp",
    ".png",
    ".svg",
    ".avif",
    ".webp",
    ".bmp",
  ];

  if (this.files && this.files.length > 0) {
    $.each(this.files, function (index, file) {
      let extension = file.name.substring(
        file.name.lastIndexOf("."),
        file.name.length
      );

      let objectUrl = URL.createObjectURL(file);
      let listItem = $("<li>")
        .append(
          $("<picture>")
            .append(
              $("<source>").attr({
                srcset: objectUrl,
                width: 100,
                height: 100,
                type: file.type,
              })
            )
            .append(
              $("<img>").attr({
                src: "./modules/images/attachment.svg",
                width: 100,
                height: 100,
                alt: file.name,
              })
            )
        )
        .append(closeBtnHtml)
        .append(
          !imageExtensions.includes(extension)
            ? `<p>${file.name.substring(0, 8) + "..." + extension}</p>`
            : ""
        );
      $(".attachedFilesUl").append(listItem);
      listItem.find("button").click(function () {
        URL.revokeObjectURL(objectUrl);
        listItem.remove();
      });
    });
  }
  mobileViewChatBodyHeight();
});

function setCarouselButtonState() {
  var currentItem = $(".carousel-indicators-main-slider").children(".active");

  if (currentItem.next().length > 0) {
    $("#remoteVideos .carousel-control-next").prop("disabled", false);
  } else {
    $("#remoteVideos .carousel-control-next").prop("disabled", true);
  }
  if (currentItem.prev().length > 0) {
    $("#remoteVideos .carousel-control-prev").prop("disabled", false);
  } else {
    $("#remoteVideos .carousel-control-prev").prop("disabled", true);
  }
}

$(
  "#remoteVideos .carousel-control-prev, #remoteVideos .carousel-control-next"
).click(function () {
  setCarouselButtonState();
});

function admitOrRejectGuest(user_id, resType) {
  const dataObj = {
    commandType: "GuestPermissionResponse",
    Data: {
      roomId: localStorage.getItem("RoomId"),
      userId: user_id,
      resType,
    },
  };
  server.sendCommand(JSON.stringify(dataObj));
}

async function BindGuestLobby(data) {
  if (JSON.parse(await getCookie()).email.includes("guest")) {
    return;
  }
  $(".guest-request-ul").empty();
  $("#guestListView").empty();
  if (data.GuestList && data.GuestList.length > 0) {
    $(".join-request-wrapper").removeClass("d-none");
    $("#guestListView").show();
    $("#guestListView").append('<h6 class="guest-heading">Guest</h6>');
    data.GuestList.forEach((Guest) => {
      let elem = `
                    <li>
                      <div class="guest-list-wrapper w-100 gap-3 justify-content-between">
                        <div class="guest-list-details-wrapper">
                          <div class="d-flex align-items-center gap-2">
                            <div class="participant-pic">
                              <img src="modules/images/single-avatar.png" alt="" />
                            </div>
                            <div class="guest-details">
                              <h6>${Guest.name}</h6>
                            </div>
                          </div>
                        </div>
                        <div class="guest-list-actions-wrapper">
                          <div class="guest-list-btns btn-active gap-2 flex-column flex-md-row">
                            <button class="btn guest-reject-btn" onclick="admitOrRejectGuest('${Guest.userID}','reject')">Reject</button>
                            <button class="btn guest-admit-btn" onclick="admitOrRejectGuest('${Guest.userID}','admit')">Admit</button>
                          </div>
                        </div>
                      </div>
                    </li>
      `;
      $(".guest-request-ul").append(elem);
      let element = `<li>
                      <div class="guest-list-wrapper">
                        <div class="guest-list-details-wrapper">
                          <div class="d-flex align-items-center">
                            <div class="participant-pic">
                              <img src="modules/images/single-avatar.png" alt="" />
                            </div>
                            <div class="guest-details">
                              <h6>${Guest.name}</h6>
                            </div>
                          </div>
                        </div>
                        <div class="guest-list-actions-wrapper">
                          <div class="guest-list-btns btn-active">
                            <button class="btn guest-reject-btn" onclick="admitOrRejectGuest('${Guest.userID}','reject')">Reject</button>
                            <button class="btn guest-admit-btn" onclick="admitOrRejectGuest('${Guest.userID}','admit')">Admit</button>
                          </div>
                        </div>
                      </div>
                    </li>`;
      $("#guestListView").append(element);
    });
    $("#guestListView").append('<hr class="guest-line">');
  } else {
    $(".join-request-wrapper").addClass("d-none");
    $("#guestListView").hide();
  }
}

function getGuestLobby() {
  const dataObj = {
    commandType: "GetGuestLobby",
    Data: {
      roomId: localStorage.getItem("RoomId"),
    },
  };
  server.sendCommand(JSON.stringify(dataObj));
}

async function getcolor(firstNumber) {
  const response = await fetch("./modules/palette.json");
  const colorArray = await response.json();
  return colorArray.colors[firstNumber];
}
let mediaRecorder = null;
let recordedChunks = [];
let endTime = null;
let startTime = null;
let finalStream = null;

// $(".record-btn").click(() => {
//   if (!$(".record-btn").hasClass("active")) {
//     const displayMediaOptions = {
//       preferCurrentTab: true,
//       audio: { echoCancellation: false },
//       video: { cursor: "never" },
//     };

//     navigator.mediaDevices
//       .getDisplayMedia(displayMediaOptions)
//       .then((stream) => {
//         $(".record-btn").toggleClass("active");
//         recordingActive = true;
//         desktopStream = stream;

//         if (IsAudioopen) {
//           let screenAudioStream = new MediaStream();
//           screenAudioStream.addTrack(desktopStream.getAudioTracks()[0]);

//           const audioContext = new AudioContext();
//           roomObj.audioContext = audioContext;
//           let screenAudio =
//             audioContext.createMediaStreamSource(screenAudioStream);
//           let micAudio = audioContext.createMediaStreamSource(audioStream);
//           destAudio = audioContext.createMediaStreamDestination();
//           screenAudio.connect(destAudio);
//           micAudio.connect(destAudio);

//           finalStream = new MediaStream();
//           finalStream.addTrack(desktopStream.getVideoTracks()[0]);
//           finalStream.addTrack(destAudio.stream.getAudioTracks()[0]);
//         } else {
//           finalStream = desktopStream;
//         }

//         startTime = Date.now();
//         const options = { mimeType: "video/webm; codecs=vp9,opus" };

//         mediaRecorder = new MediaRecorder(finalStream, options);

//         mediaRecorder.ondataavailable = handleDataAvailable;
//         mediaRecorder.start();

//         desktopStream.getVideoTracks()[0].onended = () => {
//           $(".record-btn").click();
//         };

//         function handleDataAvailable(event) {
//           if (event.data.size > 0) {
//             recordedChunks.push(event.data);
//             download()
//               .then(function (data) {
//                 recordingActive = false;
//                 mediaRecorder = null;
//                 recordedChunks = [];
//                 endTime = null;
//                 startTime = null;
//                 finalStream = null;
//               })
//               .catch(function (error) {
//                 console.error("Error downloading:", error);
//               });
//           }
//         }
//         function download() {
//           return new Promise(function (resolve, reject) {
//             const blob = new Blob(recordedChunks, {
//               type: "video/webm",
//             });
//             let duration = endTime - startTime;
//             ysFixWebmDuration(blob, duration, { logger: false })
//               .then(function (fixedBlob) {
//                 const url = URL.createObjectURL(fixedBlob);
//                 const a = document.createElement("a");
//                 document.body.appendChild(a);
//                 a.style = "display: none";
//                 a.href = url;
//                 a.download = `${$(
//                   "#callName"
//                 ).text()}_${formatDateToDDMMYYYYHHMMSS()}.webm`;
//                 a.click();
//                 window.URL.revokeObjectURL(url);
//                 resolve(true);
//               })
//               .catch(reject);
//           });
//         }
//       });

//     function setRecordTime() {
//       const currentTime = new Date();
//       const elapsedTime = currentTime - startTime;
//       if (currentTime >= startTime) {
//         const hours = Math.floor(elapsedTime / 3600000);
//         const minutes = Math.floor((elapsedTime % 3600000) / 60000);
//         const seconds = Math.floor((elapsedTime % 60000) / 1000);
//         $(".record-active").html(
//           `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes
//           }:${seconds > 9 ? seconds : "0" + seconds}`
//         );
//       }
//       requestAnimationFrame(() => setRecordTime());
//     }
//     setRecordTime();
//   } else {
//     $(".record-btn").toggleClass("active");
//     endTime = Date.now();
//     mediaRecorder.stop();

//     const tracks = desktopStream.getTracks();
//     tracks.forEach((track) => {
//       track.stop();
//     });

//     $(".record-active").html("00:00:00");
//   }
// });

let canvas;
let ctx;

// $(".record-btn").click(async () => {
//   if (!$(".record-btn").hasClass("active")) {
//     // Reset recording chunks array
//     recordedChunks = [];

//     // Create the canvas for capturing frames
//     canvas = document.createElement('canvas');
//     ctx = canvas.getContext('2d');

//     // Check if the operating system is macOS
//     const IS_MACOS = await window.electronAPI.getOperatingSystem() === 'darwin';

//     let audioStream;
//     try {
//       // Capture system audio or microphone audio (depending on your use case)
//       const audioConstraints = {
//         audio: true  // 'true' captures microphone/system audio
//       };

//       // Get audio stream (this could be the system audio or microphone)
//       audioStream = await navigator.mediaDevices.getUserMedia(audioConstraints);

//     } catch (err) {
//       console.error("Error capturing audio:", err);
//       alert("Failed to capture audio. Please ensure you have the necessary permissions.");
//       return;
//     }

//     // Capture canvas video stream
//     const canvasVideoStream = canvas.captureStream();

//     // Create a new MediaStream combining audio and canvas video
//     const combinedStream = new MediaStream([
//       canvasVideoStream.getVideoTracks()[0], // Add canvas video
//       ...audioStream.getAudioTracks()        // Add system/microphone audio
//     ]);

//     // Setup MediaRecorder for recording the combined video and audio streams
//     mediaRecorder = new MediaRecorder(combinedStream, {
//       mimeType: 'video/webm'
//     });

//     // Capture recorded video chunks
//     mediaRecorder.ondataavailable = event => {
//       if (event.data.size > 0) {
//         recordedChunks.push(event.data);
//       }
//     };

//     // When recording stops, download the file directly
//     mediaRecorder.onstop = () => {
//       const blob = new Blob(recordedChunks, { type: 'video/webm' });
//       const url = URL.createObjectURL(blob);

//       // Automatically download the video file
//       const a = document.createElement('a');
//       a.style.display = 'none';
//       a.href = url;
//       a.download = `${$("#callName").text()}_${formatDateToDDMMYYYYHHMMSS()}.webm`;
//       document.body.appendChild(a);
//       a.click(); // Trigger the download
//       window.URL.revokeObjectURL(url); // Clean up the URL
//     };

//     mediaRecorder.start(); // Start the recording

//     // Capture frames for the canvas
//     const captureFrames = async () => {
//       const base64Data = await window.electronAPI.captureElectronPage();
//       const img = new Image();
//       img.src = `data:image/png;base64,${base64Data}`;

//       img.onload = () => {
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx.drawImage(img, 0, 0);

//         if (mediaRecorder.state === 'recording') {
//           requestAnimationFrame(captureFrames); // Keep capturing frames
//         }
//       };
//     };

//     captureFrames(); // Begin capturing frames

//     $(".record-btn").toggleClass("active");

//     // Timer function for showing recording time
//     const startTime = new Date();
//     const setRecordTime = () => {
//       const currentTime = new Date();
//       const elapsedTime = currentTime - startTime;
//       const hours = Math.floor(elapsedTime / 3600000);
//       const minutes = Math.floor((elapsedTime % 3600000) / 60000);
//       const seconds = Math.floor((elapsedTime % 60000) / 1000);
//       $(".record-active").html(
//         `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`
//       );
//       if ($(".record-btn").hasClass("active")) {
//         requestAnimationFrame(setRecordTime);
//       }
//     };
//     setRecordTime();

//   } else {
//     // Stop the recording
//     $(".record-btn").toggleClass("active");
//     if (mediaRecorder && mediaRecorder.state === 'recording') {
//       mediaRecorder.stop(); // Trigger the onstop event for download
//     }

//     // Reset the recording timer display
//     $(".record-active").html("00:00:00");
//   }
// });

$(".record-btn").click(async () => {
  if (!$(".record-btn").hasClass("active")) {
    // Reset recording chunks array
    recordedChunks = [];

    // Create the canvas for capturing frames
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    // Capture microphone audio
    let micAudioStream;
    try {
      micAudioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      console.error("Error capturing microphone audio:", err);
      alert("Failed to capture microphone audio. Please ensure you have the necessary permissions.");
      return;
    }

    // Capture system audio (for the call audio)
    let desktopStream;
    try {
      const sources = await window.electronAPI.getSources();
      const source = sources.find(src => src.name === 'Entire screen'); // Adjust this based on your call window title
      const IS_MACOS = await window.electronAPI.getOperatingSystem() === 'darwin';
      const audio = !IS_MACOS
        ? {
          mandatory: {
            echoCancellation: true,
            chromeMediaSource: "desktop",
          }
        }
        : false;
      const constraints = {
        audio, // Set to true if you need audio
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: source.id // Use selectedOption as the screenId
          }
        }
      };
      desktopStream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (err) {
      console.error("Error capturing system audio:", err);
      alert("Failed to capture system audio.");
      return;
    }
    let systemAudioSource;
    const canvasVideoStream = canvas.captureStream();
    // Combine microphone and system audio using AudioContext
    const audioContext = new AudioContext();
    const micAudioSource = audioContext.createMediaStreamSource(micAudioStream);
    if (!IS_MACOS) {
      systemAudioSource = audioContext.createMediaStreamSource(desktopStream);
    }
    const destination = audioContext.createMediaStreamDestination();

    // Connect both streams to the destination
    micAudioSource.connect(destination);
    systemAudioSource.connect(destination);

    const finalStream = new MediaStream();
    finalStream.addTrack(canvasVideoStream.getVideoTracks()[0]); // Add canvas video
    finalStream.addTrack(destination.stream.getAudioTracks()[0]); // Add combined audio (mic + system audio)

    // Setup MediaRecorder to record the final stream
    mediaRecorder = new MediaRecorder(finalStream, {
      mimeType: 'video/webm'
    });

    mediaRecorder.ondataavailable = event => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };
    const captureFrames = async () => {
      const base64Data = await window.electronAPI.captureElectronPage();
      const img = new Image();
      img.src = `data:image/png;base64,${base64Data}`;

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        if (mediaRecorder.state === 'recording') {
          requestAnimationFrame(captureFrames); // Keep capturing frames
        }
      };
    };


    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${$("#callName").text()}_${formatDateToDDMMYYYYHHMMSS()}.webm`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    };

    mediaRecorder.start();
    captureFrames(); // Start capturing frames from the Electron page
    $(".record-btn").toggleClass("active");

    // Timer function for showing recording time
    const startTime = new Date();
    const setRecordTime = () => {
      const currentTime = new Date();
      const elapsedTime = currentTime - startTime;
      const hours = Math.floor(elapsedTime / 3600000);
      const minutes = Math.floor((elapsedTime % 3600000) / 60000);
      const seconds = Math.floor((elapsedTime % 60000) / 1000);
      $(".record-active").html(
        `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`
      );
      if ($(".record-btn").hasClass("active")) {
        requestAnimationFrame(setRecordTime);
      }
    };
    setRecordTime();

  } else {
    // Stop the recording
    $(".record-btn").toggleClass("active");
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }

    $(".record-active").html("00:00:00");
  }
});



function formatDateToDDMMYYYYHHMMSS() {
  // Convert milliseconds to a Date object
  const startDate = new Date(startTime);

  // Extract date components
  const day = ("0" + startDate.getDate()).slice(-2);
  const month = ("0" + (startDate.getMonth() + 1)).slice(-2);
  const year = startDate.getFullYear();

  // Extract time components
  const hours = ("0" + startDate.getHours()).slice(-2);
  const minutes = ("0" + startDate.getMinutes()).slice(-2);
  const seconds = ("0" + startDate.getSeconds()).slice(-2);

  // Create the formatted string
  const formattedDate = day + month + year + "_" + hours + minutes + seconds;

  return formattedDate;
}

function mobileAndTabletCheck() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

if (mobileAndTabletCheck()) {
  $(".mobile-menu").hide();
  $(".mobile-menu-btn").hide();
  $(".share-screen-btn").hide();
}

if (
  [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
  ].includes(navigator.platform) ||
  (navigator.userAgent.includes("Mac") && "ontouchend" in document)
) {
  $(".mobile-menu").hide();
  $(".mobile-menu-btn").hide();
  $(".share-screen-btn").hide();
}

function generateUUIDv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function bindChatImagesCarousel(files) {
  let imageCount = 0;
  files.forEach((file) => {
    $("#image-carousel .carousel-inner").append(
      `<div class="carousel-item ${imageCount > 0 ? "" : "active"}">
        <picture>
          <source srcset="${fileUploadPath}${file.file}" />
          <img src="/modules/images/attachment.svg" alt="${file.name}" />
        </picture>
      </div>`
    );

    $(".chat-carousel-wrapper ol").append(
      `<li data-bs-target="#image-carousel" data-bs-slide-to="${imageCount}" aria-label="Slide ${imageCount + 1
      }"
        class="${imageCount > 0 ? "" : "active"}" ${imageCount > 0 ? "" : 'aria-current="true"'
      }
       >
          <picture>
            <source srcset="${fileUploadPath}${file.file}" />
            <img src="/modules/images/attachment.svg" alt="${file.name}" />
          </picture>
        </li>`
    );
    imageCount++;
  });
  $(".chat-carousel-wrapper ol").on("click", "li", function () {
    $(".chat-carousel-wrapper ol li")
      .removeClass("active")
      .removeAttr("aria-current");
    $(this).addClass("active").attr("aria-current", "true");
  });
  $("#image-carousel").on("slid.bs.carousel", function (e) {
    const activeIndex = $(e.relatedTarget).index();
    $(".chat-carousel-wrapper ol li")
      .removeClass("active")
      .removeAttr("aria-current");
    $(".chat-carousel-wrapper ol li")
      .eq(activeIndex)
      .addClass("active")
      .attr("aria-current", "true");
  });

  // Event Listener for dynamically appended indicators
  $(".chat-carousel-wrapper ol").on("click", "li", function () {
    const slideTo = $(this).attr("data-bs-slide-to");
    $("#image-carousel").carousel(parseInt(slideTo, files.length));
  });

  $(".chat-carousel-wrapper").show();
  chatAttachementCarousel();
  $(".chat-view-wrapper").toggle("slide", { direction: "right" }, 1000);
}

function chatAttachementCarousel() {
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;
  let carouselIndicators = $(
    ".chat-carousel-wrapper .carousel-indicators ol"
  )[0];
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
}
$(".image-carousel-download").click(function () {
  let a = document.createElement("a");
  a.href =
    window.location.origin +
    $("#image-carousel .carousel-item.active picture source").prop("srcset");
  a.download = $("#image-carousel .carousel-item.active picture img").prop(
    "alt"
  );
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

$(".image-carousel-close").click(function () {
  $(".chat-carousel-wrapper").hide();
  if (window.innerWidth > 767) {
    $(".chat-view-wrapper").toggle("slide", { direction: "right" }, 1000);
  }
  $(".chat-carousel-wrapper ol").empty();
  $("#image-carousel .carousel-inner").empty();
});
