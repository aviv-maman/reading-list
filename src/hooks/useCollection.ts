// *Custom hook for real time data from firestore*

import { useEffect, useState } from 'react';
//Firebase
import { db } from '../firebase/firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export const useCollection = (collectionName: string) => {
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const returnedDocuments: any[] = [];
      snapshot.docs.forEach((doc) => {
        returnedDocuments.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(returnedDocuments);
    });
    return () => unsubscribe();
  }, [collectionName]);

  return documents;
};
