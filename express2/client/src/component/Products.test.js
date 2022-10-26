import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {Products, } from "./Products"
const http = require("http")
const fs = require("fs")
const path = require("path")

const container = render(<Products setActiveLink={() => "products"} token="token" />)

test("Initial products retrieve", () => {
    expect(Object.keys(getApi("/api/product")).length).toBe(0)
})

test("Add product", () => {
    let formData = new FormData()
    formData.append("name", "a")
    formData.append("product_image", fs.readFileSync(path.resolve(__dirname, "compressed images", "black tshirt-min.jpeg")))
    
    let result = getApi("/api/product", { method: "POST", headers: { Authorization: "bearer pk_1234" }, body: formData })
    expect(Object.keys(result).length).toBeGreaterThan(0)
})

async function getApi(url, options = {}) {
    const result = await fetch(url, options)
    const data = await result.json()
    return data
}