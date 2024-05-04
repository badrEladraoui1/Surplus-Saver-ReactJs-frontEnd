/* eslint-disable react/prop-types */

const Card = ({ imagePath, content }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl border-2 border-white mx-10">
      <figure className="px-10 pt-10">
        <img src={imagePath} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{content}</h2>
      </div>
    </div>
  );
};

export default Card;
