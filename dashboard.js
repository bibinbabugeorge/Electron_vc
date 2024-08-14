// function that will hit on the initialization of dashboard.html
function dashboardInit(Roomlist) {
  var _userid = getCookieDetails("userID");
  fillDashboardDetails();
  var individualCalls = [];
  var GroupCalls = [];
  var RecentCalls = [];
  var FavouriteContact = [];

  if (Roomlist !== null || Roomlist !== undefined) {
    Roomlist.forEach((element) => {
      var index = element.joinedusers.findIndex((o) => o.userid === _userid);
      if (index > -1) {
        element.joinedusers.splice(index, 1);
      }
      if (element.joinedusers.length == 1) {
        individualCalls.push(element);
      } else if (element.joinedusers.length > 1) {
        GroupCalls.push(element);
      }

      if (element.isfav == true) {
        FavouriteContact.push(element);
      }
    });

    individualCalls.forEach((element) => {
      RecentCalls.push(element);
    });

    GroupCalls.forEach((element) => {
      RecentCalls.push(element);
    });

    RecentCalls.sort(function (a, b) {
      return new Date(b.lastActiveDate) - new Date(a.lastActiveDate);
    });

    GroupCalls.sort(function (a, b) {
      return new Date(b.lastActiveDate) - new Date(a.lastActiveDate);
    });

    individualCalls.sort(function (a, b) {
      return new Date(b.lastActiveDate) - new Date(a.lastActiveDate);
    });

    bindRecentCalls(RecentCalls);
    //bindindividualCalls(individualCalls);
    bindGroupCalls(GroupCalls);
    bindFavouriteCalls(FavouriteContact);
  }

  var scheduleUl = $("#schedule-ul");
  $("#schedule-meeting").show();
  $(".schedul-container li").hide();
  Roomlist.forEach((room) => {
    if (room.schedules.length > 0) {
      $("#schedule-meeting").hide();
      room.schedules.forEach((schedule, index) => {
        var istTimestamp = new Date(schedule);

        // var formattedTimestamp = new Date(istTimestamp).toLocaleString("en-US", {
        //   month: "short",
        //   day: "numeric",
        //   hour: "numeric",
        //   minute: "numeric",
        //   hour12: true
        // });

        var formattedTimestamp = new Date(istTimestamp).toLocaleString(
          "en-US",
          {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }
        );

        function isToday(date) {
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000
          date.setHours(0, 0, 0, 0); // Set the time of the given date to 00:00:00.000
          return date.getTime() === today.getTime();
        }

        if (new Date() > istTimestamp || !isToday(istTimestamp)) {
          return;
        }

        $(".schedul-container").removeClass("d-none");

        let groupname;
        if (room.name == "") {
          let user = [];
          var i = 0;
          room.joinedusers.forEach((element) => {
            user.push(element.name.replace(/ /g, ""));
            i++;
          });
          i > 1
            ? (groupname =
              user.toString().toLocaleLowerCase().slice(0, 15) + "...")
            : (groupname = user.toString());
        }

        var listItem = document.createElement("li");
        listItem.innerHTML = `<li>
              <div class="shedule-list-view">
              <div class="shedule-list-controls">
              <div class="row">
              <div class="col-xl-4 col-lg-4 col-md-7 col-sm-4 col-7">
              <div class="shedule-invite">
              <p>${room.name != "" ? "Invited To" : "Invited By"}</p>
              <h6>${room.name == "" ? groupname : room.name}</h6>
              </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-12 col-sm-4 col-12 mobile-view-order">
              <div class="shedule-time">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
              <defs>
              <style>
              .shedule-time-icon-a {
                fill: #fff;
                stroke: #808486;
                stroke-width: 0.4px;
                opacity: 0;
              }
              
              .shedule-time-icon-b {
                fill: #182024;
                stroke: #182024;
                stroke-width: 0.5px;
              }
              
              .shedule-time-icon-c {
                stroke: none;
              }
              
              .shedule-time-icon-d {
                fill: none;
              }
              </style>
              </defs>
              <g transform="translate(-515 -552)">
              <g class="shedule-time-icon-a" transform="translate(515 552)">
              <rect class="shedule-time-icon-c" width="26" height="26" />
              <rect class="shedule-time-icon-d" x="0.2" y="0.2" width="25.6" height="25.6" />
              </g>
              <g transform="translate(506.39 543.39)">
              <path class="shedule-time-icon-b"
              d="M21.712,13.3a8.412,8.412,0,1,0,8.412,8.412A8.412,8.412,0,0,0,21.712,13.3Zm0,16.028a7.616,7.616,0,1,1,7.616-7.616A7.626,7.626,0,0,1,21.712,29.328Z"
              transform="translate(-0.402 -0.402)" />
              <path class="shedule-time-icon-b"
              d="M62.362,37.427V32.981a.381.381,0,1,0-.762,0v4.6a.414.414,0,0,0,.111.27l3.065,3.065a.383.383,0,0,0,.54,0,.394.394,0,0,0,0-.54Z"
              transform="translate(-40.671 -16.276)" />
              </g>
              </g>
              </svg>
              ${formattedTimestamp}
              </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-5 col-sm-4 col-5">
              <div class="shedule-action-btns call-join-btn-container">
              <button class="call-join-btn" onclick="location.href = '${room.url}';">
              <img src="modules/images/video-icon.svg" alt="" />
              Call
              </button>
              </div>
              </div>
              </div>
              </div>
              <div class="shedule-share-link">
              <input class="form-control" type="text" placeholder=""
              value="${room.url}"
              readonly />
              <button class="shedule-link-share-btn" id="ScheduleShareUrlBtn_${index + 1
          }" onclick="scheduleUrlBtnClick(this,'${room.url}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <defs>
              <style>
              .shedule-share-icon-a {
                fill: #fff;
                stroke-width: 0.4px;
                opacity: 0;
              }
              
              .shedule-share-icon-a,
              .shedule-share-icon-b,
              .shedule-share-icon-c {
                stroke: #808486;
              }
              
              .shedule-share-icon-b,
              .shedule-share-icon-c,
              .shedule-share-icon-e {
                fill: none;
              }
              
              .shedule-share-icon-b,
              .shedule-share-icon-c {
                stroke-width: 1.5px;
              }
              
              .shedule-share-icon-c {
                fill-rule: evenodd;
              }
              
              .shedule-share-icon-d {
                stroke: none;
              }
              </style>
              </defs>
              <g class="shedule-share-icon-a">
              <rect class="shedule-share-icon-d" width="32" height="32" />
              <rect class="shedule-share-icon-e" x="0.2" y="0.2" width="31.6" height="31.6" />
              </g>
              <g transform="translate(5.389 3.46)">
              <circle class="shedule-share-icon-b" cx="3.275" cy="3.275" r="3.275"
              transform="translate(13.971 1.54)" />
              <circle class="shedule-share-icon-b" cx="3.275" cy="3.275" r="3.275"
              transform="translate(13.971 16.175)" />
              <circle class="shedule-share-icon-b" cx="3.275" cy="3.275" r="3.275"
              transform="translate(1.611 8.858)" />
              <path class="shedule-share-icon-c" d="M14.04,6.106l-6.551,3.5,6.55-3.5Z" />
              <path class="shedule-share-icon-c" d="M14.04,17.882l-6.551-3.5,6.55,3.5Z" />
              </g>
              </svg>
              </button>
              </div>
              </div>
              </li>`;

        scheduleUl.append(listItem);

        $(`#ScheduleShareUrlBtn_${index + 1}`).hover(
          function () {
            // Show tooltip on hover
            $(`#ScheduleShareUrlBtn_${index + 1}`).append(`<span class="tooltip-${index + 1}">copy URL</span>`);
            $(`.tooltip-${index + 1}`).css(
              {
                "opacity": "1",
                "position": "absolute",
                "text-align": "center",
                "width": "7%",
                "margin-top": "29px",
                "transform": "translateX(-50%)",
                "background-color": "white",
                "color": "#009DFF",
                "padding": " 4px 8px",
                "border": "0.5px solid #0000001D",
                "border-radius": "8px",
                "font-size": "14px",
                "transition": "opacity 0.3s ease"
              });
          },
          function () {
            // Hide tooltip on hover out
            $(`.tooltip-${index + 1}`).css("opacity", "0");
            setTimeout(function () {
              $(`.tooltip-${index + 1}`).remove();
            }, 300);
          }
        );
      });
    }
  });

}


function BindCallHistory(joinedCalls) {

  var univCallHistory = $("#univCallHistory");
  univCallHistory.empty();

  joinedCalls.forEach(element => {
    var istTimestamp = new Date(element.time);

    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };

    const milliseconds = element.duration; // Example value, representing the duration in milliseconds
    const seconds = Math.floor((milliseconds / 1000) % 60); // Calculate the seconds
    const minutes = Math.floor(milliseconds / 60000); // Calculate the minutes

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} min`; // Format the time

    var user = "";
    var Image = "";
    if (element.roomName.includes(',') || element.roomName.includes('...')) {
      user = `<p>${element.participantCount} Participants, ${istTimestamp.toLocaleDateString('en-US', options)}, ${formattedTime} </p>`;
      Image = `<img class="user-big-icon" src="${element.groupIcon == "" ? 'modules/images/group_icon.svg' : `uploads/${element.groupIcon}`}" />`;
    } else {
      user = `<p>${istTimestamp.toLocaleDateString('en-US', options)}, ${formattedTime} </p>`;
      Image = `<img class="user-big-icon" src="${element.groupIcon == "" ? 'modules/images/default_user.svg' : `uploads/${element.groupIcon}`}" />`;
    }

    var listItem = document.createElement("li");
    listItem.innerHTML = `<li class="">
                <div class="row">
                <div class="col-md-9 col-sm-9 col-8">
                <div class="user-profile-container">
                <div class="user-profile-image">
                ${Image}
                <!-- <div class="online-status-icon online-view"></div> -->
                </div>
                <div class="user-profile-details">
                <h6>${element.roomName}</h6>
                ${user}
                </div>
                </div>
                </div>
                <div class="col-md-3 col-sm-3 col-4">
                <div class="call-join-btn-container">
                <button class="call-join-btn" onclick="callUser('','${element.roomid}')">
                <img src="modules/images/video-icon.svg" alt="" />
                Call
                </button>
                </div>
                </div>
                </div>
                </li>`

    univCallHistory.append(listItem);
  });
}

function BindNotifications(missedCalls, roomList) {
  var NotificationUl = $("#NotificationUl");

  if (missedCalls.length == 0) {
    var listItem = "<li><h6>No new notifications</h6></li>"
    NotificationUl.empty();
    NotificationUl.append(listItem);
  } else {

    NotificationUl.empty();

    if (missedCalls.length > 0) {
      // Add heading for missed calls
      var missedCallsHeading = "<li><h6>Personal / Group Calls</h6></li>";
      NotificationUl.append(missedCallsHeading);

      missedCalls.forEach(element => {


        const dateTime = new Date(element.time);

        const dateOptions = {
          month: "long",
          day: "numeric"
        };

        const timeOptions = {
          hour: "numeric",
          minute: "numeric",
          hour12: true
        };

        const dateString = dateTime.toLocaleDateString("en-US", dateOptions);
        const timeString = dateTime.toLocaleTimeString("en-US", timeOptions);

        const formattedDateTime = dateString + ", " + timeString;

        var listItem = document.createElement("li");
        listItem.innerHTML = `<li>
                  <div class="row">
                  <div class="col-2">
                  <div class="notification-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="30" height="30" viewBox="0 0 30 30">
                  <defs>
                  <style>
                  .video-miss-a {
                    fill: url(#VideoMissa);
                  }
                  
                  .video-miss-b {
                    fill: #fff;
                  }
                  </style>
                  <linearGradient id="VideoMissa" x1="0.825" y1="0.126" x2="0.209" y2="0.902"
                  gradientUnits="objectBoundingBox">
                  <stop offset="0" stop-color="#01bdf4" />
                  <stop offset="1" stop-color="#009dff" />
                  </linearGradient>
                  </defs>
                  <g transform="translate(-1090 -329)">
                  <rect class="video-miss-a" width="30" height="30" rx="15"
                  transform="translate(1090 329)" />
                  <path class="video-miss-b"
                  d="M16.873,17.69a.818.818,0,0,0,.816-.816V14.025a.818.818,0,0,0-.816-.816,9.309,9.309,0,0,1-2.913-.465.685.685,0,0,0-.253-.041.836.836,0,0,0-.579.237l-1.8,1.8A12.363,12.363,0,0,1,5.954,9.357l1.8-1.8a.819.819,0,0,0,.2-.832,9.271,9.271,0,0,1-.465-2.913A.818.818,0,0,0,6.672,3H3.816A.818.818,0,0,0,3,3.816,13.872,13.872,0,0,0,16.873,17.69Zm-2.938-3.248a10.407,10.407,0,0,0,2.122.367v1.216a12.589,12.589,0,0,1-3.1-.612ZM4.657,4.632H5.881a10.609,10.609,0,0,0,.375,2.114l-.979.979A12.1,12.1,0,0,1,4.657,4.632Z"
                  transform="translate(1095.102 334.102)" />
                  </g>
                  </svg>
                  </div>
                  </div>
                  <div class="col-md-6 col-sm-6 col-6">
                  <div class="notification-details">
                  <p>
                  You missed a ${element.type} call from
                  <span>${element.roomName}</span>
                  </p>
                  <p class="time-date">${formattedDateTime}</p>
                  </div>
                  </div>
                  <div class="col-md-4 col-sm-4 col-4">
                  <div class="call-join-btn-container">
                  <button class="call-join-btn" onclick="callUser('','${element.roomid}')">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="30" height="30" viewBox="0 0 30 30">
                  <defs>
                  <style>
                  .add-video-a {
                    fill: #fff;
                    stroke: #707070;
                    opacity: 0;
                  }
                  
                  .add-video-b {
                    fill: url(#AddVideoa);
                  }
                  
                  .add-video-c {
                    stroke: none;
                  }
                  
                  .add-video-d {
                    fill: none;
                  }
                  </style>
                  <linearGradient id="AddVideoa" x1="0.813" y1="0.225" x2="0.171" y2="1"
                  gradientUnits="objectBoundingBox">
                  <stop offset="0" stop-color="#01bdf4" />
                  <stop offset="1" stop-color="#009dff" />
                  </linearGradient>
                  </defs>
                  <g transform="translate(-1090 -329)">
                  <g class="add-video-a" transform="translate(1090 329)">
                  <rect class="add-video-c" width="30" height="30" rx="15" />
                  <rect class="add-video-d" x="0.5" y="0.5" width="29" height="29" rx="14.5" />
                  </g>
                  <path class="add-video-b"
                  d="M0,6V17.017H13.221V13.161l4.407,2.2V7.653l-4.407,2.2V6Z"
                  transform="translate(1096.092 332.307)" />
                  </g>
                  </svg>
                  Call
                  </button>
                  </div>
                  </div>
                  </div>
                  </li>`

        NotificationUl.append(listItem);
      });
    }

    var hasMeetingInvitations = roomList.some(room => room.schedules.length > 0);

    if (hasMeetingInvitations) {
      // Add heading for meeting invitations only once
      var meetingInvitationsHeading = "<li><h6>Meeting Invitations</h6></li>";
      NotificationUl.append(meetingInvitationsHeading);
    }


    roomList.forEach((room) => {
      if (room.schedules.length > 0) {
        room.schedules.forEach((schedule, index) => {
          var istTimestamp = new Date(schedule);

          const dateOptions = {
            month: "long",
            day: "numeric"
          };

          const timeOptions = {
            hour: "numeric",
            minute: "numeric",
            hour12: true
          };

          const dateString = istTimestamp.toLocaleDateString("en-US", dateOptions);
          const timeString = istTimestamp.toLocaleTimeString("en-US", timeOptions);

          const formattedDateTime = dateString + ", " + timeString;


          let groupname;
          if (room.name == "") {
            let user = [];
            var i = 0;
            room.joinedusers.forEach((element) => {
              user.push(element.name.replace(/ /g, ""));
              i++;
            });
            i > 1
              ? (groupname =
                user.toString().toLocaleLowerCase().slice(0, 15) + "...")
              : (groupname = user.toString());
          }

          var listItem = document.createElement("li");
          listItem.innerHTML = `<li>
                      <div class="row">
                      <div class="col-2">
                      <div class="notification-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="30" height="30" viewBox="0 0 30 30">
                      <defs>
                      <style>
                      .video-miss-a {
                        fill: url(#VideoMissa);
                      }
                      
                      .video-miss-b {
                        fill: #fff;
                      }
                      </style>
                      <linearGradient id="VideoMissa" x1="0.825" y1="0.126" x2="0.209" y2="0.902"
                      gradientUnits="objectBoundingBox">
                      <stop offset="0" stop-color="#01bdf4" />
                      <stop offset="1" stop-color="#009dff" />
                      </linearGradient>
                      </defs>
                      <g transform="translate(-1090 -329)">
                      <rect class="video-miss-a" width="30" height="30" rx="15"
                      transform="translate(1090 329)" />
                      <path class="video-miss-b"
                      d="M16.873,17.69a.818.818,0,0,0,.816-.816V14.025a.818.818,0,0,0-.816-.816,9.309,9.309,0,0,1-2.913-.465.685.685,0,0,0-.253-.041.836.836,0,0,0-.579.237l-1.8,1.8A12.363,12.363,0,0,1,5.954,9.357l1.8-1.8a.819.819,0,0,0,.2-.832,9.271,9.271,0,0,1-.465-2.913A.818.818,0,0,0,6.672,3H3.816A.818.818,0,0,0,3,3.816,13.872,13.872,0,0,0,16.873,17.69Zm-2.938-3.248a10.407,10.407,0,0,0,2.122.367v1.216a12.589,12.589,0,0,1-3.1-.612ZM4.657,4.632H5.881a10.609,10.609,0,0,0,.375,2.114l-.979.979A12.1,12.1,0,0,1,4.657,4.632Z"
                      transform="translate(1095.102 334.102)" />
                      </g>
                      </svg>
                      </div>
                      </div>
                      <div class="col-md-6 col-sm-6 col-6">
                      <div class="notification-details">
                      <p>
                      <span>${room.name == "" ? groupname : room.name} </span>invited to join a meeting.
                      </p>
                      <p class="time-date">${formattedDateTime}</p>
                      </div>
                      </div>
                      <div class="col-md-4 col-sm-4 col-4">
                      <div class="call-join-btn-container">
                      <button class="call-join-btn" onclick="location.href = '${room.url}';">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="30" height="30" viewBox="0 0 30 30">
                      <defs>
                      <style>
                      .add-video-a {
                        fill: #fff;
                        stroke: #707070;
                        opacity: 0;
                      }
                      
                      .add-video-b {
                        fill: url(#AddVideoa);
                      }
                      
                      .add-video-c {
                        stroke: none;
                      }
                      
                      .add-video-d {
                        fill: none;
                      }
                      </style>
                      <linearGradient id="AddVideoa" x1="0.813" y1="0.225" x2="0.171" y2="1"
                      gradientUnits="objectBoundingBox">
                      <stop offset="0" stop-color="#01bdf4" />
                      <stop offset="1" stop-color="#009dff" />
                      </linearGradient>
                      </defs>
                      <g transform="translate(-1090 -329)">
                      <g class="add-video-a" transform="translate(1090 329)">
                      <rect class="add-video-c" width="30" height="30" rx="15" />
                      <rect class="add-video-d" x="0.5" y="0.5" width="29" height="29" rx="14.5" />
                      </g>
                      <path class="add-video-b"
                      d="M0,6V17.017H13.221V13.161l4.407,2.2V7.653l-4.407,2.2V6Z"
                      transform="translate(1096.092 332.307)" />
                      </g>
                      </svg>
                      Join
                      </button>
                      </div>
                      </div>
                      </div>
                      </li>`

          NotificationUl.append(listItem);


        });

      }

    });
  }
}

function BindBlockedUsers(blockedContacts) {
  var BlockUl = $(".block-list");
  if (blockedContacts.length == 0) {
    var listItem = document.createElement("li");
    listItem.innerHTML = "<li style='margin-left: 150px;'><h6>No blocked contacts</h6></li>";
    BlockUl.empty().append(listItem);
    return 0;
  } else {
    BlockUl.empty();
    blockedContacts.forEach(element => {
      var listItem = document.createElement("li");
      listItem.innerHTML = `<li class="">
                  <div class="row">
                  <div class="col-md-8 col-sm-8 col-7">
                  <div class="user-details-view">
                  <div class="user-profile-image">
                  <img src=${element.profilePic == null || element.profilePic == "" ? "modules/images/default_user.svg" : "uploads/" + element.profilePic}
                  />
                  
                  <div class="online-status-icon online-view"></div>
                  </div>
                  <div class="user-profile-details">
                  <h6>${element.name}</h6>
                  </div>
                  </div>
                  </div>
                  <div class="col-md-4 col-sm-4 col-5">
                  <div class="pl-0 pull-right">
                  <button class="unblock-btn" onclick="unBlockContact('${element.userID}')" data-bs-dismiss="modal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                  <defs>
                  <style>
                  .block-icon-a {
                    fill: #fff;
                  }
                  
                  .block-icon-a,
                  .block-icon-b,
                  .block-icon-c {
                    stroke: #ff6767;
                    stroke-width: 1.5px;
                  }
                  
                  .block-icon-b,
                  .block-icon-c,
                  .block-icon-e {
                    fill: none;
                  }
                  
                  .block-icon-c {
                    opacity: 0;
                  }
                  
                  .block-icon-d {
                    stroke: none;
                  }
                  </style>
                  </defs>
                  <g transform="translate(355 -1093.373) rotate(90)">
                  <g class="block-icon-a" transform="translate(1093.373 333)">
                  <circle class="block-icon-d" cx="11" cy="11" r="11" />
                  <circle class="block-icon-e" cx="11" cy="11" r="10.25" />
                  </g>
                  <line class="block-icon-b" y2="12" transform="translate(1104.636 338)" />
                  <line class="block-icon-c" y2="12" transform="translate(1110.635 344) rotate(90)" />
                  </g>
                  </svg>
                  Unblock
                  </button>
                  </div>
                  </div>
                  </div>
                  </li>`

      BlockUl.append(listItem);
    });

  }
}


var selectedRowData = {};
var recentCallHistory = [];

// function to bind the individual call list under the Individual calls Category
function bindindividualCalls(participant) {

  var list = "";
  var listview = $(".list-wrapper");
  if (participant.length == 0) {
    list = "<li style='text-align: center; margin-top:20px;'><h6>No individual calls to display</h6></li>"
  } else {
    listview.removeClass("loader-center");
    participant.forEach((element) => {
      list += `<li class="">
                  <div class="row" onclick='createdPopupData(${JSON.stringify(
        element
      )})'>
                    <div class="col-lg-8 col-md-7 col-sm-8 col-7">
                    <div class="user-profile-container" data-bs-toggle="modal" data-bs-target="#profileView">
                    <div class="user-profile-image">
                    <img class="user-big-icon rounded-circle" src=${element.joinedusers[0].profileImg == null
          ? "modules/images/default_user.svg"
          : "uploads/" + element.joinedusers[0].profileImg
        }>
                    ${element.joinedusers[0].status == "Active"
          ? '<div class="online-status-icon online-view"></div>'
          : ""
        }
                  </div>
                  <div class="user-profile-details">
                  <h6>${element.joinedusers[0].name}</h6>
                  <p class="user-email">
                  ${element.joinedusers[0].email}
                  </p>
                  </div>
                  </div>
                  </div>
                  <div class="col-lg-4 col-md-5 col-sm-4 col-5">
                  <div class="call-join-btn-container">
                  <button class="call-join-btn" onclick="callUser('','${element.roomid
        }')">
                  <img src="modules/images/video-icon.svg" alt="">
                  ${element.joinedusers[0].status == "Active" ? "Join" : "Call"}
                  </button>

                  <button class="audio-call-btn" onclick="callUser('','${element.roomid
        }','audio')">
                          <img src="modules/images/voice-icon.svg" alt="">                         
                          </button>

                  </div>
                  </div>
                  </div>
                  </li>`;
    });
  }

  $("#favourites").empty().append(list);
}

function bindFavouriteCalls(participant) {
  var list = "";
  var listview = $(".list-wrapper");
  if (participant.length == 0) {
    list = "<li style='text-align: center; margin-top:20px;'><h6>No favourite calls to display</h6></li>"
  } else {
    listview.removeClass("loader-center");
    participant.forEach((element) => {
      if (element.joinedusers.length == 1) {
        list += `<li class="">
                  <div class="row" onclick='createdPopupData(${JSON.stringify(
          element
        )})'>
                    <div class="col-lg-8 col-md-7 col-sm-8 col-7">
                    <div class="user-profile-container" data-bs-toggle="modal" data-bs-target="#profileView">
                    <div class="user-profile-image">
                    <img class="user-big-icon rounded-circle" src=${element.joinedusers[0].profileImg == null
            ? "modules/images/default_user.svg"
            : "uploads/" + element.joinedusers[0].profileImg
          }>
                    ${element.joinedusers[0].status == "Active"
            ? '<div class="online-status-icon online-view"></div>'
            : ""
          }
                  </div>
                  <div class="user-profile-details">
                  <div class="fav-icon-area">
                    <h6 class="user-name">${element.joinedusers[0].name}</h6>
                    <div class="fav-icon">
                     <img src="modules/images/fav-icon.svg" alt="">   
                    </div>
                  </div>
                  <p class="user-email">
                  ${element.joinedusers[0].email}
                  </p>
                  </div>
                  </div>
                  </div>
                  <div class="col-lg-4 col-md-5 col-sm-4 col-5">
                  <div class="call-join-btn-container">
                  <button class="call-join-btn" onclick="callUser('','${element.roomid
          }')">
                  <img src="modules/images/video-icon.svg" alt="">
                  ${element.joinedusers[0].status == "Active" ? "Join" : "Call"}
                  </button>
                  <button class="audio-call-btn"
                  onclick="callUser('','${element.roomid}','audio')">
                  <img src="modules/images/voice-icon.svg" alt="">                         
                  </button>
                  </div>
                  </div>
                  </div>
                  </li>`;
      } else {
        // Group binding
        let user = [];
        element.joinedusers.forEach((element) => {
          user.push(element.name.replace(/ /g, ""));
        });

        let groupname =
          user.toString().toLocaleLowerCase().slice(0, 25) + "...";
        list += `<li class="">
                  <div class="row" onclick='createdPopupData(${JSON.stringify(
          element
        )},"${groupname}")'>
                    <div class="col-lg-8 col-md-7 col-sm-8 col-7">
                    <div class="user-profile-container" data-bs-toggle="modal" data-bs-target="#profileView">
                    <div class="user-profile-image">
                    <img class="user-big-icon rounded-circle"  src=${element.groupIcon == "" || element.groupIcon == null
            ? "modules/images/group_icon.svg"
            : "uploads/" + element.groupIcon
          }>
                  ${element.status == "Active"
            ? '<div class="online-status-icon online-view"></div>'
            : ""
          }
                </div>

                <div class="user-profile-details">
                <div class="fav-icon-area">
                  <div class="fav-icon-content">
                    <h6 class="fav-name">${element.name == "" ? groupname : element.name}</h6>
                    <div class="fav-icon">
                      <img src="modules/images/fav-icon.svg" alt="">
                    </div>
                  </div>
                </div>
                <p class="user-email">
                ${element.joinedusers.length + 1} Participants
                </p>
                </div>
                </div>
                </div>
                <div class="col-lg-4 col-md-5 col-sm-4 col-5">
                <div class="call-join-btn-container">
                <button class="call-join-btn" onclick="callUser('','${element.roomid
          }')">
                <img src="modules/images/video-icon.svg" alt="">
                ${element.status == "Active" ? "Join" : "Call"}
                </button>
                <button class="audio-call-btn" 
                onclick="callUser('','${element.roomid}','audio')">
                <img src="modules/images/voice-icon.svg" alt="">                         
                </button>
                </div>
                </div>
                </div>
                </li>`;
      }
    });
  }

  $("#favourites").empty().append(list);
}

// function to bind the recent calls under the Recent calls category, calls which may be group calls or individual calls
function bindRecentCalls(participant) {
  var list = "";
  var listview = $(".list-wrapper");
  if (participant.length == 0) {
    list = "<li style='text-align: center; margin-top:20px;'><h6>No Recent calls to display</h6></li>"
  } else {
    listview.removeClass("loader-center");
    recentCallHistory = participant;

    participant.forEach((element) => {
      if (element.joinedusers.length == 1) {
        // individual binding
        list += `<li class="">
                    <div class="row" onclick='createdPopupData(${JSON.stringify(element)})'>
                    <div class="col-lg-8 col-md-7 col-sm-8 col-7">
                    <div class="user-profile-container" data-bs-toggle="modal" data-bs-target="#profileView">
                    <div class="user-profile-image">
                    <img class="user-big-icon rounded-circle" src=${element.joinedusers[0].profileImg == null
            ? "modules/images/default_user.svg"
            : "uploads/" + element.joinedusers[0].profileImg
          }>
                    ${element.joinedusers[0].status == "Active"
            ? '<div class="online-status-icon online-view"></div>'
            : ""
          }
                  </div>
                  <div class="user-profile-details">
                  <h6>${element.joinedusers[0].name}</h6>
                  <p class="user-email">
                  ${element.joinedusers[0].email}
                  </p>
                  </div>
                  </div>
                  </div>
                  <div class="col-lg-4 col-md-5 col-sm-4 col-5">
                  <div class="call-join-btn-container">
                  <button class="call-join-btn" onclick="callUser('','${element.roomid
          }','video')">
                  <img src="modules/images/video-icon.svg" alt="">
                  ${element.joinedusers[0].status == "Active" ? "Join" : "Call"}
                  </button>
                  <button class="audio-call-btn" onclick="callUser('','${element.roomid
          }','audio')">
                          <img src="modules/images/voice-icon.svg" alt="">                         
                          </button>
                  </div>
                  </div>
                  </div>
                  </li>`;
      } else {
        // Group binding
        let user = [];
        element.joinedusers.forEach((element) => {
          user.push(element.name.replace(/ /g, ""));
        });

        let groupname =
          user.toString().toLocaleLowerCase().slice(0, 25) + ".....";
        list += `<li class="">
                  <div class="row" onclick='createdPopupData(${JSON.stringify(
          element
        )},"${groupname}")'>
                    <div class="col-lg-8 col-md-7 col-sm-8 col-7">
                    <div class="user-profile-container" data-bs-toggle="modal" data-bs-target="#profileView">
                    <div class="user-profile-image">
                    <img class="user-big-icon rounded-circle"  src=${element.groupIcon == "" || element.groupIcon == null
            ? "modules/images/group_icon.svg"
            : "uploads/" + element.groupIcon
          }>
                  ${element.status == "Active"
            ? '<div class="online-status-icon online-view"></div>'
            : ""
          }
                </div>
                <div class="user-profile-details">
                <h6>${element.name == "" ? groupname : element.name}</h6>
                <p class="user-email">
                ${element.joinedusers.length + 1} Participants
                </p>
                </div>
                </div>
                </div>
                <div class="col-lg-4 col-md-5 col-sm-4 col-5">
                <div class="call-join-btn-container">
                <button class="call-join-btn" onclick="callUser('','${element.roomid
          }','video')">
                <img src="modules/images/video-icon.svg" alt="">
                ${element.status == "Active" ? "Join" : "Call"}
                </button>

                <button class="audio-call-btn" onclick="callUser('','${element.roomid
          }','audio')">
                      <img src="modules/images/voice-icon.svg" alt="">                   
                      </button>

                </div>
                </div>
                </div>
                </li>`;
      }



    });
  }


  $("#recentCalls").empty().append(list);
}

// function to bind group calls under the Group Calls category
function bindGroupCalls(participant) {
  var list = "";
  var listview = $(".list-wrapper");
  if (participant.length == 0) {
    list = "<li style='text-align: center; margin-top:20px;'><h6>No Group calls to display</h6></li>"
  } else {
    listview.removeClass("loader-center");
    participant.forEach((element) => {
      let user = [];
      element.joinedusers.forEach((element) => {
        user.push(element.name.replace(/ /g, ""));
      });

      let groupname =
        user.toString().toLocaleLowerCase().slice(0, 25) + ".....";
      list += `<li class="">
              <div class="row" id="profileItem" onclick='createdPopupData(${JSON.stringify(
        element
      )},"${groupname}")'>
                <div class="col-lg-8 col-md-7 col-sm-8 col-7">
                <div class="user-profile-container" data-bs-toggle="modal" data-bs-target="#profileView">
                <div class="user-profile-image">
                <img class="user-big-icon rounded-circle"  src=${element.groupIcon == null || element.groupIcon == ""
          ? "modules/images/group_icon.svg"
          : "uploads/" + element.groupIcon
        }>
              ${element.status == "Active"
          ? '<div class="online-status-icon online-view"></div>'
          : ""
        }
            </div>
            <div class="user-profile-details">
            <h6>${element.name == "" ? groupname : element.name}</h6>
            <p class="user-email">
            ${element.joinedusers.length + 1} Participants
            </p>
            </div>
            </div>
            </div>
            <div class="col-lg-4 col-md-5 col-sm-4 col-5">
            <div class="call-join-btn-container">
            <button class="call-join-btn" onclick="callUser('','${element.roomid
        }','video')">
            <img src="modules/images/video-icon.svg" alt="">
            ${element.status == "Active" ? "Join" : "Call"}
            </button>

            <button class="audio-call-btn" onclick="callUser('','${element.roomid
        }','audio')">
                <img src="modules/images/voice-icon.svg" alt="">
                </button>

            </div>
            </div>
            </div>
            </li>`;
    });
  }

  $("#Groupcalls").empty().append(list);
}

$("#groupIcon").change(function () {
  var form = new FormData();
  ApiURL = window.location.origin + "/uploadfile";
  form.append("Picture", $("#groupIcon")[0].files[0]);
  var settings = {
    url: ApiURL,
    method: "POST",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    response = JSON.parse(response);
    if (response.success) {
      $(".Img_ProfilePic").attr("src", "uploads/" + response.filename);
      $(".pro-img").attr("src", "uploads/" + response.filename);

      var data = {
        ProfileImg: response.filename,
        UserId: getuserid(),
      };
      UpdateProfilePic(data);
    }
  });
});

// function to make call to the users by clicking call button associated with each user
function callUser(userid, roomid, type) {
  if (type == 'audio') {
    localStorage.setItem("video", false);
  }
  else {
    localStorage.setItem("video", true);
  }

  localStorage.setItem("RoomId", roomid);
  location.href = "/confieranceroom.html";
}

// function to make data binding into the popup that showing the corresponding user details
function createdPopupData(data, groupname = "") {
  $("#favouriteContact").off("click");
  let userid;
  if (groupname == "" || groupname == null) {
    userid = [data.joinedusers[0].userid];
    $('#blockContact').parent().show();
    $("#EditGroup").parent().hide();
  }
  else {
    $('#blockContact').parent().hide();
    $("#EditGroup").parent().show();
    let ids = data.joinedusers.map((it) => it.userid);
    ids.push(getCookieDetails("userID"));
    userid = ids;
  }

  if (data.isfav == true) {
    $('#favouriteContact').addClass("active");
  } else {
    $('#favouriteContact').removeClass("active");
  }

  $("#EditGroup").attr("href", `edit_group.html?roomid=${data.roomid}`);

  $("#favouriteContact").on("click", function () {
    // Get values needed for operations
    const roomId = data.roomid;
    const active = data.isfav;

    // Depending on the 'active' status, call respective functions
    if (active) {
      $('#favouriteContact').removeClass("active");
      const dataObj = {
        commandType: "UnFavouriteContact",
        Data: {
          unfavouriteid: roomId,
          userid: JSON.parse(getCookie()).userID
        }
      };
      server.sendCommand(JSON.stringify(dataObj));
    } else {
      $('#favouriteContact').addClass("active");
      const dataObj = {
        commandType: "FavouriteContact",
        Data: {
          favouriteid: roomId,
          userid: JSON.parse(getCookie()).userID
        }
      };
      server.sendCommand(JSON.stringify(dataObj));
    }
    DashboardParticipantsList("");
  });


  selectedRowData = {
    groupIcon:
      groupname == ""
        ? data.joinedusers[0].profileImg
          ? data.joinedusers[0].profileImg
          : ""
        : data.groupIcon,
    status:
      groupname == "" || groupname == null
        ? data.joinedusers[0].status
        : data.status,
    name:
      groupname == ""
        ? data.joinedusers[0].name
        : data.name == ""
          ? groupname
          : data.name,
    participants: data.joinedusers.length + 1,
    email: groupname == "" ? data.joinedusers[0].email : "",
    roomid: data.roomid,
    userid: userid,
  };

  $("#profileView")
    .find("#participantProfile")
    .attr(
      "src",
      data.groupIcon == "" || data.groupIcon == null
        ? "modules/images/group_icon.svg"
        : "uploads/" + data.groupIcon
    );

  if (groupname == "") {
    $("#profileView")
      .find("#groupOrIndividualName")
      .text(`${data.joinedusers[0].name}`);
    $("#profileView")
      .find("#participantCount")
      .text(`${data.joinedusers[0].email}`);
    $("#profileView")
      .find("#participantName")
      .text(`${data.joinedusers[0].name}`);

    if (data.joinedusers[0].status == "Active") {
      $("#profileView #participantUserStatus").addClass(
        "online-status-icon online-view"
      );
      $("#profileView")
        .find("#participantCall")
        .contents()
        .last()
        .replaceWith("Join");
    } else {
      $("#profileView #participantUserStatus").removeClass();
      $("#profileView")
        .find("#participantCall")
        .contents()
        .last()
        .replaceWith("Call");
    }
  } else {
    $("#profileView")
      .find("#groupOrIndividualName")
      .text(`${data.name == "" ? groupname : data.name}`);
    $("#profileView")
      .find("#participantCount")
      .text(`${data.joinedusers.length + 1} Participants`);
    $("#profileView")
      .find("#participantName")
      .text(`${data.name == "" ? groupname : data.name}`);

    if (data.status == "Active") {
      $("#profileView #participantUserStatus").addClass(
        "online-status-icon online-view"
      );
      $("#profileView")
        .find("#participantCall")
        .contents()
        .last()
        .replaceWith("Join");
    } else {
      $("#profileView #participantUserStatus").removeClass();
      $("#profileView")
        .find("#participantCall")
        .contents()
        .last()
        .replaceWith("Call");
    }
    if (data.host)
      $("#hostName").html(`Host: ${data.host}`)

  }

  $("#goToUserCallHistory").click(function () {
    callHistoryPopupData(JSON.stringify(data), groupname)
  });

  $("#deleteCall").click(function () {
    $("#deleteConfirm").off("click");
    $("#deleteConfirm").click(function () {
      var dataObj = {
        commandType: "DeleteCall",
        Data: {
          roomid: data.roomid,
          userid: JSON.parse(getCookie()).userID
        },
      };
      server.sendCommand(JSON.stringify(dataObj));
    });
  });

  $("#blockContact").click(function () {
    $("#blockPopup").off("click");
    $("#blockPopup").click(function () {
      var dataObj = {
        commandType: "BlockContact",
        Data: {
          blockid: data.joinedusers[0].userid,
          userid: JSON.parse(getCookie()).userID
        },
      };
      server.sendCommand(JSON.stringify(dataObj));
    });
  });
}

// function to schedule the meeting with data from the selected individual or group
function scheduleMeeting() {
  // Get the current URL
  const currentURL = window.location.href;

  // Extract the base URL
  const baseURL = currentURL.split('/').slice(0, 3).join('/');

  $("#scheduleMeeting")
    .find("#scheduleParticipantProfile")
    .attr(
      "src",
      selectedRowData.groupIcon == "" || selectedRowData.groupIcon == null
        ? "modules/images/default_user.svg"
        : "uploads/" + selectedRowData.groupIcon
    );
  $("#scheduleMeeting")
    .find("#scheduleDataName")
    .text(`${selectedRowData.name}`);
  $("#scheduleUrl").val(
    `${baseURL}Join.html?Rid=${selectedRowData.roomid}&RU=aHR0cHM6Ly9sdWNlbnRzdXJnaWNhbC5jb20vbG9naW4&Uid=Guest`
  );

  if (selectedRowData.status == "Active") {
    $("#scheduleMeeting #scheduleMeetingUserStatus").addClass(
      "online-status-icon online-view"
    );
  } else {
    $("#scheduleMeeting #scheduleMeetingUserStatus").removeClass();
  }

  if (selectedRowData.email == "")
    $("#scheduleMeeting")
      .find("#scheduleDataEmailOrCount")
      .text(`${selectedRowData.participants} Participants`);
  else
    $("#scheduleMeeting")
      .find("#scheduleDataEmailOrCount")
      .text(`${selectedRowData.email}`);
}

// function to call the participants from the popup
$("#participantCall").click(function () {
  callUser("", selectedRowData.roomid);
});

// To add data into fields on page loading
$(document).ready(function () {
  var daysInMonth = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var monthSelect = $("#monthSelect");
  var daySelect = $("#daySelect");
  var yearSelect = $("#yearSelect");
  var timeSelect = $("#timeSelect");

  $.each(months, function (index, month) {
    monthSelect.append(
      $("<option></option>")
        .val(index + 1)
        .text(month)
    );
  });
  // Get current date
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth() + 1; // Month is zero-based
  var currentDay = currentDate.getDate();
  var currentYear = currentDate.getFullYear();

  updateTime();
  function updateTime() {
    var currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    var timeString = hours + ":" + minutes;
    timeSelect.val(timeString);
  }

  setInterval(function () {
    var currentDate = new Date();
    var Seconds = currentDate.getSeconds();
    if (Seconds === 0) {
      updateTime();
    }
  }, 1000);

  monthSelect.val(currentMonth);
  var days = daysInMonth[currentMonth];
  var endYear = currentYear + 10;
  for (var i = 1; i <= days; i++) {
    daySelect.append($("<option></option>").val(i).text(i));
  }

  // Set current day as selected
  daySelect.val(currentDay);
  monthSelect.on("change", function () {
    var selectedMonth = parseInt($(this).val());
    var days = daysInMonth[selectedMonth];

    daySelect.empty();
    for (var i = 1; i <= days; i++) {
      daySelect.append($("<option></option>").val(i).text(i));
    }
  });

  for (var year = currentYear; year <= endYear; year++) {
    yearSelect.append($("<option></option>").val(year).text(year));
  }

  // function on hover to display the tooltip
  $("#shareUrlBtn").hover(
    function () {
      // Show tooltip on hover
      $(this).append('<span class="tooltip">copy URL</span>');
      $(".tooltip").css("opacity", "1");
    },
    function () {
      // Hide tooltip on hover out
      $(".tooltip").css("opacity", "0");
      setTimeout(function () {
        $(".tooltip").remove();
      }, 300);
    }
  );

  // function will call on click event
  $("#shareUrlBtn").on("click", function () {
    navigator.clipboard.writeText($("#scheduleUrl").val());
    $(".tooltip").remove();
    $(this).append('<span class="tooltip">URL copied to clipboard</span>');
    $(".tooltip").css("opacity", "1");
  });
});

// function to schedule the meeting and submit to API
function scheduleMeetingSubmit() {
  let date = `${$("#yearSelect").val()}-${$("#monthSelect").val().length == 1
    ? "0" + $("#monthSelect").val()
    : $("#monthSelect").val()
    }-${$("#daySelect").val().length == 1
      ? "0" + $("#daySelect").val()
      : $("#daySelect").val()
    }`;

  var dataObj = {
    commandType: "ScheduleCall",
    Data: {
      url: $("#scheduleUrl").val(),
      date: `${date}T${$("#timeSelect").val()}:00.000+05:30`,
      roomid: selectedRowData.roomid,
    },
  };
  server.sendCommand(JSON.stringify(dataObj));
}

function fillDashboardDetails() {
  var UserDetails = getCookie();
  if (UserDetails != undefined) {
    UserDetails = JSON.parse(UserDetails);
    var curHr = new Date().getHours();
    var time = null;
    if (curHr < 12) {
      time = "Good Morning";
    } else if (curHr < 18) {
      time = "Good Afternoon";
    } else {
      time = "Good Evening";
    }
    $("#lbl_wel_username").text(time + ", " + UserDetails.name);
    $(".lbl_Username").text(UserDetails.name);
    $(".lbl_email").text(UserDetails.email);
    if (
      UserDetails.profilePic != null &&
      UserDetails.profilePic != undefined &&
      UserDetails.profilePic != ""
    ) {
      $(".Img_ProfilePic").attr("src", "uploads/" + UserDetails.profilePic);
      $(".pro-img").attr("src", "uploads/" + UserDetails.profilePic);
    }

    $("#ContactVisibilityToggle,#ContactVisibilityToggleMobile").prop("checked", UserDetails.isVisible);

    $("#MeetInviNotifToggle").prop("checked", UserDetails.Notifications.MeetingInvitation);
    $("#NewGroupNotifToggle").prop("checked", UserDetails.Notifications.NewGroup);
    $("#MissCallNotifToggle").prop("checked", UserDetails.Notifications.MissedCall);
    MeetingInvitationNotification = UserDetails.Notifications.MeetingInvitation;
    newGroupNotification = UserDetails.Notifications.NewGroup;
    missedCallNotification = UserDetails.Notifications.MissedCall;

  } else {
    location.href = "./dashboard.html";
  }
}

function scheduleUrlBtnClick(button, url) {
  var btnId = button.id.toString().split("ScheduleShareUrlBtn_")[1];
  navigator.clipboard.writeText(url);
  $(`.tooltip-${btnId}`).css("opacity", "0");
  setTimeout(function () {
    $(`.tooltip-${btnId}`).remove();
  }, 300);

  $(button).append(`<span class="tooltip-${btnId}">URL copied to clipboard</span>`);
  $(`.tooltip-${btnId}`).css(
    {
      "opacity": "1",
      "position": "absolute",
      "text-align": "center",
      "width": "7%",
      "margin-top": "29px",
      "transform": "translateX(-50%)",
      "background-color": "white",
      "color": "#009DFF",
      "padding": " 4px 8px",
      "border": "0.5px solid #0000001D",
      "border-radius": "8px",
      "font-size": "14px",
      "transition": "opacity 0.9s ease"
    }
  );
}

// function will trigger when we click on the call button inside the call history profile
function callHistoryBtn() {
  callUser("", selectedRowData.roomid);
}

// function to bind data into the call history popup
function callHistoryPopupData(data, groupname = "") {
  var dataObj = JSON.parse(data)
  $("#goToCallHistory")
    .find("#callHistoryProfile")
    .attr(
      "src",
      selectedRowData.groupIcon == "" || selectedRowData.groupIcon == null
        ? "modules/images/default_user.svg"
        : "uploads/" + selectedRowData.groupIcon
    );

  if (selectedRowData.status == "Active") {
    $("#goToCallHistory #callHistoryUserStatus").addClass(
      "online-status-icon online-view"
    );

    $("#goToCallHistory")
      .find("#historyParticipantCall")
      .contents()
      .last()
      .replaceWith("Join");
  } else {
    $("#goToCallHistory #callHistoryUserStatus").removeClass();
    $("#goToCallHistory")
      .find("#historyParticipantCall")
      .contents()
      .last()
      .replaceWith("Call");
  }

  $("#goToCallHistory")
    .find("#callHistoryName")
    .text(`${selectedRowData.name}`);

  if (selectedRowData.email == "")
    $("#goToCallHistory")
      .find("#callHistoryEmailOrCount")
      .text(`${selectedRowData.participants} Participants`);
  else
    $("#goToCallHistory")
      .find("#callHistoryEmailOrCount")
      .text(`${selectedRowData.email}`);

  var ulElement = $("#RoomCallHistory");
  ulElement.empty();
  dataObj.logs.forEach(element => {
    if (element.joinedusers.length < 2) {
      return;
    }
    var istTimestamp = new Date(element.starttime);

    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

    const milliseconds = element.duration; // Example value, representing the duration in milliseconds
    const seconds = Math.floor((milliseconds / 1000) % 60); // Calculate the seconds
    const minutes = Math.floor(milliseconds / 60000); // Calculate the minutes

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; // Format the time


    var listItem = document.createElement("li");
    listItem.innerHTML = `<li>
                                <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="user-profile-container">
                                <div class="user-profile-image">
                                <img class="" src="modules/images/history_video_call.svg" />
                                </div>
                                <div class="user-profile-details">
                                <h6>${formattedTime} Minutes</h6>
                                <p class="user-email">
                                ${element.joinedusers.length} Participants, ${istTimestamp.toLocaleDateString('en-US', options)}
                                </p>
                                </div>
                                </div>
                                </div>
                                </div>
                                </li>`

    ulElement.append(listItem);
  });
}

function unBlockContact(userID) {
  var dataObj = {
    commandType: "UnblockContact",
    Data: {
      unblockId: userID,
      userid: JSON.parse(getCookie()).userID
    },
  };
  server.sendCommand(JSON.stringify(dataObj));
}

$("#dashboardSearch").on("keyup", function () {
  DashboardParticipantsList(this.value);
});

$(document).on("click", function (e) {

  if (!$(".settings-container").is(e.target) && $(".settings-container").has(e.target).length === 0) {

    $(".settings-list").hide();
  }
  if (!$(".notification-container").is(e.target) && $(".notification-container").has(e.target).length === 0) {

    $(".notification-list").hide();
  }
});

var settings = {
  "url": `${origin}/getProjectConfig?Project=VideoConference`,
  "method": "GET",
  "timeout": 0,
};
$.ajax(settings).done(function (response) {
  localStorage.setItem("roomConfig", JSON.stringify(response.Data));
});
