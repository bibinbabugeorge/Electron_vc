async function GuestRequest() {
    const dataObj = {
        commandType: "GetGuestPermission",
        Data: {
            roomId: localStorage.getItem("RoomId"),
            userId: JSON.parse(await getCookie()).userID
        }
    };
    server.sendCommand(JSON.stringify(dataObj));
}