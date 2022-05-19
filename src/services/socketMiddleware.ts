import { AnyAction } from 'redux';
import { socketActions } from './slices/webSocketSlice';

const socketMiddleware = (WsActions: typeof socketActions) => {
  return (store: any) => {
    let socket: WebSocket | null = null;

    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      const { start, success, error, closed, saveData} = socketActions;
      
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === start.type) {
        const wsUrl = payload.token ? `${payload.url}?token=${payload.token}` : `${payload.url}`;
        socket = new WebSocket(wsUrl);
      }
      if (socket) {
        socket.onopen = () => {
          console.log('connection open');
          dispatch(success());
        };

        socket.onerror = (event) => {
          console.log('error connection');
          dispatch(error());
        };

        socket.onmessage = (event) => {
          console.log('get data');
          const { data } = event;
          const { success, ...info } = JSON.parse(data);
          if (success) {
            dispatch(saveData(info));
          }
        };
        socket.onclose = () => dispatch(closed());
      }
      next(action);
    };
  };
};

export default socketMiddleware;
