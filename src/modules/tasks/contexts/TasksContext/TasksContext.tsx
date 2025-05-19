"use client";

import { createContext, useContext, ReactNode } from "react";
import {
  IUseTasksData,
  useTasksData,
} from "@/modules/tasks/contexts/TasksContext/useTasksData";

const TasksContext = createContext<IUseTasksData | undefined>(undefined);

export const useTasks = (): IUseTasksData => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const tasksData = useTasksData();
  return (
    <TasksContext.Provider value={tasksData}>{children}</TasksContext.Provider>
  );
};
