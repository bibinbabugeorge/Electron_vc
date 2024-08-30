const mediaType = {
  audio: "audioType",
  video: "videoType",
  screen: "screenType",
  systemAudio: "screenTypeAudio",
};

const _EVENTS = {
  exitRoom: "exitRoom",
  openRoom: "openRoom",
  startVideo: "startVideo",
  stopVideo: "stopVideo",
  startAudio: "startAudio",
  stopAudio: "stopAudio",
  startScreen: "startScreen",
  stopScreen: "stopScreen",
};

let jsonConfig = JSON.parse(localStorage.getItem("roomConfig"));

let sysAudio = false;
let elem;
let userName = null;
let roomDetailsObj;
let participantList;
let currentStream;

class RoomClient {
  socket = null;
  _mediaSoupCallback = null;
  constructor(
    localMediaEl,
    remoteVideoEl,
    remoteAudioEl,
    mediasoupClient,
    socket,
    room_id,
    name,
    successCallback
  ) {
    this.name = name;
    this.localMediaEl = localMediaEl;
    this.remoteVideoEl = remoteVideoEl;
    this.remoteAudioEl = remoteAudioEl;
    this.mediasoupClient = mediasoupClient;

    this.socket = socket;
    this.producerTransport = null;
    this.consumerTransport = null;
    this.device = null;
    this.room_id = room_id;

    this.isVideoOnFullScreen = false;
    this.isDevicesVisible = false;

    this.consumers = new Map();
    this.producers = new Map();

    this.videoProducerLabel = new Map();
    this.producerLabel = new Map();

    this._isOpen = false;
    this.eventListeners = new Map();

    this.IsShareScreen = false;
    this.IsSpeakerPaused = false;

    Object.keys(_EVENTS).forEach(
      function (evt) {
        this.eventListeners.set(evt, []);
      }.bind(this)
    );
  }


  ////////// PartcipantList and Pause-Resume /////////

  updateRoom(participantListObj) {
    roomDetailsObj = participantListObj;

    let participantList = document.getElementById("participantList");
    participantList.innerHTML = "";
    roomDetailsObj.forEach((participantElement) => {
      if (participantElement.user_name == userName) {
        return;
      }
      let row = document.createElement("tr");
      let nameCell = document.createElement("td");
      nameCell.innerText = participantElement.user_name;

      let pauseAudioButtonCell = document.createElement("td");
      let pauseAudioButton = document.createElement("button");
      pauseAudioButton.innerText = "Mute Audio";
      pauseAudioButton.id = participantElement.user_id;
      pauseAudioButton.addEventListener("click", async function () {
        let producerIdcsv = pauseAudioButton.getAttribute("data-producerArray");
        const selectedProducerArray = producerIdcsv.split(",");
        let consumerArray = roomObj.getAudioConsumerId(selectedProducerArray);
        consumerArray.forEach((element) => {
          roomObj.pauseConsumer(element);
        });
      });
      pauseAudioButtonCell.appendChild(pauseAudioButton);

      let resumeAudioButtonCell = document.createElement("td");
      let resumeAudioButton = document.createElement("button");
      resumeAudioButton.innerText = "Unmute Audio";
      resumeAudioButton.id = participantElement.user_id;
      resumeAudioButton.addEventListener("click", async function () {
        let producerIdcsv =
          resumeAudioButton.getAttribute("data-producerArray");
        const selectedProducerArray = producerIdcsv.split(",");
        let consumerArray = roomObj.getAudioConsumerId(selectedProducerArray);
        consumerArray.forEach((element) => {
          roomObj.resumeConsumer(element);
        });
      });
      resumeAudioButtonCell.appendChild(resumeAudioButton);

      let pauseVideoButtonCell = document.createElement("td");
      let pauseVideoButton = document.createElement("button");
      pauseVideoButton.innerText = "Pause Video";
      pauseVideoButton.id = participantElement.user_id;
      pauseVideoButton.addEventListener("click", async function () {
        let producerIdcsv = pauseVideoButton.getAttribute("data-producerArray");
        const selectedProducerArray = producerIdcsv.split(",");
        let consumerArray = roomObj.getVideoConsumerId(selectedProducerArray);
        consumerArray.forEach((element) => {
          roomObj.pauseConsumer(element);
        });
      });
      pauseVideoButtonCell.appendChild(pauseVideoButton);

      let resumeVideoButtonCell = document.createElement("td");
      let resumeVideoButton = document.createElement("button");
      resumeVideoButton.innerText = "Play Video";
      resumeVideoButton.id = participantElement.user_id;
      resumeVideoButton.addEventListener("click", async function () {
        let producerIdcsv =
          resumeVideoButton.getAttribute("data-producerArray");
        const selectedProducerArray = producerIdcsv.split(",");
        let consumerArray = roomObj.getVideoConsumerId(selectedProducerArray);
        consumerArray.forEach((element) => {
          roomObj.resumeConsumer(element);
        });
      });
      resumeVideoButtonCell.appendChild(resumeVideoButton);

      row.appendChild(nameCell);
      row.appendChild(pauseAudioButtonCell);
      row.appendChild(resumeAudioButtonCell);
      row.appendChild(pauseVideoButtonCell);
      row.appendChild(resumeVideoButtonCell);
      participantList.appendChild(row);

      let producerArray = [];
      participantElement.producers.forEach((producerElement) => {
        producerArray.push(producerElement);
      });
      pauseAudioButton.setAttribute(`data-producerArray`, producerArray);
      resumeAudioButton.setAttribute(`data-producerArray`, producerArray);
      pauseVideoButton.setAttribute(`data-producerArray`, producerArray);
      resumeVideoButton.setAttribute(`data-producerArray`, producerArray);
    });
  }

  getAudioConsumerId(producerArr) {
    let confirmedConsumerArr = [];

    const divElement = document.querySelector("#remoteAudios");
    const audioElementsArr = divElement.getElementsByTagName("audio");

    for (let i = 0; i < audioElementsArr.length; i++) {
      const audioId = audioElementsArr[i].getAttribute("data-producer_id");
      let consumerId;

      producerArr.forEach((element) => {
        if (element == audioId) {
          consumerId = audioElementsArr[i].getAttribute("id");
          // this.pauseConsumer(consumerId);
          confirmedConsumerArr.push(consumerId);
        }
      });
    }
    return confirmedConsumerArr;
  }

  getVideoConsumerId(producerArr) {
    let confirmedConsumerArr = [];

    const divElement = document.querySelector("#remoteVideos");
    const audioElementsArr = divElement.getElementsByTagName("video");

    for (let i = 0; i < audioElementsArr.length; i++) {
      const audioId = audioElementsArr[i].getAttribute("data-producer_id");
      let consumerId;

      producerArr.forEach((element) => {
        if (element == audioId) {
          consumerId = audioElementsArr[i].getAttribute("id");
          // this.pauseConsumer(consumerId);
          confirmedConsumerArr.push(consumerId);
        }
      });
    }
    return confirmedConsumerArr;
  }

  async pauseConsumer(consumerId) {
    var dataObj = {
      commandType: "pauseConsumer",
      Data: { RoomId: this.room_id, consumerId: consumerId },
    };
    await this.socket.sendCommand(JSON.stringify(dataObj));
  }

  async resumeConsumer(consumerId) {
    var dataObj = {
      commandType: "resumeConsumer",
      Data: { RoomId: this.room_id, consumerId: consumerId },
    };
    await this.socket.sendCommand(JSON.stringify(dataObj));
  }

  ////////// INIT /////////

  async createRoom(room_id) {
    var dataObj = { commandType: "CreateRoom", Data: { RoomId: room_id } };
    await this.socket.sendCommand(JSON.stringify(dataObj));
  }

  async join(name, userId, room_id) {
    var dataObj = {
      commandType: "JoinRoom",
      Data: { Name: name, UserId: userId, RoomId: room_id },
    };
    await this.socket.sendCommand(JSON.stringify(dataObj));
    this._isOpen = true;
  }

  async getRouterRtpCapabilities(name, room_id) {
    var dataObj = {
      commandType: "getRouterRtpCapabilities",
      Data: { Name: name, RoomId: room_id },
    };
    await this.socket.sendCommand(JSON.stringify(dataObj));
  }

  async loadDevice(routerRtpCapabilities) {
    let device;
    try {
      device = new this.mediasoupClient.Device();
    } catch (error) {
      if (error.name === "UnsupportedError") {
        console.error("Browser not supported");
        alert("Browser not supported");
      }
      console.error(error);
    }

    await device.load({ routerRtpCapabilities });
    this.device = device;

    var data = JSON.stringify({
      CommandType: "DeviceLoaded",
      Data: { Device: this.device, Message: "Device Loaded Successfully" },
      Event: "DeviceLoaded",
    });

    this.socket.emitCommand(data);

    // this.produce(RoomClient.mediaType.video, videoSelect.value);
    // this.produce(RoomClient.mediaType.audio, audioSelect.value);

    userName = document.getElementById("nameInput").value;
  }

  consumerClosed(consumer_id, producer_id) {
    console.log("Closing consumer:", consumer_id);
    this.removeConsumer(consumer_id, producer_id);
  }

  async newProducers(data) {
    console.log("New producers", data);
    for (let { producer_id } of data) {
      await this.consume(producer_id);
    }
  }

  disconnect() {
    this.exit(true);
  }

  async createWebRtcTransport(device, transport_type, room_id) {
    var dataObj = null;
    if (transport_type == "producerTransport") {
      dataObj = {
        commandType: "createWebRtcTransport",
        Data: {
          RoomId: room_id,
          forceTcp: false,
          rtpCapabilities: device.rtpCapabilities,
          transportType: transport_type,
        },
      };
    } else if (transport_type == "consumerTransport") {
      dataObj = {
        commandType: "createWebRtcTransport",
        Data: {
          RoomId: room_id,
          forceTcp: false,
          transportType: transport_type,
        },
      };
    }
    await this.socket.sendCommand(JSON.stringify(dataObj));
  }

  async mediasoupCallback(callbackType, callbackData) {
    if (callbackType == "connect") this._mediaSoupCallback("success");
    else if (callbackType == "produce") {
      var _producerID = callbackData.producer_id;
      this._mediaSoupCallback({ id: _producerID });
    }
  }

  async initProducerTransports(data) {
    // init producerTransport
    this.producerTransport = this.device.createSendTransport(data);
    this.producerTransport.on(
      "connect",
      async function ({ dtlsParameters }, callback, errback) {
        this._mediaSoupCallback = callback;
        var dataObj = {
          commandType: "connectTransport",
          Data: {
            RoomId: this.room_id,
            transport_id: data.id,
            dtlsParameters: dtlsParameters,
            TransportsType: "Producer",
          },
        };
        this.socket.sendCommand(JSON.stringify(dataObj));
      }.bind(this)
    );

    this.producerTransport.on(
      "produce",
      async function ({ kind, rtpParameters }, callback, errback) {
        this._mediaSoupCallback = callback;
        try {
          var dataObj = {
            commandType: "produce",
            Data: {
              RoomId: this.room_id,
              producerTransportId: this.producerTransport.id,
              kind,
              rtpParameters,
            },
          };
          this.socket.sendCommand(JSON.stringify(dataObj));
        } catch (err) {
          alert(err);
        }
      }.bind(this)
    );

    this.producerTransport.on(
      "connectionstatechange",
      function (state) {
        switch (state) {
          case "connecting":
            break;

          case "connected":
            //localVideo.srcObject = stream
            break;

          case "failed":
            this.producerTransport.close();
            break;

          default:
            break;
        }
      }.bind(this)
    );
  }

  async initConsumerTransports(data) {
    // init consumerTransport
    this.consumerTransport = this.device.createRecvTransport(data);

    this.consumerTransport.on(
      "connect",
      function ({ dtlsParameters }, callback, errback) {
        this._mediaSoupCallback = callback;
        var dataObj = {
          commandType: "connectTransport",
          Data: {
            RoomId: this.room_id,
            transport_id: this.consumerTransport.id,
            dtlsParameters: dtlsParameters,
            TransportsType: "Consumer",
          },
        };
        this.socket.sendCommand(JSON.stringify(dataObj));
      }.bind(this)
    );

    this.consumerTransport.on(
      "connectionstatechange",
      async function (state) {
        switch (state) {
          case "connecting":
            break;

          case "connected":
            //remoteVideo.srcObject = await stream;
            //await socket.request('resume');
            break;

          case "failed":
            this.consumerTransport.close();
            break;

          default:
            break;
        }
      }.bind(this)
    );
  }

  async getProducers(name, room_id) {
    var dataObj = {
      commandType: "getProducers",
      Data: { Name: name, RoomId: room_id },
    };
    await this.socket.sendCommand(JSON.stringify(dataObj));
  }

  //////// MAIN FUNCTIONS /////////////

  async replace(type, deviceId = null) {
    let mediaConstraints = {};
    let audio = false;

    switch (type) {
      case mediaType.audio:
        mediaConstraints = {
          audio: {
            deviceId: deviceId,
          },
          video: false,
        };
        audio = true;
        break;
      case mediaType.video:
        mediaConstraints = {
          audio: false,
          video: {
            width: {
              min: 640,
              ideal: 1920,
            },
            height: {
              min: 400,
              ideal: 1080,
            },
            deviceId: deviceId,
          },
        };
        break;
      default:
        return;
    }
    if (!this.device.canProduce("video") && !audio) {
      console.error("Cannot produce video");
      return;
    }

    try {
      let stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);

      let track = audio
        ? stream.getAudioTracks()[0]
        : stream.getVideoTracks()[0];

      let params = {
        track,
      };

      if (!audio) {
        params.encodings = [
          {
            rid: "r0",
            maxBitrate: 100000,
            //scaleResolutionDownBy: 10.0,
            scalabilityMode: "S3T3",
          },
          {
            rid: "r1",
            maxBitrate: 300000,
            scalabilityMode: "S3T3",
          },
          {
            rid: "r2",
            maxBitrate: 900000,
            scalabilityMode: "S3T3",
          },
        ];
        params.codecOptions = {
          videoGoogleStartBitrate: 1000,
        };
      }

      if (type === mediaType.video) {
        if (!this.videoProducerLabel.has(deviceId)) {
          console.log("There is no producer for this device " + deviceId);
          return;
        }
      } else {
        this.micLevel(stream);
        if (!this.producerLabel.has(type)) {
          console.log("There is no producer for this type " + type);
          if (!$("#epic_AudioMute,#epic_AudioMute_Mob").hasClass("active")) {
            this.produce(type, deviceId);
          }
          return;
        }
        audioStream = stream;
        if (recordingActive) {
          let micAudio = this.audioContext.createMediaStreamSource(audioStream);
          micAudio.connect(destAudio);
        }
      }

      let producer_id;
      if (type === mediaType.video) {
        producer_id = await this.videoProducerLabel.get(deviceId);
      } else {
        producer_id = await this.producerLabel.get(type);
      }

      producer = this.producers.get(producer_id);

      await producer.replaceTrack(params);

      if (!audio) {
        elem = document.getElementById(producer_id);
        elem.srcObject = stream;
      }
    } catch (err) {
      console.log("Produce error:", err);
    }
  }

  async micLevel(stream) {
    let audioContext = new AudioContext();
    await audioContext.audioWorklet.addModule("./modules/vumeter-processor.js");
    let microphone = audioContext.createMediaStreamSource(stream);

    const node = new AudioWorkletNode(audioContext, "vumeter");
    node.port.onmessage = (event) => {
      let _volume = 0;
      let _sensibility = 2;
      if (event.data.volume) _volume = event.data.volume;
      leds((_volume * 100) / _sensibility);
      ledsMob((_volume * 100) / _sensibility);
    };
    microphone.connect(node).connect(audioContext.destination);

    function leds(vol) {
      let leds = [...document.getElementsByClassName("led")];
      let range = leds.slice(0, Math.round(vol));

      for (var i = 0; i < leds.length; i++) {
        leds[i].style.background = "#DCE5EA";
      }

      for (var i = 0; i < range.length; i++) {
        range[i].style.background = `#009DFF`;
      }
    }

    function ledsMob(vol) {
      let leds = [...document.getElementsByClassName("led-mob")];
      let range = leds.slice(0, Math.round(vol));

      for (var i = 0; i < leds.length; i++) {
        leds[i].style.background = "#DCE5EA";
      }

      for (var i = 0; i < range.length; i++) {
        range[i].style.background = `#009DFF`;
      }
    }
  }

  async acknowledgeNewProduer(producerId, kind, producerType) {
    var dataObj = {
      commandType: "AcknowledgeProducer",
      Data: {
        RoomId: this.room_id,
        kind,
        producerId,
        producerType,
      },
    };
    this.socket.sendCommand(JSON.stringify(dataObj));

    // if (producerType == mediaType.video) this.getConsumeStream(producerId);
  }

  async produce(type, deviceId = null) {
    let mediaConstraints = {};
    let audio = false;
    let screen = false;

    switch (type) {
      case mediaType.audio:
        mediaConstraints = {
          audio: {
            deviceId: deviceId,
          },
          video: false,
        };
        audio = true;
        break;
      case mediaType.video:
        mediaConstraints = {
          audio: false,
          video: {
            width: {
              min: 640,
              ideal: 1920,
            },
            height: {
              min: 480,
              ideal: 1080,
            },
            deviceId: deviceId,
          },
        };
        break;
      case mediaType.screen:
        audio = true;
        screen = true;
        break;
      default:
        return;
    }

    if (!this.device.canProduce("video") && !audio) {
      console.error("Cannot produce video");
      return;
    }

    if (type === mediaType.video) {
      if (this.videoProducerLabel.has(deviceId)) {
        console.log("Producer already exists for this device " + deviceId);
        return;
      }
    } else {
      if (this.producerLabel.has(type)) {
        console.log("Producer already exists for this type " + type);
        return;
      }
    }

    try {
      let params = null;
      let sysAudioParams = null;
      let screenParams = null;
      let stream;

      const selectMenu = document.getElementById('selectMainMenu');
      if (!screen) {
        stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
      } else {
        // Call the function to get video sources and populate the select menu
        await getVideoSources();

        async function getVideoSources() {
          const inputSources = await window.electronAPI.getSources();
          selectMenu.innerHTML = '';
          // inputSources.forEach((source) => {
          //   const element = document.createElement('option');
          //   element.value = source.id;
          //   element.innerHTML = source.name;
          //   selectMenu.appendChild(element);
          // });

          let htmlContent = `
          <div id="selectMenuContainer" style="left: 50%;">
          <div class="ScreenSharesection-header">Choose Screen to Share</div>
          <div style="display: flex;height: 431px;">
              <div class="ScreenSharesection-screens">
                ${inputSources.filter(source => source.id.includes('screen')).map(source => `
                  <div class="ScreenSharelist" data-id="${source.id}">
                    <div class="ScreenSharethumbnail">
                      <img src="${source.thumbnailURL}" class="ScreenSharethumbnail-image" />
                      <div class="ScreenSharescreen-name">${source.name}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
              <div class="ScreenSharesection-windows">
                ${inputSources.filter(source => source.id.includes('window')).map(source => `
                  <div class="ScreenSharelist" data-id="${source.id}">
                    <div class="ScreenSharethumbnail">
                      <img src="${source.thumbnailURL}" class="ScreenSharethumbnail-image" />
                      <div class="ScreenSharescreen-name">${source.name}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
              </div>
            <div id="buttonContainer" class="ScreenSharebuttons">
              <button id="cancelButton" class="ScreenSharebutton">Cancel</button>
              <button id="shareButton" class="ScreenSharebutton">Share</button>
            </div>
          </div>
        `;
          selectMenu.innerHTML += htmlContent;

        }
        $('#selectMainMenu').css('display', 'block');
        $('#selectMainMenu').focusout(function () {
          setTimeout(() => {
            $('#selectMainMenu').css('display', 'none');
          }, 100); // Delay to ensure that the 'change' event is handled before hiding
        });
        document.getElementById('shareButton').addEventListener('click', async () => {
          const selectedElement = document.querySelector('.ScreenSharelist.selected');
          if (selectedElement) {
            const selectedId = selectedElement.getAttribute('data-id');
            $('#selectMainMenu').css('display', 'none');
            await this.handleOptionClick(selectedId, type);
          } else {
            alert('Please select a screen or window to share.');
          }
        });

        // Add event listener for the "Cancel" button
        document.getElementById('cancelButton').addEventListener('click', () => {
          $('#selectMainMenu').css('display', 'none');
        });

        selectMenu.addEventListener('click', (event) => {
          if (event.target.closest('.ScreenSharelist')) {
            document.querySelectorAll('.ScreenSharelist').forEach(item => item.classList.remove('selected'));
            event.target.closest('.ScreenSharelist').classList.add('selected');
          }
        });

        return;
      }

      if (stream.getAudioTracks()[0] != undefined && type == mediaType.screen)
        sysAudio = true;

      if (!jsonConfig.MultipleCamera) {
        if (type == mediaType.screen) {
          if (IsVideoOpen) {
            fn_VideoCam();
            $("#epic_MuteVideoCam,#epic_MuteVideoCam_Mob").addClass("active");
          }
          $(".video-camera-btn").prop("disabled", true);
          $(".video-camera-btn").addClass("not-allowed");
        }
      }

      let track = null;
      if (screen == false) {
        track = audio ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];
        params = {
          track,
        };
      } else {
        if (sysAudio) {
          track = stream.getAudioTracks()[0];
          sysAudioParams = {
            track,
          };
        }
        track = stream.getVideoTracks()[0];
        screenParams = {
          track,
        };
      }

      if (!audio && !screen) {
        params.encodings = [
          {
            rid: "r0",
            maxBitrate: 100000,
            // scaleResolutionDownBy:10.0,
            scaleResolutionDownBy: 8.0,
            scalabilityMode: "L1T3",
          },
          {
            rid: "r1",
            maxBitrate: 300000,
            scaleResolutionDownBy: 3.0,
            scalabilityMode: "L1T3",
          },
          {
            rid: "r2",
            maxBitrate: 900000,
            scaleResolutionDownBy: 1.0,
            scalabilityMode: "L1T3",
          },
        ];
        params.codecOptions = {
          videoGoogleStartBitrate: 1000,
        };
      }
      if (!screen) {
        producer = await this.producerTransport.produce(params);
        this.producers.set(producer.id, producer);
        if (audio)
          this.acknowledgeNewProduer(
            producer.id,
            producer.kind,
            mediaType.audio
          );
        else
          this.acknowledgeNewProduer(
            producer.id,
            producer.kind,
            mediaType.video
          );

        if (!audio) {
          elem = document.createElement("video");
          elem.srcObject = stream;
          elem.id = producer.id;
          elem.setAttribute("playsinline", "true");
          elem.autoplay = true;
          elem.setAttribute("data-localVideo", "primary");
          elem.muted = true;
          elem.className = "vid";

          $(`#${deviceId}`).empty();
          $(`#${deviceId}`).append($(elem));
          $(`#${deviceId}`).addClass("active");
          $(`#${deviceId}`).removeClass("inactive");

          let elemMob = document.createElement("video");
          elemMob.srcObject = stream;
          elemMob.id = producer.id;
          elemMob.setAttribute("playsinline", "true");
          elemMob.autoplay = true;
          elemMob.setAttribute("data-localVideo", "primary");
          elemMob.muted = true;
          elemMob.className = "vid";

          $(`#${deviceId}Mob`).empty();
          $(`#${deviceId}Mob`).append($(elemMob));
          $(`#${deviceId}Mob`).addClass("active");
          $(`#${deviceId}Mob`).removeClass("inactive");

          let videoElem = document.createElement("video");
          videoElem.srcObject = stream;
          videoElem.setAttribute("playsinline", "true");
          videoElem.autoplay = true;
          videoElem.muted = true;
          videoElem.className = "vid";

          $(".local-audio-list").hide();

          let newLi = `<li id="LocalLi${producer.id}" class="active"></li>`;
          $(".local-camera-view-wrapper > ul").append($(newLi));
          $(`#LocalLi${producer.id}`).append(videoElem);
          $(`#LocalLi${producer.id}`).siblings().removeClass("active");

          let videoElemMob = document.createElement("video");
          videoElemMob.srcObject = stream;
          videoElemMob.setAttribute("playsinline", "true");
          videoElemMob.autoplay = true;
          videoElemMob.muted = true;
          videoElemMob.className = "vid";

          let newLiMob = `<li id="LocalLi${producer.id}Mob" class="active"></li>`;
          $(".mobile-active-local-cameras").append($(newLiMob));
          $(`#LocalLi${producer.id}Mob`).append(videoElemMob);
          $(`#LocalLi${producer.id}Mob`).siblings().removeClass("active");

          $(".local-camera-view-wrapper > ul").children().off("click");
          $(".local-camera-view-wrapper > ul")
            .children()
            .on("click", function () {
              $(this).toggleClass("active");
              $(this).siblings().removeClass("active");
            });

          $(".mobile-active-local-cameras").children().off("click");
          $(".mobile-active-local-cameras")
            .children()
            .on("click", function () {
              $(this).toggleClass("active");
              $(this).siblings().removeClass("active");
            });
        } else {
          audioStream = stream;
          if (recordingActive) {
            let micAudio =
              this.audioContext.createMediaStreamSource(audioStream);
            micAudio.connect(destAudio);
          }
        }

        if (type === mediaType.video) {
          this.videoProducerLabel.set(deviceId, producer.id);
          setTimeout(() => {
            // this.getConsumeStream(producer.id);
            if (this.producers.get(producer.id)) {
              let localConsumer = { id: deviceId };
              this.consumeMedia({
                consumer: localConsumer,
                stream,
                kind: "video",
                producerId: producer.id,
              });
            }
          }, 1500);
        } else {
          this.micLevel(stream);
          this.producerLabel.set(type, producer.id);
        }

        this.producerEvents(type, producer, audio, elem);
      } else {
        params = screenParams;
        producer = await this.producerTransport.produce(params);
        this.producers.set(producer.id, producer);
        this.acknowledgeNewProduer(
          producer.id,
          producer.kind,
          mediaType.screen
        );

        $(".share-screen-btn").addClass("active");
        this.IsShareScreen = true;

        this.producerLabel.set(type, producer.id);
        this.producerEvents(type, producer, audio, elem);

        var dataObj = {
          commandType: "ScreenShared",
          Data: {
            userName: JSON.parse(getCookie()).name,
            userId: JSON.parse(getCookie()).userID,
            producerId: producer.id,
            roomId: localStorage.getItem("RoomId"),
          },
        };
        await this.socket.sendCommand(JSON.stringify(dataObj));

        if (sysAudio) {
          params = sysAudioParams;
          producer = await this.producerTransport.produce(params);
          this.producers.set(producer.id, producer);
          this.acknowledgeNewProduer(
            producer.id,
            producer.kind,
            mediaType.systemAudio
          );

          this.producerLabel.set(mediaType.systemAudio, producer.id);
          this.producerEvents(mediaType.systemAudio, producer, audio, elem);
        }
      }
    } catch (err) {
      console.error("Produce error:", err);
    }
  }

  async producerEvents(type, producer, audio, elem) {
    producer.on("trackended", () => {
      this.closeProducer(type);
    });

    producer.on("transportclose", () => {
      console.log("Producer transport close");
      if (!audio) {
        elem.srcObject.getTracks().forEach(function (track) {
          track.stop();
        });
        elem.parentNode.removeChild(elem);
      }
      this.producers.delete(producer.id);
    });

    producer.on("close", () => {
      console.log("Closing producer");
      if (!audio) {
        elem.srcObject.getTracks().forEach(function (track) {
          track.stop();
        });
        elem.parentNode.removeChild(elem);
      }
      this.producers.delete(producer.id);
    });

    switch (type) {
      case mediaType.audio:
        this.event(_EVENTS.startAudio);
        break;
      case mediaType.video:
        this.event(_EVENTS.startVideo);
        break;
      case mediaType.screen:
        this.event(_EVENTS.startScreen);
        break;
      default:
        return;
    }
  }

  async consume(producer_id) {
    //let info = await this.roomInfo()

    this.getConsumeStream(producer_id);
  }

  setroomDetailsObj(data) {
    roomDetailsObj = data.Data;
    participantList = data.Userlist;
  }

  async consumeMedia({ consumer, stream, kind, producerId }) {
    this.consumers.set(consumer.id, consumer);
    let userinfo = this.getProducersdetails(producerId);
    let videoTagCount = 0;

    if (kind === "video") {
      const elem = document.createElement("video");
      elem.srcObject = stream;
      elem.id = consumer.id;
      elem.setAttribute("data-user_name", userinfo.name);
      elem.setAttribute("data-producer_id", producerId);
      elem.setAttribute("data-user_id", userinfo.user_id);
      elem.setAttribute("data-main_video_id", consumer.id);
      elem.setAttribute("playsinline", "true");
      elem.muted = true;
      elem.autoplay = true;
      elem.className = "vidRem";
      elem.play();

      const videoElement = document.createElement("video");
      videoElement.srcObject = stream;
      videoElement.id = consumer.id;
      videoElement.setAttribute("data-user_name", userinfo.name);
      videoElement.setAttribute("data-producer_id", producerId);
      videoElement.setAttribute("data-user_id", userinfo.user_id);
      videoElement.setAttribute("data-video_user_id", userinfo.user_id);
      videoElement.setAttribute("playsinline", "true");
      videoElement.muted = true;
      videoElement.autoplay = true;
      videoElement.className = "vidRem";
      videoElement.play();

      if ($(`[data-user_id="${userinfo.user_id}"]`)) {
        videoTagCount = $(
          'ul[class*="videos-list-' + userinfo.user_id + '"]'
        ).children("li").length;
      }

      if (videoTagCount == 0) {
        $(`[data-username="video_${userinfo.user_id}"]`).empty();

        $(`[data-username="video_${userinfo.user_id}"]`)
          .append(
            controlBuilder.RemoteVideoController(
              userinfo.name,
              userinfo.user_id,
              userinfo.client_id
            )
          )
          .append(
            $("<div>")
              .addClass(
                `row g-3 ps-2 parentDiv_${userinfo.user_id} multiple-camera-wrapper`
              )
              .attr("id", "multipleInnerVideos")
              .append($("<div>").addClass("col").append(elem))
          );
      } else {
        let cameraBoxes = document.getElementById(
          `user-multi-camera-button${userinfo.user_id}`
        );
        let highlightIndicator = document.getElementById(
          `Camera-indicator${userinfo.user_id}`
        );

        if (cameraBoxes.classList.contains("active")) {
          highlightIndicator.style.display = "none";
        } else {
          highlightIndicator.style.display = "block";
        }
      }

      controlBuilder.multipleVideoShowInButtonHover(
        userinfo,
        videoElement,
        stream,
        producerId
      );

      if ($(`[data-user_id="${userinfo.user_id}"]`)) {
        videoTagCount = $(
          'ul[class*="videos-list-' + userinfo.user_id + '"]'
        ).children("li").length;
      }
      $(".camera-count" + userinfo.user_id).text(videoTagCount);
      // this.handleFS(elem.id);

      if (
        fullScreen &&
        $("#thumb-ol").find(
          "div[data-username='" + "avatar_" + userinfo.user_id + "']"
        ).length != 0
      ) {
        var userLi = $("#thumb-ol")
          .find("div[data-username='" + "avatar_" + userinfo.user_id + "']")
          .parent()
          .parent();
        $(userLi).empty();

        var userVideoDiv = $("#carousel-thumb").find(
          "div[data-username='" + "video_" + userinfo.user_id + "']"
        );

        var videoContainer = $(userVideoDiv)
          .find(".participant-first-camera")
          .first()
          .find(".video-container");

        var smallText = $(userVideoDiv).find(".small-text").text();
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
        $(videoContainer).prepend(participantVideoControls);
        $(userLi).append($(videoContainer));
        $("#thumb-ol").append(userLi);
      }
      controlBuilder.resetVideoLayout();

      $(".participant-cameras-btn").off("click");
      $(".participant-cameras-btn").click(function () {
        $(this).toggleClass("active");
        $(this).siblings(".participant-cameras-list").toggle();
        if ($(this).parent().is(".local-camera-list-wrapper"))
          $(".local-camera-view-wrapper").toggle();
      });
    } else {
      let audioWrapper = document.createElement("div");
      audioWrapper.setAttribute("data-user_name", userinfo.name);
      elem = document.createElement("audio");
      elem.srcObject = stream;
      elem.volume = volumeLevel / 100;
      elem.id = consumer.id;
      elem.setAttribute("data-producer_id", producerId);
      elem.playsinline = false;
      elem.autoplay = true;
      elem.setAttribute("data-audio_user_id", userinfo.user_id);
      audioWrapper.appendChild(elem);
      this.remoteAudioEl.appendChild(audioWrapper);
      elem.play();
      ///////////////////////////////////////////////
      if (!this.producerLabel.has(mediaType.audio)) {
        await navigator.mediaDevices
          .getUserMedia({ audio: true, video: false })
          .then(async (stream) => {
            elem.play();
            stream.getTracks().forEach(function (track) {
              track.stop();
            });
          });
      }
      //////////////////////////////////////////////
    }

    if (consumer.on) {
      consumer.on(
        "trackended",
        function () {
          this.removeConsumer(consumer.id, producerId);
        }.bind(this)
      );

      consumer.on(
        "transportclose",
        function () {
          this.removeConsumer(consumer.id, producerId);
        }.bind(this)
      );
    }

    if (kind == "video" || (kind == "audio" && !this.IsSpeakerPaused)) {
      var dataObj = {
        commandType: "resumeConsumer",
        Data: { RoomId: this.room_id, consumerId: consumer.id },
      };
      await this.socket.sendCommand(JSON.stringify(dataObj));
    }
    await controlBuilder.manageLocalTile();
    if (callParticiapantsCount == 0) {
      if ($(".video-waiting-h6").length == 0) {
        $(
          '[data-username="video_' + JSON.parse(await getCookie()).userID + '"]'
        ).append(
          `<h6 class="mb-0 mt-2 video-waiting-h6" style="padding: 5px;background: #00000090;border-radius: 2px;position: absolute;inset: 0;display: flex;justify-content: center;align-items: center;font-size: 17px;">Waiting for other participants to join</h6>`
        );
        $(".waiting-h6").remove();
      }
    } else {
      $(".video-waiting-h6").remove();
      $(".waiting-h6").remove();
    }

    if (JSON.parse(await getCookie()).email.includes("guest")) {
      $(`.participant-list-mic-btns,.participant-list-video-btns`).hide();
      $(`.participant-mute-camera-btn,.participant-mute-audio-btn`).hide();
    }

    $(".participant-cameras-container").on(
      "click",
      `#user-multi-camera-button${userinfo.user_id}`,
      function () {
        ParticipantCameraHighlight(userinfo.user_id);
      }
    );

    if ($(`#rh-bubble-${userinfo.user_id}`).length > 0) {
      $(`#hand-raised${userinfo.user_id}`).removeClass("d-none");
    } else {
      $(`#hand-raised${userinfo.user_id}`).addClass("d-none");
    }
  }

  getProducersdetails(producerId) {
    let userInfo = {
      name: "",
      client_id: "",
      user_id: "",
      profileImg: "",
    };

    if (!roomDetailsObj) {
      console.log("undefined roomDetailsObj");
      return userInfo;
    }

    roomDetailsObj.forEach((userArr) => {
      userArr.producers.forEach((producerArr) => {
        if (producerArr == producerId) {
          userInfo.name = userArr.user_name;
          userInfo.client_id = userArr.user_id;
          userInfo.audioStatus = userArr.audioStatus;
        }
      });
    });

    participantList.forEach((item) => {
      if (userInfo.client_id == item.clientid) {
        userInfo.user_id = item.userid;
        userInfo.profileImg = item.profileImg;
      }
    });

    return userInfo;
  }

  async getConsumeStream(producerId) {
    const { rtpCapabilities } = this.device;
    // const data = await this.socket.request("consume", {
    //   rtpCapabilities,
    //   consumerTransportId: this.consumerTransport.id, // might be
    //   producerId,
    // });
    var dataObj = {
      commandType: "consume",
      Data: {
        RoomId: this.room_id,
        RtpCapabilities: rtpCapabilities,
        consumerTransportId: this.consumerTransport.id,
        ProducerId: producerId,
        ConsumePause: this.IsSpeakerPaused,
      },
    };
    this.socket.sendCommand(JSON.stringify(dataObj));
  }

  async getConsumeStreamReturn(data) {
    consumeCount++;

    const { id, kind, rtpParameters, producerId } = data;
    let codecOptions = {};
    const consumer = await this.consumerTransport.consume({
      id,
      producerId,
      kind,
      rtpParameters,
      codecOptions,
    });

    const stream = new MediaStream();
    stream.addTrack(consumer.track);

    if (producersRecievedCount <= consumeCount && startupVideoAudio) {
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

    setTimeout(() => {
      this.consumeMedia({ consumer, stream, kind, producerId });
    }, 1000);
  }

  async closeAllProducer(type, deviceId) {
    if (type === mediaType.video && deviceId === null) {
      for (const key of this.videoProducerLabel.keys()) {
        this.closeProducer(type, key);
      }
    } else {
      this.closeProducer(type, deviceId);
    }
  }

  closeProducer(type, deviceId = null) {
    if (type === mediaType.video) {
      if (!this.videoProducerLabel.has(deviceId)) {
        console.log("There is no producer for this device " + deviceId);
        return;
      }
    } else {
      if (!this.producerLabel.has(type)) {
        console.log("There is no producer for this type " + type);
        return;
      }
    }

    let producer_id;
    if (type === mediaType.video) {
      producer_id = this.videoProducerLabel.get(deviceId);
      // this.removeConsumer(deviceId, producer_id);
    } else {
      producer_id = this.producerLabel.get(type);
    }

    var dataObj = {
      commandType: "producerClosed",
      Data: {
        RoomId: this.room_id,
        ProducerId: producer_id,
        Type: type,
        deviceId,
      },
    };
    this.socket.sendCommand(JSON.stringify(dataObj));

    if (
      this.producerLabel.get(mediaType.systemAudio) &&
      type == mediaType.screen &&
      sysAudio
    ) {
      sysAudio = false;
      let producer_id = this.producerLabel.get(mediaType.systemAudio);

      var dataObj = {
        commandType: "producerClosed",
        Data: {
          RoomId: this.room_id,
          ProducerId: producer_id,
          Type: mediaType.systemAudio,
        },
      };
      this.socket.sendCommand(JSON.stringify(dataObj));
      const selectMenu = document.getElementById('selectMainMenu');
      selectMenu.innerHTML = '';
      $('#selectMainMenu').css('display', 'none');
    }
  }

  producerClosedReturn(producer_id, type, deviceId = null) {
    this.removeConsumer(deviceId, producer_id);

    this.producers.get(producer_id).close();
    this.producers.delete(producer_id);

    if (type === mediaType.video) {
      this.videoProducerLabel.delete(deviceId);
    } else {
      this.producerLabel.delete(type);
    }

    if (type == mediaType.screen) {
      if (videoDeviceExist) {
        $(".video-camera-btn").prop("disabled", false);
        $(".video-camera-btn").removeClass("not-allowed");
      }
      $(".share-screen-btn").removeClass("active");
      this.IsShareScreen = false;
    }

    if (type == mediaType.video) {
      elem = document.getElementById(producer_id);
      if (elem) {
        elem.srcObject.getTracks().forEach(function (track) {
          track.stop();
        });
      }
      $(`#LocalLi${producer_id}`).remove();
      $(`#LocalLi${producer_id}Mob`).remove();
      if ($(".local-camera-view-wrapper > ul").children().length == 1) {
        $(".local-audio-list").show();
        $(".local-audio-list").addClass("active");
      }
      $(`#${deviceId}`).empty();
      $(`#${deviceId}`).removeClass("active");
      $(`#${deviceId}`).addClass("inactive");
      $(`#${deviceId}`).append(
        $(`<img src="modules/images/local_muted_video.svg" />`)
      );

      $(`#${deviceId}Mob`).empty();
      $(`#${deviceId}Mob`).removeClass("active");
      $(`#${deviceId}Mob`).addClass("inactive");
      $(`#${deviceId}Mob`).append(
        $(`<img src="modules/images/local_muted_video.svg" />`)
      );
    }

    switch (type) {
      case mediaType.audio:
        this.event(_EVENTS.stopAudio);
        break;
      case mediaType.video:
        this.event(_EVENTS.stopVideo);
        break;
      case mediaType.screen:
        this.event(_EVENTS.stopScreen);
        break;
    }
  }

  pauseProducer(type) {
    if (!this.producerLabel.has(type)) {
      console.log("There is no producer for this type " + type);
      return;
    }

    let producer_id = this.producerLabel.get(type);
    this.producers.get(producer_id).pause();
  }

  resumeProducer(type) {
    if (!this.producerLabel.has(type)) {
      console.log("There is no producer for this type " + type);
      return;
    }

    let producer_id = this.producerLabel.get(type);
    this.producers.get(producer_id).resume();
  }

  async removeConsumer(consumer_id, producer_id) {
    if ($(`#${consumer_id}`).length > 0)
      if ($(`#${consumer_id}`).get(0).tagName == "AUDIO") {
        let elem = $(`#${consumer_id}`);
        for (let i = elem.length - 1; i >= 0; i--) {
          elem[i].srcObject.getTracks().forEach(function (track) {
            track.stop();
          });
        }
        $(elem).parent().remove();
        this.consumers.delete(consumer_id);
        return;
      }

    let userinfo = this.getProducersdetails(producer_id);
    let videoTagCount = 0;
    elem = $("#carousel-thumb").find('[id="' + consumer_id + '"]');

    for (let i = elem.length - 1; i >= 0; i--) {
      elem[i].srcObject.getTracks().forEach(function (track) {
        track.stop();
      });
      if ($(elem[i]).is("[data-main_video_id]")) {
        if (
          $(elem[i].parentNode).siblings().length == 0 &&
          $(`.videos-list-${userinfo.user_id}`).children().length > 1
        ) {
          // $(`.videos-list-${userinfo.user_id}`).children().click();

          var clickVideos = $(`.videos-list-${userinfo.user_id}`).children();
          var clicked = false;

          clickVideos.each(function () {
            if (!clicked && $(this).find("video").attr("id") != consumer_id) {
              $(this).click();
              clicked = true;
            }
          });

          $(elem[i].parentNode).remove();
        } else {
          $(elem[i].parentNode).remove();
        }
      } else {
        if ($(elem[i]).is("video")) {
          elem[i].parentNode.parentNode.parentNode.remove();
        }
      }

      var result = isVideoOnArray.find(
        (obj) => obj.name === elem[i].dataset.user_name
      );
      if (result && result.data) {
        var index = result.data.findIndex((it) => it.id == elem[i].id);
        result.data.splice(index, 1);
      }
    }

    if ($(`[data-user_id="${userinfo.user_id}"]`)) {
      videoTagCount = $(
        'ul[class*="videos-list-' + userinfo.user_id + '"]'
      ).find("video").length;
    }

    let visibleVideoCount = $(`.parentDiv_${userinfo.user_id}`).find(
      "video"
    ).length;
    if (visibleVideoCount >= videoTagCount) {
      $(`#Camera-indicator${userinfo.user_id}`).hide();
    }

    if (fullScreen) {
      var fullScreenUserDiv = document.getElementById("fsUser");
      var fullScreenUserId = $(fullScreenUserDiv).attr("data-username");
      fullScreenUserId = fullScreenUserId.substring(6);
      if (userinfo.user_id != fullScreenUserId) {
        videoTagCount++;
      }
    }

    var fsLiElem = $("#thumb-ol").find('[id="' + consumer_id + '"]');
    if (fsLiElem.length > 0) {
      for (let i = 0; i < fsLiElem.length; i++) {
        fsLiElem[i].srcObject.getTracks().forEach(function (track) {
          track.stop();
        });
      }
      videoTagCount--;
      $(`.videos-list-${userinfo.user_id}`)
        .find(".participant-first-camera")
        .filter(function () {
          return $(this).is(":empty");
        })
        .parent()
        .remove();

      var userLi = $("#thumb-ol")
        .find("video[data-user_id=" + userinfo.user_id + "]")
        .parent()
        .parent();
      $(userLi).empty();

      var userVideoDiv = $("#carousel-thumb").find(
        "div[data-username='" + "video_" + userinfo.user_id + "']"
      );

      var videoContainer = $(userVideoDiv)
        .find(".participant-first-camera")
        .first()
        .find(".video-container");

      var smallText = $(userVideoDiv).find(".small-text").text();
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
      $(videoContainer).prepend(participantVideoControls);
      $(userLi).append($(videoContainer));
      $("#thumb-ol").append(userLi);
    }

    $(".camera-count" + userinfo.user_id).text(videoTagCount);

    if (videoTagCount < 1) {
      var firstNumber = parseInt(userinfo.user_id.match(/\d/)[0]);
      let backgroundColor = await getcolor(firstNumber);

      $(`[data-username="video_${userinfo.user_id}"]`).empty();
      $(`[data-username="video_${userinfo.user_id}"]`).append(
        $("<div>")
          .addClass(`row g-3 h-100 ps-2 parentDiv_${userinfo.user_id}`)
          .attr("id", "multipleInnerVideos")
          .append(
            $("<div>").addClass("col").append(`
                  <!--  <h3 class=" text-white mt-1" style="font-size:14px" data-username="avatar_${userinfo.user_id
              }">
                  <span id="audiostatus_${userinfo.user_id}">
                    <img src="modules/images/remote_mic_muted.svg" />
                  </span>
                  ${userinfo.name}
                </h3> -->
                ${controlBuilder.RemoteVideoControllerAvatar(
                userinfo.name,
                userinfo.user_id,
                userinfo.client_id
              )}
              <div class="audio-container">
              ${userinfo.profileImg
                ? `<div class="rounded-circle d-flex mb-1 justify-content-center align-items-center hand-raised-icon" data-username="avatar_${userinfo.user_id}"
                      style="width: 122px; height: 122px;">
                      <img class="rounded-circle d-flex mb-1 justify-content-center align-items-center" style="width: 122px; height: 122px;" src="uploads/${userinfo.profileImg}" alt="Profile Image" /> 
                      <img id="hand-raised${userinfo.user_id}" src="modules/images/audio_raise_hand.svg" class="audio-raise-hand d-none" />
                  </div>`
                : `<div class="rounded-circle d-flex mb-1 justify-content-center align-items-center" data-username="avatar_${userinfo.user_id
                }"
                    style="width: 122px; height: 122px; background-color: ${backgroundColor}36;">
                    <h6 class="fs-1 mb-0 noselect" style="text-indent: 0px; position: relative; color: ${backgroundColor}">
                      ${userinfo.name
                  .split(" ")
                  .filter((word) => word !== "")
                  .map((word) => word[0].toUpperCase())
                  .slice(0, 2) // Take only the first two initials
                  .join("")}
                    </h6>
                    <img id="hand-raised${userinfo.user_id
                }" src="modules/images/audio_raise_hand.svg" class="audio-raise-hand d-none" />     
                </div>`
              }
              
          </div>
                `)
          )
      );

      if (fullScreen) {
        var userLi = $("#thumb-ol")
          .find("video[data-user_id=" + userinfo.user_id + "]")
          .parent()
          .parent();
        $(userLi).empty();

        if (userLi.length == 0) {
          userLi = $("#thumb-ol").find("li:empty");
        }

        var userVideoDiv = $("#carousel-thumb").find(
          "div[data-username='" + "video_" + userinfo.user_id + "']"
        );

        var avatarContainer = $(userVideoDiv).find(".audio-container").clone();
        var smallText = $(userVideoDiv).find(".small-text").text();
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
        $(avatarContainer).prepend(participantVideoControls);
        $(userLi).append($(avatarContainer));
        $("#thumb-ol").append(userLi);
      }
    }

    // controlBuilder.RemoveInactiveVideoWrapper();
    controlBuilder.resetVideoLayout();
    controlBuilder.resetMultipleVideoLayout();
    this.consumers.delete(consumer_id);
    await controlBuilder.manageLocalTile();

    if ($(`#rh-bubble-${userinfo.user_id}`).length > 0) {
      $(`#hand-raised${userinfo.user_id}`).removeClass("d-none");
    } else {
      $(`#hand-raised${userinfo.user_id}`).addClass("d-none");
    }
  }

  async exit(offline = false, name, room_id) {
    sysAudio = false;
    if (!offline) {
      var dataObj = {
        commandType: "ExitRoom",
        Data: { Name: name, RoomId: room_id },
      };
      await this.socket.sendCommand(JSON.stringify(dataObj));
    } else {
      clean();
    }
  }

  clean() {
    this._isOpen = false;
    this.producerTransport.close();
    this.consumerTransport.close();
    this.socket.listenerRemove("disconnect");
    this.socket.listenerRemove("newProducers");
    this.socket.listenerRemove("consumerClosed");
    this.event(_EVENTS.exitRoom);
  }

  ///////  HELPERS //////////

  async roomInfo() {
    let info = await this.socket.request("getMyRoomInfo");
    return info;
  }

  static get mediaType() {
    return mediaType;
  }

  event(evt) {
    if (this.eventListeners.has(evt)) {
      this.eventListeners.get(evt).forEach((callback) => callback());
    }
  }

  on(evt, callback) {
    this.eventListeners.get(evt).push(callback);
  }

  //////// GETTERS ////////

  isOpen() {
    return this._isOpen;
  }

  static get EVENTS() {
    return _EVENTS;
  }

  //////// UTILITY ////////

  copyURL() {
    let tmpInput = document.createElement("input");
    document.body.appendChild(tmpInput);
    tmpInput.value = window.location.href;
    tmpInput.select();
    document.execCommand("copy");
    document.body.removeChild(tmpInput);
    console.log("URL copied to clipboard 👍");
  }

  showDevices() {
    if (!this.isDevicesVisible) {
      reveal(devicesList);
      this.isDevicesVisible = true;
    } else {
      hide(devicesList);
      this.isDevicesVisible = false;
    }
  }

  handleFS(id) {
    // let videoPlayer = document.getElementById(id);
    let videoPlayer = $(`[data-main_video_id]`);
    videoPlayer.addEventListener("fullscreenchange", (e) => {
      if (videoPlayer.controls) return;
      let fullscreenElement = document.fullscreenElement;
      if (!fullscreenElement) {
        videoPlayer.style.pointerEvents = "auto";
        this.isVideoOnFullScreen = false;
      }
    });
    videoPlayer.addEventListener("webkitfullscreenchange", (e) => {
      if (videoPlayer.controls) return;
      let webkitIsFullScreen = document.webkitIsFullScreen;
      if (!webkitIsFullScreen) {
        videoPlayer.style.pointerEvents = "auto";
        this.isVideoOnFullScreen = false;
      }
    });
    videoPlayer.addEventListener("click", (e) => {
      if (videoPlayer.controls) return;
      if (!this.isVideoOnFullScreen) {
        if (videoPlayer.requestFullscreen) {
          videoPlayer.requestFullscreen();
        } else if (videoPlayer.webkitRequestFullscreen) {
          videoPlayer.webkitRequestFullscreen();
        } else if (videoPlayer.msRequestFullscreen) {
          videoPlayer.msRequestFullscreen();
        }
        this.isVideoOnFullScreen = true;
        videoPlayer.style.pointerEvents = "none";
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        this.isVideoOnFullScreen = false;
        videoPlayer.style.pointerEvents = "auto";
      }
    });
  }

  async handleOptionClick(selectedOption, type) {
    let params = null;
    let sysAudioParams = null;
    let screenParams = null;
    let stream;
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
      currentStream = null;
      this.closeProducer(type, null) // Clear the current stream
    }
    const IS_MACOS = await window.electronAPI.getOperatingSystem() === 'darwin';
    const audio = !IS_MACOS
      ? {
        mandatory: {
          chromeMediaSource: 'desktop'
        }
      }
      : false;
    const constraints = {
      audio, // Set to true if you need audio
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: selectedOption // Use selectedOption as the screenId
        }
      }
    };

    // if (stream) {
    //   stream.getTracks().forEach(track => track.stop());
    // }

    currentStream = await navigator.mediaDevices.getUserMedia(constraints);
    //currentStream = stream;

    if (currentStream.getAudioTracks()[0] != undefined && type == mediaType.screen)
      sysAudio = true;

    if (!jsonConfig.MultipleCamera) {
      if (type == mediaType.screen) {
        if (IsVideoOpen) {
          fn_VideoCam();
          $("#epic_MuteVideoCam,#epic_MuteVideoCam_Mob").addClass("active");
        }
        $(".video-camera-btn").prop("disabled", true);
        $(".video-camera-btn").addClass("not-allowed");
      }
    }

    let track = null;
    if (screen == false) {
      track = audio ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];
      params = {
        track,
      };
    } else {
      if (sysAudio) {
        track = currentStream.getAudioTracks()[0];
        sysAudioParams = {
          track,
        };
      }
      track = currentStream.getVideoTracks()[0];
      screenParams = {
        track,
      };
    }

    if (!audio && !screen) {
      params.encodings = [
        {
          rid: "r0",
          maxBitrate: 100000,
          // scaleResolutionDownBy:10.0,
          scaleResolutionDownBy: 8.0,
          scalabilityMode: "L1T3",
        },
        {
          rid: "r1",
          maxBitrate: 300000,
          scaleResolutionDownBy: 3.0,
          scalabilityMode: "L1T3",
        },
        {
          rid: "r2",
          maxBitrate: 900000,
          scaleResolutionDownBy: 1.0,
          scalabilityMode: "L1T3",
        },
      ];
      params.codecOptions = {
        videoGoogleStartBitrate: 1000,
      };
    }
    if (!screen) {
      producer = await this.producerTransport.produce(params);
      this.producers.set(producer.id, producer);
      if (audio)
        this.acknowledgeNewProduer(
          producer.id,
          producer.kind,
          mediaType.audio
        );
      else
        this.acknowledgeNewProduer(
          producer.id,
          producer.kind,
          mediaType.video
        );

      if (!audio) {
        elem = document.createElement("video");
        elem.srcObject = currentStream;
        elem.id = producer.id;
        elem.setAttribute("playsinline", "true");
        elem.autoplay = true;
        elem.setAttribute("data-localVideo", "primary");
        elem.muted = true;
        elem.className = "vid";

        $(`#${deviceId}`).empty();
        $(`#${deviceId}`).append($(elem));
        $(`#${deviceId}`).addClass("active");
        $(`#${deviceId}`).removeClass("inactive");

        let elemMob = document.createElement("video");
        elemMob.srcObject = currentStream;
        elemMob.id = producer.id;
        elemMob.setAttribute("playsinline", "true");
        elemMob.autoplay = true;
        elemMob.setAttribute("data-localVideo", "primary");
        elemMob.muted = true;
        elemMob.className = "vid";

        $(`#${deviceId}Mob`).empty();
        $(`#${deviceId}Mob`).append($(elemMob));
        $(`#${deviceId}Mob`).addClass("active");
        $(`#${deviceId}Mob`).removeClass("inactive");

        let videoElem = document.createElement("video");
        videoElem.srcObject = currentStream;
        videoElem.setAttribute("playsinline", "true");
        videoElem.autoplay = true;
        videoElem.muted = true;
        videoElem.className = "vid";

        $(".local-audio-list").hide();

        let newLi = `<li id="LocalLi${producer.id}" class="active"></li>`;
        $(".local-camera-view-wrapper > ul").append($(newLi));
        $(`#LocalLi${producer.id}`).append(videoElem);
        $(`#LocalLi${producer.id}`).siblings().removeClass("active");

        let videoElemMob = document.createElement("video");
        videoElemMob.srcObject = currentStream;
        videoElemMob.setAttribute("playsinline", "true");
        videoElemMob.autoplay = true;
        videoElemMob.muted = true;
        videoElemMob.className = "vid";

        let newLiMob = `<li id="LocalLi${producer.id}Mob" class="active"></li>`;
        $(".mobile-active-local-cameras").append($(newLiMob));
        $(`#LocalLi${producer.id}Mob`).append(videoElemMob);
        $(`#LocalLi${producer.id}Mob`).siblings().removeClass("active");

        $(".local-camera-view-wrapper > ul").children().off("click");
        $(".local-camera-view-wrapper > ul")
          .children()
          .on("click", function () {
            $(this).toggleClass("active");
            $(this).siblings().removeClass("active");
          });

        $(".mobile-active-local-cameras").children().off("click");
        $(".mobile-active-local-cameras")
          .children()
          .on("click", function () {
            $(this).toggleClass("active");
            $(this).siblings().removeClass("active");
          });
      } else {
        audioStream = currentStream;
        if (recordingActive) {
          let micAudio =
            this.audioContext.createMediaStreamSource(audioStream);
          micAudio.connect(destAudio);
        }
      }

      if (type === mediaType.video) {
        this.videoProducerLabel.set(deviceId, producer.id);
        setTimeout(() => {
          // this.getConsumeStream(producer.id);
          if (this.producers.get(producer.id)) {
            let localConsumer = { id: deviceId };
            this.consumeMedia({
              consumer: localConsumer,
              stream,
              kind: "video",
              producerId: producer.id,
            });
          }
        }, 1500);
      } else {
        this.micLevel(currentStream);
        this.producerLabel.set(type, producer.id);
      }

      this.producerEvents(type, producer, audio, elem);
    } else {
      params = screenParams;
      producer = await this.producerTransport.produce(params);
      this.producers.set(producer.id, producer);
      this.acknowledgeNewProduer(
        producer.id,
        producer.kind,
        mediaType.screen
      );

      $(".share-screen-btn").addClass("active");
      this.IsShareScreen = true;

      this.producerLabel.set(type, producer.id);
      this.producerEvents(type, producer, audio, elem);

      var dataObj = {
        commandType: "ScreenShared",
        Data: {
          userName: JSON.parse(await getCookie()).name,
          userId: JSON.parse(await getCookie()).userID,
          producerId: producer.id,
          roomId: localStorage.getItem("RoomId"),
        },
      };
      await this.socket.sendCommand(JSON.stringify(dataObj));

      if (sysAudio) {
        params = sysAudioParams;
        producer = await this.producerTransport.produce(params);
        this.producers.set(producer.id, producer);
        this.acknowledgeNewProduer(
          producer.id,
          producer.kind,
          mediaType.systemAudio
        );

        this.producerLabel.set(mediaType.systemAudio, producer.id);
        this.producerEvents(mediaType.systemAudio, producer, audio, elem);
      }
    }
  }
}


