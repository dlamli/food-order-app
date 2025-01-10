import { createContext, useState } from "react";
import { Progress, UserProgress } from "../types";

export const UserProgressContext = createContext<UserProgress>({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

interface UserProgressProps {
  children: React.ReactNode;
}

const UserProgressProvider = ({ children }: UserProgressProps) => {
  const [userProgress, setUserProgress] = useState<Progress>("");

  const showCart = () => setUserProgress("cart");

  const hideCart = () => setUserProgress("");

  const showCheckout = () => setUserProgress("checkout");

  const hideCheckout = () => setUserProgress("");

  const userProgressValue: UserProgress = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressValue}>
      {children}
    </UserProgressContext.Provider>
  );
};

export default UserProgressProvider;
