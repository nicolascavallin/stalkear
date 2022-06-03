import { useContext } from "react";

import AuthContext from "./context";

const useAuth = () => {
  const { actions, state } = useContext(AuthContext);
  return {
    ...actions,
    ...state,
  };
};

export default useAuth;
