// *Custom hook for real time data from firestore*

import { useEffect, useRef, useState } from 'react';
//Firebase
import { db } from '../firebase/firebaseConfig';
import {
  collection,
  CollectionReference,
  onSnapshot,
  query,
  QueryFieldFilterConstraint,
  QueryLimitConstraint,
  QueryOrderByConstraint,
} from 'firebase/firestore';

type CollectionQueries = QueryFieldFilterConstraint | QueryLimitConstraint | QueryOrderByConstraint;

export const useCollection = <T>(collectionName: string, ..._options: CollectionQueries[]) => {
  const [documents, setDocuments] = useState<T[]>([]);

  const options = useRef(_options).current;

  useEffect(() => {
    let collectionRef = collection(db, collectionName) as CollectionReference<T>;

    const q = query<T>(collectionRef, ...options);

    // getDocs(q).then((docs) => setDocuments(docs.docs));

    const unsubscribe = onSnapshot<T>(q, (snapshot) => {
      // const returnedDocuments: QueryDocumentSnapshot<Book>[] = [];

      // returnedDocuments[0].data.
      // snapshot.docs.forEach((doc) => {
      //   returnedDocuments.push({ ...doc.data(), id: doc.id });
      // });
      setDocuments(snapshot.docs.map((d) => ({ ...d.data(), id: d.id })));
    });

    return () => unsubscribe();
  }, [collectionName, options]);

  return documents;
};
