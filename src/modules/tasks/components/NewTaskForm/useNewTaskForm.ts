import { FormEvent, useCallback, useMemo, useRef, useState } from "react";
import { useTasks } from "@/modules/tasks/contexts/TasksContext/TasksContext";

interface FormDataState {
  name: string;
  desc: string;
}

export const useNewTaskSection = () => {
  const { addNewTask } = useTasks();

  const inputTaskNameRef = useRef<HTMLInputElement>(null);

  const [isInputNameFill, setIsInputNameFill] = useState<boolean>(false);
  const [isInputDescFill, setIsInputDescFill] = useState<boolean>(false);

  const isDescriptionInputVisible = useMemo(() => {
    return isInputNameFill || isInputDescFill;
  }, [isInputDescFill, isInputNameFill]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      const form = event.currentTarget;

      const nameInput = form.elements.namedItem(
        "name",
      ) as HTMLInputElement | null;
      const descInput = form.elements.namedItem(
        "desc",
      ) as HTMLInputElement | null;

      const nameValue = nameInput ? nameInput.value.trim() : "";
      const descValue = descInput ? descInput.value.trim() : "";

      if (!nameValue) {
        alert("Nazwa zadania jest wymagana!");
        return;
      }

      const dataToProcess: FormDataState = {
        name: nameValue,
        desc: descValue,
      };

      form.reset();
      inputTaskNameRef.current?.focus();

      setIsInputNameFill(false);
      setIsInputDescFill(false);

      try {
        await addNewTask(dataToProcess);
      } catch {}
    },
    [addNewTask],
  );

  return {
    handleSubmit,
    inputTaskNameRef,
    setIsInputNameFill,
    setIsInputDescFill,
    isDescriptionInputVisible,
  };
};
