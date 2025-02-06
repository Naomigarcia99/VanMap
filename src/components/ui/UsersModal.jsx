import { useEffect, useState } from "react";
import { db } from "../../utils/credentials";
import { collection, getDocs, deleteDoc, doc, query } from "firebase/firestore";

const UsersModal = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const userList = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((user) => user.role === "user");
    setUsers(userList);
  };

  const handleDeleteUser = async (userId) => {
    await deleteDoc(doc(db, "users", userId));
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modalBackground") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modalBackground"
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white p-8 mx-3 rounded-xl shadow-md max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
          Administrar Usuarios
        </h2>
        <ul className="space-y-3">
          {users.map((user) => {
            return (
              <li
                key={user.id}
                className="bg-slate-50 p-5 rounded-lg shadow-xl border-2 flex justify-between items-center"
              >
                <p>
                  {user.displayName} - {user.email}
                </p>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500 rounded-full"
                >
                  Eliminar
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex mt-4">
          <button
            onClick={onClose}
            className="mx-auto w-auto bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersModal;
