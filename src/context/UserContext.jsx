import { createContext, useState } from "react";
import { user as initialUser } from "../mock/employeeMockData";
import { PropTypes } from "prop-types";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(initialUser);

  const updateUserWorkingHours = (day, newWorkingHours) => {
    const dayIndex = user.workingHours.findIndex((d) => d.day === day);

    if (dayIndex !== -1) {
      // Se o dia já existe, atualize-o
      setUser((user) => {
        let updatedUser = { ...user };
        updatedUser.workingHours[dayIndex] = newWorkingHours;
        return updatedUser;
      });
    } else {
      // Se o dia não existe, adicione-o
      setUser((user) => ({
        ...user,
        workingHours: [...user.workingHours, newWorkingHours],
      }));
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUserWorkingHours }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node,
};