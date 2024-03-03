import { notification } from 'antd';

class Notification {
  success(message: any, placement: any = 'bottomLeft') {
    notification['success']({ message: message, placement });
  }

  error(message: any, placement: any = 'bottomLeft') {
    notification['error']({ message: message, placement });
  }

  info(message: any, placement: any = 'bottomLeft') {
    notification['info']({ message: message, placement });
  }
}

export default new Notification();
