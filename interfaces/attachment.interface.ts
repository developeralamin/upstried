import { TipsAttachmentContentTypes } from "../enums/Tips.enum";

export interface AttachmentBaseInterface {
    type: TipsAttachmentContentTypes;
    url: string | null;
}

export interface LinkAttachInterface extends AttachmentBaseInterface {
    file?: File | null | undefined;
    name?: string;
    uuid: string;
}

export interface LinkAttachInterfaceWithIndex extends LinkAttachInterface {
    index: number;
}