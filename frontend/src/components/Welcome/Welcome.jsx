import { useContext } from "react";
import CurrentUserContext from "../../contexts/userContext";

function Welcome() {
  const { user } = useContext(CurrentUserContext);
  return (
    <>
      {user && (
        <div className="text-orange-400 text-sm">
          {user.name}, tu est connecté
        </div>
      )}
      <div />
    </>
  );
}

export default Welcome;
