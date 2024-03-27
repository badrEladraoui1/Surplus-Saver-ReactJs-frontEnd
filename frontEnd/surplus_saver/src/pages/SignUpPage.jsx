import RestaurantsSignUpPage from "./RestaurantsSignUpPage";
import ConsumersSignUpPage from "./ConsumersSignUpPage";
import { useState } from "react";
import Button from "../components/UI/Button";

const SignUpPage = () => {
  const [consumerForm, setConsumerForm] = useState(true);

  const handleConsumer = () => {
    setConsumerForm(true);
  };
  const handleRestaurant = () => {
    setConsumerForm(false);
  };

  const btnClasses =
    "grid h-20 flex-grow  rounded-box place-items-center font-bold text-2xl ";

  return (
    <section className="flex flex-col justify-center items-center p-16">
      <div className="flex flex-col justify-center items-center gap-10">
        <h3 className="text-5xl font-bold gap-5">Sign Up As a ...</h3>
        <div className="flex gap-5">
          <Button
            ghost
            onClick={handleConsumer}
            className={`${btnClasses} ${
              consumerForm && " border-2 border-green"
            }`}
          >
            Consumer
          </Button>
          <div className="divider divider-horizontal">OR</div>
          <Button
            ghost
            onClick={handleRestaurant}
            className={`${btnClasses} ${
              !consumerForm && " border-2 border-green"
            }`}
          >
            {" "}
            Restaurant
          </Button>
        </div>
      </div>
      {consumerForm ? <ConsumersSignUpPage /> : <RestaurantsSignUpPage />}
    </section>
  );
};

export default SignUpPage;
