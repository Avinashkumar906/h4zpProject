import { FIRESTORE_DB } from './firebase';
import {
  getDocs, addDoc, updateDoc, doc, deleteDoc, collection,
} from 'firebase/firestore/lite';


export const getDocList = async (page, cb) => {
  let docsList = collection(FIRESTORE_DB, page);
  let res = (await getDocs(docsList))
    .docs.map(
      doc => ({ id: doc.id, data: doc.data() })
    );
  cb(res);
}

export const addDocToCollection = async (page, data, cb) => {
  let docsList = collection(FIRESTORE_DB, page);
  let res = await addDoc(docsList, data)
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