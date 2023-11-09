import { useContext, useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import CardUser from "./CardUser";
import axiosAPI from "../../services/axiosAPI";
import CurrentUserContext from "../../contexts/userContext";

export default function UsersAdministration() {
  const { user, users, setUsers } = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axiosAPI.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user`
      );
      setUsers(response.data[0]);
      setIsLoading(false);
    } catch (error) {
      console.error("Pas de retour sur la liste utilisateur", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!users) {
    return (
      <p className="h-screen text-red-600 text-4xl">
        Erreur server lors de la récupération des utilisateurs
      </p>
    );
  }

  return (
    <section className="w-full mt-[1rem] flex flex-col items-center min-h-screen">
      <h2 className="text-white text-[2rem] mb-10">Liste des utilisateurs</h2>
      {isLoading ? (
        <p>
          <CircleLoader className="mt-10" color="#e9e700" />
        </p>
      ) : (
        users.map((us) => (
          <div key={us.id}>
            {user && user.role === "administrateur" && (
              <CardUser data={us} fetchUsers={fetchUsers} />
            )}
          </div>
        ))
      )}
    </section>
  );
}
