import { TasksViewSuspense } from "@/modules/tasks/views/TasksView/TasksView";
import { TasksProvider } from "@/modules/tasks/contexts/TasksContext/TasksContext";

export default function HomePage() {
  return (
    <TasksProvider>
      <TasksViewSuspense />
    </TasksProvider>
  );
}
