/* eslint-disable no-unused-vars */
import { useState } from "react";
import CardSpotlight from "../../components/UI/CardSpotlight ";
import { NavLink } from "react-router-dom";
import TextShine from "../../components/UI/TextShine";
import { Outlet } from "react-router-dom";

const Interests = () => {
  const [isAcceptedActive, setIsAcceptedActive] = useState(false);
  console.log(isAcceptedActive);
  const [isPendingActive, setIsPendingActive] = useState(false);
  console.log(isPendingActive);
  const [isRefusedActive, setIsRefusedActive] = useState(false);
  console.log(isRefusedActive);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <TextShine content="Interests Feedbacks" className="text-5xl font-bold" />
      <section className="flex gap-10">
        <NavLink to="accepted">
          <CardSpotlight content="Accepted" />
        </NavLink>
        <NavLink to="pending">
          <CardSpotlight content="Pending" />
        </NavLink>
        <NavLink to="refused">
          <CardSpotlight content="Refused" />
        </NavLink>
      </section>
      <Outlet />
    </div>
  );
};

export default Interests;
