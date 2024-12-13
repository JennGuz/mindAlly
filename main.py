import socketio
from server.socket import sio
from fastapi import FastAPI
import uvicorn
from fastapi.responses import FileResponse
app = FastAPI()

@app.get("/")
def index():
    return FileResponse("dist/index.html")

@app.get("/assets/{path:path}")
def assets(path: str):
    return FileResponse(f"dist/assets/{path}")


sio_asgi_app = socketio.ASGIApp(socketio_server = sio, other_asgi_app = app)


app.add_route("/socket.io/", route=sio_asgi_app, methods=['GET', 'POST'])
app.add_websocket_route("/socket.io/", route=sio_asgi_app)




if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8003, reload=True)