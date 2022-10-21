export const cloudinaryUtilFixedHnW = (data) => {
  // h_200,w_400,c_fill,g_face,f_auto,ar_4:3
  if (data.url.indexOf('upload') !== -1) {
    let [domain, fileID] = data.url.split('upload')
    domain += `upload/h_${data.height},w_${data.width},c_fill,g_face,f_auto`;
    return domain + fileID;
  } else {
    return data.url;
  }
}

export const cloudinaryUtilARWidth = (data) => {
  if (data.url.indexOf('upload') !== -1) {
    // h_200,w_400,c_fill,g_face,f_auto,ar_4:3
    let [domain, fileID] = data.url.split('upload')
    domain += `upload/ar_${data.ar},w_${data.width},c_fill,g_face,f_auto`;
    return domain + fileID;
  } else {
    return data.url;
  }
}

export const optimizeData = (data) => {
  if (data.url.indexOf('upload') !== -1) {
    // h_200,w_400,c_fill,g_face,f_auto,ar_4:3
    let [domain, fileID] = data.url.split('upload')
    domain += `upload/f_auto`;
    return domain + fileID;
  } else {
    return data.url;
  }
}