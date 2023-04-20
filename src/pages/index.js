import Link from 'next/link';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';
import { useEffect, useState } from 'react';
import { realTime } from '@/firebase/realtimeFuncitons';

export default function Home(props) {
  const [ products, setProducts ] = useState(props.products)
  const [nome, setNome] = useState("")
  const [quantidade, setQuantidade] = useState("")
  
  useEffect(() => {
    realTime(setProducts)
  }, [])

  const addItem = async () => {
    if(!nome || !quantidade){
      return
    }
    try {
      const docRef = await addDoc(collection(db, "produto"), {
        nome,
        quantidade,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
      <div style={{display: "flex", flexDirection: "column", width: "50%", alignItems: "center"}}>
        <label htmlFor="nomeProduto">Nome do produto:</label>
        <input 
          type="text"
          name="nomeProduto" 
          value={nome}
          onChange={e => setNome(e.target.value)}
          style={{marginBottom: "20px", width: "50%"}}
        />
        <label htmlFor="quantidade">Quantidade:</label>
        <input 
          type="number" 
          name="quantidade" 
          value={quantidade}
          onChange={e => setQuantidade(e.target.value)}
          style={{marginBottom: "20px", width: "50%"}}
        />
        <button 
          onClick={addItem}
          style={{marginBottom: "20px", width: "50%"}}
        >
          Adicionar item
        </button>
      </div>
      <div style={{display: "flex", flexDirection: "column", width: "50%"}}>
        {products.map((product) => (
            <h1 key={product.nome}>
                <Link href={`/${product.id}`} className='links'>{product.nome}</Link>
            </h1>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps(){
  const q = query(collection(db, "produto"));
  const querySnapshot = await getDocs(q)
  const produtos = []

  querySnapshot.forEach((doc) => {
    produtos.push({
      ...doc.data(),
      id: doc.id
    })
  });

  console.log(produtos)
  return {
    props: {
      products: produtos
    }
  }
}
