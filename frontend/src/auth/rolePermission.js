export const ROLE_PERMISSIONS = {
  ADMIN: [
    ["PROJECT", "CREATE"],
    ["PROJECT", "READ"],
    ["PROJECT", "UPDATE"],
    ["PROJECT", "DELETE"],

    ["TASK", "READ"],
    ["TASK", "CREATE"],
    ["TASK", "UPDATE"],
    ["TASK", "DELETE"],
    ["TASK", "ASSIGN"],
    ["TASK", "COMPLETE"],
  ],

  CREATOR: [
    ["PROJECT", "CREATE"],
    ["PROJECT", "READ"],
    ["PROJECT", "UPDATE"],

    ["TASK", "READ"],
    ["TASK", "CREATE"],
    ["TASK", "UPDATE"],
    ["TASK", "ASSIGN"],
    ["TASK", "COMPLETE"],
  ],

  VIEWER: [
    ["PROJECT", "READ"],
    ["TASK", "READ"],
    ["TASK", "COMPLETE"],
  ],
};
