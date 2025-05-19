"use server";

import { ITask } from "@/types/Tasks";
import {
  TaskRepository,
  taskRepository,
  IChangeCheckedStatusTaskById,
  IChangeNameTaskById,
  IChangeDescriptionTaskById,
  IDeleteTaskById,
  IAddTask,
} from "@/modules/tasks/taskRepository";

class TaskActions {
  private taskRepository: TaskRepository = taskRepository;

  public async getTasks(): Promise<ITask[]> {
    try {
      return await this.taskRepository.getTasks();
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error in getTasks");
    }
  }

  public async changeCheckedStatusTaskById(
    params: IChangeCheckedStatusTaskById,
  ): Promise<void> {
    try {
      await this.taskRepository.changeCheckedStatusTaskById(params);
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error in changeCheckedStatusTaskById");
    }
  }

  public async changeNameTaskById(params: IChangeNameTaskById): Promise<void> {
    try {
      await this.taskRepository.changeNameTaskById(params);
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error in changeNameTaskById");
    }
  }

  public async changeDescriptionTaskById(
    params: IChangeDescriptionTaskById,
  ): Promise<void> {
    try {
      await this.taskRepository.changeDescriptionTaskById(params);
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error in changeDescriptionTaskById");
    }
  }

  public async deleteTaskById(params: IDeleteTaskById): Promise<void> {
    try {
      await this.taskRepository.deleteTaskById(params);
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error in deleteTaskById");
    }
  }

  public async addTask(params: IAddTask): Promise<void> {
    try {
      await this.taskRepository.addTask(params);
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error in addTask");
    }
  }
}

const taskActions = new TaskActions();

export const getTasksAction = async () => taskActions.getTasks();

export const changeCheckedStatusTaskAction = async (
  params: IChangeCheckedStatusTaskById,
) => taskActions.changeCheckedStatusTaskById(params);

export const changeNameTaskAction = async (params: IChangeNameTaskById) =>
  taskActions.changeNameTaskById(params);

export const changeDescriptionTaskAction = async (
  params: IChangeDescriptionTaskById,
) => taskActions.changeDescriptionTaskById(params);

export const deleteTaskAction = async (params: IDeleteTaskById) =>
  taskActions.deleteTaskById(params);

export const addTaskAction = async (params: IAddTask) =>
  taskActions.addTask(params);
