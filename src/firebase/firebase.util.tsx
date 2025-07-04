import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { FIRESTORE_DB } from './firebase';

export const subscribePageComponents = async (pageID, cb) => {
  try {
    const pageRef = doc(FIRESTORE_DB, 'Pages', pageID);
    const pageSnap = await getDoc(pageRef);

    if (pageSnap.exists()) {
      const componentListRef = collection(pageRef, 'Components');
      const unsubscribe = onSnapshot(componentListRef, (snapshot) => {
        const components = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        cb(components);
      });

      return unsubscribe; // so you can call it to clean up on unmount
    } else {
      cb(null);
      return null;
    }
  } catch (error) {
    console.error('Error subscribing to page components:', error);
    cb(null);
    return null;
  }
};

export const subscribeBlogList = (cb) => {
  const componentListRef = query(collection(FIRESTORE_DB, 'Pages'), where('isBlog', '==', true));

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
