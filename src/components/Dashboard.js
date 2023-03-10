import { useEffect, useState } from "react"
import { loadProducts } from "../apiCalls"

const Dashboard = () => {
    const handleLogout = () => {
        localStorage.removeItem('ECOMM_TOKEN')
        window.location.href = '/login'
    }
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await loadProducts();
            console.log(response);
            setProducts(response.data)
        } catch (error) {
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <h1>Ecomm app</h1>
            <span className="btn btn-danger" onClick={handleLogout}>logout</span>
            <div style={{ position: "fixed", right: 0, top: 0, margin: 10, backgroundColor: "gray", width: 100, height: 100 }}>
                <p>cart</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', }}>

                {
                    products.map((product) => {
                        return (
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={product.images[0]} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 classNames="card-title">{product.title}</h5>
                                    <p classNames="card-text">{product.description}</p>
                                    <a href="#" className="btn btn-primary">add to cart </a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )

}
export default Dashboard;