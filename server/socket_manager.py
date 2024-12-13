import socketio
from .logger import get_custom_logger
from .event_triggers import (
    on_message_handler,
    on_connect_handler,
)

logger = get_custom_logger("socket_manager")

class ProxyNamespaceManager(socketio.AsyncNamespace):

    def on_connect(self, sid, environ):
        logger.info("Environment", environ)
        logger.info(f"Client {sid} connected")
        # return False
        on_connect_handler(socket_id=sid)

    async def on_message(self, sid, message_data):
        await on_message_handler(socket_id=sid, data=message_data)

    def on_disconnect(self, sid):
        logger.info(f"Client {sid} disconnected")