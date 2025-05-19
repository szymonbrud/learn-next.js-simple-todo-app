"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ITask } from "@/types/Tasks";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTasks } from "@/modules/tasks/contexts/TasksContext/TasksContext";

const TASK_ID_PARAMS = "taskId";

export const useEditModalHandler = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { tasks } = useTasks();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskEditingId, setTaskEditingId] = useState<ITask["id"] | null>(null);

  const currentEditingTask = useMemo(() => {
    if (taskEditingId === null || !tasks) return null;

    const task = tasks.find((task) => task.id === taskEditingId);

    return task || null;
  }, [taskEditingId, tasks]);

  useEffect(() => {
    const taskIdFromUrl = searchParams.get(TASK_ID_PARAMS);

    if (taskIdFromUrl) {
      console.log(`Znaleziono taskId w URL: ${taskIdFromUrl}. Otwieram modal.`);
      setIsEditModalOpen(true);
      setTaskEditingId(taskIdFromUrl);
    }
  }, [searchParams]);

  const handleOpenDetails = useCallback(
    (taskId: ITask["id"]) => {
      setIsEditModalOpen(true);
      setTaskEditingId(taskId);

      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set(TASK_ID_PARAMS, taskId);

      router.push(`${pathname}?${TASK_ID_PARAMS}=${taskId}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const handleCloseModal = useCallback(() => {
    setIsEditModalOpen(false);
    setTaskEditingId(null);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(TASK_ID_PARAMS);
    const newUrl = newSearchParams.toString()
      ? `${pathname}?${newSearchParams.toString()}`
      : pathname;
    router.push(newUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  return {
    handleOpenDetails,
    handleCloseModal,
    currentEditingTask,
    isEditModalOpen,
  };
};
