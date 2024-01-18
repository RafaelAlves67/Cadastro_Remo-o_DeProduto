import React from 'react'
import {useState, useEffect} from 'react'
import './Home.css'

const Home = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [id, setId] = useState([]);
    const [products, setProducts] = useState([])

    const url = "http://localhost:3000/products"


    //carregar dados
    useEffect(() => {
        
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [])

  

    // adicionar dados
    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = {
            name, price
        }

        fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)

        })
        .then(res => res.json())
        .then(data => {
            setProducts((prevProducts) => [...prevProducts, data]);
        })
        setName("")
        setPrice("")
    }


       /// remover dados
       const removeDados = (productID) => {
        console.log(productID);
         fetch(`http://localhost:3000/products/${productID}` , 
         {method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(data => {
                setProducts(products.filter((produto) => produto.id !== productID))
                console.log(products)
            })
            .catch(error => console.log(error + "Erro"))
        }

            


  return (
    <div>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name} - R$: {product.price} <button class="remove" onClick={() => removeDados(product.id)}>Remover Item</button></li>
                    
                ))}
            </ul>

            <h2>Insira produtos: </h2>

            <form onSubmit={handleSubmit}>
                <div className="nome">
                    <label htmlFor="">Nome: </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}placeholder='Insire o nome do produto'/>
                </div>
                
                <div className="preco">
                    <label htmlFor="">Preço: </label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Insire o preço do produto'/>
                </div>

                <input type="submit" value="Criar produto" id='btn'/>
            </form>
    </div>
  )
}

export default Home