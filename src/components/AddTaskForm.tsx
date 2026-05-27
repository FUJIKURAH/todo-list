import { useState, type FormEvent } from "react";

interface Task {
  id: number;
  name: string;
  status: boolean;
  memo: string;
  date: string;
}

interface Props {
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

function AddTaskForm({ setTaskList }: Props) {
  const [error, setError] = useState(false);

  const handleSubmitNewTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const hasError = !form.newTaskName.value.trim();
    if (hasError) {
      setError(true);
      return;
    }
    setError(false);

    const newTask: Task = {
      id: Date.now(),
      name: form.newTaskName.value,
      status: false,
      memo: "",
      date: formattedDate,
    };
    setTaskList((prev) => [...prev, newTask]);
  };

  return (
    <form action="" onSubmit={handleSubmitNewTask} className="m-add-form">
      <div className="m-add-form__input-box">
        <input
          type="text"
          placeholder="新しいタスクを入力..."
          name="newTaskName"
          className="m-add-form__input"
        />
        {error && <p className="m-add-form__error">空欄で追加はできません</p>}
      </div>
      <button type="submit" className="m-add-form__btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          data-fg-d3bl27="0.8:4.9455:/src/app/App.tsx:136:13:5431:18:e:Plus::::::ISW"
          data-fgid-d3bl27=":rp:"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
        追加
      </button>
    </form>
  );
}

export default AddTaskForm;
