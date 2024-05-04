/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faHandHoldingHeart,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

import { useState, useEffect } from "react";
import axios from "axios";

import { api } from "../../Utils/backendApi";

const Menu = ({ className, postId, reactions }) => {
  const { userId } = useContext(UserContext);

  const [reaction, setReaction] = useState(null);
  const [reactionId, setReactionId] = useState(null);

  useEffect(() => {
    const userReaction = reactions.find(
      (reaction) => reaction.user.id === userId
    );
    if (userReaction) {
      setReaction(userReaction.type);
      setReactionId(userReaction.id);
    }
  }, [reactions, userId]);

  const countReactions = (type) => {
    return reactions.filter((reaction) => reaction.type === type).length;
  };

  const handleReaction = async (newReaction) => {
    if (newReaction === reaction) {
      // User clicked on the same reaction, remove it
      await axios.delete(
        `${api}/SurplusSaverApiV1/posts/${postId}/reactions/${reactionId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setReaction(null);
      setReactionId(null); // reset the reactionId
    } else {
      // User clicked on a different reaction, replace the existing one
      if (reaction) {
        await axios.delete(
          `${api}/SurplusSaverApiV1/posts/${postId}/reactions/${reactionId}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      }
      const response = await axios.post(
        `${api}/SurplusSaverApiV1/posts/${postId}/reactions`,
        { reaction: newReaction },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setReaction(newReaction);
      setReactionId(response.data.id); // store the reactionId
    }
  };

  return (
    <ul className={`menu menu-horizontal bg-base-200 rounded-box ${className}`}>
      <li>
        <a onClick={() => handleReaction("thumbsUp")}>
          <FontAwesomeIcon icon={faThumbsUp} className="h-5 w-5" />
          <span>{countReactions("thumbsUp")}</span>
        </a>
      </li>
      <li>
        <a onClick={() => handleReaction("handHoldingHeart")}>
          <FontAwesomeIcon icon={faHandHoldingHeart} className="h-5 w-5" />
          <span>{countReactions("handHoldingHeart")}</span>
        </a>
      </li>
      <li>
        <a onClick={() => handleReaction("thumbsDown")}>
          <FontAwesomeIcon icon={faThumbsDown} className="h-5 w-5" />
          <span>{countReactions("thumbsDown")}</span>
        </a>
      </li>
    </ul>
  );
};

export default Menu;

// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faThumbsUp,
//   faHandHoldingHeart,
//   faThumbsDown,
// } from "@fortawesome/free-solid-svg-icons";
// import { useContext, useState, useEffect } from "react";
// import { Client } from "@stomp/stompjs";
// import { UserContext } from "../../contexts/UserContext";
// // eslint-disable-next-line no-unused-vars
// import { api } from "../../Utils/backendApi";
// import axios from "axios";

// const Menu = ({ className, postId, reactions }) => {
//   const { userId } = useContext(UserContext);
//   const [localReactions, setLocalReactions] = useState(reactions);
//   const [reactionId, setReactionId] = useState(null);

//   useEffect(() => {
//     const client = new Client({
//       brokerURL: "ws://localhost:8080/ws",
//       connectHeaders: {
//         login: "guest",
//         passcode: "guest",
//       },
//       debug: function (str) {
//         console.log(str);
//       },
//       reconnectDelay: 5000,
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,
//     });

//     client.onConnect = function (frame) {
//       client.subscribe("/topic/reactions", function (message) {
//         const updatedReaction = JSON.parse(message.body);
//         setLocalReactions(
//           localReactions.map((reaction) =>
//             reaction.id === updatedReaction.id ? updatedReaction : reaction
//           )
//         );
//       });
//     };

//     client.onStompError = function (frame) {
//       console.log("Broker reported error: " + frame.headers["message"]);
//       console.log("Additional details: " + frame.body);
//     };

//     client.activate();

//     return () => {
//       client.deactivate();
//     };
//   }, [localReactions]);

//   useEffect(() => {
//     const userReaction = localReactions.find(
//       (reaction) => reaction.user.id === userId
//     );
//     if (userReaction) {
//       setLocalReactions(userReaction.type);
//       setReactionId(userReaction.id);
//     }
//   }, [localReactions, userId]);

//   const countReactions = (type) => {
//     return localReactions.filter((reaction) => reaction.type === type).length;
//   };

//   const handleReaction = async (newReaction) => {
//     // ... existing code
//   };

//   return (
//     <ul className={`menu menu-horizontal bg-base-200 rounded-box ${className}`}>
//       <li>
//         <a onClick={() => handleReaction("thumbsUp")}>
//           <FontAwesomeIcon icon={faThumbsUp} className="h-5 w-5" />
//           <span>{countReactions("thumbsUp")}</span>
//         </a>
//       </li>
//       <li>
//         <a onClick={() => handleReaction("handHoldingHeart")}>
//           <FontAwesomeIcon icon={faHandHoldingHeart} className="h-5 w-5" />
//           <span>{countReactions("handHoldingHeart")}</span>
//         </a>
//       </li>
//       <li>
//         <a onClick={() => handleReaction("thumbsDown")}>
//           <FontAwesomeIcon icon={faThumbsDown} className="h-5 w-5" />
//           <span>{countReactions("thumbsDown")}</span>
//         </a>
//       </li>
//     </ul>
//   );
// };

// export default Menu;
