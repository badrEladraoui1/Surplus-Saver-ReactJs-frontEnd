import iconFoodWaste from "../../assets/icon_food_waste.png";
import iconHunger from "../../assets/icon_hunger.png";
import iconSupport from "../../assets/icon_support.png";
import iconEngagement from "../../assets/icon_engagement.png";
import iconEasyToUse from "../../assets/icon_easy_to_use.png";
import iconAwareness from "../../assets/icon_awareness.png";

const Benefits = () => {
  const toFlex =
    " flex gap-2 justify-center items-center text-center p-5 text-black hover:animate-pulse ";
  const headings = "sm:text-3xl lg:text-4xl font-bold";

  return (
    <section className="space-y-12">
      <div className=" text-center">
        <h2 className="font-extrabold text-4xl">
          Connecting Restaurants and Consumers for Sustainable Food Solutions
        </h2>
      </div>
      <div className="h-screen my-5">
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-4 gap-4 h-5/6 w-4/5 mx-auto">
          <div
            className={`bg-yellow ${toFlex} row-span-1 md:row-span-2 rounded-lg`}
          >
            <div className="flex justify-center items-center gap-1">
              <img src={iconFoodWaste} className="size-10" />
              <h3 className={`${headings}`}>Reduce Food Waste</h3>
            </div>
          </div>
          <div
            className={`bg-orange ${toFlex} col-span-1 md:col-span-2 rounded-lg`}
          >
            <img src={iconHunger} className="size-10" />
            <h3 className={`${headings}`}>Fight Hunger</h3>
          </div>
          <div className={`bg-green ${toFlex} rounded-lg`}>
            <img src={iconSupport} className="size-10" />
            <h3 className={` ${headings}`}>Sustainify</h3>
          </div>
          <div
            className={`bg-pink ${toFlex} row-span-1 md:row-span-2 rounded-lg`}
          >
            <img src={iconEngagement} className="size-10" />
            <h3 className={`${headings}`}>Collectify</h3>
          </div>
          <div
            className={`bg-[#8d5cff] ${toFlex} row-span-1 md:row-span-2 col-span-1 md:col-span-2 rounded-lg`}
          >
            <img src={iconEasyToUse} className="size-10" />
            <h3 className={`${headings}`}>Easy-to-Use Platform</h3>
          </div>
          <div className={`bg-blue ${toFlex} rounded-lg`}>
            <img src={iconAwareness} className="size-10" />
            <h3 className={`${headings}`}>Raise Awareness</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

Benefits.displayName = "Benefits";

export default Benefits;
