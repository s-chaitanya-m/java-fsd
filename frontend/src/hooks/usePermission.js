import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ROLE_PERMISSIONS } from "../auth/rolePermission";

const usePermission = () => {
  const { user } = useContext(AuthContext);
  const can = (resource, action) => {
    if (!user?.role) return false;

    const permissions = ROLE_PERMISSIONS[user.role] || [];
    return permissions.some(([res, act]) => res === resource && act === action);
  };
  return { can };
};

export default usePermission;
