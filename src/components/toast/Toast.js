import { NotificationManager } from 'react-notifications';

class Toaster {
  success(message, title) {
    NotificationManager.success(message, title || 'Success', 5000);
  }
  warning(message, title) {
    NotificationManager.warning(message, title || 'Warning', 4000);
  }
  error(message, title) {
    NotificationManager.error(message, title || 'Error', 4000);
  }
  info(message, title, cb = () => {}) {
    NotificationManager.info(message, title || 'Info', 3500, cb);
  }
}

export const toast = new Toaster();
