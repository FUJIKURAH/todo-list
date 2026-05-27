import { useState, useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

interface Task {
  id: number;
  name: string;
  status: boolean;
  memo: string;
  date: string;
}
type sort = "all" | "still" | "already";

function App() {
  const [sortStatus, setSortStatus] = useState<sort>("all");
  const [taskList, setTaskList] = useState<Task[]>(() => {
    try {
      const savedData = localStorage.getItem("taskData");

      return savedData ? JSON.parse(savedData) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(taskList));
  }, [taskList]);

  const sortTaskList = taskList.filter((task) => {
    if (sortStatus === "still") return task.status === false;
    if (sortStatus === "already") return task.status === true;
    return true;
  });
  const resultTaskList = [...sortTaskList].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const stillTaskCount = taskList.filter(
    (task) => task.status === false,
  ).length;

  return (
    <>
      <div className="m-box">
        <h1 className="m-head-ttl">TODOリスト</h1>
        <AddTaskForm setTaskList={setTaskList} />
        <div className="m-sort">
          <label>
            <input
              type="radio"
              name="sort"
              className="m-sort__btn"
              checked={sortStatus === "all"}
              onChange={() => setSortStatus("all")}
            />
            すべて
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              className="m-sort__btn"
              checked={sortStatus === "still"}
              onChange={() => setSortStatus("still")}
            />
            未完了
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              className="m-sort__btn"
              checked={sortStatus === "already"}
              onChange={() => setSortStatus("already")}
            />
            完了済み
          </label>
        </div>
        <TaskList
          taskList={taskList}
          setTaskList={setTaskList}
          sortTaskList={resultTaskList}
        />
        <p className="m-task__total">
          <span>{stillTaskCount}</span>件の未完了タスク
        </p>
      </div>
    </>
  );
}

export default App;
