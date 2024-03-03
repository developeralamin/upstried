import moment from 'moment';
import { TimelineTaskObj } from '../api/tasks/dataTypes';
import { SITE_URL } from '../config/endpoints';

export const getPhoto = (attachment: any) => {
  if (!attachment) {
    return;
  }
  return attachment.url;
};

export const strlen = (str: string, limit = 10, suffix = '...') => {
  if (!str) {
    return str;
  }

  return str.length > limit ? str.substring(0, limit + 1) + `${suffix}` : str;
};

export const getRelativeTime = (date: any) =>
  moment.utc(date).local().fromNow();

export const getFormattedDate = (date: any) => {
  moment.utc(date).format('yyyy-MM-dd');
};

export const getFormattedDateTime = (date: any) => {
  moment.utc(date).format('h:m a, DD MM YYYY');
};
export const isObjectEmpty = (obj: any) =>
  obj && Object.keys(obj).length > 0 ? false : true;

export const isClientSide = () =>
  typeof window === 'undefined' ? false : true;

export const areObjectsSame = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) == JSON.stringify(obj2);
};

export const getFileType = (file: any) => {
  return file.type ?? 'image';
};

export const isVideo = (path: string) => {
  const file = path.split('.');
  const fileExt = file[file.length - 1];
  return fileExt === 'mp4' ? true : false;
};

export const isImage = (path: string) => {
  const types = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
  const file = path.split('.');
  const fileExt = file[file.length - 1];
  return types.includes(fileExt);
};

export const isYoutubeVideoLink = (link: string) => {
  const vendor = link.match(/https:\/\/(:?www.)?(\w*)/);
  return vendor && vendor.length > 1 && vendor[2] == 'youtube' ? true : false;
};

export const isVimeoLink = (link: string) => {
  const vendor = link.match(/https:\/\/(:?www.)?(\w*)/);
  return vendor && vendor.length > 1 && vendor[2] == 'vimeo' ? true : false;
};

export const isSoundCloudLink = (link: string) => {
  const vendor = link.match(/https:\/\/(:?www.)?(\w*)/);
  return vendor && vendor.length > 1 && vendor[2] == 'soundcloud'
    ? true
    : false;
};

export const isAcceptedLink = (link: string) => {
  return isYoutubeVideoLink(link) || isVimeoLink(link) || isSoundCloudLink(link)
    ? true
    : false;
};

export const getMediaTypeFromLink = (link: string) => {
  if (isYoutubeVideoLink(link) || isVimeoLink(link)) {
    return 'video';
  }
  if (isSoundCloudLink(link)) {
    return 'audio';
  }
  return null;
};

export const getUrlFromFile = (file: any) => {
  return URL.createObjectURL(file);
};

export const isFileImage = (file: any) => {
  const types = [
    'image/jpg',
    'image/jpeg',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/svg',
  ];

  return types.includes(file.type);
};

export const arraySortAlphabetically = (array: any) => {
  return array.sort((a: any, b: any) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};

// Map route with needle
export const mapRoute = (url: string, subject: string, needle: string) => {
  return url.replace(subject, needle);
};

export const copyLink = (link: string) => {
  if (!link) return;
  navigator.clipboard.writeText(link);
};
export const numeral = (number: any) => {
  if (!number) return 0;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const numeral = require('numeral');
  return numeral(number).format('0,0');
};

export const getNumeralValue = (number: any) => {
  if (!number) return 0;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const numeral = require('numeral');
  return numeral(number).format('0 a');
};

export const pluralize = (str: any, count: number) => {
  if (!str) return;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pluralize = require('pluralize');
  return count < 2 ? pluralize.singular(str) : pluralize.plural(str);
};

export const getPendingAction = () => {
  const pendingActionStr = sessionStorage.getItem('pending_action');
  return pendingActionStr ? JSON.parse(pendingActionStr) : null;
};

export const removePendingAction = () => {
  sessionStorage.removeItem('pending_action');
};

export const getImageSize = (url: string) => {
  const img = document.createElement('img');

  const promise = new Promise((resolve, reject) => {
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      resolve({ width, height });
    };

    img.onerror = reject;
  });

  img.src = url;

  return promise;
};

export const isMobile = () => {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      // eslint-disable-next-line no-useless-escape
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor);
  return check;
};

export const getTipsDetailsLink = (slug: string, id: string) =>
  `${SITE_URL}/books/${id}/${slug}`;

export const getAuthorUrl = (username: string) =>
  `${SITE_URL}/authors/${username}`;

export const isTimeOver = (timestamp: moment.Moment | null) =>
  timestamp && timestamp.isSameOrBefore(moment(), 'minute');
