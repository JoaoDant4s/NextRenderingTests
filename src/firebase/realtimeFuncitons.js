import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase-config";

export const realTime = async (setProducts) => {
    const produtos = []
    const q = query(collection(db, "produto"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        produtos.push({
          ...doc.data(),
          id: doc.id
        });
      });
      console.log(produtos)
      setProducts(produtos)
    });

    return unsubscribe
  }