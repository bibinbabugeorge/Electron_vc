

const server = new window.conference('wss://vps271818.vps.ovh.ca:3024/');

let producer = null;
let roomObj = null;
consoleEvent = true;
let _roomId = null;
let _username = null;
let _device = null;
optionSelectedIndex = 0;
let videoDevices = [];
let audioDevices = [];
let UserDetailsSearchArray = null;
var PrevActiveMic = [];
var audioPause = false;
var videoPause = false;
var roomList;
// nameInput.value = 'user_' + Math.round(Math.random() * 1000);

let desktopStream = null;
let audioStream = null;
let destAudio = null;
let recordingActive = false;

let userPerSlide = 6;
let deviceScreenWidth = $(window).width();
if (deviceScreenWidth < 768) {
  userPerSlide = 2;
}

let volumeLevel = 100;
let callPopup = false;
let lastSlideRemoteTileCount = 0;
let callParticiapantsCount = 0;
let participantListUpdateFirst = true;

let MeetingInvitationNotification = true;
let newGroupNotification = true;
let missedCallNotification = true;

const callbackEvents = {
  RoomCreated: "RoomCreated",
  JoinedRoom: "JoinedRoom",
  RoomAlreadyExist: "RoomAlreadyExist",
  RtpCapabilitiesReceived: "RtpCapabilitiesReceived",
  DeviceLoaded: "DeviceLoaded",
  consumerClosed: "consumerClosed",
  newProducers: "newProducers",
  disconnect: "disconnect",
  RoomExited: "RoomExited",
  CreateWebRtcTransportSuccess: "CreateWebRtcTransportSuccess",
  ProducersReceived: "ProducersReceived",
  Transportconnected: "Transportconnected",
  produced: "produced",
  consumed: "consumed",
  producerClosed: "producerClosed",
  ParticipantListUpdate: "ParticipantListUpdate",
  consumerResumed: "consumerResumed",
  consumerPaused: "consumerPaused",
  SignUpSuccess: "SignUpSuccess",
  SignUpFailed: "SignUpFailed",
  ForgotPassword: "ForgotPassword",
  UserLoginSuccess: "UserLoginSuccess",
  UserLoginFailed: "UserLoginFailed",
  WebSocketConnected: "WebSocketConnected",
  UpdateUserClientIdSuccess: "UpdateUserClientIdSuccess",
  RequestToJoinSuccess: "RequestToJoinSuccess",
  RequestToJoinReject: "RequestToJoinReject",
  SearchParticipantsSuccess: "SearchParticipantsSuccess",
  audioLevelObserver: "audioLevelObserver",
  DashboardParticipantsListSuccess: "DashboardParticipantsListSuccess",
  RingtheGroupSuccess: "RingtheGroupSuccess",
  acknowledgeGroupStatusSuccess: "acknowledgeGroupStatusSuccess",
  acknowledgeUserStatusSuccess: "acknowledgeUserStatusSuccess",
  CreateGroupSuccess: "CreateGroupSuccess",
  AddNewParticipantAvatarCallback: "AddNewParticipantAvatarCallback",
  RequestToJoinRejectCallback: "RequestToJoinRejectCallback",
  Logout: "Logout",
  GetUserCallHistoryCallback: "GetUserCallHistoryCallback",
  producerPaused: "producerPaused",
  producerResumed: "producerResumed",
  producerStatusReturn: "producerStatusReturn",
  callDeleted: "callDeleted",
  ContactBlocked: "ContactBlocked",
  ContactUnblocked: "ContactUnblocked",
  EditGroupData: "EditGroupData",
  RecieveChatMessage: "RecieveChatMessage",
  chatHistoryReturn: "chatHistoryReturn",
  ProducerCloseRemoteSuccess: "ProducerCloseRemoteSuccess",
  RoomBannerUpdate: "RoomBannerUpdate",
  RaiseHandMessage: "RaiseHandMessage",
  GetGuestPermissionReturn: "GetGuestPermissionReturn",
  GuestPermissionResponseReturn: "GuestPermissionResponseReturn",
  ScreenSharedReturn: "ScreenSharedReturn",
  Pong: "Pong",
};

let currentURL = window.location.href;

server.connect().then((events) => {
  events.on(callbackEvents.WebSocketConnected, function (data) {
    ConsoleEvent(data.Event, data);
    updateUserClientId(data.Data.ClientId);

    if (currentURL.includes("create_group.html")) {
      SearchParticipants("");
    } else if (currentURL.includes("dashboard.html")) {
      localStorage.removeItem("RoomId");
    } else if (currentURL.includes("schedule_meeting.html")) {
      SearchParticipants("");
    } else if (currentURL.includes("edit_group.html")) {
      const url = new URL(window.location.href);
      var dataObj = {
        commandType: "EditGroup",
        Data: {
          room_id: url.searchParams.get("roomid"),
          userid: JSON.parse(getCookie()).userID,
        },
      };
      server.sendCommand(JSON.stringify(dataObj));
    }
  });

  events.on(callbackEvents.callDeleted, function (data) {
    DashboardParticipantsList("");
  });

  events.on(callbackEvents.ContactBlocked, function (data) {
    DashboardParticipantsList("");
  });

  events.on(callbackEvents.ContactUnblocked, function (data) {
    DashboardParticipantsList("");
  });

  events.on(callbackEvents.UpdateUserClientIdSuccess, function (data) {
    ConsoleEvent(data.Event, data);
    const UserDetails = JSON.stringify(data.Data.UserDetails);
    setCookie(UserDetails, 1);
    initRoom();
    if (currentURL.includes("dashboard.html")) {
      DashboardParticipantsList("");
    }
    if (currentURL.includes("guest_lobby.html"))
      GuestRequest();
  });
  events.on(callbackEvents.CreateGroupSuccess, function (data) {
    location.href = "./dashboard.html";
  });

  events.on(callbackEvents.UpdateUserClientIdFailed, function (data) {
    Logout();
  });

  events.on(callbackEvents.acknowledgeGroupStatusSuccess, function (data) {
    if (!window.location.href.includes("confieranceroom")) {
      setTimeout(() => {
        DashboardParticipantsList("");
        if (newGroupNotification && data.Data.groupName)
          DesktopNotification(
            `Added you to a new group: ${data.Data.groupName}`
          );
      }, 2000);
    }
  });

  events.on(callbackEvents.acknowledgeUserStatusSuccess, function (data) {
    if (!window.location.href.includes("confieranceroom")) {
      setTimeout(() => {
        DashboardParticipantsList("");
      }, 6000);
    }
  });

  events.on(callbackEvents.RequestToJoinSuccess, function (data) {
    if (!window.location.href.includes("confieranceroom")) {
      $("#lbl_call").text(data.Data.UserDetails.name);
      if (data.Data.UserDetails.profilePic != null) {
        $("#CallerImg").attr(
          "src",
          "uploads/" + data.Data.UserDetails.profilePic
        );
      }
      localStorage.setItem("RoomId", data.Data.RoomId);
      $("#incoming-popup").show();
      // $('#exampleModal').modal('show');
      playringTone(true, data.Data.UserDetails.name);
    }
  });

  events.on(callbackEvents.RequestToJoinReject, function (data) { });

  events.on(callbackEvents.RoomCreated, function (data) {
    JoinRoom(data.Event, data);
  });

  events.on(callbackEvents.RoomAlreadyExist, function (data) {
    JoinRoom(data.Event, data);
  });

  events.on(callbackEvents.JoinedRoom, async function (data) {
    ping();
    setInterval(ping, 60000);
    const istStartTime = new Date(data.Data.startTime);
    if (data.Data.RoomName == "" || data.Data.RoomName == undefined || data.Data.RoomName == null)
      $("#callName,#callNameMob").html("Ongoing Call");
    else
      $("#callName,#callNameMob").html(data.Data.RoomName);

    if (data.Data.groupIcon != "" && data.Data.groupIcon != undefined && data.Data.groupIcon != null)
      $(".group-participant-list img, .mobile-group-participant-list img").prop("src", `${window.location.origin}/uploads/${data.Data.groupIcon}`);

    setElapsedTime(istStartTime);
    ReadRouterRtpCapabilities(data.Event, data);
    RingtheGroup(_roomId);

    var dataObj = {
      commandType: "GetChatHistory",
      Data: {
        RoomId: localStorage.getItem("RoomId"),
      },
    };
    await server.sendCommand(JSON.stringify(dataObj));

    getGuestLobby();
    $(".minimise-video-controls-btn").click();

    if (data.Data.screenSharingUser) {
      setTimeout(() => {
        fullScreenFunc(data.Data.screenSharingUser)
      }, 2000);
    }

    // mobile view drawer js
    var isDragging = false;
    var startY;
    var currentY;
    var drawerHeight = $(".drawer-content").outerHeight();
    console.log({ drawerHeight });
    var drawer = $("#drawer");
    var translateY = 0; // Initial translateY value

    $(".drawer-header .drag-btn").on("mousedown touchstart", function (e) {
      isDragging = true;
      startY = e.type === "mousedown" ? e.clientY : e.touches[0].clientY;
      currentY = startY;

      // Change cursor to grabbing during drag
      $(this).css("cursor", "grabbing");

      // Prevent default drag behavior
      e.preventDefault();
    });

    $(document)
      .on("mousemove touchmove", function (e) {
        if (isDragging) {
          var pageY = e.type === "mousemove" ? e.clientY : e.touches[0].clientY;
          var dy = pageY - currentY;
          translateY += dy;
          currentY = pageY;

          // Ensure translateY does not go beyond drawer height
          translateY = Math.max(translateY, 0);
          translateY = Math.min(translateY, drawerHeight);

          // Apply the transform with the positive translateY value
          drawer.css("transform", "translateY(" + translateY + "px)");
        }
      })
      .on("mouseup touchend", function () {
        if (isDragging) {
          isDragging = false;
          $(".drawer-header .drag-btn").css("cursor", "grab");

          // Snap open or closed based on the drag distance
          if (translateY > drawerHeight / 2) {
            // If dragged down more than half of the drawer height, close it
            drawer.css("transform", "translateY(" + drawerHeight + "px)");
            translateY = drawerHeight; // Set translateY to match the drawer height (closed state)
          } else {
            // If dragged less than half of the drawer height, open it
            drawer.css("transform", "translateY(0px)");
            translateY = 0; // Reset translateY for the open state
          }
        }
      });
    // mobile view drawer js end

  });

  events.on(callbackEvents.Pong, function (data) {
    pong(data.Data.pingTime);
  });

  events.on(callbackEvents.SearchParticipantsSuccess, function (data) {
    var _userid = getCookieDetails("userID");
    var index = data.Data.UserList.findIndex((o) => o.userid === _userid);
    if (index > -1) {
      data.Data.UserList.splice(index, 1);
    }
    if (window.location.href.includes("create_group.html"))
      CreateGroupInit(data.Data.UserList);
    else if (window.location.href.includes("edit_group.html"))
      EditGroupInit(data.Data.UserList);
    else if (window.location.href.includes("schedule_meeting.html"))
      CreateGroupInit(data.Data.UserList);
    else controlBuilder.SearchParticipantListItem(data.Data.UserList);
    UserDetailsSearchArray = data.Data.UserList;
  });

  events.on(callbackEvents.RtpCapabilitiesReceived, function (data) {
    LoadDevice(data.Event, data);
  });

  events.on(callbackEvents.DeviceLoaded, function (data) {
    InitWebrtcTransport(data.Event, data);
  });

  events.on(callbackEvents.Devices, function (data) {
    ConnectedDevices(data.Event, data);
  });

  events.on(callbackEvents.consumerClosed, function (data) {
    roomObj.consumerClosed(data.consumer_id, data.producer_id);
  });

  events.on(callbackEvents.newProducers, function (data) {
    ConsoleEvent(data.Event, data);
    // roomObj.newProducers(data.Data.producer);
    roomObj.newProducers(data.Data);
  });

  events.on(callbackEvents.disconnect, function (data) {
    roomObj.disconnect();
  });

  events.on(callbackEvents.RoomExited, function (data) {
    ExitRoom(data.Event, data);
    if (JSON.parse(getCookie()).email.includes("guest")) Logout();
    let url = localStorage.getItem("ReturnURL");
    if (url == null) location.href = "./dashboard.html";
    else location.href = "/Join.html";
  });

  events.on(callbackEvents.CreateWebRtcTransportSuccess, function (data) {
    CreateWebrtcTransport(data.Event, data);
  });

  events.on(callbackEvents.ProducersReceived, function (data) {
    getProducers(data.Event, data);

    // setTimeout(function () {
    //   data.Data.audioPaused.forEach((audioPausedUserId) => {
    //     var audioButton = document.getElementById(`audio_${audioPausedUserId}`);
    //     if (audioButton) {
    //       $(audioButton).addClass("Active");
    //       audioButton.disabled = true;
    //     }
    //     var audioButton = document.getElementById(
    //       `audio_List${audioPausedUserId}`
    //     );
    //     if (audioButton) {
    //       $(audioButton).addClass("Active");
    //       audioButton.disabled = true;
    //     }
    //   });

    //   data.Data.videoPaused.forEach((videoPausedUserId) => {
    //     var videoButton = document.getElementById(`video_${videoPausedUserId}`);
    //     if (videoButton) {
    //       $(videoButton).addClass("Active");
    //       videoButton.disabled = true;
    //     }

    //     var videoButton = document.getElementById(
    //       `video_List${videoPausedUserId}`
    //     );
    //     if (videoButton) {
    //       $(videoButton).addClass("Active");
    //       videoButton.disabled = true;
    //     }
    //   });
    // }, 5000);
  });

  events.on(callbackEvents.producerStatusReturn, function (data) {
    // setTimeout(function () {
    //   data.Data.audioPaused.forEach((audioPausedUserId) => {
    //     var audioButton = document.getElementById(`audio_${audioPausedUserId}`);
    //     if (audioButton) {
    //       $(audioButton).addClass("Active");
    //       audioButton.disabled = true;
    //     }
    //     var audioButton = document.getElementById(
    //       `audio_List${audioPausedUserId}`
    //     );
    //     if (audioButton) {
    //       $(audioButton).addClass("Active");
    //       audioButton.disabled = true;
    //     }
    //   });
    //   data.Data.videoPaused.forEach((videoPausedUserId) => {
    //     var videoButton = document.getElementById(`video_${videoPausedUserId}`);
    //     if (videoButton) {
    //       $(videoButton).addClass("Active");
    //       videoButton.disabled = true;
    //     }
    //     var videoButton = document.getElementById(
    //       `video_List${videoPausedUserId}`
    //     );
    //     if (videoButton) {
    //       $(videoButton).addClass("Active");
    //       videoButton.disabled = true;
    //     }
    //   });
    // }, 1);
  });

  events.on(callbackEvents.Transportconnected, function (data) {
    Transportconnected(data.Event, data);
  });

  events.on(callbackEvents.produced, function (data) {
    produced(data.Event, data);
  });

  events.on(callbackEvents.consumed, function (data) {
    ConsoleEvent(data.Event, data);
    roomObj.getConsumeStreamReturn(data.Data.params);
  });

  events.on(callbackEvents.producerClosed, function (data) {
    ConsoleEvent(data.Event, data);
    roomObj.producerClosedReturn(
      data.Data.ProducerId,
      data.Data.type,
      data.Data.deviceId
    );
  });

  events.on(callbackEvents.producerPaused, function (data) {
    if (data.Data.kind == "audio") {
      var audioButton = document.getElementById(
        `audio_${data.Data.producerUserId}`
      );
      if (audioButton) {
        $(audioButton).addClass("Active");
        audioButton.disabled = true;
      }
      var audioButton = document.getElementById(
        `audio_List${data.Data.producerUserId}`
      );
      if (audioButton) {
        $(audioButton).addClass("Active");
        audioButton.disabled = true;
      }
      var UserDetail = JSON.parse(getCookie());
      if (data.Data.producerUserId == UserDetail.userID) {
        var audioButton = document.getElementById(
          `audio_Master${data.Data.producerUserId}`
        );
        $(audioButton).addClass("Active");
        audioPause = true;
      }
    } else if (data.Data.kind == "video") {
      var videoButton = document.getElementById(
        `video_${data.Data.producerUserId}`
      );
      if (videoButton) {
        $(videoButton).addClass("Active");
        videoButton.disabled = true;
      }

      var videoButton = document.getElementById(
        `video_List${data.Data.producerUserId}`
      );
      if (videoButton) {
        $(videoButton).addClass("Active");
        videoButton.disabled = true;
      }

      var UserDetail = JSON.parse(getCookie());
      if (data.Data.producerUserId == UserDetail.userID) {
        var videoButton = document.getElementById(
          `video_Master${data.Data.producerUserId}`
        );
        $(videoButton).addClass("Active");
        videoPause = true;
      }
    }
  });
  events.on(callbackEvents.producerResumed, function (data) {
    if (data.Data.kind == "audio") {
      var audioButton = document.getElementById(
        `audio_${data.Data.producerUserId}`
      );
      if (audioButton) {
        $(audioButton).removeClass("Active");
        audioButton.disabled = false;
      }
      var audioButton = document.getElementById(
        `audio_List${data.Data.producerUserId}`
      );
      if (audioButton) {
        $(audioButton).removeClass("Active");
        audioButton.disabled = false;
      }
      var UserDetail = JSON.parse(getCookie());
      if (data.Data.producerUserId == UserDetail.userID) {
        var audioButton = document.getElementById(
          `audio_Master${data.Data.producerUserId}`
        );
        $(audioButton).removeClass("Active");
        audioPause = false;
      }
    } else if (data.Data.kind == "video") {
      var videoButton = document.getElementById(
        `video_${data.Data.producerUserId}`
      );
      if (videoButton) {
        $(videoButton).removeClass("Active");
        videoButton.disabled = false;
      }

      var videoButton = document.getElementById(
        `video_List${data.Data.producerUserId}`
      );
      if (videoButton) {
        $(videoButton).removeClass("Active");
        videoButton.disabled = false;
      }

      var UserDetail = JSON.parse(getCookie());
      if (data.Data.producerUserId == UserDetail.userID) {
        var videoButton = document.getElementById(
          `video_Master${data.Data.producerUserId}`
        );
        $(videoButton).removeClass("Active");
        videoPause = false;
      }
    }
  });

  events.on(callbackEvents.ParticipantListUpdate, async function (data) {
    ConsoleEvent(data.Event, data.Data);
    navigator.locks.request("updateparLock", async (lock) => {
      // The lock has been acquired.
      await updatepar(data.Data.Userlist);
      // Now the lock will be released.
    });
    roomObj.setroomDetailsObj(data.Data);
    roomObj.updateRoom(data.Data.Data);

    setTimeout(() => {
      data.Data.Data.forEach((MSuser) => {
        data.Data.Userlist.forEach((DBuser) => {
          if (DBuser.clientid == MSuser.user_id) {
            if (MSuser.audioStatus == 0) {
              var audioStatusElement = document.getElementById(
                `audiostatus_${DBuser.userid}`
              );
              if (
                audioStatusElement &&
                audioStatusElement.childElementCount == 0
              ) {
                let mutedImageTag = document.createElement("img");
                mutedImageTag.src = "modules/images/remote_mic_muted.svg";
                audioStatusElement.appendChild(mutedImageTag);
              }
              $(`#audio_List${DBuser.userid}`).addClass("active");
              $(`#audio_List${DBuser.userid}`).disabled = true;
              $(`#audio_List${DBuser.userid}Mob`).addClass("active");
              $(`#audio_List${DBuser.userid}Mob`).disabled = true;
              $(`.participant-list-mic-btns.active img.img-active`).css("cursor", "not-allowed");
              $(`#audio_${DBuser.userid}`).addClass("active");
              $(`#audio_${DBuser.userid}`).disabled = true;
              $(`.participant-mute-audio-btn.active img.img-active`).css("cursor", "not-allowed");
            } else {
              var audioStatusElement = document.getElementById(
                `audiostatus_${DBuser.userid}`
              );
              if (audioStatusElement) {
                while (audioStatusElement.firstChild) {
                  audioStatusElement.removeChild(audioStatusElement.firstChild);
                }
              }
              $(`#audio_List${DBuser.userid}`).removeClass("active");
              $(`#audio_List${DBuser.userid}`).disabled = false;
              $(`#audio_List${DBuser.userid}Mob`).removeClass("active");
              $(`#audio_List${DBuser.userid}Mob`).disabled = false;
              $(`#audio_${DBuser.userid}`).removeClass("active");
              $(`#audio_${DBuser.userid}`).disabled = false;
            }
            if (MSuser.videoStatus == 0) {
              $(`#video_List${DBuser.userid}`).addClass("active");
              $(`#video_List${DBuser.userid}`).disabled = true;
              $(`#video_List${DBuser.userid}Mob`).addClass("active");
              $(`#video_List${DBuser.userid}Mob`).disabled = true;
              $(`.participant-list-video-btns.active img.img-active `).css("cursor", "not-allowed");
              $(`#video_${DBuser.userid}`).addClass("active");
              $(`#video_${DBuser.userid}`).disabled = true;
              $(`.participant-mute-camera-btn.active img.img-active`).css("cursor", "not-allowed");
            } else {
              $(`#video_List${DBuser.userid}`).removeClass("active");
              $(`#video_List${DBuser.userid}`).disabled = false;
              $(`#video_List${DBuser.userid}Mob`).removeClass("active");
              $(`#video_List${DBuser.userid}Mob`).disabled = false;
              $(`#video_${DBuser.userid}`).removeClass("active");
              $(`#video_${DBuser.userid}`).disabled = false;
            }
            return;
          }
        });
      });

      if ((JSON.parse(getCookie()).email.includes("guest"))) {
        $(`.participant-list-mic-btns,.participant-list-video-btns`).hide();
        $(`.participant-mute-camera-btn,.participant-mute-audio-btn`).hide();
      }
      if (deviceScreenWidth < 768)
        $(`.participant-expand-view-btn`).hide();
    }, 1000);
  });
  events.on(callbackEvents.consumerPaused, function (data) {
    ConsoleEvent(data.Event, data);
  });
  events.on(callbackEvents.consumerResumed, function (data) {
    ConsoleEvent(data.Event, data);
  });

  events.on(callbackEvents.AddNewParticipantAvatarCallback, function (data) {
    console.log(data.Data);
    ConsoleEvent(data.Event, data);
  });

  events.on(callbackEvents.RoomBannerUpdate, function (data) {
    ConsoleEvent(data.Event, data);
    if (data.Data.RoomType == "personal") {
      $("#callName,#callNameMob").html(
        JSON.parse(getCookie()).name == RoomName[0].name
          ? RoomName[1].name
          : RoomName[0].name
      );
    } else {
      $("#callName,#callNameMob").html(data.Data.RoomName);
    }
  });

  events.on(callbackEvents.RequestToJoinRejectCallback, function (data) {
    setTimeout(function () {
      controlBuilder.removeRejectedPersonAvatar(data.Data.data.userID);
    }, 500);
    ConsoleEvent(data.Event, data);
  });

  // user login failed event hitting
  events.on(callbackEvents.UserLoginFailed, function (data) {
    showToastr(data.Data.Message, "toastr-error");
    setTimeout(function () {
      $("#toastrDiv").fadeOut("slow", function () {
        $("#toastrDiv").remove();
      });
    }, 3000);
  });
  // user sign up success event hitting
  events.on(callbackEvents.SignUpSuccess, function (data) {
    showToastr(data.Data.Message, "toastr-success");
    setTimeout(function () {
      $("#toastrDiv").fadeOut("slow", function () {
        $("#toastrDiv").remove();
      });
      location.href = "/index.html";
    }, 3000);
  });

  // user sign up fail event hitting
  events.on(callbackEvents.SignUpFailed, function (data) {
    showToastr(data.Data.Message, "toastr-error");
    setTimeout(function () {
      $("#toastrDiv").fadeOut("slow", function () {
        $("#toastrDiv").remove();
      });
    }, 3000);
  });

  events.on(callbackEvents.ForgotPassword, function (data) {
    location.href = "/forgot-password.html";
  });
  events.on(callbackEvents.Logout, function (data) {
    Logout();
  });

  // user login success event hitting
  events.on(callbackEvents.UserLoginSuccess, function (data) {
    $("#loginButton").prop("disabled", true);
    const UserDetails = JSON.stringify(data.Data.UserDetails);
    setCookie(UserDetails, 1);
    showToastr(data.Data.Message, "toastr-success");
    setTimeout(function () {
      $("#toastrDiv").fadeOut("slow", function () {
        $("#toastrDiv").remove();
      });
      location.href = "./dashboard.html";
    }, 3000);

    acknowledgeUserStatus();
  });

  events.on(callbackEvents.audioLevelObserver, function (data) {
    if (data.Data === "silence") {
      PrevActiveMic = [];
      $(".active-voice").find().removeClass("active-voice");
    } else {
      var MicActiveRemove = PrevActiveMic.filter(
        (element) => !data.Data.includes(element)
      );
      const MicActiveAdd = data.Data.filter(
        (element) => !PrevActiveMic.includes(element)
      );

      MicActiveAdd.forEach((producerId) => {
        var UserDiv = document.querySelector(
          `[data-username="video_${roomObj.getProducersdetails(producerId).user_id
          }"]`
        );
        if (UserDiv) {
          $(UserDiv).addClass("active-voice");
          $(
            `#fsli_${roomObj.getProducersdetails(producerId).user_id}`
          ).addClass("active-voice");
        }
        PrevActiveMic.push(producerId);
      });

      MicActiveRemove.forEach((producerId) => {
        var UserDiv = document.querySelector(
          `[data-username="video_${roomObj.getProducersdetails(producerId).user_id
          }"]`
        );
        if (UserDiv) {
          $(UserDiv).removeClass("active-voice");
          $(
            `#fsli_${roomObj.getProducersdetails(producerId).user_id}`
          ).removeClass("active-voice");
        }
      });
    }
  });

  events.on(callbackEvents.DashboardParticipantsListSuccess, function (data) {
    // Assign data.Data.RoomList to the global variable
    roomList = data.Data.RoomList;

    if (window.location.href.includes("dashboard.html"))
      dashboardInit(data.Data.RoomList);

    var dataObj = {
      commandType: "GetUserCallHistory",
      Data: { UserId: getuserid() },
    };
    server.sendCommand(JSON.stringify(dataObj));
  });

  events.on(callbackEvents.GetUserCallHistoryCallback, function (data) {
    if (window.location.href.includes("dashboard.html")) {
      BindCallHistory(data.Data.joinedCalls);
      BindNotifications(data.Data.missedCalls, roomList);
      BindBlockedUsers(data.Data.blockedContacts);
    }
  });

  events.on(callbackEvents.RingtheGroupSuccess, function (data) {
    if (!window.location.href.includes("confieranceroom")) {
      $("#lbl_call").text(data.Data.UserDetails.name);
      if (data.Data.UserDetails.profilePic != null) {
        $("#CallerImg").attr(
          "src",
          "uploads/" + data.Data.UserDetails.profilePic
        );
      }
      localStorage.setItem("RoomId", data.Data.RoomId);
      $("#incoming-popup").show();
      playringTone(true, data.Data.UserDetails.name);
      DashboardParticipantsList("");
    }
  });

  events.on(callbackEvents.EditGroupData, function (data) {
    bindGroupData(data.Data.RoomDetails);
  });

  events.on(callbackEvents.RecieveChatMessage, function (data) {
    bindChat(data.Data);
  });

  events.on(callbackEvents.chatHistoryReturn, function (data) {
    bindChatHistory(data.Data);
  });

  events.on(callbackEvents.ProducerCloseRemoteSuccess, function (data) {
    manageProducerButtonState(data.Data.Kind, data.Data.closeUser);
  });

  events.on(callbackEvents.RaiseHandMessage, function (data) {
    raiseHand(
      data.Data.senderUserId,
      data.Data.senderUserName,
      data.Data.raisedHandStatus,
      data.Data.raisedHandPic
    );
  });

  events.on(callbackEvents.GetGuestPermissionReturn, function (data) {
    BindGuestLobby(data.Data);
  });

  events.on(callbackEvents.GuestPermissionResponseReturn, function (data) {
    GuestRequestResponse(data.Data);
  });

  events.on(callbackEvents.ScreenSharedReturn, function (data) {
    NewScreenShared(data.Data);
  });

});

function GuestRequestResponse(data) {
  if (data.resType == "admit") {
    location.href = "/confieranceroom.html";
  } else {
    localStorage.removeItem("RoomId");
    $(".guest-h1").text("Sorry!");
    $(".guest-h5").text("You have been denied entry to this meeting.");
    $(".guest-p").text("");
  }
}

function RequestToJoin(clientid, userid) {
  $(".participants-list-container").hide(700);
  $(".mobile-menu-view-content").hide("slide", { direction: "down" }, 1000);
  $(".add-participants-list-container").toggle(
    "slide",
    { direction: "right" },
    1000
  );
  $(".black-drop").hide();
  var participant = [];
  participant[0] = getUserNameFromClientId(userid);
  participant[0].name = participant[0].username;
  console.log(participant, "participant");
  controlBuilder.CreateAvatar(participant, true);

  var UserDetail = getCookie();
  UserDetail = UserDetail != undefined ? JSON.parse(UserDetail) : null;
  var dataObj = {
    commandType: "RequestToJoin",
    Data: {
      RequestClientId: clientid,
      RequestUserId: userid,
      RoomId: _roomId,
      UserDetail: UserDetail,
    },
  };
  server.sendCommand(JSON.stringify(dataObj));

  var dataObj = {
    commandType: "AddNewParticipantAvatar",
    Data: {
      RequestUserId: userid,
      RoomId: _roomId,
      UserId: JSON.parse(getCookie()).userID,
    },
  };
  // server.sendCommand(JSON.stringify(dataObj));
  // calling avatar for all participants
}

function RingtheGroup(_roomId) {
  var UserDetails = getCookie();
  if (UserDetails != undefined) {
    UserDetails = JSON.parse(UserDetails);
  }
  var data = { RoomId: _roomId, UserDetails: UserDetails };
  var dataObj = { commandType: "RingtheGroup", Data: data };
  server.sendCommand(JSON.stringify(dataObj));
}

function AutoLogin() {
  var UserDetails = getCookie();
  if (UserDetails != undefined) {
    location.href = "./dashboard.html";
  }
}

function updateUserClientId(newClientId) {
  var dataObj = {
    commandType: "UpdateUserClientId",
    Data: { UserId: getuserid(), NewClientId: newClientId },
  };
  if (dataObj.Data.UserId != null) {
    server.sendCommand(JSON.stringify(dataObj));
  } else {
    DeleteCookie();
  }
}

function playringTone(ring, name = null) {
  var audio = document.getElementById("ringtone");
  // audio.muted = false;
  if (ring) {
    callPopup = true;
    if (audio) audio.play();
    setTimeout(function () {
      playringTone(false);
      $("#incoming-popup").hide();

      if (callPopup && missedCallNotification) {
        DesktopNotification(`Missed a call from ${name}`);
      }
    }, 20000);
    if (MeetingInvitationNotification)
      DesktopNotification(`Incoming call from ${name}`);
  } else {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }
}

function DesktopNotification(body) {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
  } else if (Notification.permission === "granted") {
    const notification = new Notification("Apps Connect", {
      body: body,
      icon: "https://epic.appsteamtechnologies.com/web_custom/static/src/img/favicon.ico",
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification("Apps Connect", {
          body: body,
          icon: "https://epic.appsteamtechnologies.com/web_custom/static/src/img/favicon.ico",
        });
      }
    });
  }
}

function Logout() {
  acknowledgeUserStatus();
  DeleteCookie();
  location.href = "/index.html";
}

function acknowledgeUserStatus() {
  var userId = getuserid();
  var data = { UserId: userId };
  var dataObj = { commandType: "AcknowledgeUserStatus", Data: data };
  server.sendCommand(JSON.stringify(dataObj));
}

function setCookie(UserDetail, expDays) {
  sessionStorage.setItem('user_details=', UserDetail);
}

function DeleteCookie() {
  document.cookie =
    "user_details=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

function getclientid() {
  var UserDetails = getCookie();
  if (UserDetails != undefined) {
    UserDetails = JSON.parse(UserDetails);
    return UserDetails.clientID;
  } else {
    return null;
  }
}

function getuserid() {
  var UserDetails = getCookie();
  if (UserDetails != undefined) {
    UserDetails = JSON.parse(UserDetails);
    return UserDetails.userID;
  } else {
    return null;
  }
}

function getCookieDetails(key) {
  var UserDetails = getCookie();
  if (UserDetails != undefined) {
    UserDetails = JSON.parse(UserDetails);
    return UserDetails[key];
  } else {
    return null;
  }
}

function getCookie() {
  const UserDetails = sessionStorage.getItem('user_details=');
  return UserDetails;
}

function initRoom() {
  if (window.location.href.includes("confieranceroom")) {
    if (roomObj && roomObj.isOpen()) {
      console.log("Already connected to a room");
    } else {
      var RequestedRoomid = localStorage.getItem("RoomId");

      if (RequestedRoomid != undefined || RequestedRoomid != null) {
        // _roomId = parseInt(RequestedRoomid);
        _roomId = RequestedRoomid;
        //localStorage.removeItem("RoomId");
      } else {
        // _roomId = parseInt(
        //   Math.floor(Math.random() * 100000000000000000 + 100000000000)
        // );
        _roomId = makeUniqueRoom();
        localStorage.setItem("RoomId", _roomId);
      }
      console.log(_roomId);
      var UserDetails = getCookie();
      if (UserDetails != undefined) {
        UserDetails = JSON.parse(UserDetails);
        _username = UserDetails.name;
        initEnumerateDevices().then((device) => {
          roomObj = new RoomClient(
            localMedia,
            remoteVideos,
            remoteAudios,
            window.mediasoupClient,
            server,
            _roomId,
            _username,
            null
          );
          roomObj.createRoom(_roomId);
          addListeners();
        })
      }
    }
  }
}

async function OpenVideoProducer() {
  var userDetails = JSON.parse(getCookie());
  roomObj.produce(RoomClient.mediaType.video, videoSelect.value);

  // if (videoPause) {
  //   videoPause = !videoPause;
  //   var dataObj = {
  //     commandType: "controlProducer",
  //     Data: {
  //       RoomId: localStorage.getItem("RoomId"),
  //       user_id: userDetails.userID,
  //       clientid: userDetails.clientID,
  //       kind: "video",
  //       pauseStatus: false,
  //     },
  //   };
  //   await server.sendCommand(JSON.stringify(dataObj));
  // }
}

function CloseVideoProducer() {
  roomObj.closeAllProducer(RoomClient.mediaType.video, (deviceId = null));
  // $("#localMedia").children().each(function () {
  //   if ($(this).find("video").length > 0) {
  //     $(this).click();
  //   }
  // });
  // setTimeout(() => {
  //   $("#epic_MuteVideoCam,#epic_MuteVideoCam_Mob").addClass("active");
  //   IsVideoOpen = false;
  // }, 300);
}

async function OpenAudioProducer() {
  var userDetails = JSON.parse(getCookie());
  roomObj.produce(RoomClient.mediaType.audio, audioSelect.value);

  // if (audioPause) {
  //   audioPause = !audioPause;
  //   var dataObj = {
  //     commandType: "controlProducer",
  //     Data: {
  //       RoomId: localStorage.getItem("RoomId"),
  //       user_id: userDetails.userID,
  //       clientid: userDetails.clientID,
  //       kind: "audio",
  //       pauseStatus: false,
  //     },
  //   };
  //   await server.sendCommand(JSON.stringify(dataObj));
  // }
}

function CloseAudioProducer() {
  roomObj.closeProducer(RoomClient.mediaType.audio);
}

// function ShareScreenProducer() {
//   roomObj.produce(RoomClient.mediaType.screen);
// }
// function CloseShareScreenProducer() {
//   roomObj.closeProducer(RoomClient.mediaType.screen);
// }

async function unifiedScreenShare() {
  var userDetails = JSON.parse(getCookie());

  if (roomObj.IsShareScreen) roomObj.closeProducer(RoomClient.mediaType.screen);
  else {
    roomObj.produce(RoomClient.mediaType.screen);

    // if (videoPause) {
    //   videoPause = !videoPause;
    //   var dataObj = {
    //     commandType: "controlProducer",
    //     Data: {
    //       RoomId: localStorage.getItem("RoomId"),
    //       user_id: userDetails.userID,
    //       clientid: userDetails.clientID,
    //       kind: "video",
    //       pauseStatus: false,
    //     },
    //   };
    //   await server.sendCommand(JSON.stringify(dataObj));
    // }
    // if (audioPause) {
    //   audioPause = !audioPause;
    //   var dataObj = {
    //     commandType: "controlProducer",
    //     Data: {
    //       RoomId: localStorage.getItem("RoomId"),
    //       user_id: userDetails.userID,
    //       clientid: userDetails.clientID,
    //       kind: "audio",
    //       pauseStatus: false,
    //     },
    //   };
    //   await server.sendCommand(JSON.stringify(dataObj));
    // }
  }
}

// function stopCallSwitch() {
//   roomObj.exit(false, nameInput.value, roomidInput.value);
// }

function stopCallSwitch() {
  roomObj.exit(false, _username, _roomId);
}

function cameraSwitchReplace() {
  var list = document.getElementById("videoSelect");
  var cameraOptions = Array.from(list.options, (option) => option.value);
  optionSelectedIndex = Number(
    (optionSelectedIndex + 1) % cameraOptions.length
  );
  videoSelect.value = cameraOptions[optionSelectedIndex];
  roomObj.replace(RoomClient.mediaType.video, videoSelect.value);
}

function Login(username, room_id) {
  if (roomObj && roomObj.isOpen()) {
    console.log("Already connected to a room");
  } else {
    _roomId = room_id;
    _username = username;

    initEnumerateDevices();
    roomObj = new RoomClient(
      localMedia,
      remoteVideos,
      remoteAudios,
      window.mediasoupClient,
      server,
      room_id,
      username,
      null
    );

    roomObj.createRoom(_roomId);

    addListeners();
  }
}

function JoinRoom(EventName, EventData) {
  ConsoleEvent(EventName, EventData);
  var userId = getuserid();
  roomObj.join(_username, userId, _roomId);
}

function ReadRouterRtpCapabilities(EventName, EventData) {
  ConsoleEvent(EventName, EventData);
  roomObj.getRouterRtpCapabilities(_username, _roomId);
}

function LoadDevice(EventName, EventData) {
  ConsoleEvent(EventName, EventData);
  roomObj.loadDevice(EventData.Data.Capabilities);
}

function InitWebrtcTransport(EventName, EventData) {
  ConsoleEvent(EventName, EventData);
  _device = EventData.Data.Device;
  roomObj.createWebRtcTransport(_device, "producerTransport", _roomId);
}

function CreateWebrtcTransport(EventName, EventData) {
  ConsoleEvent(EventName, EventData);
  if (EventData.Data.transportType == "producerTransport") {
    roomObj.initProducerTransports(EventData.Data.params);
    roomObj.createWebRtcTransport(_device, "consumerTransport", _roomId);
  } else if (EventData.Data.transportType == "consumerTransport") {
    roomObj.initConsumerTransports(EventData.Data.params);
    roomObj.getProducers(_username, _roomId);
  }
}

function ExitRoom(EventName, EventData) {
  ConsoleEvent(EventName, EventData);
  roomObj.clean();
}

let producersRecievedCount = 0;
let consumeCount = 0;
let startupVideoAudio = true;
function getProducers(EventName, EventData) {
  ConsoleEvent(EventName, EventData);
  producersRecievedCount = EventData.Data.producerList.length;
  if (producersRecievedCount == 0 && startupVideoAudio) {
    startupVideoAudio = false;
    if (videoDeviceExist) {
      if (localStorage.getItem("video") == "true") {
        //condition to check if voice/video call
        fn_VideoCam(); // Turn on local video at startup
        $("#epic_MuteVideoCam,#epic_MuteVideoCam_Mob").toggleClass("active");
      }
    } else {
      document.getElementById("epic_MuteVideoCam").disabled = true;
      document.getElementById("epic_MuteVideoCam_Mob").disabled = true;
      $(".participant-cameras-btn").prop("disabled", true);
    }

    if (audioDeviceExist) {
      fn_AudioMute(); // Turn on local audio at startup
      $("#epic_AudioMute,#epic_AudioMute_Mob").toggleClass("active");
    } else {
      document.getElementById("epic_AudioMute").disabled = true;
      document.getElementById("epic_AudioMute_Mob").disabled = true;
    }

    $("#customRangeSpeaker").on("input", function () {
      volumeLevel = $(this).val();
      let audios = [...document.getElementsByTagName("audio")];
      audios.forEach((audio) => (audio.volume = volumeLevel / 100));
    });
  }
  roomObj.newProducers(EventData.Data.producerList);
  roomOpen();
}

// function to make multiple camera icon buttons based on number of connected devices
function multipleCameraIconBtn(devices) {
  var controlBuilder = new window.ControlBuilder();
  devices.forEach((element, index) => {
    // $(".camera-btn-active").append(
    // controlBuilder.createMultipleCameraButton(index)
    // );
    $("#localMedia").append(
      controlBuilder
        .createLiElement({
          onclick: "multipleCameraShiftOnButton(this)",
          id: `epic_MultipleCameraSwitch${index}`,
          class: `camera-${index}`,
        })
        .append(
          controlBuilder
            .createDivElement({
              class: "participant-first-camera",
            })
            .append(
              controlBuilder
                .createDivElement({
                  class: "video-container inactive",
                  id: `${element.deviceId}`,
                })
                .append($(`<img src="modules/images/local_muted_video.svg" />`))
            )
        )
    );
    $(".mobile-view-local-video").append(
      controlBuilder
        .createLiElement({
          onclick: "multipleCameraShiftOnButton(this)",
          id: `epic_MultipleCameraSwitch${index}`,
          class: `camera-${index}`,
        })
        .append(
          controlBuilder
            .createDivElement({
              class: "participant-first-camera",
            })
            .append(
              controlBuilder
                .createDivElement({
                  class: "video-container inactive",
                  id: `${element.deviceId}Mob`,
                })
                .append($(`<img src="modules/images/local_muted_video.svg" />`))
            )
        )
    );
  });

  //   setTimeout(() => {
  //     if (videoDeviceExist) {
  //       if (localStorage.getItem("video") == "true") {
  //         //condition to check if voice/video call
  //         fn_VideoCam(); // Turn on local video at startup
  //         $("#epic_MuteVideoCam,#epic_MuteVideoCam_Mob").toggleClass("active");
  //       }
  //     } else {
  //       document.getElementById("epic_MuteVideoCam,#epic_MuteVideoCam_Mob").disabled = true;
  //       $(".participant-cameras-btn").prop("disabled", true);
  //     }

  //     if (audioDeviceExist) {
  //       fn_AudioMute(); // Turn on local audio at startup
  //       $("#epic_AudioMute,#epic_AudioMute_Mob").toggleClass("active");
  //     } else document.getElementById("epic_AudioMute,#epic_AudioMute_Mob").disabled = true;

  //     $("#customRangeSpeaker").on("input", function () {
  //       volumeLevel = $(this).val();
  //       let audios = [...document.getElementsByTagName("audio")];
  //       audios.forEach((audio) => (audio.volume = volumeLevel / 100));
  //     });
  //   }, 2000);
}

function Transportconnected(EventName, EventData) {
  ConsoleEvent(EventName, EventData);
  roomObj.mediasoupCallback("connect", null);
}

function produced(EventName, EventData) {
  ConsoleEvent(EventName, EventData);
  roomObj.mediasoupCallback("produce", EventData.Data);
}

function SignUpSubmit() {
  $(document).ready(function () { });
  $(window).on("pageshow", function (event) {
    if (event.originalEvent.persisted) {
      window.location.reload();
    }
  });
  $("#registrationForm").submit(function (e) { });
  $('form[id="registrationForm"]').validate({
    rules: {
      FirstName: "required",
      LastName: "required",
      UserName: "required",
      Email: {
        required: true,
        email: true,
      },
      Password: {
        required: true,
        minlength: 8,
      },
    },
    messages: {
      FirstName: "* First name is required",
      LastName: "* Last name is required",
      UserName: "* User name is required",
      Email: "* Enter a valid email",
      Password: {
        required: "* Password is required",
        minlength: "Password must be at least 8 characters long",
      },
    },
    errorPlacement: function (error, element) {
      if (element.attr("name") == "Password") {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    },
    submitHandler: function (form) {
      // if ($(form).find(":focus").is(".form-btn"))
      return signUpCommand();
    },
  });

  // Select the password input and the toggle button
  var passwordInput = $("#Password");
  var toggleButton = $(".password-view-btn");

  // Attach a click event listener to the toggle button
  toggleButton.click(function () {
    var passwordFieldType = passwordInput.attr("type");
    var newType = passwordFieldType === "password" ? "text" : "password";
    passwordInput.attr("type", newType);

    // Change the icon of the toggle button accordingly
    var toggleButtonIcon = toggleButton.find("svg");
    var isPasswordVisible = newType === "text";
    toggleButtonIcon
      .find(".password-b, .password-c")
      .css("stroke", isPasswordVisible ? "#007bff" : "#00000067");
  });
}

function ForgotSubmit() {
  $(document).ready(function () { });
  $(window).on("pageshow", function (event) {
    if (event.originalEvent.persisted) {
      window.location.reload();
    }
  });
  // Add focus event handler to remove validation error message
  $("#Email").focus(function () {
    $(this).removeClass("is-invalid");
    $("#emailError").text("");
  });

  $("#forgotForm").submit(function (e) {
    if ($("#Email").val().trim() === "") {
      e.preventDefault();
      $("#Email").addClass("is-invalid");
      $("#emailError").text("Please enter your email address");
    } else {
      $("#Email").removeClass("is-invalid");
      $("#emailError").text("");
    }
  });
  $('form[id="forgotForm"]').validate({
    rules: {
      Email: {
        required: true,
        email: true,
      },
    },
    messages: {
      Email: "* Enter a valid email",
    },
    errorPlacement: function (error, element) {
      if (element.attr("name") == "Password") {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    },
    submitHandler: function (form) {
      // if ($(form).find(":focus").is(".form-btn"))
      if ($("#Email").val().trim() === "") {
        return false;
      } else {
        return ForgotCommand();
      }
    },
  });
}

// function ForgotSubmit() {
//   $(document).ready(function () {
//   });
//   $(window).on("pageshow", function (event) {
//     if (event.originalEvent.persisted) {
//       window.location.reload();
//     }
//   });
//   $('form[id="forgotForm"]').validate({
//     rules: {
//       Email: {
//         required: true,
//         email: true,
//       },
//     },
//     messages: {
//       Email: "* Enter a valid email",
//     },
//     errorPlacement: function (error, element) {
//       if (element.attr("name") == "Password") {
//         error.insertAfter(element.parent());
//       } else {
//         error.insertAfter(element);
//       }
//     },
//     submitHandler: function (form) {
//       if ($("#Email").val().trim() === "") {
//         return false;
//       } else {
//         return ForgotCommand();
//       }
//     },
//   });
// }

function HelpFeedback() {
  $(document).ready(function () { });
  $(window).on("pageshow", function (event) {
    if (event.originalEvent.persisted) {
      window.location.reload();
    }
  });
  $("#FeedbackForm").submit(function (e) { });
  $('form[id="FeedbackForm"]').validate({
    submitHandler: function (form) {
      // if ($(form).find(":focus").is(".form-btn"))
      return FeedbackCommand();
    },
  });
}

function ResetSubmit() {
  $(document).ready(function () { });
  $(window).on("pageshow", function (event) {
    if (event.originalEvent.persisted) {
      window.location.reload();
    }
  });
  $("#ResetForm").submit(function (e) { });
  $('form[id="ResetForm"]').validate({
    rules: {
      Password: {
        required: true,
        minlength: 8,
      },
    },
    messages: {
      Password: {
        required: "* Enter your new password",
        minlength: "Password must be atleast 8 characters long."
      }
    },
    errorPlacement: function (error, element) {
      if (element.attr("name") == "Password") {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    },
    submitHandler: function (form) {
      // if ($(form).find(":focus").is(".form-btn"))
      return ResetCommand();
    },
  });
  // Select the password input and toggle button
  var passwordInput = $("#Password");
  var toggleButton = $(".password-view-btn");

  //Attach a click event listener to the toggle button
  toggleButton.click(function () {
    var passwordFieldType = passwordInput.attr("type");
    var newType = passwordFieldType === "password" ? "text" : "password";
    passwordInput.attr("type", newType);

    //Change the icon of the toggle button accordingly
    var toggleButtonIcon = toggleButton.find("svg");
    var isPasswordVisible = newType === "text";
    toggleButtonIcon
      .find(".password-b, .password-c")
      .css("stroke", isPasswordVisible ? "#007bff" : "#00000067");
  });
}


function ResetCommand() {
  var password = $("#Password").val();
  const url = new URL(window.location.href);
  const Data = {
    password: password,
    token: url.searchParams.get("token"),
  };
  var repoObj = new RepoClient(server);
  repoObj.ServerEventCall("ResetPassword", Data);

  location.href = "./index.html";
  return false;
}

function FeedbackCommand() {
  var feedbackText = $("#feedbackText").html().trim();
  var noNbsp = feedbackText.replace(/&nbsp;/g, "").replace(/\s+/g, "");
  if (noNbsp != "") {
    const url = new URL(window.location.href);

    const Data = {
      feedbackText: feedbackText,
      name: JSON.parse(getCookie()).name,
      email: JSON.parse(getCookie()).email,
    };
    var repoObj = new RepoClient(server);
    repoObj.ServerEventCall("HelpFeedback", Data);

    location.href = "./dashboard.html";
    return false;
  } else {
    alert("Feedback is required.");
  }
}

function ForgotCommand() {
  $(".forgot-password-form-container").hide();
  $(".forgot-succes-section").show();

  var email = $("#Email").val();
  const Data = {
    email: email,
  };
  var repoObj = new RepoClient(server);
  repoObj.ServerEventCall("ForgotPassword", Data);
  return false;
}

function signUpCommand() {
  var name = $("#FirstName").val().trim() + " " + $("#LastName").val().trim();
  var email = $("#Email").val().trim();
  var username = $("#UserName").val().trim();
  var password = $("#Password").val().trim();

  const Data = {
    name: name,
    email: email,
    password: password,
    clientID: null,
    isPasswordRequired: true,
    allowMultiple: true,
    profile: {},
    groupName: null,
    sessionID: null,
    username: username,
    sessions: [],
  };
  var repoObj = new RepoClient(server);
  repoObj.ServerEventCall("SignUp", Data);
  return false;
}

// function to show toastr
function showToastr(message, type) {
  var toastr = $(
    '<div id="toastrDiv" class="toast show align-items-center border-0 toast-wrapper ' +
    type +
    '" role="alert" aria-live="assertive" aria-atomic="true">\
                  <div class="d-flex">\
                    <div class="toast-body">\
                      ' +
    message +
    '\
                    </div>\
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>\
                  </div>\
                </div>'
  );

  if ($("#toastrDiv").length === 0) {
    $("body").append(toastr);
  }
  toastr.hide().fadeIn(500);
}

function UserLogin() {
  var email = $("#Email").val();
  var password = $("#Password").val();

  const Data = {
    email: email,
    password: password,
  };
  var repoObj = new RepoClient(server);
  repoObj.ServerEventCall("UserLogin", Data);
  return false;
}

// login form validation
function LoginFormValidation() {
  $(document).ready(function () { });
  $(window).on("pageshow", function (event) {
    if (event.originalEvent.persisted) {
      window.location.reload();
    }
  });
  $("#loginForm").submit(function (e) { });
  $('form[id="loginForm"]').validate({
    rules: {
      Email: {
        required: true,
      },
      Password: {
        required: true,
        // minlength: 8,
      },
    },
    messages: {
      Email: "* Username/email is required",
      Password: {
        required: "* Password is required",
        minlength: "Password must be at least 8 characters long",
      },
    },
    errorPlacement: function (error, element) {
      if (element.attr("name") == "Password") {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    },
    submitHandler: function (form) {
      // if ($(form).find(":focus").is(".form-btn"))
      return UserLogin();
    },
  });

  // Select the password input and the toggle button
  var passwordInput = $("#Password");
  var toggleButton = $(".password-view-btn");

  // Attach a click event listener to the toggle button
  toggleButton.click(function () {
    var passwordFieldType = passwordInput.attr("type");
    var newType = passwordFieldType === "password" ? "text" : "password";
    passwordInput.attr("type", newType);

    // Change the icon of the toggle button accordingly
    var toggleButtonIcon = toggleButton.find("svg");
    var isPasswordVisible = newType === "text";
    toggleButtonIcon
      .find(".password-b, .password-c")
      .css("stroke", isPasswordVisible ? "#007bff" : "#00000067");
  });
}

function SearchParticipants(Search_Key) {
  var userId = getuserid();
  var data = { SearchKey: Search_Key, UserId: userId };
  var dataObj = { commandType: "SearchParticipants", Data: data };
  server.sendCommand(JSON.stringify(dataObj));
}

function DashboardParticipantsList(Search_Key) {
  var userId = getuserid();
  var data = { SearchKey: Search_Key, UserId: userId };
  var dataObj = { commandType: "DashboardParticipantsList", Data: data };
  server.sendCommand(JSON.stringify(dataObj));
}

function CreateGroup(data) {
  var dataObj = { commandType: "CreateGroup", Data: data };
  server.sendCommand(JSON.stringify(dataObj));
}

function EditGroup(data) {
  var dataObj = { commandType: "EditedGroupData", Data: data };
  server.sendCommand(JSON.stringify(dataObj));
  location.href = "./dashboard.html";
}

function ScheduleRandomCall(data) {
  var dataObj = { commandType: "ScheduleRandomCall", Data: data };
  server.sendCommand(JSON.stringify(dataObj));
  location.href = "./dashboard.html";
}

function UpdateProfilePic(data) {
  var dataObj = { commandType: "UpdateProfilePic", Data: data };
  server.sendCommand(JSON.stringify(dataObj));
}

function roomOpen() {
  login.className = "hidden";
  reveal(startAudioButton);
  hide(stopAudioButton);
  reveal(startVideoButton);
  hide(stopVideoButton);
  reveal(startScreenButton);
  hide(stopScreenButton);
  reveal(exitButton);
  reveal(copyButton);
  reveal(devicesButton);
  control.className = "";
  reveal(videoMedia);
}

function hide(elem) {
  elem.className = "hidden";
}

function reveal(elem) {
  elem.className = "";
}

function addListeners() {
  roomObj.on(RoomClient.EVENTS.startScreen, () => {
    hide(startScreenButton);
    reveal(stopScreenButton);
  });

  roomObj.on(RoomClient.EVENTS.stopScreen, () => {
    hide(stopScreenButton);
    reveal(startScreenButton);
  });

  roomObj.on(RoomClient.EVENTS.stopAudio, () => {
    hide(stopAudioButton);
    reveal(startAudioButton);
  });
  roomObj.on(RoomClient.EVENTS.startAudio, () => {
    hide(startAudioButton);
    reveal(stopAudioButton);
  });

  roomObj.on(RoomClient.EVENTS.startVideo, () => {
    hide(startVideoButton);
    reveal(stopVideoButton);
  });
  roomObj.on(RoomClient.EVENTS.stopVideo, () => {
    hide(stopVideoButton);
    reveal(startVideoButton);
  });
  roomObj.on(RoomClient.EVENTS.exitRoom, () => {
    hide(control);
    hide(devicesList);
    hide(videoMedia);
    hide(copyButton);
    hide(devicesButton);
    reveal(login);
  });
}

let isEnumerateDevices = false;

let audioFlag = false;
let videoFlag = false;

let audioDeviceExist = false;
let videoDeviceExist = false;

async function initEnumerateDevices() {
  // Many browsers, without the consent of getUserMedia, cannot enumerate the devices.
  if (isEnumerateDevices) return;

  // try {
  //   await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  // } catch (error) {
  //   console.log(error);
  // }

  // await navigator.mediaDevices.enumerateDevices().then((devices) => {
  //   devices.forEach((device) => {
  //     console.log(device.kind);
  //     if ("audioinput" == device.kind) {
  //       audioFlag = true;
  //     } else if ("videoinput" == device.kind) {
  //       videoFlag = true;
  //     }
  //     if (audioFlag && videoFlag) return;
  //   });
  // });

  const constraints = {
    audio: true,
    video: true,
  };
  // const constraints = {
  //   audio: audioFlag,
  //   video: videoFlag,
  // };

  console.log(constraints);

  await navigator.mediaDevices
    .getUserMedia({ audio: true, video: false, })
    .then(async (stream) => {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    })
    .catch((err) => {
      console.error("Access denied for audio: ", err);
    });

  await navigator.mediaDevices
    .getUserMedia({ audio: false, video: true, })
    .then(async (stream) => {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    })
    .catch((err) => {
      console.error("Access denied for video: ", err);
    });

  await enumerateDevices();

  if (!audioDeviceExist) {
    let option = document.createElement("option");
    option.value = "No Device Found";
    option.innerText = "No Device Found";
    $("#audioSelect").append(option);
    isEnumerateDevices = true;
    $("#audioSelect").prop("disabled", true);
  }
}

async function enumerateDevices() {
  // Load mediaDevice options
  await navigator.mediaDevices.enumerateDevices().then((devices) => {
    if (devices.length > 0) {
      devices.forEach((device, i) => {
        let el = null;
        let mel = null;
        if ("audioinput" === device.kind) {
          // el = audioSelect;
          // mel = audioSelectMobile;
          audioDevices.push({
            deviceId: device.deviceId,
            label: device.label,
          });
          audioDeviceExist = true;
        } else if ("videoinput" === device.kind) {
          el = videoSelect;
          videoDevices.push({
            deviceId: device.deviceId,
            label: device.label,
          });
          videoDeviceExist = true;
        }
        if (!el) return;

        let option = document.createElement("option");
        option.value = device.deviceId;
        option.innerText = device.label;
        el.appendChild(option);

        let optionMob = document.createElement("option");
        optionMob.value = device.deviceId;
        optionMob.innerText = device.label;
        if (mel)
          mel.appendChild(optionMob);
        isEnumerateDevices = true;
      });
    }
  });
  this.multipleCameraIconBtn(videoDevices);
}

function ConsoleEvent(EventName, EventData) {
  if (consoleEvent) {
    // console.log(EventName + " : "+ JSON.stringify(EventData))
    //alert(EventData.Data.Message)
    if (EventData.Data.Message == undefined) {
      console.log(EventData.Message);
      LiveConsole(EventData.Message);
    } else {
      console.log(EventData.Data.Message);
      LiveConsole(EventData.Data.Message);
    }
  }
}

function LiveConsole(msg) {
  if (window.location.href.includes("confieranceroom")) {
    let ele = document.getElementById("alert_box");
    // if (msg == 'Room Created Successfully.' || msg == 'Room Already Exists.') {
    // if (msg == "WebSocket Connected") {
    //   ele.innerHTML = "<p>" + msg + "</p>";
    // } else {
    //   ele.innerHTML += "<p>" + msg + "</p>";
    // }
  }
}

function JoinRoomRequest(type) {
  callPopup = false;
  if (type == "audio") {
    localStorage.setItem("video", false);
  } else {
    localStorage.setItem("video", true);
  }
  location.href = "/confieranceroom.html"; //To be Noted name
}

function RejectCallRequest() {
  callPopup = false;
  $("#incoming-popup").hide();
  playringTone(false);

  var dataObj = {
    commandType: "RequestToJoinReject",
    Data: {
      RoomId: localStorage.getItem("RoomId"),
    },
  };
  server.sendCommand(JSON.stringify(dataObj));
}

function getUserNameFromClientId(user_id) {
  return UserDetailsSearchArray.find((it) => it.userid == user_id);
}

async function muteUnmuteOutput(state) {
  roomObj.IsSpeakerPaused = state;

  if (state == true)
    var dataObj = {
      commandType: "MuteSpeaker",
      Data: {
        Paused: state,
        RoomId: localStorage.getItem("RoomId"),
      },
    };
  else if (state == false)
    var dataObj = {
      commandType: "UnmuteSpeaker",
      Data: {
        Paused: state,
        RoomId: localStorage.getItem("RoomId"),
      },
    };

  server.sendCommand(JSON.stringify(dataObj));
}

// async function pauseProducer(user_id, clientid, kind) {
//   var producerArr = [];
//   // var Tags = document.querySelectorAll(`[data-${kind}_user_id="${user_id}"]`);
//   // Tags.forEach(async media => {

//   //   var producerId = media.getAttribute("data-producer_id")
//   //   producerArr.push(producerId);

//   // });
//   var dataObj = {
//     commandType: "pauseProducer",
//     Data: {
//       RoomId: localStorage.getItem("RoomId"),
//       producerArr,
//       clientid,
//       kind,
//       user_id,
//     },
//   };
//   await server.sendCommand(JSON.stringify(dataObj));
// }

async function closeRemoteProducer(clientid, kind) {
  var dataObj = {
    commandType: "closeRemoteProducer",
    Data: {
      RoomId: localStorage.getItem("RoomId"),
      userName: JSON.parse(getCookie()).name,
      clientid,
      kind,
    },
  };
  await server.sendCommand(JSON.stringify(dataObj));
}

// async function pauseResumeProducer(user_id, clientid, kind) {
//   var pauseStatus = null;
//   if (kind == "audio") {
//     audioPause = !audioPause;
//     pauseStatus = audioPause;
//   } else if (kind == "video") {
//     videoPause = !videoPause;
//     pauseStatus = videoPause;
//   }

//   var dataObj = {
//     commandType: "controlProducer",
//     Data: {
//       RoomId: localStorage.getItem("RoomId"),
//       user_id,
//       clientid,
//       kind,
//       pauseStatus,
//     },
//   };

//   await server.sendCommand(JSON.stringify(dataObj));
// }

async function updateProducerStatus() {
  var dataObj = {
    commandType: "producerStatus",
    Data: { RoomId: localStorage.getItem("RoomId") },
  };
  await server.sendCommand(JSON.stringify(dataObj));
}

async function fullScreenFunc(userId) {
  if (!fullScreen) toggleFullscreen(userId);
  else switchFsUser(userId);
}

var fullScreen = false;
async function toggleFullscreen(userId) {
  if (!fullScreen) {
    $(".carousel-indicators:first")
      .parent(".col-12")
      .addClass("carousel-indicators-active");
    let windowHeight = window.innerHeight;
    let chatViewBodyHeight = windowHeight - 88;
    $(".carousel-indicators-active .carousel-indicators").css(
      "height",
      `${chatViewBodyHeight}px`
    );
    $(".carousel-indicators:first").show();

    await $("#remoteVideos .carousel-item").each(function (index, carousel) {
      if ($(carousel).children(".video-container").children().length > 1) {
        $(carousel)
          .children(".video-container")
          .children()
          .each(function (index, element) {
            $("#remoteVideos").append(
              "<div class='carousel-item'><div class='video-container row'></div></div>"
            );
            $("#remoteVideos .carousel-item:last-child .video-container").append(element);
            if (
              $(carousel).children(".video-container").children().length == 1
            ) {
              return false;
            }
          });
      }
    });
    $("#remoteVideos .carousel-item.active").removeClass("active");
    $(`[data-username="video_${userId}"]`).parent().parent().addClass("active");
    $("#remoteVideos .carousel-item").each(function (index, carouselItem) {
      var element = $(carouselItem).children(".video-container").children();
      var dataUsername = $(element).attr("data-username");
      var divId = dataUsername.substring(6, dataUsername.length);
      if (divId == userId) return;
      var videoContainer = $(element)
        .find(".participant-first-camera")
        .first()
        .find(".video-container");
      var smallText = $(element).find(".small-text").text();
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
      if (videoContainer.length != 0) {
        $(videoContainer).prepend(participantVideoControls);
        var newLi = $("<li>")
          .attr("data-bs-target", "#carousel-thumb")
          .addClass("active")
          .append($(videoContainer));
      } else {
        var avatarContainer = $(element).find(".audio-container").clone();
        $(avatarContainer).prepend(participantVideoControls);
        var newLi = $("<li>")
          .attr("data-bs-target", "#carousel-thumb")
          .addClass("active")
          .append($(avatarContainer));
      }
      $(newLi).attr("id", `fsli_${divId}`);
      $(newLi).click(function () {
        switchFsUser(divId);
      });
      $("#thumb-ol").append(newLi);
    });
    switchFsUser(userId);
    $("#main-carousel-next").hide();
    $("#main-carousel-prev").hide();
    $(".carousel-indicators-main-slider").hide();
  } else {
    $(".carousel-indicators:first").hide();
    $(".carousel-indicators:first")
      .parent(".col-12")
      .removeClass("carousel-indicators-active");
    var thumbOl = $("#thumb-ol");
    await $("#remoteVideos .carousel-item").each(function (index, carouselItem) {
      var element = $(carouselItem).children(".video-container").children();
      var video_dataUsername = $(element).attr("data-username");
      if (video_dataUsername) {
        var dataUsername = video_dataUsername.replace("video_", "");
        var firstVideo = thumbOl.find(
          '[data-video_user_id="' + dataUsername + '"]'
        );
        if (firstVideo.length == 0) {
          return true;
        }
        $(firstVideo).siblings().remove();
        $($(firstVideo).parent()).appendTo(
          $(element).find(".participant-first-camera:first")
        );
      }
    });

    var userCount = await $("#remoteVideos .carousel-item").length;
    var carouselCount = Math.ceil(userCount / userPerSlide);
    for (var j = 0; j < carouselCount; j++) {
      var container = await $("#remoteVideos .carousel-item")
        .eq(j)
        .children(".video-container");
      if ($("#remoteVideos .carousel-item").length == carouselCount) {
        break;
      }
      await $(container).parent().removeClass("active");
      for (var i = userCount - 1; i > carouselCount - 1; i--) {
        var user = await $("#remoteVideos .carousel-item")
          .eq(i)
          .children(".video-container")
          .children();
        await $(container).append(user);
        await controlBuilder.removeEmptySlider();
        userCount -= 1;
        if ($(container).children().length == userPerSlide) {
          break;
        }
      }
    }
    var FsUserDiv = $("#fsUser");
    if (FsUserDiv.length > 0) FsUserDiv.removeAttr("id");
    $("#remoteVideos .carousel-item.active").removeClass("active");
    await $("#remoteVideos .carousel-item:first-child").addClass("active");
    await $("#thumb-ol").empty();
    $("#main-carousel-next").show();
    $("#main-carousel-prev").show();
    $(".carousel-indicators-main-slider").show();
    await controlBuilder.arrangeSliderItems();
    await controlBuilder.removeEmptySlider();
  }
  fullScreen = !fullScreen;
  $(".participant-expand-view-btn").toggleClass("active");
  $(".participant-video-controls .participant-video-controls-btns-list").hide();

  // $(this).siblings(".participant-video-controls-btns-list").toggle();
  await controlBuilder.resetVideoLayout();
  await controlBuilder.resetMultipleVideoLayout();
}

async function switchFsUser(userId) {
  var prevFsUserDiv = $("#fsUser");
  if (prevFsUserDiv.length > 0) {
    $("#remoteVideos .carousel-item.active").removeClass("active");
    var video_prevUserId = $(prevFsUserDiv).attr("data-username");
    var prevUserId = video_prevUserId.replace("video_", "");
    var index = $("#remoteVideos .carousel-item").index(prevFsUserDiv.parent().parent());
    $(prevFsUserDiv).removeAttr("id");
    var videoContainer = $(prevFsUserDiv)
      .find(".participant-first-camera")
      .first()
      .find(".video-container");
    var smallText = $(prevFsUserDiv).find(".small-text").text();
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
    if (videoContainer.length != 0) {
      $(videoContainer).prepend(participantVideoControls);
      var newLi = $("<li>")
        .attr("data-bs-target", "#carousel-thumb")
        .addClass("active")
        .append($(videoContainer));
    } else {
      var avatarContainer = $(prevFsUserDiv).find(".audio-container").clone();
      $(avatarContainer).prepend(participantVideoControls);
      var newLi = $("<li>")
        .attr("data-bs-target", "#carousel-thumb")
        .addClass("active")
        .append($(avatarContainer));
    }
    $(newLi).attr("id", `fsli_${prevUserId}`);
    $(newLi).click(function () {
      switchFsUser(prevUserId);
    });
    $("#thumb-ol").append(newLi);
  }

  var newFsUserLi = $("#thumb-ol").find(`[id="fsli_${userId}"]`);
  if (newFsUserLi.length > 0) {
    var newUserDiv = $("#carousel-thumb").find(
      `[data-username="video_${userId}"]`
    );
    $(newFsUserLi).hide();
    var firstVideo = $("#thumb-ol").find(
      '[data-video_user_id="' + userId + '"]'
    );
    if (firstVideo.length != 0) {
      $(firstVideo).siblings().remove();
      $($(firstVideo).parent()).appendTo(
        $(newUserDiv).find(".participant-first-camera:first")
      );
    }
    $(newFsUserLi).remove();
  }
  $($("#carousel-thumb").find(`[data-username="video_${userId}"]`)).attr(
    "id",
    "fsUser"
  );
  $($("#carousel-thumb").find(`[data-username="video_${userId}"]`))
    .parent()
    .parent()
    .addClass("active");

  checkOverflow();
  await controlBuilder.resetVideoLayout();
  await controlBuilder.resetMultipleVideoLayout();
  $(`#fsli_${JSON.parse(getCookie()).userID}`).hide();
}

$("#ContactVisibilityToggle,#ContactVisibilityToggleMobile").on(
  "change",
  function () {
    var isChecked = $(this).prop("checked");
    var dataObj = {
      commandType: "ContactVisibility",
      Data: {
        IsVisible: isChecked,
        userid: JSON.parse(getCookie()).userID,
      },
    };
    server.sendCommand(JSON.stringify(dataObj));
  }
);

function setupNotificationToggle(selector, type) {
  $(selector).on("change", function () {
    var isChecked = $(this).prop("checked");
    var dataObj = {
      commandType: "NotificationSettings",
      Data: {
        type: type,
        notificationSettings: isChecked,
        userid: JSON.parse(getCookie()).userID,
      },
    };
    server.sendCommand(JSON.stringify(dataObj));
  });
}
setupNotificationToggle("#MeetInviNotifToggle", "MeetingInvitation");
setupNotificationToggle("#NewGroupNotifToggle", "NewGroup");
setupNotificationToggle("#MissCallNotifToggle", "MissedCall");

$("#signupBtn").prop("disabled", true);
$("#gridCheck").change(function () {
  if ($(this).prop("checked")) {
    $("#signupBtn").prop("disabled", false);
  } else {
    $("#signupBtn").prop("disabled", true);
  }
});

function makeUniqueRoom(length = 40) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async function NewScreenShared(data) {
  var ulToastr = $(".participants-raise-hand-popup");
  ulToastr.append(`<li id="ss-toastr-${data.userId}" >
                    <div class="raise-hand-popup ">
                      <div class="d-flex align-items-center gap-2">
                        <img  src="modules/images/toastr_screen.svg"/>
                        <p> ${data.userName} started screen share</p>
                      </div>
                    </div> 
                  </li>`);
  ulToastr.addClass("active");

  setTimeout(() => {
    if (ulToastr.children().length == 1) ulToastr.removeClass("active");
    $(`#ss-toastr-${data.userId}`).remove();
  }, 5000);

  if (deviceScreenWidth > 768)
    fullScreenFunc(data.userId)
  else {
    let oldActive = $(".carousel-indicators-main-slider").find("li.active");
    oldActive.removeClass("active");
    oldActive.removeAttr("aria-current");

    $("#remoteVideos .carousel-item.active").removeClass("active");
    $('[data-username="video_' + data.userId + '"]').parent().parent().addClass("active");
    let activeIndex = $("#remoteVideos .carousel-item.active").index();

    let newActive = $(".carousel-indicators-main-slider").children("li").eq(activeIndex);
    newActive.attr("aria-current", "true");
    newActive.addClass("active");
  }
}

function ping() {
  var dataObj = {
    commandType: "Ping",
    Data: {
      pingTime: Date.now(),
    },
  };
  server.sendCommand(JSON.stringify(dataObj));
}

function pong(pingTime) {
  let latency = Date.now() - pingTime;
  console.log("Latency: " + latency + "ms");
}