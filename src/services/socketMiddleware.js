import { socketActions } from './slices/webSocketSlice';

const socketMiddleware = (wsUrl) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { start, success, error, closed } = socketActions;
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === start.type) {
        socket = new WebSocket(wsUrl);
      }
      if (socket) {
        socket.onopen = () => dispatch(success());

        socket.onerror = (event) => dispatch(error(event));

        socket.onmessage = (event) => {
          const { data } = event;
          const { success, ...info } = JSON.parse(data);
          if (success) {
            //сохранять данные
          }
        };
        socket.onclose = () => dispatch(closed());
      }
      next(action);
    };
  };
};

export default socketMiddleware;
