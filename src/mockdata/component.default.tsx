import * as Moment from 'moment';

export const MOCK_BANNER = {
  //     url: 'https://res.cloudinary.com/ddfh2nxrt/image/upload/v1670224137/dumpdata/em5i0ryece0hnzgk0g2j.png',
  //     url: 'https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666330174/H4ZP/banner/Contact-_28R_29_ie4ecj.jpg',
  url: 'https://res.cloudinary.com/ddfh2nxrt/image/upload/v1670224137/dumpdata/em5i0ryece0hnzgk0g2j.png',
  description: 'HANDS 4 ZERO POVERTY',
  fluid: true,
  theme: '',
  order: 1,
  height: 100,
  component: 'banner',
  parallax: true,
};

export const MOCK_GROUP_LIST = [
  {
    description: 'Fighting Poverty one Step at a Time',
    url: 'https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666436083/H4ZP/group/moreProject/image-asset_izixlp.jpg',
  },
  {
    description: 'Fighting Poverty one Step at a Time',
    url: 'https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666436096/H4ZP/group/moreProject/DSC_1096_khblje.jpg',
  },
  {
    description: 'Fighting Poverty one Step at a Time',
    url: 'https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666436109/H4ZP/group/moreProject/H4ZP_IRC_Video_Contest_cuprg7.jpg',
  },
];

export const MOCK_GROUP = {
  // imgRatio: '1:1',
  // style: 'rounded-circle',
  // height: 100,
  stackOnSm: false,
  title: 'OTHER SPECIAL PROJECTS',
  component: 'group',
  itemInRow: 3,
  order: 4,
  list: MOCK_GROUP_LIST,
  fluid: false,
  theme: '',
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
  order: 2,
  btnList: MOCK_BUTTON_LIST,
  fluid: false,
  theme: '',
  component: 'jumbotron',
  title: 'We are back!',
  description:
    'Supporting medical camps, food and shoe distributions, medical and school supplies, and much more. Help us expand our reach by donating today using Fundly or the H4ZP website.',
};

export const MOCK_BLOG_LIST = [
  {
    reference: '',
    description:
      'Seventy-five families received food supplies to last the average family of five approximately 2~3 weeks…',
    title: 'Learn about our fall 2022 food distribution ',
    url: 'https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666334204/H4ZP/blogs/oct-2022/IMG_2816-2_28R_29_ybs592.jpg',
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
  order: 4,
  title: 'Recent Activities',
  more: '',
  fluid: false,
  height: 100,
  theme: '',
  design: 'design1',
};

export const MOCK_IFRAME = {
  component: 'iframe',
  height: 100,
  theme: 'bg-light',
  order: 5,
  mute: true,
  autoplay: false,
  fluid: false,
  title: 'Some title about video',
  url: '//www.youtube.com/embed/xPFlY6fY2c0?wmode=opaque&enablejsapi=1',
  description: 'Some description about video',
};
