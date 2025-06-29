import { FIRESTORE_DB } from './firebase';
import { updateDoc, doc, deleteDoc, collection, addDoc, setDoc } from 'firebase/firestore'; // ✅ switched from 'lite' to full SDK

export const addPage = async (values, cb) => {
  const { pageName: pageID, meta } = values;
  if (pageID) {
    await setDoc(doc(FIRESTORE_DB, 'Pages', pageID), meta);
    cb(pageID);
  } else {
    const res = await addDoc(collection(FIRESTORE_DB, 'Pages'), meta);
    cb(res.id);
  }
};

export const addDocToCollection = async (collectionPath, data, cb) => {
  try {
    const docsList = collection(FIRESTORE_DB, collectionPath);
    const res = await addDoc(docsList, data);
    cb(res);
  } catch (error) {
    console.error('Error adding doc to collection:', error);
    cb(null, error);
  }
};

export const addComponentToPage = async (pageID, data, cb) => {
  try {
    const pageRef = doc(FIRESTORE_DB, 'Pages', pageID);
    const componentListRef = collection(pageRef, 'Components'); // ✅ correct subcollection ref
    const res = await addDoc(componentListRef, data);
    cb(res);
  } catch (error) {
    console.error('Error adding component:', error);
    cb(null, error);
  }
};

export const updateComponentOfPage = async (pageID, docId, data, cb) => {
  try {
    const componentRef = doc(FIRESTORE_DB, 'Pages', pageID, 'Components', docId);
    await updateDoc(componentRef, data); // ✅ updateDoc returns void
    cb(true);
  } catch (error) {
    console.error('Error updating component:', error);
    cb(null, error);
  }
};

export const deleteComponentOfPage = async (pageID, docId, cb) => {
  try {
    const componentRef = doc(FIRESTORE_DB, 'Pages', pageID, 'Components', docId);
    await deleteDoc(componentRef); // ✅ deleteDoc returns void
    cb(true);
  } catch (error) {
    console.error('Error deleting component:', error);
    cb(null, error);
  }
};
