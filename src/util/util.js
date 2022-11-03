import { MOCK_BANNER, MOCK_BLOGS, MOCK_GROUP, MOCK_IFRAME, MOCK_JUMBOTRON, MOCK_NEWS } from "../mockdata/mockData";
import Moment from 'moment';

export const cloudinaryUtilFixedHnW = (data) => {
  // h_200,w_400,c_fill,g_face,f_auto,ar_4:3
  if (data.url.indexOf('upload') !== -1) {
    let [domain, fileID] = data.url.split('upload')
    domain += `upload/h_${data.height},w_${data.width},c_fill,g_face,f_auto`;
    return domain + fileID;
  } else {
    return data.url;
  }
}

export const cloudinaryUtilARWidth = (data) => {
  if (data.url.indexOf('upload') !== -1) {
    // h_200,w_400,c_fill,g_face,f_auto,ar_4:3
    let [domain, fileID] = data.url.split('upload')
    domain += `upload/ar_${data.ar},w_${data.width},c_fill,g_face,f_auto`;
    return domain + fileID;
  } else {
    return data.url;
  }
}

export const optimizeData = (data) => {
  if (data.url.indexOf('upload') !== -1) {
    // h_200,w_400,c_fill,g_face,f_auto,ar_4:3
    let [domain, fileID] = data.url.split('upload')
    domain += `upload/f_auto`;
    return domain + fileID;
  } else {
    return data.url;
  }
}

export const isTrue = (val) => {
  return (val === 'true' || val === true)
}

export const getMockdata = (component) => {
  switch (component) {
    case 'banner':
      return MOCK_BANNER
    case 'jumbotron':
      return MOCK_JUMBOTRON
    case 'news':
      return MOCK_NEWS
    case 'blogs':
      return MOCK_BLOGS
    case 'iframe':
      return MOCK_IFRAME
    case 'group':
      return MOCK_GROUP
    default:
      return null
  }
}

export const getListItemOfComponent = (component) => {
  switch (component) {
    case 'banner':
      return { title: '', subTitle: '', url: '' }
    case 'jumbotron':
      return { btnLink: '', btnText: '' }
    case 'news':
      return { BtnUrl: '', description: '', title: '', url: '', BtnText: '', credit: '', date: Moment(new Date()).format('YYYY-MM-DD'), footer: '' }
    case 'blogs':
      return { BtnUrl: '', description: '', title: '', url: '', BtnText: '', credit: '', date: Moment(new Date()).format('YYYY-MM-DD') }
    case 'group':
      return { title: '', url: '' }
    default:
      break;
  }
}