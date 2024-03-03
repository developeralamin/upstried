export interface TaskFormProps {
    submitLabel: string;
    task?: any;
    setTaskActionCreator?: any;
    onCreated: (newTask: any) => void;
    taskEditMode?: boolean;
    onAddTaskVisibilityChange: (visible: boolean) => void;
    addTaskVisibility: boolean;
}

export interface UserInputInterface {
    id: string;
    title: string;
    attachments: Array<any>;
    repeater: any;
    repetition: {
        shortForm: string;
        longForm: string
    },
};