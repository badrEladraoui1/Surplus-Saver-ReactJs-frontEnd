/* eslint-disable react/prop-types */
import Button from "../components/UI/Button";
import { Link } from "react-router-dom";

const AddNewAdmin = ({ className }) => {
  return (
    <Link to={"/admin/newAdmin"}>
      <Button className={className}>Add a New Admin here !!!</Button>
    </Link>
  );
};

export default AddNewAdmin;
