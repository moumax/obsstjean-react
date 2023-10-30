import { useContext } from "react";
import CurrentUserContext from "../../contexts/userContext";

function Welcome() {
  const { user } = useContext(CurrentUserContext);
  return (
    <>
      {user && (
        <div className="text-red-600 text-2xl">{user.name} tu est connecté</div>
      )}
      <div />
    </>
  );
}

export default Welcome;
