import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ITask } from "@/types/Tasks";
import { Checkbox } from "@/components/ui/checkbox";

import style from "./EditTaskModal.module.css";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTasks } from "@/modules/tasks/contexts/TasksContext/TasksContext";
import { useRef } from "react";

export const EditTaskModal = ({
  isOpen,
  close,
  data,
}: {
  isOpen: boolean;
  close: () => void;
  data: ITask | null;
}) => {
  const taskNameInputRef = useRef<HTMLInputElement>(null);
  const taskDescInputRef = useRef<HTMLInputElement>(null);

  const {
    changeTaskName,
    deleteTask,
    changeTaskDesc,
    changeCheckedStatusTaskById,
  } = useTasks();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        if (data?.id && taskNameInputRef.current && taskDescInputRef.current) {
          changeTaskName(data?.id, taskNameInputRef.current.value);
          changeTaskDesc(data?.id, taskDescInputRef.current.value);
        }
        close();
      }}
    >
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Zadanie</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nazwa
            </Label>
            <Input
              ref={taskNameInputRef}
              id="name"
              defaultValue={data?.name}
              className="col-span-3"
              onBlur={(event) => {
                if (data?.id) changeTaskName(data?.id, event.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Opis
            </Label>
            <Input
              ref={taskDescInputRef}
              id="desc"
              defaultValue={data?.description || undefined}
              className="col-span-3"
              onBlur={(event) => {
                if (data?.id) changeTaskDesc(data?.id, event.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Wykonane
            </Label>
            <Checkbox
              className={`${style.checkbox} col-span-3"`}
              id="checkbox"
              checked={data?.isDone}
              onCheckedChange={(status) => {
                if (!data?.id) return;
                changeCheckedStatusTaskById(data?.id, !!status);
              }}
            />
          </div>
        </div>
        <DialogFooter className={style.footer}>
          <Button
            className={style.button}
            onClick={() => {
              if (data?.id) deleteTask(data?.id);
              close();
            }}
          >
            <Trash2 />
            Usuń zadanie
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
