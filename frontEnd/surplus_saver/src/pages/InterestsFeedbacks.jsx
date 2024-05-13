import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../Utils/backendApi";
import PostLoading from "../components/UI/PostLoading";

const InterestsFeedbacks = () => {
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${api}/SurplusSaverApiV1/interests/user/consumer`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setInterests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error!", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <PostLoading />;
  }

  if (error) {
    return (
      <p className="text-lg font-bold text-red-500">
        An error occurred: {error.message}
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center p-20">
      {interests.map((interest) => (
        <p
          key={interest.id}
          className="border-2 p-4  text-lg font-bold rounded-lg mb-4 w-4/5"
        >
          The post concerning these items:{" "}
          <span className="text-blue">
            {interest.items.map((item) => item.itemName).join(", ")}
          </span>{" "}
          that you have been interested in have been{" "}
          <span
            className={
              interest.status === "accepted"
                ? "text-green"
                : interest.status === "cancelled"
                ? "text-red-500"
                : "text-teal-300"
            }
          >
            {interest.status || "not yet responded to"}
          </span>{" "}
          by <span className="text-yellow">{interest.username}.</span>{" "}
          {interest.status === "accepted" && (
            <p>
              You can get more info by calling their phone number:{" "}
              <span className="text-blue">{interest.phone} </span>
            </p>
          )}
        </p>
      ))}
    </div>
  );
};

export default InterestsFeedbacks;
