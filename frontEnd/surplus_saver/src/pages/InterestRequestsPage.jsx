import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { api } from "../Utils/backendApi";
import Button from "../components/UI/Button";
import DropDownUser from "../components/UI/DropDownUser";
import Toast from "../components/UI/Toast";
import TextShine from "../components/UI/TextShine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import EmptyAnim from "../components/UI/EmptyAnim";

// import BetterDropDownMenu from "../components/UI/BetterDropDownMenu";
const InterestRequestsPage = () => {
  const [interests, setInterests] = useState([]);
  const [toast, setToast] = useState(null); // Add a new state for the toast

  const memoizedInterests = useMemo(() => interests, [interests]);

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
  //     } else if (response.status === 103) {
  //       console.log(response.data);
  //       setToast({ type: "info", message: response.data });
  //     }
  //   } catch (error) {
  //     console.error("Failed to accept interest", error);
  //     setToast({
  //       type: "info",
  //       message:
  //         "Failed to accept interest or Interest has already been accepted or cancelled.",
  //     });
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
  //     } else if (response.status === 103) {
  //       setToast({ type: "info", message: response.data });
  //       console.log(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Failed to cancel interest", error);
  //     setToast({
  //       type: "info",
  //       message:
  //         "Failed to cancel interest or Interest has already been accepted or cancelled.",
  //     });
  //   }
  // };

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
  //       setInterests(
  //         interests.filter((interest) => interest.interestId !== interestId)
  //       );
  //     } else if (response.status === 103) {
  //       console.log(response.data);
  //       setToast({ type: "info", message: response.data });
  //     }
  //   } catch (error) {
  //     console.error("Failed to accept interest", error);
  //     setToast({
  //       type: "info",
  //       message:
  //         "Failed to accept interest or Interest has already been accepted or cancelled.",
  //     });
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
  //       setInterests(
  //         interests.filter((interest) => interest.interestId !== interestId)
  //       );
  //     } else if (response.status === 103) {
  //       setToast({ type: "info", message: response.data });
  //       console.log(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Failed to cancel interest", error);
  //     setToast({
  //       type: "info",
  //       message:
  //         "Failed to cancel interest or Interest has already been accepted or cancelled.",
  //     });
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
        setTimeout(() => {
          setInterests(
            interests.filter((interest) => interest.interestId !== interestId)
          );
        }, 2000);
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
        setTimeout(() => {
          setInterests(
            interests.filter((interest) => interest.interestId !== interestId)
          );
        }, 2000);
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
      <div className="text-center p-5 flex flex-col gap-2 justify-center items-center">
        <TextShine
          content="Interest Requests"
          className="text-5xl font-bold text-center"
        />
        {/* <p className="text-lg m-4 font-bold">
          Here you can see all the interest requests you&apos;ve received. You
          can <span className="text-green">accept</span> or{" "}
          <span className="text-red-500">deny</span> these requests.
        </p> */}
        <p className="font-bold text-2xl">
          {interests.length === 0 && (
            <div>
              <p>No requests to show :(</p>
              <EmptyAnim />
            </div>
          )}
        </p>
      </div>

      {memoizedInterests.map((interest, index) =>
        interest.users.map((user, userIndex) => (
          <div
            key={`${index}-${userIndex}`}
            className="p-4 border-4 border-silver rounded-lg"
          >
            <h2 className="text-xl font-bold m-4">
              <DropDownUser
                name={user.name}
                email={user.email}
                address={user.address}
                phone={user.phone}
                username={user.username}
                imagePath={user.imagePath}
                className="text-silver"
              />
              with address <span className="text-silver"> {user.address} </span>
              and phone number{" "}
              <span className="text-silver"> {user.phone} </span>
              is interested in the post that has these items:
            </h2>
            <ul className="flex flex-col space-y-4">
              {interest.post.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="border border-gray-300 p-4 my-4 rounded-md bg-gray-50"
                >
                  <div className="flex gap-3 text-3xl font-bold text-gray-600 mb-2">
                    <FontAwesomeIcon icon={faBowlFood} className="size-10" />
                    <span className="italic text-3xl font-extrabold">
                      {item.itemName}
                    </span>
                  </div>
                  <p className="text-2xl text-gray-500 font-bold">
                    Type:{" "}
                    <span className="text-[#463f3a] font-mono">
                      {item.itemType}
                    </span>
                  </p>
                  <p className="text-2xl text-gray-500 font-bold">
                    Quantity:{" "}
                    <span className="text-[#463f3a] font-mono">
                      {item.quantity}KG
                    </span>
                  </p>
                  <p className="text-2xl text-gray-500 font-bold">
                    Description:{" "}
                    <span className="text-[#463f3a] font-mono">
                      {item.description}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex gap-5 justify-center m-5">
              <Button
                ghost
                type="submit"
                className="bg-silver text-black font-bold"
                onClick={() => acceptInterest(interest.interestId)}
              >
                Accept
              </Button>
              <Button
                ghost
                onClick={() => cancelInterest(interest.interestId)}
                className="font-bold"
              >
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
