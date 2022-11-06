export const rteConfig = {
  mode: "classic",
  defaultTag: 'div',
  charCounter: true,
  fontSizeUnit: 'rem',
  fontSize: [.25, .5, .75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5, 4, 5],
  buttonList: [
    ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    ['paragraphStyle', 'blockquote'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    ['fontColor', 'hiliteColor', 'textStyle'],
    ['removeFormat'],
    ['outdent', 'indent'],
    ['align', 'horizontalRule', 'list', 'lineHeight'],
    ['table', 'link', /**'image', 'video', 'audio'  ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
    /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
    ['showBlocks', 'codeView'],
    ['preview', 'print', 'fullScreen'],
    ['save', 'template'],
  ]
}