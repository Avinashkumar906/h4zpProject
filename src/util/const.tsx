export const backgroundOptions = [
  { label: 'No Background', value: '' },
  { label: 'Off White', value: '#f8f9fa' },
  { label: 'Light Sky Blue', value: '#E0F7FA' },
  { label: 'Honeydew', value: '#E6F2E6' },
  { label: 'Lavender', value: '#F3E8FF' },
  { label: 'Misty Rose', value: '#FFE4E1' },
  { label: 'Light Peach', value: '#FFF2E5' },
  { label: 'Pale Yellow', value: '#FFFDE7' },
  { label: 'Alice Blue', value: '#F0F8FF' },
  { label: 'Seashell', value: '#FFF5EE' },
  { label: 'Azure', value: '#F0FFFF' },
  { label: 'Light Lilac', value: '#F6F0FA' },
];

export const widthOptions = [
  { label: 'None', value: 'false' },
  { label: 'Full Width', value: 'true' },
  { label: 'Full until sm screen', value: 'sm' },
  { label: 'Full until md screen', value: 'md' },
  { label: 'Full until lg screen', value: 'lg' },
  { label: 'Full until xl screen', value: 'xl' },
  { label: 'Full until xxl screen', value: 'xxl' },
];

const heightOptions = [
  { label: 'Auto', value: 'auto' },
  { label: '25', value: '25' },
  { label: '33', value: '33' },
  { label: '50', value: '50' },
  { label: '60', value: '60' },
  { label: '75', value: '75' },
  { label: '80', value: '80' },
  { label: '90', value: '90' },
  { label: '100', value: '100' },
];

const verticalPositionOptions = [
  { label: 'Top', value: 'align-items-start' },
  { label: 'Middle', value: 'align-items-center' },
  { label: 'Bottom', value: 'align-items-end' },
  { label: 'V Stretch', value: 'align-items-stretch' },
  // { label: 'Verticle Baseline', value: 'align-items-baseline' },
];

const horizontalPositionOptions = [
  { label: 'Left', value: 'justify-content-start' },
  { label: 'Right', value: 'justify-content-end' },
  { label: 'Center', value: 'justify-content-center' },
  // { label: 'H Around', value: 'justify-content-around' },
  // { label: 'H Between', value: 'justify-content-between' },
  // { label: 'Horizontal Evenly', value: 'justify-content-evenly' },
];

export const componentOptions = [
  { label: 'Please select a component', value: '' },
  { label: 'Banner', value: 'banner' },
  { label: 'Iframe', value: 'iframe' },
  { label: 'Jumbotron', value: 'jumbotron' },
  { label: 'Card Group', value: 'group' },
  { label: 'Activity', value: 'blogs' },
  // { label: "Statistics", value: "statistics" },
  // { label: 'News', value: 'news' },
];

export const basicFieldConfig = [
  {
    name: 'fluid',
    label: 'Width',
    type: 'select',
    options: widthOptions, // your existing widthOptions
  },
  {
    name: 'youtube',
    label: 'Video Preset',
    type: 'group',
    options: [
      {
        name: 'autoplay',
        type: 'select',
        label: 'Auto play',
        options: [
          { label: 'Auto play On', value: 'true' },
          { label: 'Auto play Off', value: 'false' },
        ],
      },
      {
        name: 'mute',
        type: 'select',
        label: 'Mute on Play',
        options: [
          { label: 'Mute', value: 'true' },
          { label: 'Unmute', value: 'false' },
        ],
      },
    ],
  },
  {
    name: 'visibility',
    label: 'Show on Page',
    type: 'select',
    options: [
      { label: 'Show', value: 'true' },
      { label: 'Hide', value: 'false' },
    ],
  },
  {
    name: 'contentBg',
    label: 'Content Background',
    type: 'color',
  },
  {
    name: 'contentPosition',
    label: 'Content Position',
    type: 'group',
    options: [
      {
        name: 'horizontal',
        label: 'Align Horizontal',
        type: 'select',
        options: horizontalPositionOptions,
      },
      {
        name: 'verticle',
        label: 'Align Verticle',
        type: 'select',
        options: verticalPositionOptions,
      },
    ],
  },
  {
    name: 'parallax',
    label: 'Scroll Effect',
    type: 'select',
    options: [
      { label: 'Parallax', value: 'true' },
      { label: 'No Effect', value: 'false' },
    ],
  },
  {
    name: 'theme',
    label: 'Background',
    type: 'color',
    // options: backgroundOptions,
  },
  {
    name: 'height',
    label: 'Section height',
    size: 4,
    type: 'select',
    options: heightOptions,
  },
];
