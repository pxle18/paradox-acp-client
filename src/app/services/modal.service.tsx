import { duration } from '@mui/material';
import { Modal, ModalType } from 'app/models/modal.model';
import { Notification } from 'app/models/notification.model';
import { EventEmitter } from 'events';

class ModalService extends EventEmitter {
  currentModal: Modal | null;

  constructor() {
    super();
    
    this.currentModal = null;
  }

  close() {
    this.currentModal = null;
    this.emitChange();
  }

  show(modalType: ModalType, title: string, description: string, callback: (input: boolean | string) => void) {
    this.currentModal = {
      modalType: modalType,
      title: title,
      description: description,
      callback: callback
    };

    this.emitChange();
  }

  showWithData(modalType: ModalType, title: string, description: string, dataSource, callback: (input: boolean | string) => void) {
    this.currentModal = {
      modalType: modalType,
      title: title,
      description: description,
      dataSource: dataSource,
      callback: callback
    };

    this.emitChange();
  }

  emitChange() {
    this.emit('modal-change', this.currentModal);
  }

  addChangeListener(callback: any) {
    this.addListener('modal-change', callback);
  }

  removeChangeListener(callback: any) {
    this.removeListener('modal-change', callback);
  }
}

export default new ModalService();