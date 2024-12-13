import io from "socket.io-client";

// Clase para manejar WebSocket
export class SocketManager {
  socket: any;

  constructor(serverUrl:string) {
    this.socket = io(serverUrl, {
      transports: ["websocket", "polling"]
    });

    this.socket.on("connect", () => {
      console.log(`Connected to socket server at ${serverUrl}`);
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
  }

  on(event: string, callback: (data: any) => void) {
    console.log(`Registering ${event}`);
    
    this.socket.on(event, callback);
  }

  off(event: string) {
    this.socket.off(event);
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  disconnect() {
    this.socket.disconnect();
  }
}