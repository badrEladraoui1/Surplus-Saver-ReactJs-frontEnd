import { Link } from "react-router-dom";

import Button from "../UI/Button";

const LastCallToAction = () => {
  return (
    <section className=" py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Movement!</h2>
        <p className="text-lg  font-bold mb-8">
          Ready to make a difference? Take action now and join Surplus Saver in
          our mission to combat food waste and hunger. Together, we can create a
          more sustainable future for all. Here&rsquo;s how you can get
          involved:
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Link to="sign_up">
            <Button
              primary
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
            >
              Sign Up
            </Button>
          </Link>

          <Button
            secondary
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
          >
            Spread the Word
          </Button>
          <Button
            neutral
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
          >
            Donate
          </Button>
          <Button
            ghost
            className="  text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
          >
            Volunteer
          </Button>
        </div>
        <p className="text-lg  mt-8">
          Together, let&rsquo;s work towards a world where surplus food is
          shared, not wasted. Join Surplus Saver today!
        </p>
      </div>
    </section>
  );
};

export default LastCallToAction;
