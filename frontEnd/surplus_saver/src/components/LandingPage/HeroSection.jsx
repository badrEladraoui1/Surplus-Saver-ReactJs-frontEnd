import logo from "../../../public/Logo.png";
import Button from "../UI/Button";
import image from "../../assets/heroSectionImage.png";

const HeroSection = () => {
  return (
    <header className="flex flex-col gap-5">
      <nav className="w-screen">
        <img src={logo} className="size-40" />
      </nav>
      <div className="flex justify-center items-center gap-5 p-10 border-2 border-lime-600 rounded-md m-1">
        <div className="flex flex-col gap-7 items-start w-1/2">
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
        <div className="w-1/2">
          <img src={image} className="size-[50rem] rounded-[20px]" />
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
