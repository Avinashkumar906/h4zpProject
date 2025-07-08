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

const verticalPositionOptions = [
  { label: 'Verticle Top', value: 'align-items-start' },
  { label: 'Verticle Center', value: 'align-items-center' },
  { label: 'Verticle Bottom', value: 'align-items-end' },
  { label: 'Verticle Stretch', value: 'align-items-stretch' },
  { label: 'verticle Baseline', value: 'align-items-baseline' },
];

const horizontalPositionOptions = [
  { label: 'Horizontal Start', value: 'justify-content-start' },
  { label: 'Horizontal Center', value: 'justify-content-center' },
  { label: 'Horizontal End', value: 'justify-content-end' },
  { label: 'Horizontal Around', value: 'justify-content-around' },
  { label: 'Horizontal VerBetween', value: 'justify-content-between' },
  { label: 'Horizontal Evenly', value: 'justify-content-evenly' },
];

export const componentOptions = [
  { label: 'Please select a component', value: '' },
  { label: 'Banner', value: 'banner' },
  { label: 'YouTube Video', value: 'iframe' },
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
    name: 'autoplay',
    type: 'select',
    label: 'Auto play',
    options: [
      { label: 'On', value: 'true' },
      { label: 'Off', value: 'false' },
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
];
