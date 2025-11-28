import { BaseAuthor, BasePost, BaseSeries, BaseTag } from './common';

export interface MdxAuthor extends BaseAuthor {
  avatar?: string;
}

// MdxTag extends BaseTag without additional properties
export type MdxTag = BaseTag;

export interface MdxSeries extends BaseSeries {
  partNumber: number;
  totalParts: number;
}

export interface TableOfContents {
  items: Array<{
    title: string;
    url: string;
    items?: Array<{
      title: string;
      url: string;
    }>;
  }>;
}

export interface MdxPost extends BasePost {
  tableOfContents?: TableOfContents;
  gitInfo?: {
    lastModifiedDate?: string;
    commitHash?: string;
    contributors?: Array<{
      name: string;
      commits: number;
    }>;
  };
  customFields?: Record<string, unknown>;
}
