import { useEffect, useState } from "react";
import { api } from "../Utils/backendApi";
import PostLoading from "../components/UI/PostLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/UI/Modal";

const AdminUsers = () => {
  const [restaurantUsers, setRestaurantUsers] = useState([]);
  const [consumerUsers, setConsumerUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  console.log(userToDelete);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${api}/SurplusSaverApiV1/users/deleteUser/${userToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("admin_token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting user");
      }

      setModalOpen(false);
      setUserToDelete(null);

      setRestaurantUsers(
        restaurantUsers.filter((user) => user.id !== userToDelete.id)
      );
      setConsumerUsers(
        consumerUsers.filter((user) => user.id !== userToDelete.id)
      );
    } catch (error) {
      setError("Failed to delete user");
      console.error("Failed to delete user:", error);
    }
  };

  const fetchUsers = async (role, setUsers) => {
    try {
      const response = await fetch(
        `${api}/SurplusSaverApiV1/users/getUsersByRole/${role}`,
        {
          headers: {
            Authorization: localStorage.getItem("admin_token"),
          },
        }
      );
      const data = await response.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers("ROLE_RESTAURANT", setRestaurantUsers);
    fetchUsers("ROLE_CONSUMER", setConsumerUsers);
  }, []);

  if (loading) return <PostLoading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex">
      <div className="m-10 border-2 border-white p-10 rounded-md">
        <h2 className="text-center text-green text-3xl p-5">Restaurants</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {restaurantUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDeleteClick(user)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="m-10 border-2 border-white p-10 rounded-md">
        <h2 className="text-center text-orange text-3xl p-5">Consumers</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {consumerUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDeleteClick(user)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        id="deleteModal"
        title="Confirm Delete"
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        action="Yes, delete"
        onHandleConfirmDelete={handleConfirmDelete}
      >
        <p>Are you sure you want to delete {userToDelete?.username}?</p>
      </Modal>
    </div>
  );
};

export default AdminUsers;
