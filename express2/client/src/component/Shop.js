import { useEffect, useState } from "react"



const Shop = (props) => {
    props.setActiveLink("shop")
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        fetch("/api/product")
            .then(res => res.json())
            .then(data => setProducts(data))
            .then(() => setIsLoading(false))
    }

    const addToCart = (id) => {
        fetch("/api/cart", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: "bearer " + props.token
            },
            body: JSON.stringify({ item: id })
        })
            .then(res => res.status)
            .then(status => {
                if(status == 200)
                    props.setCartItems(items => [...items, id])
            })
    }

    return (<>
        <div className="row products">
            {isLoading && <div className="my-5 loading">
                <i className="fa fa-spinner"></i>
            </div>}
            {products.map(p => {
                return (
                    <div key={p._id} className="col-md-3 mb-3">
                        <div className="m-2">
                            <img className="w-100" src={p.img_path} />
                            <h3>{p.name}</h3>
                            <a href="#" onClick={() => addToCart(p._id)}>Add to Cart</a>
                        </div>
                    </div>
                )
            })}
        </div>
    </>)
}

export default Shop