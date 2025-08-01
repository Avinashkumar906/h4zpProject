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
const buttonOptions = [
  { label: 'Default', value: 'btn-dark' },
  { label: 'Primary', value: 'btn-primary' },
  { label: 'Secondary', value: 'btn-secondary' },
  { label: 'Pink', value: 'btn-pink' },
  { label: 'Yellow', value: 'btn-yellow' },
  { label: 'Purple', value: 'btn-purple' },
  { label: 'Orange', value: 'btn-orange' },
  { label: 'Teal', value: 'btn-teal' },
  { label: 'Coral', value: 'btn-coral' },
  { label: 'Lime', value: 'btn-lime' },
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
  { label: 'Statistics', value: 'statistics' },
  { label: 'Image Gallery', value: 'gallery' },
  { label: 'Clickable Card', value: 'ctagroup' },
  { label: 'Timeline', value: 'timeline' },
  { label: 'Testimonials', value: 'testimonial' },
  { label: 'Payment Widget', value: 'paywidget' },
];

export const basicFieldConfig = [
  { name: 'fluid', label: 'Width', type: 'select', options: widthOptions },
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
    name: 'design',
    label: 'Design',
    type: 'select',
    options: [
      { label: 'Style 1', value: 'design1' },
      { label: 'Style 2', value: 'design2' },
    ],
  },
  {
    name: 'displayMode',
    label: 'Display view',
    type: 'select',
    options: [
      { label: 'Slide', value: 'slide' },
      { label: 'Grid', value: 'grid' },
    ],
  },
  {
    name: 'ctaMode',
    label: 'Open On Action',
    type: 'select',
    options: [
      { label: 'Popup', value: 'modal' },
      { label: 'Dropdown', value: 'dropdown' },
    ],
  },
  { name: 'background', label: 'Background', type: 'color' },
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
  { name: 'height', label: 'Section height', size: 4, type: 'select', options: heightOptions },
];

export const contentFieldConfig = [
  { name: 'url', label: 'ImageUpload', type: 'upload' },
  {
    name: 'contentWidth',
    label: 'Content Width',
    size: 4,
    type: 'select',
    options: [
      { label: 'X Small', value: '4' },
      { label: 'Small', value: '5' },
      { label: 'Medium', value: '6' },
      { label: 'Large', value: '7' },
      { label: 'X Large', value: '8' },
    ],
  },
  {
    name: 'column',
    label: 'Columns',
    type: 'group',
    size: 8,
    options: [
      {
        name: 'sm',
        type: 'select',
        label: 'sm',
        options: [
          { label: '2 Col SM', value: '6' },
          { label: '1 Col SM', value: '12' },
        ],
      },
      {
        name: 'md',
        type: 'select',
        label: 'md',
        options: [
          { label: '1 Col MD', value: '12' },
          { label: '2 Col MD', value: '6' },
          { label: '3 Col MD', value: '4' },
          { label: '4 Col MD', value: '3' },
        ],
      },
      {
        name: 'lg',
        type: 'select',
        label: 'lg',
        options: [
          { label: '1 Col LG', value: '12' },
          { label: '2 Col LG', value: '6' },
          { label: '3 Col LG', value: '4' },
          { label: '4 Col LG', value: '3' },
        ],
      },
      {
        name: 'xl',
        type: 'select',
        label: 'xl',
        options: [
          { label: '1 Col XL', value: '12' },
          { label: '2 Col XL', value: '6' },
          { label: '3 Col XL', value: '4' },
          { label: '4 Col XL', value: '3' },
          { label: '6 Col XL', value: '2' },
        ],
      },
    ],
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
  { name: 'title', label: 'Content Title', type: 'text' },
  { name: 'iframeUrl', label: 'YT Video/Iframe Url', type: 'text' },
  { name: 'description', label: 'Description', type: 'rte', size: 12 },
];

export const contentListFieldConfig = [
  { name: 'url', label: 'Image Url', type: 'upload', size: 12 },
  { name: 'iconUrl', label: 'Icon Url', type: 'upload', size: 12 },
  { name: 'name', label: 'Name', type: 'text', size: 6 },
  { name: 'title', label: 'Title', type: 'text', size: 6 },
  { name: 'label', label: 'Label', type: 'text', size: 6 },
  { name: 'value', label: 'Value', type: 'text', size: 6 },
  { name: 'date', label: 'Created On', type: 'text', size: 4 },
  { name: 'BtnText', label: 'Button Text', type: 'text', size: 4 },
  { name: 'BtnUrl', label: 'Page reference', type: 'text', size: 4 },
  { name: 'btnColor', label: 'Button Color', type: 'select', size: 4, options: buttonOptions },
  { name: 'credit', label: 'Organised by', type: 'text', size: 4 },
  { name: 'description', label: 'Description', type: 'rte', size: 12 },
  { name: 'quote', label: 'Quote', type: 'rte', size: 12 },
];
