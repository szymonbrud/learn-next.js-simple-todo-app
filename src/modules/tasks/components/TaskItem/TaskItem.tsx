"use client";

import styles from "./TaskIteam.module.css";
import { Checkbox } from "@/components/ui/checkbox";

import { ITask } from "@/types/Tasks";

export const TaskItem = ({
  taskData,
  handleOpenDetails,
  onChangeCheckStatus,
}: {
  taskData: ITask;
  onChangeCheckStatus: (
    id: ITask["id"],
    toCheckedStatus: ITask["isDone"],
  ) => void;
  handleOpenDetails: (taskId: ITask["id"]) => void;
}) => {
  return (
    <>
      <button
        className={styles.wrapper}
        role="button"
        onClick={() => {
          handleOpenDetails(taskData.id);
        }}
      >
        <p className={styles.taskName}>{taskData.name}</p>
        <Checkbox
          onClick={(e) => e.stopPropagation()}
          className={styles.checkbox}
          defaultChecked={taskData.isDone}
          checked={taskData.isDone}
          onCheckedChange={(status) => {
            onChangeCheckStatus(taskData.id, !!status);
          }}
        />
      </button>
    </>
  );
};
