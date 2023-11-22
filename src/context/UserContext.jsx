import React, { useState } from 'react';
import propTypes from 'prop-types';

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    cpf: "",
    phone: "",
    isBarberOnEmployee: false,
    dateOfBirth: "",
    barberOnEmployeeFile: "",
    workingHours: [],
    services: [],
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: propTypes.node,
};