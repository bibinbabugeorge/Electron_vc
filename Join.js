var origin = null;
var ErrorList = [];
var _UserId = null;
let userType = "";

function setCookie(UserDetail, expDays) {
    const oneMonthInSeconds = 30 * 24 * 60 * 60; // Approximate seconds in a month
    const expiryDate = Math.floor(Date.now() / 1000) + oneMonthInSeconds;
    window.electronAPI.setCookie({
        url: 'http://localhost',
        name: 'UserDetail',
        value: UserDetail,
        expirationDate: expiryDate
    });
}

function DeleteCookie() {
    window.electronAPI.setCookie({
        url: 'http://localhost',
        name: 'UserDetail',
        value: '',
        expirationDate: Math.floor(Date.now() / 1000) - 3600 // Set expiration time to the past
    });
}

function CleanBrowserStorage() {
    localStorage.removeItem("ReturnURL");
    localStorage.removeItem("RoomId");
    DeleteCookie();
}

function BrowserNavigation(url) {
    //setTimeout(() => {
    window.location.href = url;
    //}, 2000);
}

function ProcessReturnURL() {
    let url = localStorage.getItem("ReturnURL");
    if (url != null) {
        CleanBrowserStorage();
        BrowserNavigation(url)
    }
}

function StoreRoomId(urlParams) {
    var Rid = urlParams.get('Rid');
    var regex = /^[a-zA-Z0-9]+$/;
    var ret = regex.test(Rid);
    if (ret) {
        localStorage.setItem("RoomId", Rid);
    }
    else {
        ErrorList.push("Invalid Room Id");
    }
    return ret;
}

function StoreReturnURL(urlParams) {
    var RU = urlParams.get('RU');
    RU = atob(RU);
    var regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    var ret = regex.test(RU);
    if (ret) {
        // localStorage.setItem("ReturnURL", RU);
    }
    else {
        ErrorList.push("Invalid Return URL");
    }
    return ret;
}

async function StoreUserId(urlParams) {
    var Uid = urlParams.get('Uid');
    if (roomIdRet) {
        var regex = /^[a-zA-Z0-9]{40}$/;
        var ret = regex.test(Uid);
        if (ret) {
            try {
                var res = await getUser(Uid);
                SetUserId(res.Data.userID, res.Data.email);
                setInputField(res.Data.name)
            } catch (err) {
                ErrorList.push("Failed load user details");
            }
        }
        else if (Uid.toLocaleLowerCase() == 'guest') {
            try {
                var res = await createUser();
                SetUserId(res.Data.UserId, null);
            } catch (err) {
                ErrorList.push("Guest user creation failed");
            }
            userType = "guest";
        }
        else {
            ErrorList.push("Invalid user credentials");
        }
    }
}

function SetUserId(userid, email) {
    _UserId = userid;
    $('#page_loader').addClass('d-none')
    var UserDetails = JSON.stringify({ "userID": userid, "email": email, "clientID": "null", "name": "null", "allowMultiple": false, "isVisible": true, "Notifications": { "MeetingInvitation": true, "NewGroup": true, "MissedCall": true } });
    setCookie(UserDetails, 1);
}

function setInputField(Username) {
    $("#Username").val(Username);
}

function createUser() {
    var username = "Guest" + (Math.floor(Math.random() * 9999) + 1).toString();
    var settings = {
        "url": `${origin}/createUser`,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "ProjectName": "Guest",
            "Name": username,
            "Email": '@' + username
        }),
    };
    return $.ajax(settings);
}

function getUser(userid) {
    var settings = {
        "url": `${origin}/getUser?UserId=${userid}`,
        "method": "GET",
        "timeout": 0,
    };
    return $.ajax(settings);
}

async function getConfig(urlParams) {
    var RoomId = urlParams.get('Rid');
    var settings = {
        "url": `${origin}/getConfig?RoomId=${RoomId}`,
        "method": "GET",
        "timeout": 0,
    };
    return await ($.ajax(settings));
}

$(document).ready(async function () {
    origin = window.location.origin
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams == '' || urlParams == null) {
        ProcessReturnURL();
    }
    else {
        CleanBrowserStorage();
        roomIdRet = StoreRoomId(urlParams);
        returnURLRet = StoreReturnURL(urlParams);
        userIdRet = StoreUserId(urlParams)
        // getConfig(urlParams).then(async (res) => {
        //     localStorage.setItem("roomConfig", JSON.stringify(res.Data));
        // })
    }
});


$("#btnJoin").click(function () {

    var settings = {
        "url": `${origin}/getProjectConfig?Project=VideoConference`,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        localStorage.setItem("roomConfig", JSON.stringify(response.Data));
    });

    var ErrorListRet = ShowErrorList()
    var ValidateInputRet = ValidateInputField();
    if (ErrorListRet) {
        if (ValidateInputRet) {
            var settings = {
                "url": `${origin}/updateUser`,
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "UserId": _UserId,
                    "Name": ($("#Username").val()).trim()
                }),
            };

            $.ajax(settings).done(function (response) {
                if (response.Message == "Operation Successful")
                    if (userType == "guest")
                        location.href = "./guest_lobby.html";
                    else
                        location.href = "./confieranceroom.html";
                else
                    AppendErrorMessage("Login Failed");
            });
        }
    }
    return false;
});

function ShowErrorList() {
    $(".toast").remove();
    ErrorList.forEach(element => {
        AppendErrorMessage(element);
    });

    return ErrorList.length > 0 ? false : true;
}

function ValidateInputField() {
    var usename = ($("#Username").val()).trim();
    var regex = /^[a-zA-Z. ]{2,150}$/;
    var ret = regex.test(usename);
    if (!ret) {
        AppendErrorMessage("Please provide a valid name.");
    }
    return ret;
}

function AppendErrorMessage(msg) {
    $('#error_wapper').append(`<div class="toast show mb-1">
                                            <div class="toast-header bg-danger text-white">
                                                <strong class="me-auto">Error Message</strong>
                                                <button type="button" class="btn-close bg-white" data-bs-dismiss="toast"></button>
                                            </div>
                                            <div class="toast-body">
                                                <p>${msg}</p>
                                            </div>
                                       </div>`)
}
