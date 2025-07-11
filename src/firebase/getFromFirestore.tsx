import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { FIRESTORE_DB } from './firebase';

export const subscribePageComponents = async (pageID, cb) => {
  try {
    const pageRef = doc(FIRESTORE_DB, 'Pages', pageID);
    const pageSnap = await getDoc(pageRef);

    if (pageSnap.exists()) {
      const componentListRef = collection(pageRef, 'Components');
      const unsubscribe = onSnapshot(
        componentListRef,
        (snapshot) => {
          const components = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          cb({ status: 'success', data: components });
        },
        (error) => {
          console.error('onSnapshot error:', error);
          cb({ status: 'error', error });
        },
      );

      return unsubscribe;
    } else {
      cb({ status: 'not_found' });
      return null;
    }
  } catch (error) {
    console.error('Error subscribing to page components:', error);
    if (!navigator.onLine) {
      cb({ status: 'offline' });
    } else {
      cb({ status: 'error', error });
    }
    return null;
  }
};

export const subscribeBlogList = (cb) => {
  const componentListRef = query(collection(FIRESTORE_DB, 'Pages'), where('isBlog', '==', 'true'));

  const unsubscribe = onSnapshot(componentListRef, (snapshot) => {
    const blogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    cb(blogs);
  });

  return unsubscribe; // cleanup handle
};

export const fetchPageMeta = async (pageID: string, cb: any) => {
  try {
    const pageRef = doc(FIRESTORE_DB, 'Pages', pageID);
    const pageSnap = await getDoc(pageRef);

    if (pageSnap.exists()) {
      cb(pageSnap.data());
    } else {
      cb(null, new Error(`Page with ID "${pageID}" does not exist.`));
    }
  } catch (error) {
    cb(null, error);
  }
};

export const addAndUpdatePage = async (values, cb) => {
  try {
    const { pageName: pageID, meta } = values;

    if (pageID) {
      await setDoc(doc(FIRESTORE_DB, 'Pages', pageID), meta);
      cb(pageID);
    } else {
      const res = await addDoc(collection(FIRESTORE_DB, 'Pages'), meta);
      cb(res.id);
    }
  } catch (error) {
    console.error('Error in addAndUpdatePage:', error);
    cb(null, error);
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

export const updateMultipleComponentsOfPage = async (pageID, componentsToUpdate, cb) => {
  try {
    const batch = writeBatch(FIRESTORE_DB);

    componentsToUpdate.forEach(({ id, data }) => {
      const componentRef = doc(FIRESTORE_DB, 'Pages', pageID, 'Components', id);
      batch.set(componentRef, data, { merge: true }); // or use batch.update(componentRef, data);
    });

    await batch.commit();
    cb(true);
  } catch (error) {
    console.error('Error updating components:', error);
    cb(false, error);
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
