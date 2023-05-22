import { Column, NewColumn } from "./Column";

function Board({ statusArr, taskArr }) {
  return (
    <div className="column__container">
      {statusArr.map((status) => {
        return (
          <Column
            key={status.id}
            statusName={status.statusName}
            decorationColor={status.decorationColor}
            taskArr={taskArr.filter(
              (task) => task.status === status.statusName
            )}
          />
        );
      })}
      <NewColumn />
    </div>
  );
}

export default Board;
