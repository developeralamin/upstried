import { TipsAttachmentInterface } from './../../../interfaces/tips.interface';
export interface TipsAttachmentUploaderProps {
    onChange: (media: any) => void;
    attachment: TipsAttachmentInterface | null;
}
