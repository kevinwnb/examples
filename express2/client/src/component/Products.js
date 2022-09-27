import { useState, useEffect } from "react"
import uuidv4 from "uuid"
import "font-awesome/css/font-awesome.min.css"
import $ from "jquery"

function Products(props) {
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
            headers: {
                "Authorization": "bearer " + props.token
            },
            body: formData

        })
            .then(res => res.status)
            .then(status => {
                if (status == 200)
                    setReload(reload => reload + 1)

                else
                    throw Error("Authorization token has expired, please log back in to continue")
            })
            .catch(err => props.setError(err.message))
    }

    const deleteProduct = id => {
        if (window.confirm("Do you know what you are doing?"))
            fetch("/api/product", {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "bearer " + props.token
                },
                body: JSON.stringify({
                    id: id,
                    user: "Kevin"
                })
            })
                .then(res => res.status)
                .then(status => {
                    if (status == 200)
                        return setReload(reload => reload + 1)

                    throw Error("Authorization token has expired, please log back in to continue")
                })
                .catch(err => props.setError(err.message))
    }

    return (
        <div className="container">
            {props.token ? <form className="add-product product-form" onSubmit={(e) => { sendProduct(e) }}>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Product Name</label>
                    <input className="form-control" type="text" name="name" value={productName} onChange={(e) => setProductName(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Product Image</label>
                    <input className="form-control" type="file" name="product_image" onChange={(e) => setProductImage(e.target.files)}></input>
                </div>
                <input type="hidden" value="Kevin" name="user"></input>
                <button className="btn btn-success" type="submit" disabled={!productName || !productImage || productImage.length == 0}>Send</button>
            </form> : <p className="alert alert-danger mx-auto my-5">Sign in to post a product</p>}

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