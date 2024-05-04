import { Link } from "react-router-dom";

import Card from "../components/UI/Card";

import usersImagePath from "../assets/usersChoice.png";
import postsImagePath from "../assets/postsChoice.png";
import reportsImagePath from "../assets/reportsChoice.png";

const AdminChoices = () => {
  const choices = [
    {
      name: "Users",
      path: "/admin/users",
      image: usersImagePath,
    },
    {
      name: "Posts",
      path: "/admin/posts",
      image: postsImagePath,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      image: reportsImagePath,
    },
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {choices.map((choice, index) => (
        <Link to={choice.path} key={index}>
          <Card content={choice.name} imagePath={choice.image} />
        </Link>
      ))}
    </div>
  );
};

export default AdminChoices;
