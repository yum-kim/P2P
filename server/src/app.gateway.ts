import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  client: Record<string, Socket>;
  constructor() {
    this.client = {};
  }
  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    console.log('Socket server initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    this.client[client.id] = client;
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
    delete this.client[client.id];
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    for (const [id, thisClient] of Object.entries(this.client)) {
      thisClient.emit('getMessage', {
        id: client.id,
        payload,
      });
    }
  }
}
