import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../Utils/backendApi";
import Button from "../components/UI/Button";
import DropDownUser from "../components/UI/DropDownUser";
import Toast from "../components/UI/Toast";

const InterestRequestsPage = () => {
  const [interests, setInterests] = useState([]);
  const [toast, setToast] = useState(null); // Add a new state for the toast

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await axios.get(
          `${api}/SurplusSaverApiV1/interests/myInterests`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setInterests(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch interests has maybe already been accepted or cancelled",
          error
        );
      }
    };

    fetchInterests();
  }, []);

  useEffect(() => {
    if (toast !== null) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000); // Clear the toast after 3 seconds

      return () => clearTimeout(timer); // This will clear the timer if the component unmounts before the timer finishes
    }
  }, [toast]);

  // const acceptInterest = async (interestId) => {
  //   try {
  //     const response = await axios.post(
  //       `${api}/SurplusSaverApiV1/interests/${interestId}/accept`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       setToast({ type: "success", message: response.data });
  //     } else {
  //       setToast({ type: "error", message: response.data });
  //     }
  //   } catch (error) {
  //     console.error("Failed to accept interest", error);
  //     setToast({ type: "error", message: "Failed to accept interest." });
  //   }
  // };

  // const cancelInterest = async (interestId) => {
  //   try {
  //     const response = await axios.post(
  //       `${api}/SurplusSaverApiV1/interests/${interestId}/cancel`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       setToast({ type: "success", message: response.data });
  //     } else {
  //       setToast({ type: "info", message: response.data });
  //     }
  //   } catch (error) {
  //     console.error("Failed to cancel interest", error);
  //     setToast({ type: "error", message: "Failed to cancel interest." });
  //   }
  // };

  const acceptInterest = async (interestId) => {
    try {
      const response = await axios.post(
        `${api}/SurplusSaverApiV1/interests/${interestId}/accept`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setToast({ type: "success", message: response.data });
      } else if (response.status === 103) {
        console.log(response.data);
        setToast({ type: "info", message: response.data });
      }
    } catch (error) {
      console.error("Failed to accept interest", error);
      setToast({
        type: "info",
        message:
          "Failed to accept interest or Interest has already been accepted or cancelled.",
      });
    }
  };

  const cancelInterest = async (interestId) => {
    try {
      const response = await axios.post(
        `${api}/SurplusSaverApiV1/interests/${interestId}/cancel`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setToast({ type: "success", message: response.data });
      } else if (response.status === 103) {
        setToast({ type: "info", message: response.data });
        console.log(response.data);
      }
    } catch (error) {
      console.error("Failed to cancel interest", error);
      setToast({
        type: "info",
        message:
          "Failed to cancel interest or Interest has already been accepted or cancelled.",
      });
    }
  };

  return (
    <div className="space-y-4">
      {toast && (
        <Toast
          info={toast.type === "info"}
          success={toast.type === "success"}
          error={toast.type === "error"}
          content={toast.message}
        />
      )}
      <div className="text-center p-5">
        <h1 className="text-3xl font-bold m-4  text-yellow">
          Interest Requests
        </h1>
        <p className="text-lg m-4 font-bold">
          Here you can see all the interest requests you&apos;ve received. You
          can <span className="text-green">accept</span> or{" "}
          <span className="text-red-500">deny</span> these requests.
          <p>{interests.length === 0 && "No requests to show."}</p>
        </p>
      </div>

      {interests.map((interest, index) =>
        interest.users.map((user, userIndex) => (
          <div
            key={`${index}-${userIndex}`}
            className="p-4 border-2 border-white rounded-lg"
          >
            <h2 className="text-xl font-bold m-4">
              User{" "}
              <DropDownUser
                name={user.name}
                email={user.email}
                address={user.address}
                phone={user.phone}
                username={user.username}
                imagePath={user.imagePath}
              />
              with address <span className="text-green"> {user.address} </span>
              and phone number{" "}
              <span className="text-green"> {user.phone} </span>
              is interested in the post that has these items:
            </h2>
            <ul className="flex space-x-4">
              {interest.post.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex-1 border-2 border-gray-500 rounded-md p-5"
                >
                  <h3 className="font-bold text-2xl">{item.itemName}</h3>
                  <p>
                    Item Type:
                    <span className="font-bold"> {item.itemType}</span>
                  </p>
                  <p>
                    Description:
                    <span className="font-bold"> {item.description}</span>
                  </p>
                  <p>
                    Quantity:<span className="font-bold"> {item.quantity}</span>
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex gap-5 justify-center m-5">
              <Button
                accent
                onClick={() => acceptInterest(interest.interestId)}
              >
                Accept
              </Button>
              <Button error onClick={() => cancelInterest(interest.interestId)}>
                Deny
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default InterestRequestsPage;
