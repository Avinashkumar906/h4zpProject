import {
  MOCK_BANNER,
  MOCK_BLOGS,
  MOCK_BUTTON_LIST,
  MOCK_GROUP,
  MOCK_IFRAME,
  MOCK_JUMBOTRON,
  MOCK_NEWS,
} from '../mockdata/component.default';
import * as Moment from 'moment';

export type JumbotronType = typeof MOCK_JUMBOTRON;
export type ButtonList = typeof MOCK_BUTTON_LIST;

export const cloudinaryUtilFixedHnW = (data) => {
  // h_200,w_400,c_fill,g_face,f_auto,ar_4:3
  if (data.url.indexOf('upload') !== -1) {
    const [domain, fileID] = data.url.split('upload');
    const url = domain + `upload/h_${data.height},w_${data.width},c_fill,g_face,f_auto`;
    return url + fileID;
  } else {
    return data.url;
  }
};

export const cloudinaryUtilARWidth = (data) => {
  if (data.url.indexOf('upload') !== -1) {
    // h_200,w_400,c_fill,g_face,f_auto,ar_4:3
    const [domain, fileID] = data.url.split('upload');
    const url = domain + `upload/ar_${data.ar},w_${data.width},c_fill,g_face,f_auto`;
    return url + fileID;
  } else {
    return data.url;
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

export const getMockdata = (component, patchvalue?) => {
  let mock;
  switch (component) {
    case 'banner':
      mock = MOCK_BANNER;
      break;
    case 'jumbotron':
      mock = MOCK_JUMBOTRON;
      break;
    case 'news':
      mock = MOCK_NEWS;
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
    default:
      mock = null;
  }
  // Deep clone to avoid mutating the original mock
  const clonedMock = JSON.parse(JSON.stringify(mock));

  if (patchvalue && typeof patchvalue === 'object') {
    return patchObject(clonedMock, patchvalue);
  }
  return clonedMock;
};

export const getListItemOfComponent = (component) => {
  switch (component) {
    case 'banner':
      return { title: '', subTitle: '', url: '' };
    case 'jumbotron':
      return { btnLink: '', btnText: '' };
    case 'news':
      return {
        BtnUrl: '',
        description: '',
        title: '',
        url: '',
        BtnText: '',
        credit: '',
        date: Moment(new Date()).format('YYYY-MM-DD'),
        footer: '',
      };
    case 'blogs':
      return {
        BtnUrl: '',
        description: '',
        title: '',
        url: '',
        BtnText: '',
        credit: '',
        date: Moment(new Date()).format('YYYY-MM-DD'),
      };
    case 'group':
      return { title: '', url: '' };
    default:
      break;
  }
};

export const patchObject = (schema, target) => {
  if (Array.isArray(schema)) {
    return (target || []).map((item) => patchObject(schema[0], item));
  }

  if (schema && typeof schema === 'object') {
    const merged = { ...schema, ...target };

    Object.keys(schema).forEach((key) => {
      const schemaValue = schema[key];
      const targetValue = target?.[key];

      if (schemaValue && typeof schemaValue === 'object') {
        merged[key] = patchObject(schemaValue, targetValue);
      }
    });

    return merged;
  }

  return target !== undefined ? target : schema;
};
