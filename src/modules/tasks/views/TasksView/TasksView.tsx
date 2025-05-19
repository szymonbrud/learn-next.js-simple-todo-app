"use client";

import { TaskItem } from "@/modules/tasks/components/TaskItem/TaskItem";
import { useEditModalHandler } from "@/modules/tasks/views/TasksView/useEditModalHandler";
import { EditTaskModal } from "@/modules/tasks/components/EditTaskModal/EditTaskModal";

import styles from "./TasksView.module.css";
import { NewTaskForm } from "@/modules/tasks/components/NewTaskForm/NewTaskForm";
import { useTasks } from "@/modules/tasks/contexts/TasksContext/TasksContext";
import { TaskItemsSkeleton } from "@/modules/tasks/components/TaskItemsSkeleton/TaskItemsSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";

const TasksView = () => {
  const { tasks, changeCheckedStatusTaskById, isLoadTasksError } = useTasks();

  const {
    currentEditingTask,
    handleOpenDetails,
    isEditModalOpen,
    handleCloseModal,
  } = useEditModalHandler();

  return (
    <>
      <main className={styles.mainWrapper}>
        <h1 className={styles.title}>Twoja lista zadań.</h1>
        <div className={styles.contentWrapper}>
          <ScrollArea className={styles.tasksWrapperScroll}>
            <div className={styles.tasksWrapper}>
              {isLoadTasksError ? (
                <p>
                  Błąd podczas ładowania listy zadań, spróbuj odświeżyć stronę
                </p>
              ) : tasks ? (
                tasks?.map((task) => (
                  <TaskItem
                    handleOpenDetails={handleOpenDetails}
                    taskData={task}
                    key={task.id}
                    onChangeCheckStatus={changeCheckedStatusTaskById}
                  />
                ))
              ) : (
                <TaskItemsSkeleton />
              )}
            </div>
          </ScrollArea>
          <NewTaskForm />
        </div>
      </main>
      <EditTaskModal
        data={currentEditingTask}
        isOpen={isEditModalOpen}
        close={handleCloseModal}
      />
    </>
  );
};

export const TasksViewSuspense = () => (
  <Suspense fallback={<div></div>}>
    <TasksView />
  </Suspense>
);
