import { FIRESTORE_DB } from './firebase';
import {
  getDocs, updateDoc, doc, deleteDoc, collection, addDoc, getDoc
} from 'firebase/firestore/lite';


export const getDocList = async (page, cb) => {
  let docsList = collection(FIRESTORE_DB, page);
  let res = (await getDocs(docsList))
    .docs.map(
      doc => ({ id: doc.id, data: doc.data() })
    );
  cb(res);
}

export const getDocListById = async (page, id, cb) => {
  // let docsList = collection(FIRESTORE_DB, page);
  let res = (await getDoc(doc(FIRESTORE_DB, page, id))).data()
    // .docs.map(
    //   doc => ({ id: doc.id, data: doc.data() })
    // );
  cb(res);
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

export const updateDocToCollection = async (page, id, data, cb) => {
  let res = await updateDoc(doc(FIRESTORE_DB, page, id), data)
  cb(res);
}

export const deleteDocById = async (page, id, cb) => {
  let res = await deleteDoc(doc(FIRESTORE_DB, page, id))
  cb(res);
}