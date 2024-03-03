import TaskInterface from '../../../interfaces/task.interface';
export interface TaskListProps {
    tasks: Array<TaskInterface>;
    existingTasks?: any;
    onDelete: (index: string) => void;
    onUpdate: (task: TaskInterface) => void;
    onEditModeChange: (isEditMode: boolean) => void;
    addTaskVisibility: boolean;
}
