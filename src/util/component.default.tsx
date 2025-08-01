import Moment from 'moment';
export const MOCK_TIMELINE_LIST = [
  {
    id: 'pGE2HJKrJWKwIFX4o8YJ',
    date: '2019',
    title: 'Founded',
    description: 'Started with 5 volunteers.',
    url: 'https://placehold.co/48x48?text=FO',
  },
];

export const MOCK_TIMELINE = {
  list: MOCK_TIMELINE_LIST,
  title: 'Our Journey',
  description: '',
  layout: {
    sm: 'VERTICAL',
    md: 'HORIZONTAL',
    lg: 'VERTICAL_ALTERNATING',
    xl: 'VERTICAL_ALTERNATING',
  },
  fluid: 'lg',
  visibility: 'false',
  background: '#ffffff',
  order: 0,
  component: 'timeline',
};

export const MOCK_STAT_LIST = [
  { id: 'pGE2HJKrJWKwIFX4o8YJ', label: 'Children Educated', value: 5000 },
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
  background: '#ffffff',
  order: 0,
  contentWidth: 5,
  component: 'statistics',
};

export const MOCK_BANNER = {
  contentPosition: {
    horizontal: 'justify-content-center',
    verticle: 'align-items-center',
  },
  // contentBg: '#ffffff',
  url: 'https://placehold.co/600?text=PlaceHolder',
  description: '',
  fluid: 'lg',
  visibility: 'false',
  background: '#ffffff',
  order: 0,
  height: 100,
  component: 'banner',
  contentWidth: 8,
  // parallax: 'true',
  design: 'design1',
};

export const MOCK_GROUP_LIST = [
  {
    id: 'pGE2HJKrJWKwIFX4o8YJ',
    description: '',
    url: 'https://placehold.co/400?text=PlaceHolder',
  },
];

export const MOCK_GROUP = {
  visibility: 'false',
  title: 'Group title',
  component: 'group',
  displayMode: 'slide',
  column: {
    sm: '12',
    md: '4',
    lg: '4',
    xl: '4',
  },
  list: MOCK_GROUP_LIST,
  fluid: 'lg',
  background: '#ffffff',
  order: 0,
  description: 'join us to change the world',
};

export const MOCK_TESTIMONIAL_LIST = [
  {
    id: 'pGE2HJKrJWKwIFX4o8YJ',
    name: 'Jane Doe',
    title: 'CEO, Company',
    quote: 'Highly recommended!',
  },
];

export const MOCK_TESTIMONIAL = {
  visibility: 'false',
  title: 'From our donor',
  component: 'testimonial',
  // displayMode: 'slide',
  column: {
    sm: '12',
    md: '4',
    lg: '3',
    xl: '3',
  },
  list: MOCK_TESTIMONIAL_LIST,
  fluid: 'lg',
  background: '#ffffff',
  order: 0,
  description: '',
};

export const MOCK_CTAGROUP_LIST = [
  {
    id: 'pGE2HJKrJWKwIFX4o8YJ',
    title: 'Help in Kind',
    label: 'Volunteer or donate goods',
    url: 'https://placehold.co/48x48?text=ICON',
    description: '<div>Description</div>',
  },
];

export const MOCK_CTAGROUP = {
  visibility: 'false',
  title: 'Group title',
  component: 'ctagroup',
  column: {
    sm: '12',
    md: '6',
    lg: '6',
    xl: '6',
  },
  list: MOCK_CTAGROUP_LIST,
  ctaMode: 'dropdown',
  fluid: 'lg',
  background: '#ffffff',
  order: 0,
  description: 'join us to change the world',
};

export const MOCK_BUTTON_LIST = [
  {
    id: 'pGE2HJKrJWKwIFX4o8YJ',
    btnLink: '/home',
    btnText: 'Home',
    btnColor: 'btn-dark',
  },
];

export const MOCK_GALLERY_LIST = [
  { id: 'pGE2HJKrJWKwIFX4o8YJ', url: 'https://placehold.co/400?text=PlaceHolder' },
];

export const MOCK_JUMBOTRON = {
  // btnList: MOCK_BUTTON_LIST,
  fluid: 'lg',
  order: 0,
  background: '#ffffff',
  visibility: 'false',
  component: 'jumbotron',
  title: 'Add title',
  description: 'Write content.',
  design: 'design1',
};

export const MOCK_PAYWIDGET = {
  fluid: 'lg',
  order: 0,
  background: '#ffffff',
  visibility: 'false',
  component: 'paywidget',
  title: 'Add title',
  description: 'Write content.',
  formData: {
    name: { type: 'text', label: 'Your Full Name', required: true },
    pan: { type: 'text', label: 'PAN Number (optional)' },
    amount: { type: 'text', label: 'Donation Amount (₹)', required: true },
    email: { type: 'text', label: 'Email Address' },
    contact: { type: 'number', label: 'Contact Number' },
    recurrence: {
      type: 'select',
      label: 'Donation Type',
      defaultValue: 'onetime',
      options: [
        { label: 'One-Time', value: 'onetime' },
        // { label: "Monthly", value: "monthly" }
      ],
    },
  },
};

export const MOCK_GALLERY = {
  list: MOCK_GALLERY_LIST,
  fluid: 'lg',
  order: 0,
  background: '#ffffff',
  visibility: 'false',
  component: 'gallery',
  title: 'Add title',
  description: 'Write content.',
  design: 'design1',
};

export const MOCK_BLOG_LIST = [
  {
    id: 'pGE2HJKrJWKwIFX4o8YJ',
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
  background: '#ffffff',
  design: 'design1',
};

export const MOCK_IFRAME = {
  component: 'iframe',
  height: 100,
  order: 0,
  background: '#ffffff',
  youtube: {
    mute: 'true',
    autoplay: 'false',
  },
  contentPosition: {
    horizontal: 'justify-content-center',
    verticle: 'align-items-center',
  },
  // contentBg: '"ffffff',
  visibility: 'false',
  fluid: 'lg',
  title: 'Some title about video',
  iframeUrl: '//www.youtube.com/embed/xPFlY6fY2c0?wmode=opaque&enablejsapi=1',
  description: 'Some description about video',
  contentWidth: 5,
};
