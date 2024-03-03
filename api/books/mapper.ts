import moment from 'moment';
import TaskRepeaterInterface from '../../components/taskRepeater/task.interface';
import { SITE_URL } from '../../config/endpoints';
import { DEFAULT_PROFILE_PHOTO } from '../../config/link';
import { TipsEnrollmentStatus } from '../../enums/Tips.enum';
import TaskInterface from '../../interfaces/task.interface';
import {
  TipsBaseInterface,
  TipsInterface,
} from '../../interfaces/tips.interface';
import { getRelativeTime } from '../../services/util';
import { EnrollmentServerData } from './dataTypes';

export const mapClientToServerTipsTasks = (tasks: Array<TaskInterface>) => {
  return tasks.map((task: TaskInterface) => {
    const recurrence = task.repeater.recurrence
      ? {
          daily_occurrence: task.repeater.recurrence.dailyOccurrence,
          duration: task.repeater.recurrence.duration,
          interval: task.repeater.recurrence.interval,
          interval_occurrence: task.repeater.recurrence.intervalOccurrence
            ?.count
            ? task.repeater.recurrence.intervalOccurrence
            : null,
        }
      : null;

    return {
      id: task.id,
      title: task.title,
      attachments: task.attachments,
      repeater: {
        type: task.repeater.type,
        recurrence,
      },
      repetition: {
        short_form: task.repetition.shortForm,
        long_form: task.repetition.longForm,
      },
    };
  });
};

export const mapClientToServer = (request: any) => {
  return {
    title: request.title,
    attachment: {
      resource_url: request.attachment.resourceUrl || '',
      url: request.attachment.url,
      type: request.attachment.type ?? '',
      vendor: request.attachment.vendor ?? '',
    },
    description: {
      content: request.description.content,
      attachments: request.description.attachments,
    },
    category: request.category,
    privacy: request.privacy,
    tags: request.tags,
    tasks:
      request.tasks.length > 0 ? mapClientToServerTipsTasks(request.tasks) : [],
    reasons_to_read: request.reasons_to_read,
    summary: request.summary,
    stories: request.stories,
    learnings: request.learnings,
    reading_time: request.reading_time,
    short_description: request.short_description,
    audio_url: request.audio_url,
  } as any;
};
const mapTipsTasksServerToClient = (tasks: any) => {
  return tasks.map((task: any) => {
    const recurrence = task.repeater.recurrence
      ? {
          dailyOccurrence: {
            values: task.repeater.recurrence.daily_occurrence?.values ?? [],
            count: task.repeater.recurrence.daily_occurrence?.count ?? 0,
          },
          duration: task.repeater.recurrence?.duration,
          interval: task.repeater.recurrence?.interval,
          intervalOccurrence: {
            count: task.repeater.recurrence?.interval_occurrence?.count ?? 0,
            values: task.repeater.recurrence?.interval_occurrence?.values ?? [],
          },
        }
      : null;

    let repeater: TaskRepeaterInterface = {
      type: task.repeater.type || 'once',
    };

    if (repeater.type !== 'once' && recurrence) {
      repeater = { ...repeater, recurrence };
    }

    return {
      id: task.id,
      title: task.title,
      attachments: task.attachments,
      repetition: {
        shortForm: task.repetition.short_form || '',
        longForm: task.repetition.long_form || '',
      },
      repeater,
    } as TaskInterface;
  });
};

const getEnrollmentStatus = (tips: any) => {
  let status = TipsEnrollmentStatus.Enroll;
  const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');

  if (tips.enrolled) {
    status = TipsEnrollmentStatus.Enrolled;
  }

  if (tips.last_enrollment) {
    const sumOfActionedTask =
      tips.last_enrollment.failed +
      tips.last_enrollment.done +
      tips.last_enrollment.skipped;
    if (
      sumOfActionedTask < tips.last_enrollment.total &&
      moment(tips.last_enrollment.end_at).isBefore(currentTime)
    ) {
      status = TipsEnrollmentStatus.Incomplete;
    }
    if (tips.last_enrollment.total === sumOfActionedTask) {
      status = TipsEnrollmentStatus.Completed;
    }
  }

  return status;
};

const enrollmentStatus = (enrollment: EnrollmentServerData) => {
  let status = TipsEnrollmentStatus.Enroll;
  const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');

  if (enrollment.tips.enrolled) {
    status = TipsEnrollmentStatus.Enrolled;
  }
  const totalExecutedTask =
    enrollment.done + enrollment.skipped + enrollment.failed;
  if (
    totalExecutedTask < enrollment.total &&
    moment(enrollment.end_at).isBefore(currentTime)
  ) {
    status = TipsEnrollmentStatus.Incomplete;
  }
  if (enrollment.total === totalExecutedTask) {
    status = TipsEnrollmentStatus.Completed;
  }

  return status;
};

export const mapTipsMetaServerToClient = (meta: any) => {
  return {
    total: meta.total,
    page: meta.current_page,
    nextPage: meta.current_page + 1,
    currentPage: meta.current_page,
    lastPage: meta.last_page,
  };
};

export const mapTipsServerToClient = (tips: any): TipsInterface => ({
  id: tips.id,
  title: tips.title,
  slug: tips.slug,
  detailsUrl: `${SITE_URL}/book/${tips.id}/${tips.slug}/details`,
  singleTipsUrl: `${SITE_URL}/books/${tips.id}/${tips.slug}`,
  practiceUrl: tips.last_enrollment
    ? `/books/enrollments/${tips.last_enrollment.id}/practice`
    : '',
  attachment: {
    url: tips.attachment?.url || 'https://via.placeholder.com/450x300',
    resourceUrl: tips.attachment?.resource_url,
    type: tips.attachment?.type,
    vendor: tips.attachment?.vendor,
  },
  thumbnail: tips.thumbnail || 'https://via.placeholder.com/450x300',
  thumbnailObj: {
    url: tips.thumbnail || 'https://via.placeholder.com/450x300',
    alt: tips.title,
  },
  description: tips.description,
  tasks: tips.tasks
    ? (mapTipsTasksServerToClient(tips.tasks) as Array<TaskInterface>)
    : [],
  category: tips.category,
  categoryUrl: `/category/${tips.category}/books`,
  tags: tips.tags,
  privacy: tips.privacy || 'public',
  saved: tips.saved,
  enrolled: tips.enrolled,
  reacted: tips.reacted,
  editable: tips.editable || false,
  deletable: tips.deletable || false,
  enrollmentStatus: getEnrollmentStatus(tips),
  isOwnTips: tips.editable || false,
  author: {
    name: tips.author.name,
    username: tips.author.username,
    avatar: tips.author.avatar || DEFAULT_PROFILE_PHOTO,
    profession: tips.author.profession || '',
    isFollowing: tips.author.is_following,
    quote: tips.author.quote || '',
    address: tips.author.address || '',
    counts: {
      tips: tips.author.counts.tips,
      thumbsUp: tips.author.counts.thumbs_up,
      followers: tips.author.counts.followers,
      followings: tips.author.counts.followings,
      views: tips.author.counts.views || 0,
      enrolledTips: tips.author.counts.enrolled_tips,
      savedTips: tips.author.counts.saved_tips,
    },
  },
  totalLikes: tips.counts.thumbs_up,
  totalEnrollments: tips.counts.enrollments >= 0 ? tips.counts.enrollments : 0,
  counts: {
    thumbsUp: tips.counts.thumbs_up,
    thumbsDown: tips.counts.thumbs_down,
    shares: tips.counts.shares,
    enrollments: tips.counts.enrollments,
    comments: tips.counts.comments,
  },
  lastEnrollment: tips.last_enrollment
    ? {
        id: tips.last_enrollment.id,
        totalTask: tips.last_enrollment.total || 1,
        completedTask: tips.last_enrollment.done || 0,
        failedTask: tips.last_enrollment.failed || 0,
        skippedTask: tips.last_enrollment.skipped || 0,
        reEnrollable: tips.last_enrollment.re_enrollable,
        startAt: tips.last_enrollment.start_at,
        endAt: tips.last_enrollment.end_at,
      }
    : null,

  sharableUrl: tips.sharable_url,
  publishedAt: tips.published_at
    ? getRelativeTime(tips.published_at)
    : getRelativeTime(tips.created_at),
  createdAt: getRelativeTime(tips.created_at),
  updatedAt: getRelativeTime(tips.modified_at || tips.created_at),
  mute: tips.mute,
  reasons_to_read: tips.reasons_to_read,
  summary: tips.summary,
  stories: tips.stories,
  learnings: tips.learnings,
  short_description: tips.short_description,
  reading_time: tips.reading_time,
  audio_url: tips.audio_url,
});

export const enrolledTipsResolver = (response: any) => {
  return {
    data: mapEnrolledTips(response.data.data),
    meta: mapTipsMetaServerToClient(response.data.meta),
    status: response.status,
  };
};

export const mapTipsForList = (tips: any): TipsBaseInterface => {
  return {
    id: tips.id,
    title: tips.title,
    slug: tips.slug,
    detailsUrl: `${SITE_URL}/book/${tips.id}/${tips.slug}/details`,
    practiceUrl: tips.last_enrollment
      ? `/books/enrollments/${tips.last_enrollment.id}/practice`
      : '',
    thumbnailObj: {
      url: tips.thumbnail || 'https://via.placeholder.com/450x300',
      alt: tips.title,
    },
    attachment: null,
    category: tips.category,
    categoryUrl: `${SITE_URL}/category/${tips.category}/books`,
    privacy: tips.privacy || 'public',
    enrolled: tips.enrolled,
    reacted: tips.reacted,
    enrollmentStatus: getEnrollmentStatus(tips),
    totalLikes: tips.counts.thumbs_up,
    totalEnrollments: tips.counts.enrollments || 0,
    author: {
      name: tips.author.name,
      username: tips.author.username,
      avatar: tips.author.avatar || DEFAULT_PROFILE_PHOTO,
      isFollowing: tips.author.is_following,
      quote: tips.author.quote || '',
      address: tips.author.address || '',
      counts: {
        tips: tips.author.counts.tips,
        thumbsUp: tips.author.counts.thumbs_up,
        followers: tips.author.counts.followers,
      },
    },
    lastEnrollment: tips.last_enrollment
      ? {
          id: tips.last_enrollment.id,
          totalTask: tips.last_enrollment.total || 1,
          completedTask: tips.last_enrollment.done || 0,
          failedTask: tips.last_enrollment.failed || 0,
          skippedTask: tips.last_enrollment.skipped || 0,
          reEnrollable: tips.last_enrollment.re_enrollable,
          startAt: tips.last_enrollment.start_at,
          endAt: tips.last_enrollment.end_at,
        }
      : null,
    sharableUrl: tips.sharable_url,
    short_description: tips.short_description,
    reading_time: tips.reading_time,
    audio_url: tips.audio_url,
  };
};

export const mapTipsCollectionServerToClient = (tipsCollection: Array<any>) => {
  return tipsCollection.map((tips: any) => {
    return mapTipsServerToClient(tips);
  });
};

export const mapTipsCollectionForList = (tipsCollection: Array<any>) => {
  return tipsCollection.map((tips: any) => {
    return mapTipsForList(tips);
  });
};

//data : ServerSideData
export const mapEnrolledTips = (
  enrollmentList: EnrollmentServerData[]
): TipsBaseInterface[] => {
  return enrollmentList.map((enrollment, index) => {
    return {
      id: enrollment.tips.id,
      title: enrollment.tips.title,
      slug: enrollment.tips.slug,
      detailsUrl: `${SITE_URL}/book/${enrollment.tips.id}/${enrollment.tips.slug}/details`,
      practiceUrl: `/books/enrollments/${enrollment.id}/practice`,
      thumbnailObj: {
        url: enrollment.tips.thumbnail || 'https://via.placeholder.com/450x300',
        alt: enrollment.tips.title,
      },
      attachment: null,
      category: enrollment.tips.category,
      categoryUrl: `/category/${enrollment.tips.category}/books`,
      privacy: enrollment.tips.privacy || 'public',
      enrolled: enrollment.tips.enrolled,
      reacted: enrollment.tips.reacted,
      enrollmentStatus: enrollmentStatus(enrollment),
      totalLikes: enrollment.tips.counts.thumbs_up,
      totalEnrollments: enrollment.tips.counts.enrollments || 0,
      author: {
        name: enrollment.tips.author.name,
        username: enrollment.tips.author.username,
        avatar: enrollment.tips.author.avatar || DEFAULT_PROFILE_PHOTO,
        isFollowing: enrollment.tips.author.is_following,
        quote: enrollment.tips.author.quote || '',
        address: enrollment.tips.author.address || '',
        counts: {
          tips: enrollment.tips.author.counts.tips,
          thumbsUp: enrollment.tips.author.counts.thumbs_up,
          followers: enrollment.tips.author.counts.followers,
        },
      },
      lastEnrollment: enrollment.tips.last_enrollment
        ? {
            id: enrollment.tips.last_enrollment.id,
            totalTask: enrollment.tips.last_enrollment.total || 1,
            completedTask: enrollment.tips.last_enrollment.done || 0,
            failedTask: enrollment.tips.last_enrollment.failed || 0,
            skippedTask: enrollment.tips.last_enrollment.skipped || 0,
            reEnrollable: enrollment.tips.last_enrollment.re_enrollable,
            startAt: enrollment.tips.last_enrollment.start_at,
            endAt: enrollment.tips.last_enrollment.end_at,
          }
        : null,
      sharableUrl: enrollment.tips.sharable_url,
    };
  });
};
