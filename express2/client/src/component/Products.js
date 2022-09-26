import { useState, useEffect } from "react"
import uuidv4 from "uuid"
import "font-awesome/css/font-awesome.min.css"

function Products() {
    const [products, setProducts] = useState([])
    const [productName, setProductName] = useState("")
    const [productImage, setProductImage] = useState([])
    const [reload, setReload] = useState(0)

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        getProducts()
    }, [reload])

    const getProducts = () => {
        fetch("/api/product", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setProducts(data))
    }

    const sendProduct = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("name", productName)
        formData.append("product_image", productImage[0])

        fetch("/api/product", {
            method: "POST",
            body: formData

        })
            .then(res => res.status)
            .then(status => {
                return setReload(reload => reload + 1)
            })
    }

    const deleteProduct = id => {
        if (window.confirm("Do you know what you are doing?"))
            fetch("/api/product", {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    user: "Kevin"
                })
            })
                .then(res => res.status)
                .then(status => {
                    setProducts(products => products.filter(p => p._id != id))
                    return setReload(reload => reload + 1)
                })
    }

    return (
        <div className="container">
            <form className="product-form" onSubmit={(e) => { sendProduct(e) }}>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Product Name</label>
                    <input className="form-control" type="text" name="name" value={productName} onChange={(e) => setProductName(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Product Image</label>
                    <input className="form-control" type="file" name="product_image" onChange={(e) => setProductImage(e.target.files)}></input>
                </div>
                <input type="hidden" value="Kevin" name="user"></input>
                <button className="btn btn-success" type="submit">Send</button>
            </form>

            <div className="row products">
                {products.map(p => {
                    return (
                        <div className="col-md-3">
                            <div className="m-2">
                                <a id={p._id} onClick={() => deleteProduct(p._id)} className="btn btn-danger position-absolute"><i className="fa fa-close"></i></a>
                                <img className="w-100" src={p.img_path} />
                                <h3>{p.name}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Products