import {
  TipsAttachmentContentTypes,
  TipsAttachmentVendorTypes,
} from "../enums/Tips.enum";
import { LinkAttachInterface } from "../interfaces/attachment.interface";

class AttachmentHandler {
  imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

  videoTypes = ["video/mp4"];

  audioTypes = ["audio/mpeg", "audio/wav"];

  linkTypes = ["link"];

  pdfTypes = ["application/pdf"];

  docsType = [
    ".doc",
    ".docx",
    ".ppt",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    "application/vnd.ms-word.document.macroEnabled.12",
    "application/vnd.ms-excel",
    "application/excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "application/x-excel",
    "application/x-msexcel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.presentationml.template",
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    "application/vnd.ms-powerpoint",
    "application/mspowerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.presentationml.template",
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
  ];

  isAcceptedType = (file: File) => {
    const allTypes = [
      ...this.imageTypes,
      ...this.videoTypes,
      ...this.audioTypes,
      ...this.linkTypes,
      ...this.pdfTypes,
      ...this.docsType,
    ];
    return allTypes.indexOf(file.type) > -1 ? true : false;
  };

  isAcceptedImage = (file: File) => this.imageTypes.includes(file.type);

  getTotalVideoNumber = (attachments: Array<LinkAttachInterface>) =>
    attachments.filter((attachment: LinkAttachInterface) =>
      this.videoTypes.includes(attachment.type)
    ).length;

  getTotalAudioNumber = (attachments: Array<LinkAttachInterface>) =>
    attachments.filter(
      (attachment: LinkAttachInterface) =>
        attachment.type === TipsAttachmentContentTypes.Audio
    ).length;

  getTotalImageNumber = (attachments: Array<LinkAttachInterface>) =>
    attachments.filter(
      (attachment: LinkAttachInterface) =>
        attachment.type === TipsAttachmentContentTypes.Image
    ).length;

  getTotalLinkNumber = (attachments: Array<LinkAttachInterface>) =>
    attachments.filter(
      (attachment: LinkAttachInterface) =>
        attachment.type === TipsAttachmentContentTypes.Link
    ).length;

  getTotalPdfNumber = (attachments: Array<LinkAttachInterface>) =>
    attachments.filter(
      (attachment: LinkAttachInterface) =>
        attachment.type === TipsAttachmentContentTypes.Pdf
    ).length;

  getTotalDocsNumber = (attachments: Array<LinkAttachInterface>) =>
    attachments.filter(
      (attachment: LinkAttachInterface) =>
        attachment.type === TipsAttachmentContentTypes.Doc
    ).length;

  getTotalLinksNumber = (attachments: Array<LinkAttachInterface>) =>
    attachments.filter(
      (attachment: LinkAttachInterface) =>
        attachment.type === TipsAttachmentContentTypes.Link
    ).length;

  getImagesFromUploadedFiles = (attachments: Array<LinkAttachInterface>) => {
    return (
      attachments
        .map((attachment: LinkAttachInterface, index: number) => ({
          ...attachment,
          index: index,
        }))
        .filter(
          (attachment: LinkAttachInterface) =>
            attachment.type === TipsAttachmentContentTypes.Image
        ) || []
    );
  };

  getPdfsFromUploadedFiles = (attachments: Array<LinkAttachInterface>) =>
    attachments
      .map((attachment: LinkAttachInterface, index: number) => ({
        ...attachment,
        index: index,
      }))
      .filter(
        (attachment: LinkAttachInterface) =>
          attachment.type === TipsAttachmentContentTypes.Pdf
      ) || [];

  getAudiosFromUploadedFiles = (attachments: Array<LinkAttachInterface>) =>
    attachments
      .map((attachment: LinkAttachInterface, index: number) => ({
        ...attachment,
        index: index,
      }))
      .filter(
        (attachment: LinkAttachInterface) =>
          attachment.type === TipsAttachmentContentTypes.Audio
      ) || [];

  getVideosFromUploadedFiles = (attachments: Array<LinkAttachInterface>) =>
    attachments
      .map((attachment: LinkAttachInterface, index: number) => ({
        ...attachment,
        index: index,
      }))
      .filter(
        (attachment: LinkAttachInterface) =>
          attachment.type === TipsAttachmentContentTypes.Video
      ) || [];

  getDocsFromUploadedFiles = (attachments: Array<LinkAttachInterface>) =>
    attachments
      .map((attachment: LinkAttachInterface, index: number) => ({
        ...attachment,
        index: index,
      }))
      .filter(
        (attachment: LinkAttachInterface) =>
          attachment.type === TipsAttachmentContentTypes.Doc
      ) || [];

  getLinksFromUploadedFiles = (attachments: Array<LinkAttachInterface>) =>
    attachments
      .map((attachment: LinkAttachInterface, index: number) => ({
        ...attachment,
        index: index,
      }))
      .filter(
        (attachment: LinkAttachInterface) =>
          attachment.type === TipsAttachmentContentTypes.Link
      ) || [];

  getYouTubeIdFromLink = (url: any) =>
    url.match(
      /(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\/?\?v=|\/embed\/|\/)([^\s&\\?\\/\\#]+)/
    )[1];

  isYoutubeVideoLink = (link: string) => {
    const vendor = link.match(
      /(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s\\?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s\\?]+)/
    );
    return vendor && vendor.length > 1 ? true : false;
  };

  isVimeoLink = (link: string) => {
    const vendor = link.match(/https:\/\/(:?www.)?(\w*)/);
    return vendor &&
      vendor.length > 1 &&
      vendor[2] == TipsAttachmentVendorTypes.Vimeo
      ? true
      : false;
  };

  isSoundCloudLink = (link: string) => {
    const vendor = link.match(/https:\/\/(:?www.)?(\w*)/);
    return vendor &&
      vendor.length > 1 &&
      vendor[2] == TipsAttachmentVendorTypes.Soundcloud
      ? true
      : false;
  };

  getMediaVendorFromLink = (link: string) => {
    if (this.isYoutubeVideoLink(link)) {
      return "youtube.com";
    }
    if (this.isVimeoLink(link)) {
      return "vimeo.com";
    }
    if (this.isSoundCloudLink(link)) {
      return "soundcloud.com";
    }
  };

  getMediaTypeFromLink = (link: string) => {
    if (this.isYoutubeVideoLink(link) || this.isVimeoLink(link)) {
      return TipsAttachmentContentTypes.Video;
    }
    if (this.isSoundCloudLink(link)) {
      return TipsAttachmentContentTypes.Audio;
    }
    return null;
  };

  isAcceptedLink = (link: string) => {
    return this.isYoutubeVideoLink(link) ||
      this.isVimeoLink(link) ||
      this.isSoundCloudLink(link)
      ? true
      : false;
  };

  getfileType = (type: TipsAttachmentContentTypes) => {
    let fileType = null;
    if (this.imageTypes.includes(type)) {
      fileType = TipsAttachmentContentTypes.Image;
    } else if (this.videoTypes.includes(type)) {
      fileType = TipsAttachmentContentTypes.Video;
    } else if (this.audioTypes.includes(type)) {
      fileType = TipsAttachmentContentTypes.Audio;
    } else if (this.pdfTypes.includes(type)) {
      fileType = TipsAttachmentContentTypes.Pdf;
    } else if (this.docsType.includes(type)) {
      fileType = TipsAttachmentContentTypes.Doc;
    } else if (this.linkTypes.includes(type)) {
      fileType = TipsAttachmentContentTypes.Link;
    } else {
      fileType = TipsAttachmentContentTypes.Other;
    }
    return fileType;
  };
}

export default new AttachmentHandler();
