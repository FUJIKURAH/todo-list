import TaskItem from "./TaskItem";

interface Task {
  id: number;
  name: string;
  status: boolean;
  memo: string;
  date: string;
}

interface Props {
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
  sortTaskList: Task[];
}

function TaskList({ taskList, setTaskList, sortTaskList }: Props) {
  return (
    <>
      <div className="m-task-list">
        {sortTaskList.length > 0
          ? sortTaskList.map((task) => (
              <TaskItem
                key={task.id}
                taskId={task.id}
                taskName={task.name}
                taskStatus={task.status}
                taskMemo={task.memo}
                taskDate={task.date}
                taskList={taskList}
                setTaskList={setTaskList}
              />
            ))
          : null}
      </div>
    </>
  );
}

export default TaskList;
