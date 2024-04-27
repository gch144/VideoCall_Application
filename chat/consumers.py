from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'Test-Room'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        print('Connected')



    async def disconnect(self, close_code):
        # print('Disconnected')
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        print('Disconnected')


    async def receive(self, dict_data):
        rect_data = json.loads(dict_data)
        message = rect_data['message']

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send.message',
                'message': message
            }
        )

    async def send_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({'message': message}))