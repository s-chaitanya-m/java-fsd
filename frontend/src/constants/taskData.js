export const tasks = [
  {
    task: "create task table",
    description: "create dummy data to populate on the task page",
    due_on: Date.now(),
    status: "new",
    owner: [{ name: "user1" }],
    assignee: [{ name: "user2" }],
    project: [{ name: "Project1" }],
  },
];

export const projects = [
  {
    name: "Project1",
    description: "Create a task board with SSO, RABC for JAVA FSD",
    start_date: Date.now(),
    end_date: Date.now(),
    owner: [{ name: "user1" }],
    members: [{ name: "user1" }, { name: "user2" }],
  },
];

export const users = [
  {
    name: "user1",
    email: "user1@gmail.com",
    role: "VIEWER",
  },
];
