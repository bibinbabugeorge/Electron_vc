class RepoClient {
  socket = null;
  constructor( socket) {
    this.socket = socket;
  }

  async ServerEventCall(commandType,data) {
    var dataObj = { commandType: commandType, Data: data};
    await this.socket.sendCommand(JSON.stringify(dataObj))
  } 
}
