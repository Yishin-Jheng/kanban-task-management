import Board from "./Board";

const taskArr = [
  {
    id: 1,
    status: "todo",
    description: "Build UI for onborading flow",
    subtasksNum: 6,
  },
  {
    id: 2,
    status: "todo",
    description: "Build UI for search",
    subtasksNum: 1,
  },
  {
    id: 3,
    status: "todo",
    description: "Build setting UI",
    subtasksNum: 2,
  },
  {
    id: 4,
    status: "todo",
    description: "QA and test all major user journeys",
    subtasksNum: 2,
  },
  {
    id: 5,
    status: "doing",
    description: "Design settings and search pages",
    subtasksNum: 3,
  },
  {
    id: 6,
    status: "doing",
    description: "Add account management endpoints",
    subtasksNum: 2,
  },
  {
    id: 7,
    status: "doing",
    description: "Design onboarding flow",
    subtasksNum: 3,
  },
  {
    id: 8,
    status: "doing",
    description: "Add search endpoints",
    subtasksNum: 2,
  },
  {
    id: 9,
    status: "doing",
    description: "Add authentication endpoints",
    subtasksNum: 2,
  },
  {
    id: 10,
    status: "doing",
    description:
      "Research pricing points of various competitors and trial different business model",
    subtasksNum: 3,
  },
  {
    id: 11,
    status: "done",
    description: "Conduct 5 wireframe tests",
    subtasksNum: 1,
  },
  {
    id: 12,
    status: "done",
    description: "Create wireframe prototype",
    subtasksNum: 1,
  },
  {
    id: 13,
    status: "done",
    description: "Review results of usability tests and iterate",
    subtasksNum: 3,
  },
  {
    id: 14,
    status: "done",
    description:
      "Create paper prototypes and conduct 10 usability tests with potential customers",
    subtasksNum: 2,
  },
  {
    id: 15,
    status: "done",
    description: "Market dicovery",
    subtasksNum: 1,
  },
  {
    id: 16,
    status: "done",
    description: "Conpetitor analysis",
    subtasksNum: 2,
  },
  {
    id: 17,
    status: "done",
    description: "Research the market",
    subtasksNum: 2,
  },
];
const statusArr = [
  {
    id: 1,
    statusName: "todo",
    decorationColor: "#49c4e5",
  },
  {
    id: 2,
    statusName: "doing",
    decorationColor: "#8471f2",
  },
  {
    id: 3,
    statusName: "done",
    decorationColor: "#67e2ae",
  },
];

function Main() {
  const emptyOrNot = false;

  return (
    <div className="board">
      {emptyOrNot ? (
        <Empty />
      ) : (
        <Board taskArr={taskArr} statusArr={statusArr} />
      )}
    </div>
  );
}

function Empty() {
  return (
    <div className="empty">
      <p className="empty__title">
        This board is empty. Create a new column to get started.
      </p>
      <button className="btn">+ Add New Column</button>
    </div>
  );
}

export default Main;
