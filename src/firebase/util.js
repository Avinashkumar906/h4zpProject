import { FIRESTORE_DB } from './firebase';
import {
  getDocs, updateDoc, doc, deleteDoc, collection, addDoc, setDoc, getDoc
} from 'firebase/firestore/lite';

export const addPage = async (values, cb) => {
  const { pageName: pageID, meta } = values;
  if (pageID) {
    await setDoc(doc(FIRESTORE_DB, 'Pages', pageID), meta)
    return cb(pageID);
  } else {
    let res = (await addDoc(collection(FIRESTORE_DB, 'Pages'), meta));
    return cb(res.id);
  }
}

export const getPageComponents = async (pageID, cb) => {
  let componentListRef = collection(FIRESTORE_DB, 'Pages', pageID, 'Components');
  let pageRef = doc(FIRESTORE_DB, 'Pages', pageID,)
  let page = await (await getDoc(pageRef))
  if (page.exists()) {
    let res = (await getDocs(componentListRef))
      .docs.map(
        doc => ({ id: doc.id, data: doc.data() })
      );
    cb(res)
  } else {
    cb(null)
  }
}

export const addDocToCollection = async (page, id, data, cb) => {
  let docsList = collection(FIRESTORE_DB, page);
  let res = await addDoc(docsList, data)
  cb(res);
}

export const addComponentToPage = async (pageID, data, cb) => {
  let componentListRef = collection(FIRESTORE_DB, 'Pages', pageID, 'Components');
  let res = await addDoc(componentListRef, data)
  cb(res)
}

export const updateComponentOfPage = async (pageID, docId, data, cb) => {
  let componentRef = doc(FIRESTORE_DB, 'Pages', pageID, 'Components', docId)
  let res = await updateDoc(componentRef, data)
  cb(res);
}

export const deleteComponentOfPage = async (pageID, docId, cb) => {
  let componentRef = doc(FIRESTORE_DB, 'Pages', pageID, 'Components', docId)
  let res = await deleteDoc(componentRef)
  cb(res);
}