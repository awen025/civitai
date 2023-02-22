import { imageResourceSelect } from './imagev2.selector';
import { simpleTagSelect, imageTagSelect } from './tag.selector';
import { Prisma } from '@prisma/client';

export const editPostImageSelect = Prisma.validator<Prisma.ImageSelect>()({
  id: true,
  name: true,
  url: true,
  nsfw: true,
  width: true,
  height: true,
  hash: true,
  meta: true,
  hideMeta: true,
  generationProcess: true,
  needsReview: true,
  mimeType: true,
  tags: { select: { tag: { select: imageTagSelect } } },
  resources: { select: imageResourceSelect },
});
type PostImageNavigationProps = { previewUrl?: string };
export type PostImage = Prisma.ImageGetPayload<typeof postImage> & PostImageNavigationProps;
const postImage = Prisma.validator<Prisma.ImageArgs>()({ select: editPostImageSelect });

export const postTagSelect = ({ trending }: { trending?: boolean }) =>
  Prisma.validator<Prisma.TagSelect>()({
    id: true,
    name: true,
    isCategory: true,
    rank: {
      select: {
        postCountAllTimeRank: !trending,
        postCountDayRank: trending,
      },
    },
  });
export type PostTag = Prisma.TagGetPayload<typeof postTag>;
const postTag = Prisma.validator<Prisma.TagArgs>()({ select: postTagSelect({}) });

export const editPostSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  nsfw: true,
  title: true,
  modelVersionId: true,
  userId: true,
  publishedAt: true,
  images: {
    orderBy: { index: 'asc' },
    select: editPostImageSelect,
  },
  tags: { select: { tag: { select: simpleTagSelect } } },
});
