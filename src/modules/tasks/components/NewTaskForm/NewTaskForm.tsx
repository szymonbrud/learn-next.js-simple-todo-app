import styles from "./NewTaskForm.module.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNewTaskSection } from "@/modules/tasks/components/NewTaskForm/useNewTaskForm";

export const NewTaskForm = () => {
  const {
    handleSubmit,
    inputTaskNameRef,
    setIsInputNameFill,
    setIsInputDescFill,
    isDescriptionInputVisible,
  } = useNewTaskSection();

  return (
    <form className={styles.section} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <Input
          ref={inputTaskNameRef}
          className={styles.input}
          placeholder="Dodaj nowe zadanie"
          name="name"
          onChange={(event) => {
            const { value } = event.target;
            if (value === "") setIsInputNameFill(false);
            else setIsInputNameFill(true);
          }}
        />
        {isDescriptionInputVisible && (
          <Input
            className={styles.input}
            placeholder="Opis zadania..."
            name="desc"
            onChange={(event) => {
              const { value } = event.target;
              if (value === "") setIsInputDescFill(false);
              else setIsInputDescFill(true);
            }}
          />
        )}
      </div>
      <Button size="icon" className={styles.button} type="submit">
        <ArrowRight />
      </Button>
    </form>
  );
};
