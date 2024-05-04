/* eslint-disable react/prop-types */
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ children, accessRole, tokenRef }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem(tokenRef);
  let role = null;

  if (token) {
    const decodedToken = jwtDecode(token.replace("Bearer ", ""));
    role = decodedToken.role;
  }

  if (!token || role !== accessRole) {
    navigate("/sign_in");
    return (
      <div className="mockup-window border bg-base-300">
        <div className="flex justify-center px-4 py-16 bg-base-200">
          <span className="text-2xl">
            <Link className="font-bold text-green underline" to="/sign_in">
              Sign in{" "}
            </Link>
            first to access this page
          </span>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
