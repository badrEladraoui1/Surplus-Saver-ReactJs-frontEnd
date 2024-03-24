import Button from "../UI/Button";
import React from "react";

const titles = "font-bold collapse-title text-2xl";
const paragraphs = "font-bold text-xl";

const Faq = () => {
  return (
    <>
      <div className="text-center mb-5 flex flex-col justify-center items-center gap-1">
        <h1 className="font-bold text-4xl">FAQ.</h1>
        <p className="font-bold">
          For any inquiries or feedback, please contact us at :
          <Button link>support@surplussaver.com.</Button>
        </p>
      </div>

      <div className="join join-vertical w-full border-2 border-green">
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" defaultChecked />
          <div className={`${titles}`}>How does Surplus Saver work</div>
          <div className="collapse-content">
            <p className={`${paragraphs} text-green`}>
              Surplus Saver connects restaurants with surplus food to consumers
              or organizations in need. Restaurants list their surplus food
              items on our platform, and consumers can browse and request these
              items, promoting the redistribution of excess food.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div className={`${titles}`}>Who can use Surplus Saver?</div>
          <div className="collapse-content">
            <p className={`${paragraphs} text-green`}>
              Surplus Saver is designed for restaurants looking to minimize food
              waste and individuals or organizations seeking access to surplus
              food to address hunger or food insecurity in their communities.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div className={`${titles}`}>Is Surplus Saver free to use?</div>
          <div className="collapse-content">
            <p className={`${paragraphs} text-green`}>
              Yes, Surplus Saver is free for both restaurants and consumers.
              There are no subscription fees or hidden charges associated with
              using our platform.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div className={`${titles}`}>
            How can I list surplus food items as a restaurant?
          </div>
          <div className="collapse-content">
            <p className={`${paragraphs} text-green`}>
              To list surplus food items, restaurants need to create an account
              on Surplus Saver, providing details such as the type and quantity
              of surplus food available, along with expiration dates and pickup
              instructions.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div className={`${titles}`}>
            What types of surplus food are available on Surplus Saver?
          </div>
          <div className="collapse-content">
            <p className={`${paragraphs} text-green`}>
              Surplus food listings on Surplus Saver may include various types
              of food items, such as fresh produce, packaged goods, baked goods,
              and prepared meals, depending on what restaurants have available.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div className={`${titles}`}>
            How can I provide feedback or report an issue?
          </div>
          <div className="collapse-content">
            <p className={`${paragraphs} text-green`}>
              We value your feedback! Please feel free to contact our support
              team via email at support@surplussaver.com with any questions,
              suggestions, or concerns you may have.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
