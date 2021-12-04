import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFirestore = (collection, condition) => {
  const [documents, setDocument] = useState([]);

  useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createAt");
    if (condition && condition.compareValue) {
      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      let result = [];
      snapshot.forEach((value) => {
        result.push({ ...value.data(), ["id"]: value.id })
      });
      setDocument([...result]);
    });
    return unsubscribe;
  }, [collection, condition]);
  return documents;
};

export default useFirestore;
