import logo from "../../assets/Logo.png";
import Button from "../UI/Button";
import image from "../../assets/heroSectionImage.png";
import Header from "../UI/Header";

const HeroSection = () => {
  return (
    <header className="flex flex-col gap-5">
      {/* <nav className="w-screen ">
        <ul className="flex">
          <li>
            <img src={logo} className="size-40" />
          </li>
          <li>Benefits</li>
          <li>FAQ</li>
          <li>Join the Movement!</li>
        </ul>
      </nav> */}
      <Header />
      <div className="flex flex-col sm:flex-col lg:flex-row justify-center items-center gap-3 mx-24">
        <div className="flex flex-col gap-7 items-start ">
          <h1 className="text-6xl font-extrabold ">
            Connecting Surplus Food with Those in Need
          </h1>
          <p>Join us in the fight against food waste and hunger.</p>
          <div className="flex gap-3">
            <Button className="font-bold" primary>
              GET STARTED !!!
            </Button>
            <Button className="font-bold" secondary>
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
