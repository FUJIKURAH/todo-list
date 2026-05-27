import { useState } from "react";

interface Task {
  id: number;
  name: string;
  status: boolean;
  memo: string;
  date: string;
}

interface Props {
  taskId: number;
  taskName: string;
  taskStatus: boolean;
  taskMemo: string;
  taskDate: string;
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

function TaskItem({
  taskId,
  taskName,
  taskStatus,
  taskMemo,
  taskDate,
  taskList,
  setTaskList,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setNewTaskName] = useState(taskName);
  const [newTaskMemo, setNewTaskMemo] = useState(taskMemo);
  const [isOpenMemo, setIsOpenMemo] = useState(false);

  const handleUpdateTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTaskList((prevTaskList) =>
      prevTaskList.map((task) =>
        task.name === taskName ? { ...task, name: newTaskName } : task,
      ),
    );

    setIsEditing(false);
  };

  const handleUpdateTaskMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const target = e.target.value;
    setNewTaskMemo(target);
    setTaskList((prevTaskList) =>
      prevTaskList.map((task) =>
        task.id === taskId ? { ...task, memo: target } : task,
      ),
    );
  };

  const handleDeleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTaskList(taskList.filter((t) => t.id !== taskId));
  };

  const handleToggleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setTaskList((prevTaskList) =>
      prevTaskList.map((task) =>
        task.id === taskId ? { ...task, status: checked } : task,
      ),
    );
  };

  return (
    <div className="m-task-item">
      <input
        type="checkbox"
        className="m-task-item__check"
        checked={taskStatus}
        onChange={handleToggleStatus}
      />
      <div className="m-task-item__title">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          className="m-task-item__input"
          disabled={!isEditing}
        ></input>
        <span className="m-task-item__date">{taskDate}</span>
      </div>
      {isEditing || (
        <button
          onClick={() => setIsEditing(true)}
          className="m-task-item__edit-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
          </svg>
        </button>
      )}
      {isEditing && (
        <button onClick={handleUpdateTask} className="m-task-item__save-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
            <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
            <path d="M7 3v4a1 1 0 0 0 1 1h7"></path>
          </svg>
        </button>
      )}
      <button
        className={`m-task-memo-accordion ${isOpenMemo ? "is-open" : ""}`}
        onClick={() => setIsOpenMemo((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="18"
          height="18"
          aria-hidden="true"
        >
          <polygon
            points="440.189,92.085 256.019,276.255 71.83,92.085 0,163.915 256.019,419.915 512,163.915"
            fill="#004e66"
          />
        </svg>
      </button>
      <button onClick={handleDeleteTask} className="m-task-item__delete-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          <line x1="10" x2="10" y1="11" y2="17"></line>
          <line x1="14" x2="14" y1="11" y2="17"></line>
        </svg>
      </button>
      {isOpenMemo && (
        <div className="m-task-memo">
          <textarea
            value={newTaskMemo}
            onChange={handleUpdateTaskMemo}
            placeholder="メモを入力..."
            className="m-task-memo__txt"
          ></textarea>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
