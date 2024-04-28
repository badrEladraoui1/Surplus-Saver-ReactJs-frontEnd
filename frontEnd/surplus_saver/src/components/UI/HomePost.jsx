/* eslint-disable react/prop-types */
// Post.js

const HomePost = ({ post }) => (
  <div className="border border-gray-300 p-6 my-6 rounded-md">
    <h2 className="text-xl font-bold text-gray-500">{post.restaurantName}</h2>
    <p className="text-gray-600">{post.postDescription}</p>
    {post.items.map((item) => (
      <div className="border-t border-gray-200 pt-4 mt-4" key={item.id}>
        <h3 className="font-semibold">{item.itemName}</h3>
        <p className="text-sm text-gray-500">Type: {item.itemType}</p>
        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
        <p className="text-sm text-gray-500">Description: {item.description}</p>
      </div>
    ))}
  </div>
);

export default HomePost;
