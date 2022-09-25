import { useState, useEffect } from "react"

function Products() {
    const [products, setProducts] = useState([])
    const [productName, setProductName] = useState("")
    const [productImage, setProductImage] = useState([])

    useEffect(() => {
        fetch("/api/product", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        console.log(productImage)
    }, [productImage])

    const sendProduct = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("name", productName)
        formData.append("product_image", productImage )
        console.log(formData)
        
        fetch("/api/product", {
            method: "POST",
            headers: {
                "content-type": "multipart/form-data"
            },
            body: formData

        })
            .then(res => res.status())
            .then(status => console.log(status))
    }

    return (
        <div>
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
                            <img className="w-100" src={p.img_path} />
                            <h3>{p.name}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Products