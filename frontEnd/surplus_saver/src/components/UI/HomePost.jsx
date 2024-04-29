/* eslint-disable react/prop-types */
// HomePost.js
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const HomePost = ({ post }) => {
  const { userPhone } = useContext(UserContext);

  return (
    <div className="border border-gray-300 p-6 my-6 rounded-md">
      <h2 className="text-xl font-bold text-green-500 mb-4">
        Restaurant&apos;s Name: {post.restaurantName}
      </h2>
      <h2 className="text-2xl font-bold text-green-500 mb-4">
        Posted at : {post.postedAt}
      </h2>
      <h2 className="text-2xl font-bold text-green-500 mb-4">
        Restaurant&apos;s Phone: {userPhone}
      </h2>
      <p className=" mb-4">Post Description: {post.postDescription}</p>
      {post.items.map((item, index) => (
        <Fragment key={item.id}>
          <div className="border border-gray-300 p-4 my-4 rounded-md bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              ITEM {index + 1}: {item.itemName}
            </h3>
            <p className="text-sm text-gray-500">Type: {item.itemType}</p>
            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            <p className="text-sm text-gray-500">
              Description: {item.description}
            </p>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default HomePost;
