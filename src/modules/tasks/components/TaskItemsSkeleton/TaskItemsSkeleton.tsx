import { Skeleton } from "@/components/ui/skeleton";
import styles from "./TaskItemsSkeleton.module.css";

export const SkeletonTask = () => {
  return (
    <div className={styles.skeletonItemWrapper}>
      <Skeleton className={styles.skeletonItemText} />
    </div>
  );
};

const SKELETON_TASKS_NUMBER = 4;

export const TaskItemsSkeleton = () => {
  return (
    <div className={styles.skeletonWrapper}>
      {Array.from({ length: SKELETON_TASKS_NUMBER }, (_, i) => (
        <SkeletonTask key={i} />
      ))}
    </div>
  );
};
