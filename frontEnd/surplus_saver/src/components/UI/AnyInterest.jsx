/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { api } from "../../Utils/backendApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import TextShine from "../../components/UI/TextShine";

const AnyInterest = ({ endpoint, type }) => {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await axios.get(`${api}${endpoint}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        setInterests(response.data);
      } catch (error) {
        console.error(`Failed to fetch interests:`, error);
      }
    };

    fetchInterests();
  }, [endpoint]);

  const memoizedInterests = useMemo(() => interests, [interests]);

  return (
    <div className="flex flex-col gap-10">
      {memoizedInterests.length > 0 ? (
        memoizedInterests.map((interest) => (
          <div
            key={interest.id}
            className="border-4 border-silver p-5 rounded-lg bg-gray-100 bg-opacity-10"
          >
            <div>
              <h2 className="text-2xl font-bold">
                The restaurant named:{" "}
                <span className="inline-flex animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-2xl text-transparent">
                  {interest.username}
                </span>{" "}
                has{" "}
                <span className="inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-xl text-transparent">
                  {type}
                </span>{" "}
                your request for the post that contains these items:
              </h2>
              <div>
                {interest.items.map((item) => (
                  <section className="flex flex-col" key={item.id}>
                    <div className="border border-gray-300 p-4 my-4 rounded-md bg-gray-50 bg-opacity-90">
                      <div className="flex gap-3 text-3xl font-bold text-gray-600 mb-2">
                        <FontAwesomeIcon
                          icon={faBowlFood}
                          className="size-10"
                        />
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
                    </div>
                  </section>
                ))}
              </div>
            </div>
            <p className="text-2xl font-bold text-center">
              {type === "accepted" && (
                <>
                  <span>FOR MORE INFO</span>, contact the restaurant at this
                  phone number:{" "}
                  <TextShine
                    content={interest.phone}
                    className="text-3xl font-bold"
                  />
                </>
              )}
            </p>
          </div>
        ))
      ) : (
        <p className="text-2xl font-bold text-center">
          No {type} feedbacks yet ...
        </p>
      )}
    </div>
  );
};

export default AnyInterest;
