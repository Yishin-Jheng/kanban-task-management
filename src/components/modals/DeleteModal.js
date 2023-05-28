function DeleteModal({ boardOrTask, title }) {
  return (
    <form className="modal">
      <div className="modal__title modal__delete">
        <span>{`Delete this ${boardOrTask}?`}</span>
      </div>

      <p className="modal__content">
        {`Are you sure you want to delete the ‘${title}’ ${boardOrTask}? This action
        will remove all columns and tasks and cannot be reversed.`}
      </p>

      <div className="modal__delete__btns">
        <button className="btn-medium btn-medium--warning">Delete</button>
        <button className="btn-medium">Cancel</button>
      </div>
    </form>
  );
}

export default DeleteModal;
