import { LinkAttachInterface } from '../../../interfaces/attachment.interface';
import TaskInterface, { TaskInterfaceWithEditMode } from './../../../interfaces/task.interface';
export interface TaskProps {
    path?: number;
    task: TaskInterfaceWithEditMode;
    onDelete: (id: string) => void;
    onUpdate: (task: TaskInterface) => void;
    onEditModeChange?: any;
    editMode?: boolean;
}
