import { ITask } from "@/types/Tasks";

const exampleTasks: ITask[] = [
  {
    isDone: false,
    name: "Wynieść śmieci",
    description: null,
    id: "0301902e-e44b-4365-b1f1-ea3e3fe4d805",
  },
  {
    isDone: false,
    name: "Umyć basen",
    description: null,
    id: "6f2bd8d8-21da-4561-9fab-7b191ba6be0a",
  },
  {
    isDone: true,
    name: "Wykąpać psa",
    description: "Odkurzyć salon dokąłdnie",
    id: "7c61abad-bc82-4565-a083-41c988b1c684",
  },
  {
    isDone: true,
    name: "Zrobić zakupy",
    description: "Kupić masło, chleb i smalec",
    id: "ca80485b-0a75-4acc-9daf-541cd6f24a5b",
  },
];

const database = {
  tasks: [...exampleTasks],
};

export interface IGetTaskById {
  id: ITask["id"];
}

export interface IChangeCheckedStatusTaskById {
  id: ITask["id"];
  toCheckedStatus: ITask["isDone"];
}

export interface IChangeNameTaskById {
  id: ITask["id"];
  name: ITask["name"];
}

export interface IChangeDescriptionTaskById {
  id: ITask["id"];
  description: ITask["description"];
}

export interface IDeleteTaskById {
  id: ITask["id"];
}

export interface IAddTask {
  id: ITask["id"];
  name: ITask["name"];
  desc: ITask["description"];
}

export class TaskRepository {
  public async getTasks(): Promise<ITask[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 150));
      return database.tasks;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error in getTasks");
    }
  }

  public async getTaskById({ id }: IGetTaskById): Promise<ITask> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const task = database.tasks.find((task) => task.id === id);
      if (!task) throw new Error("Not find a task");
      return task;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error in getTaskById");
    }
  }

  public async changeCheckedStatusTaskById({
    toCheckedStatus,
    id,
  }: IChangeCheckedStatusTaskById): Promise<void> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const taskIndex = database.tasks.findIndex((t) => t.id === id);
      if (taskIndex === -1) {
        throw new Error(`Nie znaleziono zadania o ID: ${id} do zmiany opisu.`);
      }

      database.tasks[taskIndex] = {
        ...database.tasks[taskIndex],
        isDone: toCheckedStatus,
      };
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error in changeCheckedStatusTaskById");
    }
  }

  public async changeNameTaskById({
    id,
    name,
  }: IChangeNameTaskById): Promise<void> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const taskIndex = database.tasks.findIndex((t) => t.id === id);
      if (taskIndex === -1) {
        throw new Error(`Nie znaleziono zadania o ID: ${id} do zmiany opisu.`);
      }

      database.tasks[taskIndex] = {
        ...database.tasks[taskIndex],
        name,
      };
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error in changeNameTaskById");
    }
  }

  public async changeDescriptionTaskById({
    id,
    description,
  }: IChangeDescriptionTaskById): Promise<void> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const taskIndex = database.tasks.findIndex((t) => t.id === id);
      if (taskIndex === -1) {
        throw new Error(`Nie znaleziono zadania o ID: ${id} do zmiany opisu.`);
      }
      database.tasks[taskIndex] = {
        ...database.tasks[taskIndex],
        description,
      };
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error in changeDescriptionTaskById");
    }
  }

  public async deleteTaskById({ id }: IDeleteTaskById): Promise<void> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      database.tasks = database.tasks.filter((task) => task.id !== id);
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error in deleteTaskById");
    }
  }

  public async addTask({ name, desc, id }: IAddTask): Promise<void> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      database.tasks.push({
        id,
        description: desc,
        name,
        isDone: false,
      });
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error in addTask");
    }
  }
}

export const taskRepository = new TaskRepository();
