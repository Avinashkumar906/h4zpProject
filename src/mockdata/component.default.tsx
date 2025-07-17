import Moment from 'moment';

export const MOCK_STAT_LIST = [
  { label: 'Children Educated', value: 5000 },
  { label: 'Villages with Clean Water', value: 12 },
  { label: 'Meals Served', value: 25000 },
];
// gallery
export const MOCK_STATISTICS = {
  list: MOCK_STAT_LIST,
  title: 'Some statistics',
  description: '',
  contentPosition: {
    horizontal: 'justify-content-center',
    verticle: 'align-items-center',
  },
  column: {
    sm: '6',
    md: '6',
    lg: '4',
    xl: '3',
  },
  fluid: 'lg',
  visibility: 'false',
  theme: '#ffffff',
  order: 0,
  contentWidth: 5,
  component: 'statistics',
};

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
  theme: '#ffffff',
  order: 0,
  height: 100,
  component: 'banner',
  contentWidth: 8,
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
  column: {
    sm: '12',
    md: '4',
    lg: '4',
    xl: '4',
  },
  list: MOCK_GROUP_LIST,
  fluid: 'lg',
  theme: '#ffffff',
  order: 0,
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
  // btnList: MOCK_BUTTON_LIST,
  fluid: 'lg',
  order: 0,
  theme: '#ffffff',
  visibility: 'false',
  component: 'jumbotron',
  title: 'Add title',
  description: 'Write content.',
  design: 'design1',
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
  order: 0,
  title: 'Recent Activities',
  more: '',
  fluid: 'lg',
  visibility: 'false',
  theme: '#ffffff',
  design: 'design1',
};

export const MOCK_IFRAME = {
  component: 'iframe',
  height: 100,
  order: 0,
  theme: '#ffffff',
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
  contentWidth: 5,
};
