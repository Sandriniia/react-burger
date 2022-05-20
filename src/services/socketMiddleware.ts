import { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { socketActions } from './slices/webSocketSlice';
import type { RootState, AppDispatch } from '../services/store';

const socketMiddleware = (WsActions: typeof socketActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      const { start, success, error, closed, saveData } = WsActions;

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
            console.log(info);
            
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
