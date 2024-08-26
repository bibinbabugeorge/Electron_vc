let submitUserList = [];
let UserDetail = [];
let IconName = null;
const serverUri = 'https://vps271818.vps.ovh.ca:3024';

$("#Usersearch").keyup(function () {
  SearchParticipants(this.value);
});

function CreateGroupInit(participant) {
  var list = "";
  if (participant !== null || participant !== undefined) {
    participant.forEach((element) => {
      UserDetail.push(element)
      let btnid = "btn_" + element.userid;
      let liid = "li_" + element.userid;
      list += `<li id="${liid}" class="SearchListItem">
      <div class="row">
      <div class="col-md-9 col-sm-8 col-8">
      <div class="user-profile-container">
      <div class="user-profile-image">
      <img src=${element.profileImg == null || element.profileImg == "" ? "modules/images/default_user.svg" : "uploads/" + element.profileImg}
      />
      ${(element.status == "Active") ? '<div class="online-status-icon online-view"></div>' : ''}
      </div>
      <div class="user-profile-details">
      <h6>${element.username}</h6>
      <p class="user-email">
      ${element.email}
      </p>
      </div>
      </div>
      </div>
      <div class="col-md-3 col-sm-4 col-4">
      <div class="call-join-btn-container">
      <button class="call-join-btn ${btnid}" onclick="AddToGroup('${element.userid}')">Add</button>
      </div>
      </div>
      </div>
      </li>`;
    });
  }

  $('#SearchList').empty().append(list);

  toggleButtontext();
}

function AddToGroup(userid) {
  let userobj = UserDetail.find(o => o.userid === userid);
  const userDBmodel = {
    name: userobj.username,
    userid: userobj.userid,
    clientid: userobj.clientid,
    email: userobj.email,
    profileImg: userobj.profileImg,
    status: userobj.status
  }

  const index = submitUserList.findIndex(o => o.userid === userid);
  if (index > -1) {
    submitUserList.splice(index, 1);
  }
  else {
    submitUserList.push(userDBmodel);
  }
  toggleButtontext();
}

function toggleButtontext() {
  $('.SearchListItem').removeClass("d-none");
  submitUserList.forEach(element => {
    $('#li_' + element.userid).addClass("d-none");
  });
  Bindparticipant(submitUserList)
}

$("#groupIcon").change(function () {
  var form = new FormData();
  ApiURL = serverUri + "/uploadfile"
  form.append("Picture", $('#groupIcon')[0].files[0]);
  var settings = {
    "url": ApiURL,
    "method": "POST",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    response = JSON.parse(response)
    if (response.success) {
      $("#groupImg").attr("src", "uploads/" + response.filename);
      IconName = response.filename;
    }
  });
});


function Bindparticipant(participant) {

  var list = "";
  if (participant !== null || participant !== undefined) {
    participant.forEach((element) => {
      list += `<li>
      <div class="row">
      <div class="col-md-9 col-sm-8 col-8">
      <div class="user-profile-container">
      <div class="user-profile-image">
      <img src=${element.profileImg == null || element.profileImg == "" ? "modules/images/default_user.svg" : "uploads/" + element.profileImg}
      />
      ${(element.status == "Active") ? '<div class="online-status-icon online-view"></div>' : ''}
      </div>
      <div class="user-profile-details">
      <h6>${element.name}</h6>
      <p class="user-email">
      ${element.email}
      </p>
      </div>
      </div>
      </div>
      <div class="col-md-3 col-sm-4 col-4">
      <div class="call-join-btn-container">
      
      <button class="remove-btn" onclick="AddToGroup('${element.userid}')">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22">
      <defs>
      <style>
      .remove-btn-icon-a {
        fill: #fff;
        stroke-width: 0.4px;
        opacity: 0;
      }
      
      .remove-btn-icon-a,
      .remove-btn-icon-b {
        stroke: #808486;
      }
      
      .remove-btn-icon-b,
      .remove-btn-icon-d {
        fill: none;
      }
      
      .remove-btn-icon-b {
        stroke-width: 1.5px;
      }
      
      .remove-btn-icon-c {
        stroke: none;
      }
      </style>
      </defs>
      <g class="remove-btn-icon-a">
      <rect
      class="remove-btn-icon-c"
      width="22"
      height="22" />
      <rect
      class="remove-btn-icon-d"
      x="0.2"
      y="0.2"
      width="21.6"
      height="21.6" />
      </g>
      <g
      transform="translate(11.122 1.407) rotate(45)"
      class="remove-btn-icon-rotate">
      <line
      class="remove-btn-icon-b"
      y2="13.739"
      transform="translate(6.869)" />
      <line
      class="remove-btn-icon-b"
      y2="13.739"
      transform="translate(13.739 6.869) rotate(90)" />
      </g>
      </svg>
      </button>
      </div>
      </div>
      </div>
      </li>`;
    });
  }
  $('#ParticipantsList').empty().append(list);
  $('#memCount').text(participant.length + " Members")
  if (participant.length > 1) {
    $("#create-group-button").prop('disabled', false);
  } else {
    $("#create-group-button").prop('disabled', true);
  }
}


$(".main-form-btn").click(async function () {
  var UserDetails = await getCookie();
  if (UserDetails != undefined) {
    UserDetails = JSON.parse(UserDetails);
    var CreatedUserDetails = {
      name: UserDetails.name,
      userid: UserDetails.userID,
      clientid: UserDetails.clientID,
      email: UserDetails.email,
      status: "Active"
    }
  }

  const CreateRoomData = {
    // roomid: parseInt(Math.floor(Math.random() * 100000000000000000 + 100000000000)),
    roomid: makeUniqueRoom(),
    name: $("#groupName").val(),
    users: [],
    joinedusers: submitUserList,
    status: "Active",
    lastActiveDate: new Date(),
    groupIcon: IconName,
    host: JSON.parse(getCookie()).name,
  }
  if (CreateRoomData.name != "") {
    $("#creteGroupNameReqP").hide();
    CreateRoomData.joinedusers.push(CreatedUserDetails)
    CreateGroup(CreateRoomData);
  } else {
    $("#creteGroupNameReqP").show();
  }
});


// function toggleButtontext() {
//     $('.call-join-btn').text("Add");
//     submitUserList.forEach(element => {
//         $('.btn_'+element.userid).text("Remove");
//     });
// }


