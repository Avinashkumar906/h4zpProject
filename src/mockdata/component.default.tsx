import Moment from 'moment';

export const MOCK_BANNER = {
  contentPosition: {
    horizontal: 'justify-content-center',
    verticle: 'align-items-center',
  },
  contentBg: '#ffffff',
  url: 'https://placehold.co/600?text=Hello+World',
  description: 'HANDS 4 ZERO POVERTY',
  fluid: 'true',
  visibility: 'false',
  theme: 'bg-light',
  order: 0,
  height: 100,
  component: 'banner',
  parallax: 'true',
  design: 'design1',
};

export const MOCK_GROUP_LIST = [
  {
    description: 'Hellow world',
    url: 'https://placehold.co/400?text=Hello+World',
  },
  {
    description: 'Hellow world',
    url: 'https://placehold.co/400?text=Hello+World',
  },
  {
    description: 'Hellow world',
    url: 'https://placehold.co/400?text=Hello+World',
  },
];

export const MOCK_GROUP = {
  visibility: 'false',
  stackOnSm: 'false',
  title: 'OTHER SPECIAL PROJECTS',
  component: 'group',
  // itemInRow: 3,
  list: MOCK_GROUP_LIST,
  fluid: 'false',
  theme: 'bg-light',
  design: 'design1',
  description:
    'Join the group of people helping to make life better for the people living in extreme poverty. The H4ZP projects are possible because of the support and care of people like you.',
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
  fluid: 'false',
  theme: 'bg-light',
  visibility: 'false',
  component: 'jumbotron',
  title: 'We are back!',
  description: 'Some description here!',
};

export const MOCK_BLOG_LIST = [
  {
    reference: '',
    description:
      'Seventy-five families received food supplies to last the average family of five approximately 2~3 weeks…',
    title: 'Learn about our fall 2022 food distribution ',
    url: 'https://placehold.co/400?text=Hello+World',
    BtnText: 'Read more',
    BtnUrl: '#',
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
  fluid: 'false',
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
  visibility: 'false',
  fluid: 'false',
  title: 'Some title about video',
  url: '//www.youtube.com/embed/xPFlY6fY2c0?wmode=opaque&enablejsapi=1',
  description: 'Some description about video',
};
