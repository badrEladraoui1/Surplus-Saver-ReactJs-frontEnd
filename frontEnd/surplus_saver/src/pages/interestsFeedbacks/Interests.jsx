/* eslint-disable no-unused-vars */
import { useState } from "react";
import CardSpotlight from "../../components/UI/CardSpotlight ";
import { NavLink } from "react-router-dom";
import TextShine from "../../components/UI/TextShine";
import { Outlet } from "react-router-dom";

const Interests = () => {
  const [isAcceptedActive, setIsAcceptedActive] = useState(false);
  const [isPendingActive, setIsPendingActive] = useState(false);
  const [isRefusedActive, setIsRefusedActive] = useState(false);

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
