import { useCallback, useEffect, useState } from "react";
import { ITask } from "@/types/Tasks";
import { v4 as uuidv4 } from "uuid";
import {
  addTaskAction,
  changeCheckedStatusTaskAction as changeCheckedStatusTaskByIdServer,
  changeDescriptionTaskAction,
  changeNameTaskAction,
  deleteTaskAction,
  getTasksAction,
} from "@/modules/tasks/actions/taskActions";
import { toast } from "sonner";

type EditableTaskFields = keyof Pick<ITask, "name" | "description">;

type changeCheckedStatusTaskByIdType = (
  id: ITask["id"],
  toCheckedStatus: ITask["isDone"],
) => Promise<void>;
type deleteTaskType = (id: ITask["id"]) => Promise<void>;
type changeTaskNameOrDesc = (
  taskId: ITask["id"],
  inputValue: string,
) => Promise<void>;
type addNewTaskType = ({
  name,
  desc,
}: {
  name: ITask["name"];
  desc: ITask["description"];
}) => Promise<void>;

export interface IUseTasksData {
  tasks: ITask[] | null;
  isLoadTasksError: boolean;
  changeCheckedStatusTaskById: changeCheckedStatusTaskByIdType;
  deleteTask: deleteTaskType;
  changeTaskName: changeTaskNameOrDesc;
  changeTaskDesc: changeTaskNameOrDesc;
  addNewTask: addNewTaskType;
}

export const useTasksData = (): IUseTasksData => {
  const [tasks, setTasks] = useState<ITask[] | null>(null);
  const [isLoadTasksError, setIsLoadTaskError] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasksAction();
        if (tasks) setTasks(tasks);
      } catch (err) {
        setIsLoadTaskError(true);
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  const changeCheckedStatusTaskById =
    useCallback<changeCheckedStatusTaskByIdType>(
      async (id, toCheckedStatus) => {
        try {
          setTasks((prev) => {
            if (!prev) return prev;
            return prev.map((task) => {
              if (task.id !== id) return task;
              return {
                ...task,
                isDone: toCheckedStatus,
              };
            });
          });

          await changeCheckedStatusTaskByIdServer({ id, toCheckedStatus });
        } catch (err) {
          toast("Wystąpił problem podczas próby zmiany statusu zadania!");

          console.error(err);
        }
      },
      [],
    );

  const deleteTask = useCallback<deleteTaskType>(
    async (id) => {
      let taskToDelete: ITask | undefined;
      try {
        taskToDelete = tasks?.find((task) => task.id === id);
        if (!taskToDelete) throw new Error("Task not found");

        setTasks((prev) => prev?.filter((task) => task.id !== id) || prev);
        await deleteTaskAction({ id });
      } catch (err) {
        toast("Wystąpił problem podczas próby usunięcia zadania!");

        setTasks((prev) => {
          if (!prev || !taskToDelete) return prev;
          return [...prev, taskToDelete];
        });

        console.error(err);
      }
    },
    [tasks],
  );

  const useCreateFieldChangeHandler = <F extends EditableTaskFields>(
    field: EditableTaskFields,
    apiChangeFunction: (
      params: { id: ITask["id"] } & Record<F, string>,
    ) => Promise<ITask | void>,
  ) => {
    return useCallback<changeTaskNameOrDesc>(
      async (taskId, inputValue) => {
        if (!tasks || !taskId) return;

        const currentTask = tasks.find((task) => task.id === taskId);

        const currentValue = currentTask ? currentTask[field] : null;

        if (inputValue === "" || inputValue === currentValue) {
          return;
        }

        const originalValue = currentValue;

        setTasks((prev) => {
          if (!prev) return prev;
          return prev.map((el) => {
            if (el.id !== taskId) return el;
            return {
              ...el,
              [field]: inputValue,
            };
          });
        });

        try {
          const dynamicFieldObject = { [field]: inputValue } as Record<
            F,
            string
          >;

          await apiChangeFunction({
            id: taskId,
            ...dynamicFieldObject,
          });
        } catch (err) {
          toast("Wystąpił błąd podczas próby modyfikacji zadania!");

          // Wycofanie zmiany w UI w przypadku błędu
          setTasks((prev) => {
            if (!prev) return prev;
            return prev.map((el) => {
              if (el.id !== taskId) return el;
              return {
                ...el,
                [field]: originalValue,
              };
            });
          });

          console.error(`Error updating task ${field}:`, err);
        }
      },
      [field, apiChangeFunction, tasks],
    );
  };

  const changeTaskName = useCreateFieldChangeHandler(
    "name",
    changeNameTaskAction,
  );

  const changeTaskDesc = useCreateFieldChangeHandler(
    "description",
    changeDescriptionTaskAction,
  );

  const addNewTask = useCallback<addNewTaskType>(async ({ name, desc }) => {
    const taskId = uuidv4();
    try {
      setTasks((prev) => {
        if (!prev) return prev;
        return [
          ...prev,
          {
            id: taskId,
            name,
            description: desc,
            isDone: false,
          },
        ];
      });

      await addTaskAction({
        id: taskId,
        name,
        desc,
      });
    } catch (err) {
      toast("Wystąpił problem podczas próby utworzenia zadania!");
      setTasks((prev) => {
        if (!prev) return prev;
        return prev.filter((task) => task.id !== taskId);
      });
      console.error(err);
      throw err;
    }
  }, []);

  return {
    tasks,
    isLoadTasksError,
    changeCheckedStatusTaskById,
    deleteTask,
    changeTaskName,
    changeTaskDesc,
    addNewTask,
  };
};
