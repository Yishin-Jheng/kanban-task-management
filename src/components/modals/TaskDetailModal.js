import DotMenu from "../small-components/DotMenu";
import CheckBox from "../modal-components/CheckBox";
import Dropdown from "../modal-components/Dropdown";

function TaskDetailModal() {
  return (
    <form className="modal">
      <div className="modal__title">
        <span>
          Research pricing points of various competitors and trial different
          business model
        </span>
        <DotMenu position={"modal"} />
      </div>

      <p className="modal__content">
        We know what we're planning to build for version one. Now we need to
        finalise the first pricing model we'll use. Keep iterating the subtasks
        until we have a coherent proposition.
      </p>

      <div className="subtask">
        <span className="modal__subtitle">Subtasks (2 of 3)</span>

        {/* TODO: if there is no subtask, we should show some message */}
        <CheckBox
          itemObj={{
            id: 1,
            description: "Research competitor pricing and business models",
          }}
        />

        <CheckBox
          itemObj={{
            id: 2,
            description: "Outline a business model that works for our solution",
          }}
        />

        <CheckBox
          itemObj={{
            id: 3,
            description:
              "Talk to potential customers about our proposed solution and ask for fair price expectancy",
          }}
        />
      </div>

      <Dropdown
        selectObj={{
          title: "Current Status",
          selected: "Doing",
          options: ["Todo", "Doing", "Done"],
        }}
      />
    </form>
  );
}

export default TaskDetailModal;
