import CardSpotlight from "../../components/UI/CardSpotlight ";

const Interests = () => {
  return (
    <section className="flex gap-10">
      <div>
        <CardSpotlight content="Accepted" />
      </div>
      <div>
        <CardSpotlight content="Pending" />
      </div>
      <div>
        <CardSpotlight content="Accepted" />
      </div>
    </section>
  );
};

export default Interests;
