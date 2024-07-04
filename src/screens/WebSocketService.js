import { io } from 'socket.io-client';

// Replace with your backend WebSocket server URL
const SOCKET_URL = 'https://mapi-dev.baggagetaxi.com';  // Update with your actual backend URL

class WebSocketService {
    socket = null;

    connect() {
        this.socket = io(SOCKET_URL, {
            transports: ['websocket'],
            jsonp: false,
        });

        this.socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        this.socket.on('connect_error', (err) => {
            console.error('Connection error:', err);
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.emit('closeConnection');
            this.socket.disconnect();
        }
    }

    joinRoom(bookingId) {
        if (this.socket) {
            this.socket.emit('joinRoom', bookingId);
        }
    }

    leaveRoom(bookingId) {
        if (this.socket) {
            this.socket.emit('leaveRoom', bookingId);
        }
    }

    updateLocation(data) {
        if (this.socket) {
            this.socket.emit('updateLocation', data);
        }
    }

    onLocationUpdate(callback) {
        if (this.socket) {
            this.socket.on('locationUpdate', callback);
        }
    }
}

export default new WebSocketService();