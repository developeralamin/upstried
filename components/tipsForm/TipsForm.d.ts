import TaskInterface from '../../interfaces/task.interface';
import { TipsInterface } from './../../interfaces/tips.interface';
export interface TipsFormProps {
  tasks?: Array<TaskInterface>;
  onClose: any;
  categories: any;
  tips?: TipsInterface;
  onUpdate?: any;
}

export interface MapTipsRequestInterface {
  title: string;
  tags: string[];
  description: string;
  category: string;
}

export interface CreateTipsRequestInterface extends MapTipsRequestInterface {
  tasks: any;
  description: {
    content: string;
    attachments: any;
  };
}

export interface UploadedAttachmentInterface {
  file: File | null;
  name?: string;
  type: string;
  url: string;
  uuid: string;
}
