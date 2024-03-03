import _ from 'lodash';
import FileUploadAPI from '../../../api/FileUploadAPI';
import TaskInterface from '../../../interfaces/task.interface';
import { UploadedAttachmentInterface } from '../../../interfaces/tips.interface';

export const uploadTipsAttachment = async (
  uploadedAttachment: UploadedAttachmentInterface,
  defaultTumbnail: string
) => {
  return new Promise((resolve) => {
    if (!uploadedAttachment && !defaultTumbnail) return;
    if (
      uploadedAttachment.file === null &&
      uploadedAttachment.preview === null
    ) {
      resolve(setDefaultThumbnail(defaultTumbnail));
      return;
    }

    if (!uploadedAttachment.file && uploadedAttachment.preview) {
      resolve({
        url: uploadedAttachment.preview.url,
        resourceUrl: uploadedAttachment.preview.resourceUrl,
        type: uploadedAttachment.preview.type,
        vendor: uploadedAttachment.preview.vendor,
      });
      return;
    }
    try {
      FileUploadAPI.uploadAttachment({
        attachment: uploadedAttachment.file,
      }).then((response) => {
        if (
          uploadedAttachment.preview?.resourceUrl &&
          response.data.resourceUrl == ''
        ) {
          resolve({ ...uploadedAttachment.preview, url: response.data.url });
          return;
        }
        resolve(response.data);
        return;
      });
    } catch (error) {
      console.error(error);
      resolve(setDefaultThumbnail(defaultTumbnail));
    }
  });
};

const setDefaultThumbnail = (thumbnail: string) => {
  return {
    url: thumbnail,
    resourceUrl: '',
    type: 'image',
    vendor: '',
  };
};
const mapper = (attachment: any) => {
  return {
    url: attachment.url,
    type: attachment.type,
    name:
      attachment.name ||
      (attachment.type === 'link' ? attachment.url.split('/').pop() : ''),
  };
};

export const uploadTasksAttachment = (tasks: Array<TaskInterface>) => {
  if (!tasks) return;
  return new Promise((resolve) => {
    let promiseLists: any = [];
    tasks.forEach(({ expaned, ...task }: any) => {
      if (task.attachments?.length) {
        let tmpTaskAttachments: any = [];
        tmpTaskAttachments = task.attachments.map(async (attachment: any) => {
          if (attachment.file) {
            try {
              const response = await FileUploadAPI.uploadAttachment(
                {
                  attachment: attachment.file,
                },
                null,
                mapper
              );
              return {
                ...response.data,
                taskId: task.id,
              };
            } catch (error) {
              console.error(error);
            }
          }
          return { ...attachment, taskId: task.id };
        });
        promiseLists = [...promiseLists, ...tmpTaskAttachments];
      }
    });
    Promise.all(promiseLists).then((res) => {
      resolve(res);
    });
  });
};

export const uploadDescriptionAttachment = (descAttachments: any) => {
  return new Promise((resolve) => {
    let promiseLists: any = [];
    let tmpDescAttachments: any = [];
    tmpDescAttachments = descAttachments.map(async (attachment: any) => {
      if (attachment.file) {
        try {
          const response = await FileUploadAPI.uploadAttachment(
            {
              attachment: attachment.file,
            },
            null,
            mapper
          );
          return {
            ...response.data,
          };
        } catch (error) {
          console.error(error);
        }
      }
      return mapper(attachment);
    });
    promiseLists = [...promiseLists, ...tmpDescAttachments];

    Promise.all(promiseLists).then((res) => {
      resolve(res);
    });
  });
};
