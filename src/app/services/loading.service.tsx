import { duration } from '@mui/material';
import { Notification } from 'app/models/notification.model';
import { EventEmitter } from 'events';

class LoadingService extends EventEmitter {
  isLoading: boolean;

  constructor() {
    super();
    
    this.isLoading = false;
  }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
    this.emitChange();
  }

  emitChange() {
    this.emit('loading-change', this.isLoading);
  }

  addChangeListener(callback: any) {
    this.addListener('loading-change', callback);
  }

  removeChangeListener(callback: any) {
    this.removeListener('loading-change', callback);
  }
}

export default new LoadingService();