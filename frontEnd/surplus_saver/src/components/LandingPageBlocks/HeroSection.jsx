/* eslint-disable react/prop-types */

import Button from "../UI/Button";
import image from "../../assets/heroSectionImage.png";
import { NavLink } from "react-router-dom";

const HeroSection = ({ onScrollToBenefitsSection }) => {
  return (
    <header className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-col lg:flex-row justify-center items-center gap-3 mx-24">
        <div className="flex flex-col gap-7 items-start ">
          <h1 className="text-6xl font-extrabold ">
            Connecting Surplus Food with Those in Need
          </h1>
          <p>Join us in the fight against food waste and hunger.</p>
          <div className="flex gap-3">
            <NavLink to="/sign_up">
              <Button className="font-bold" accent>
                GET STARTED !!!
              </Button>
            </NavLink>

            <Button
              onClick={onScrollToBenefitsSection}
              className="font-bold"
              neutral
            >
              LEARN MORE
            </Button>
          </div>
        </div>
        <div>
          <img src={image} className="rounded-[20px] min-w-[336px]" />
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
