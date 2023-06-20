import Board from "./Board";

function Main() {
  const emptyOrNot = false;

  return <div className="board">{emptyOrNot ? <Empty /> : <Board />}</div>;
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
