import { duration } from '@mui/material';
import { Notification } from 'app/models/notification.model';
import { EventEmitter } from 'events';

const createUUID = () => {
  const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return pattern.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
};

const Constants = {
  CHANGE: 'change',
};

class NotificationService extends EventEmitter {
  listNotify: Notification[];

  constructor() {
    super();
    this.listNotify = [];
  }

  create(notify) {
    const defaultNotify: Notification = {
      id: createUUID(),
      message: null,
      duration: 555555
    };

    var notification = Object.assign(defaultNotify, notify);

    this.listNotify.push(notification);
    this.emitChange();

    setTimeout(() => {
      this.remove(notification);
    }, defaultNotify.duration);
  }

  pushNotification(message, duration = 3000) {
    this.create({
      message,
      duration
    });
  }

  remove(notification: Notification) {
    this.listNotify = this.listNotify.filter((n) => notification.id !== n.id);
    this.emitChange();
  }

  removeAll() {
    this.listNotify.length = 0;
    this.emitChange();
  }

  emitChange() {
    this.emit(Constants.CHANGE, this.listNotify);
  }

  addChangeListener(callback) {
    this.addListener(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new NotificationService();