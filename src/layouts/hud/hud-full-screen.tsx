import React, { createRef, useEffect, useState } from "react";

import Button from "components/button";
import Input from "components/input";

import { useAuthContext } from "app/contexts/auth-context";

import Logo from "assets/vectors/Void-logo-big.svg";
import authService from "app/services/auth.service";

import { useHudContext } from "app/contexts/hud-context";
import { Modal, ModalType } from "app/models/modal.model";
import { CSSTransition, Transition, TransitionGroup } from "react-transition-group";
import notificationService from "app/services/notification.service";
import { Notification } from "app/models/notification.model";
import { BounceLoader } from "react-spinners";
import loadingService from "app/services/loading.service";
import modalService from "app/services/modal.service";
import { MinusCircleIcon, PlusCircleIcon, XCircleIcon, XIcon } from "@heroicons/react/outline";
import Select from "components/select";
import VisualizeItemLog from "./components/visualize-item-log.hud-component";

const Hud: React.FC = () => 
{
  const { setAuthUser } = useAuthContext();
  const { currentItemVisualization } = useHudContext();

  const [currentModalType, setCurrentModalType] = useState<Modal>(null);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [modalInput, setModalInput] = useState<string>();

  useEffect(() => {
    notificationService.addChangeListener(handleStoreChange);
    loadingService.addChangeListener(handleLoadingChange);
    modalService.addChangeListener(handleModalChange);

    return () => {
      notificationService.removeChangeListener(handleStoreChange);
      loadingService.removeChangeListener(handleLoadingChange);
      modalService.removeChangeListener(handleModalChange);
    }
  }, []);
  
  const handleStoreChange = (notify: Notification[]) => {
    setNotifications([ ...notify ]);
  };

  const handleLoadingChange = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const handleModalChange = (currentModalType: Modal) => {
    setModalInput("");
    setCurrentModalType(currentModalType);
  };

  return (
    <div className="z-10 absolute left-0 top-0 w-full h-full overflow-hidden pointer-events-none">
      {
        isLoading &&
          <div className="flex absolute justify-center items-center w-full h-full bg-dark-900 bg-opacity-40 backdrop-blur-[3px] z-50">
            <BounceLoader
              color="#ffffff"
              loading />
          </div>
      }

      {
        currentItemVisualization &&
          <VisualizeItemLog />
      }

      { 
        currentModalType &&
          <div className="flex absolute justify-center items-center w-full h-full bg-dark-900 bg-opacity-60 backdrop-blur-[4px] pointer-events-auto">
            <div className="bg-dark-800 w-96 h-72 rounded-sm shadow-md flex justify-center items-center flex-col relative">
              <Button className="absolute top-2 right-2" onClick={() => modalService.close()}>
                <XIcon className="w-[11px]" />
              </Button>

              <p className="text-3xl font-medium">{ currentModalType.title }</p>
              <p className="text-center">{ currentModalType.description }</p>

              {{
                [ ModalType.CONFIRMATION ]: 
                  <div className="confirmation flex justify-center items-center flex-col mt-5">
                    <Button onClick={() => currentModalType.callback(true)}>Bestätigen</Button> 
                  </div>,

                [ ModalType.INPUT ]: 
                  <div className="input flex justify-center items-center flex-col mt-5">
                    <Input 
                      placeholder="Text:"
                      icon={<PlusCircleIcon />}
                      onChange={input => setModalInput(input.currentTarget.value)}
                    />

                    <Button className="mt-2" disabled={modalInput == ""} onClick={() => currentModalType.callback(modalInput)}>Bestätigen</Button> 
                  </div>,

                [ ModalType.SELECT ]: 
                  currentModalType.dataSource &&
                    <div className="input flex justify-center items-center flex-col mt-5">
                      <Select 
                        icon={<PlusCircleIcon />}
                        items={currentModalType.dataSource}
                        onChange={input => setModalInput(input.currentTarget.value)} />
                      <Button className="mt-2" disabled={modalInput == ""} onClick={() => currentModalType.callback(modalInput)}>Bestätigen</Button> 
                    </div>,
              }[currentModalType.modalType]}
            </div>
          </div>
      }

      <div className="bottom-1 right-0 absolute">
        <TransitionGroup component="div" className="flex flex-col gap-[4px]">
          {notifications.map((notify) => (
            <CSSTransition key={notify.id} timeout={250} classNames="item">
              <div className="flex w-72 p-2 bg-dark-800 drop-shadow-lg border-[1px] border-[rgb(48,48,48)] border-opacity-50 rounded-sm text-white text-xs">
                <p>{notify.message}</p>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default Hud;