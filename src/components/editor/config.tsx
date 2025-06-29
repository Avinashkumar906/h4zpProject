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
  fontSize: [8, 12, 16, 20, 24, 32, 40, 48, 56, 64],
  buttonList: [
    // ['paragraphStyle','undo', 'redo','print', ],
    // /**'audio', 'image', 'video',   ,'math' */],
    /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
    ['fontSize', 'formatBlock', 'blockquote'],
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
};
