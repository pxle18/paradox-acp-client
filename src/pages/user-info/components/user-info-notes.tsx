import React, { useEffect, useRef, useState } from "react";

import Button from "components/button";
import Input from "components/input";

import Logo from "assets/vectors/Void-logo.svg";
import { useAuthContext } from "app/contexts/auth-context";
import presentService from "app/services/user.service";
import { Route, Routes } from "react-router-dom";
import { UserModel } from "app/models/user.model";
import { Editor } from "@tinymce/tinymce-react";
import userNoteService from "app/services/user-note.service";
import { useUserContext } from "app/contexts/user-context";
import userService from "app/services/user.service";
import notificationService from "app/services/notification.service";
import '../../../styles/tinymce-theme.css';

const UserInfoNotes: React.FC = () => {
  const { currentAuthUser } = useAuthContext();
  const { currentUser } = useUserContext();

  const editorRef = useRef<any>(null);

  const [initialValue, setInitialValue] = useState<string>();
  const [tempInitialValue, setTempInitialValue] = useState<string>("");

  const handleUpdate = (value, editor) => {
    let content = editor.getContent();
    if(content == "") content = "Diese Akte ist leer.";

    userNoteService.updateUserNote(currentUser.id, content).then(
      response => {
        if(response.error !== undefined) {
          notificationService.pushNotification("Fehler beim Speichern der Akte!");
        } 
      }
    );
  };

  useEffect(() => {
    userNoteService.getUserNote(
      currentUser.id
    ).then(response => {
      if(response.data !== undefined) {
        var noteResponse = response.data;

        setInitialValue(noteResponse.note);
      }
    });
  }, [currentAuthUser])

  return (
    <div className="user-info-notes">
      <div className="flex w-full mt-4">
      <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         apiKey='3srfrcnrd37t0ha3dc3ftkgur76qd7a9zs7uttr46y6dphgv'
         initialValue={initialValue}
         onChange={handleUpdate}
         
         init={{
           width: "100%",
           height: 350,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: "@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');body { font-family:Inter, sans-serif; font-size:13px; color: white; }",
         }}
       />
      </div>
    </div>
  );
};

export default UserInfoNotes;