/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { api } from "../../Utils/backendApi";

import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

import Toast from "../UI/Toast";

const InterestedPostModal = ({
  isModalOpen,
  onCloseModal,
  restaurantName,
  postId,
}) => {
  const { userUserName, userId } = useContext(UserContext);

  const dialog = useRef();

  useEffect(() => {
    (() => {
      if (isModalOpen) {
        dialog.current.showModal();
      }
      if (!isModalOpen) {
        dialog.current.close();
        setIsLoading(false);
        setError(null);
        setSuccess(false);
      }
    })();
  }, [isModalOpen]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendInterestRequest = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const interest = {
      userId: userId,
      postId: postId,
    };

    try {
      const response = await fetch(
        `${api}/SurplusSaverApiV1/interests/expressInterest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(interest),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send interest request");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog id="my_modal_1" className="modal" ref={dialog}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello! {userUserName}</h3>
        <p className="py-4">
          This will send a request for {restaurantName}&apos;s restaurant so
          they can accept or deny your request
        </p>
        <div className="modal-action">
          <button onClick={onCloseModal} className="btn">
            Close
          </button>
          <button onClick={sendInterestRequest}>Ok</button>
        </div>
      </div>
      <Toast
        info={isLoading}
        success={success}
        error={!!error}
        content={error || (success && "Successfully expressed interest")}
      />
    </dialog>
  );
};

export default InterestedPostModal;
