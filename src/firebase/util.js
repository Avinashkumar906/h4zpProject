import { FIRESTORE_DB } from './firebase';
import {
  getDocs, updateDoc, doc, deleteDoc, collection, addDoc, setDoc
} from 'firebase/firestore/lite';

const getBlogMeta = () => ({
  isBlog:true,
  date: new Date()
})

export const addPage = async (pageID, cb) => {
  if(pageID) {
    await setDoc(doc(FIRESTORE_DB, 'Pages', pageID), getBlogMeta())
    return cb(pageID);
  } else {
    let res = (await addDoc(collection(FIRESTORE_DB, 'Pages'), getBlogMeta()));
    return cb(res.id);
  }
}

export const getPageComponents = async (pageID, cb) => {
  let docsList = collection(FIRESTORE_DB, 'Pages',pageID, 'Components');
  try {
    let res = (await getDocs(docsList))
      .docs.map(
        doc => ({ id: doc.id, data: doc.data() })
      );
    cb(res);
  } catch (error) {
    console.log(error)
    cb([])
  }
}

export const addDocToCollection = async (page, id, data, cb) => {
  let docsList = collection(FIRESTORE_DB, page);
  let res = await addDoc(docsList, data)
  cb(res);
}

export const addComponentToPage = async (pageID, data, cb) => {
  let componentListRef = collection(FIRESTORE_DB, 'Pages', pageID , 'Components');
  let res = await addDoc(componentListRef, data)
  cb(res)
}

export const updateComponentOfPage = async (pageID, docId, data, cb) => {
  let componentRef = doc(FIRESTORE_DB,'Pages', pageID, 'Components', docId)
  let res = await updateDoc(componentRef, data)
  cb(res);
}

export const deleteComponentOfPage = async (pageID, docId, cb) => {
  let componentRef = doc(FIRESTORE_DB,'Pages', pageID, 'Components', docId)
  let res = await deleteDoc(componentRef)
  cb(res);
}