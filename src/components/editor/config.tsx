import { SunEditorOptions } from 'suneditor/src/options';

export const rteConfig: SunEditorOptions = {
  mode: 'classic',
  resizeEnable: true,
  resizingBar: true,
  defaultTag: 'div',
  imageFileInput: false,
  videoFileInput: false,
  charCounter: true,
  fontSizeUnit: 'px',
  lineHeights: [
    { text: '0.8', value: 0.8 },
    { text: '1', value: 1 },
    { text: '1.2', value: 1.2 },
    { text: '1.5', value: 1.5 },
    { text: '1.7', value: 1.7 },
  ],
  fontSize: [8, 12, 16, 20, 24, 32, 40, 48, 56, 64],
  buttonList: [
    // ['paragraphStyle','undo', 'redo','print', ],
    // /**'audio', 'image', 'video',   ,'math' */],
    /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
    ['fontSize', 'formatBlock'],
    ['bold', 'underline', 'italic', 'strike', 'removeFormat'],
    ['subscript', 'superscript'],
    ['fontColor', 'hiliteColor', 'textStyle'],
    ['outdent', 'indent'],
    ['showBlocks', 'codeView'],
    ['align', 'lineHeight', 'horizontalRule'],
    ['table', 'link', 'list'],
    [],
    ['save', 'preview', 'fullScreen'],
  ],
  addTagsWhitelist: 'span',
  strictHTMLValidation: false,
  strictMode: false,
  attributesWhitelist: {
    a: 'class href target',
    span: 'class style',
    img: 'class style alt src height width',
  },
};
