import {
  MOCK_BANNER,
  MOCK_BLOG_LIST,
  MOCK_BLOGS,
  MOCK_BUTTON_LIST,
  MOCK_DROPDOWN,
  MOCK_DROPDOWN_LIST,
  MOCK_GALLERY,
  MOCK_GALLERY_LIST,
  MOCK_GROUP,
  MOCK_GROUP_LIST,
  MOCK_IFRAME,
  MOCK_JUMBOTRON,
  MOCK_STAT_LIST,
  MOCK_STATISTICS,
  MOCK_TESTIMONIAL,
  MOCK_TESTIMONIAL_LIST,
} from './component.default';
import Moment from 'moment';
export type JumbotronType = typeof MOCK_JUMBOTRON;
export type ButtonList = typeof MOCK_BUTTON_LIST;
export type BannerType = typeof MOCK_BANNER;
export type IframeType = typeof MOCK_IFRAME;
export type GroupType = typeof MOCK_GROUP;
export type GroupListType = (typeof MOCK_GROUP_LIST)[0];
export type BlogType = typeof MOCK_BLOGS;
export type BlogListType = (typeof MOCK_BLOG_LIST)[0];
export type StatisticsType = typeof MOCK_STATISTICS;
export type GalleryType = typeof MOCK_GALLERY;
export type DropdownType = typeof MOCK_DROPDOWN;
export type DropdownListType = (typeof MOCK_DROPDOWN_LIST)[0];
export type TestimonialType = typeof MOCK_TESTIMONIAL;
export type TestimonialListType = (typeof MOCK_TESTIMONIAL_LIST)[0];
export type ComponentType =
  | JumbotronType
  | ButtonList
  | BannerType
  | IframeType
  | GroupType
  | BlogType
  | StatisticsType
  | DropdownType
  | TestimonialType
  | GalleryType;

export type CloudinaryParams = {
  url: string;
  ar?: string; //4:3, 16:9
  width?: number; //400
  height?: number; // 400
  quality?: string; //auto, 80
  crop?: 'fill' | 'fit' | 'thumb' | 'crop' | 'scale'; //
  gravity?: 'face' | 'center' | 'auto'; //
  format?: 'auto' | 'webp' | 'jpg'; //
  dpr?: string;
  [key: string]: string | number; // Allow additional Cloudinary params
};

export const cloudinaryUtilForUrl = (data: CloudinaryParams): string => {
  const { url, ar, width, height, quality, crop, format, gravity, dpr, ...rest } = data;

  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    const [domain, restPath] = url.split('/upload/');
    const restParts = restPath.split('/');
    const existingTransforms =
      restParts[0].includes(',') || restParts[0].includes('_') ? restParts[0] : '';
    const fileID = existingTransforms ? restParts.slice(1).join('/') : restParts.join('/');

    const transformations: string[] = [];

    if (existingTransforms) transformations.push(existingTransforms);
    if (ar) transformations.push(`ar_${ar}`);
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (quality) transformations.push(`q_${quality}`);
    if (crop) transformations.push(`c_${crop}`);
    if (gravity) transformations.push(`g_${gravity}`);
    if (dpr) transformations.push(`dpr_${dpr}`);
    if (format) transformations.push(`f_${format}`);
    // else transformations.push('f_auto');

    Object.entries(rest).forEach(([key, value]) => {
      if (value) transformations.push(`${key}_${value}`);
    });

    const transformationString = transformations.join(',');

    return `${domain}/upload/${transformationString}/${fileID}`;
  } else {
    return url;
  }
};

export const optimizeData = (data) => {
  if (data.url.indexOf('upload') !== -1) {
    // h_200,w_400,c_fill,g_face,f_auto,ar_4:3
    const [domain, fileID] = data.url.split('upload');
    const url = domain + `upload/f_auto`;
    return url + fileID;
  } else {
    return data.url;
  }
};

export const getFormatedDate = (date, format) => {
  return Moment(new Date(date)).format(format);
};

export const isTrue = (val) => {
  return val === 'true' || val === true;
};

export function smartParse(value: string | number | boolean | null | undefined): boolean | string {
  if (value === null || value === undefined) return false;

  if (typeof value === 'string') {
    const trimmed = value.trim().toLowerCase();
    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;
    return value.trim();
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  return value;
}

export const isExternalLink = (url) => {
  const tmp = document.createElement('a');
  tmp.href = url;
  return tmp.host !== window.location.host;
};

export const getMockdata = (component, valueToPatch?) => {
  let mock;
  switch (component) {
    case 'banner':
      mock = MOCK_BANNER;
      break;
    case 'jumbotron':
      mock = MOCK_JUMBOTRON;
      break;
    case 'blogs':
      mock = MOCK_BLOGS;
      break;
    case 'iframe':
      mock = MOCK_IFRAME;
      break;
    case 'group':
      mock = MOCK_GROUP;
      break;
    case 'statistics':
      mock = MOCK_STATISTICS;
      break;
    case 'gallery':
      mock = MOCK_GALLERY;
      break;
    case 'dropdown':
      mock = MOCK_DROPDOWN;
      break;
    case 'testimonial':
      mock = MOCK_TESTIMONIAL;
      break;
    default:
      mock = null;
  }
  // Deep clone to avoid mutating the original mock
  const clonedMock = JSON.parse(JSON.stringify(mock));

  if (valueToPatch && typeof valueToPatch === 'object') {
    return serializeObject(clonedMock, valueToPatch);
  }
  return clonedMock;
};

export const serializedata = (data) => {
  return getMockdata(data.component, data);
};

export const getListItemOfComponent = (component) => {
  switch (component) {
    case 'jumbotron':
      return MOCK_BUTTON_LIST[0];
    case 'blogs':
      return MOCK_BLOG_LIST[0];
    case 'group':
      return MOCK_GROUP_LIST[0];
    case 'statistics':
      return MOCK_STAT_LIST[0];
    case 'gallery':
      return MOCK_GALLERY_LIST[0];
    case 'dropdown':
      return MOCK_DROPDOWN_LIST[0];
    case 'testimonial':
      return MOCK_TESTIMONIAL_LIST[0];
    default:
      break;
  }
};

export const serializeObject = (schema, target) => {
  if (Array.isArray(schema)) {
    // If schema is an array, target should be an array:
    return Array.isArray(target) ? target.map((item) => serializeObject(schema[0], item)) : [];
  }

  if (schema && typeof schema === 'object') {
    const merged = {};

    Object.keys(schema).forEach((key) => {
      const schemaValue = schema[key];
      const targetValue = target?.[key];

      if (schemaValue && typeof schemaValue === 'object') {
        merged[key] = serializeObject(schemaValue, targetValue);
      } else {
        merged[key] = targetValue !== undefined ? targetValue : schemaValue;
      }
    });

    return merged;
  }

  return target !== undefined ? target : schema;
};
