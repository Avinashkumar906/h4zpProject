import Moment from 'moment';

export const MOCK_BANNER = {
  contentPosition: {
    horizontal: 'justify-content-center',
    verticle: 'align-items-center',
  },
  contentBg: '#ffffff',
  url: 'https://placehold.co/600?text=PlaceHolder',
  description: '',
  fluid: 'lg',
  visibility: 'false',
  theme: 'bg-light',
  order: 0,
  height: 100,
  component: 'banner',
  // parallax: 'true',
  design: 'design1',
};

export const MOCK_GROUP_LIST = [
  {
    description: '',
    url: 'https://placehold.co/400?text=PlaceHolder',
  },
  {
    description: '',
    url: 'https://placehold.co/400?text=PlaceHolder',
  },
  {
    description: '',
    url: 'https://placehold.co/400?text=PlaceHolder',
  },
];

export const MOCK_GROUP = {
  visibility: 'false',
  // stackOnSm: 'false',
  title: 'Group title',
  component: 'group',
  // itemInRow: 3,
  list: MOCK_GROUP_LIST,
  fluid: 'lg',
  theme: 'bg-light',
  design: 'design1',
  description: 'join us to change the world',
};

export const MOCK_BUTTON_LIST = [
  {
    btnLink: '/home',
    btnText: 'Home',
    btnColor: 'btn-dark',
  },
];

export const MOCK_JUMBOTRON = {
  btnList: MOCK_BUTTON_LIST,
  fluid: 'lg',
  theme: 'bg-light',
  visibility: 'false',
  component: 'jumbotron',
  title: 'Add title',
  description: 'Write content.',
};

export const MOCK_BLOG_LIST = [
  {
    reference: '',
    description: 'Some description about blog…',
    title: 'Title of blog',
    url: 'https://placehold.co/400?text=PlaceHolder',
    BtnText: 'Go to page',
    BtnUrl: 'home',
    btnColor: 'btn-dark',
    date: Moment(new Date()).format('YYYY-MM-DD'),
    credit: '',
  },
];

export const MOCK_BLOGS = {
  list: MOCK_BLOG_LIST,
  component: 'blogs',
  title: 'Recent Activities',
  more: '',
  fluid: 'lg',
  visibility: 'false',
  theme: 'bg-light',
  design: 'design1',
};

export const MOCK_IFRAME = {
  component: 'iframe',
  height: 100,
  theme: 'bg-light',
  youtube: {
    mute: 'true',
    autoplay: 'false',
  },
  contentPosition: {
    horizontal: 'justify-content-center',
    verticle: 'align-items-center',
  },
  contentBg: '"ffffff',
  visibility: 'false',
  fluid: 'lg',
  title: 'Some title about video',
  iframeUrl: '//www.youtube.com/embed/xPFlY6fY2c0?wmode=opaque&enablejsapi=1',
  description: 'Some description about video',
};
