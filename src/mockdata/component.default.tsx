import * as Moment from 'moment';

export const MOCK_BANNER = {
  list: [
    {
      url: 'https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666330087/H4ZP/banner/WEB_28latest_29_dyhbkq.jpg',
      title: 'Fighting Poverty one Step at a Time',
      subTitle: 'HANDS 4 ZERO POVERTY',
    },
    {
      subTitle: 'HANDS 4 ZERO POVERTY',
      url: 'https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666330174/H4ZP/banner/Contact-_28R_29_ie4ecj.jpg',
      title: 'Fighting Poverty one Step at a Time',
    },
  ],
  fluid: true,
  theme: '',
  order: 1,
  height: 100,
  component: 'banner',
  parallax: true,
};

export const MOCK_GROUP = {
  imgRatio: '1:1',
  title: 'OTHER SPECIAL PROJECTS',
  style: 'rounded-circle',
  component: 'group',
  itemInRow: 3,
  order: 4,
  clickable: false,
  list: [
    {
      title: 'Fighting Poverty one Step at a Time',
      url: 'https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666436083/H4ZP/group/moreProject/image-asset_izixlp.jpg',
    },
    {
      title: 'Fighting Poverty one Step at a Time',
      url: 'https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666436096/H4ZP/group/moreProject/DSC_1096_khblje.jpg',
    },
    {
      title: 'Fighting Poverty one Step at a Time',
      url: 'https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666436109/H4ZP/group/moreProject/H4ZP_IRC_Video_Contest_cuprg7.jpg',
    },
  ],
  fluid: false,
  height: 100,
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
  height: 100,
  title: 'We are back!',
  description:
    'Supporting medical camps, food and shoe distributions, medical and school supplies, and much more. Help us expand our reach by donating today using Fundly or the H4ZP website.',
};

export const MOCK_NEWS = {
  list: [
    {
      url: 'https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666336275/H4ZP/news/initial/Hands_4_Zero_Poverty_H4ZP_Street_Blanket_Distribution_rlopmk.jpg',
      reference: '',
      description:
        'In the last recent years, India has been experiencing record low-temperatures during the winter season. It has caught many of its citizens off-guard, especially people who live on the streets. Hands 4 Zero Poverty—along with loving volunteers—walked through the night to find and provide people with blankets and food.  The H4ZP team distributed 100 blankets and 150 sandwiches. We invite you to view the web page created to document the event…',
      footer:
        'If you would like to support or join us on the ground, helping communities in need, please contact us out at info@h4zp.org. We would be delighted to get your help.',
      BtnText: 'BLANKET & FOOD DISTRIBUTION',
      BtnUrl: '/',
      btnColor: 'btn-dark',
      title: 'Title',
      date: Moment(new Date()).format('YYYY-MM-DD'),
      credit: '',
    },
  ],
  component: 'news',
  title: 'Recent news',
  order: 6,
  fluid: false,
  theme: '',
};

export const MOCK_BLOGS = {
  list: [
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
  ],
  component: 'blogs',
  order: 4,
  title: 'Recent Activities',
  more: '',
  fluid: false,
  height: 100,
  theme: '',
};

export const MOCK_IFRAME = {
  component: 'iframe',
  height: 100,
  theme: 'bg-light',
  order: 5,
  mute: true,
  url: '//www.youtube.com/embed/xPFlY6fY2c0?wmode=opaque&enablejsapi=1',
  autoplay: false,
  fluid: false,
  title: 'Some title about video',
  description: 'Some description about video',
};
