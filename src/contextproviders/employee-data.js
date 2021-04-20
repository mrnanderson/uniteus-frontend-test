import React, { useState, useEffect } from "react";
import employeeService from "../services/employee-service";

export const EmployeeDataContext = React.createContext();
export const EmployeeDataProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        const employeeData = await employeeService.getEmployees();
        setEmployees(employeeData);
      })();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <EmployeeDataContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeDataContext.Provider>
  );
};
