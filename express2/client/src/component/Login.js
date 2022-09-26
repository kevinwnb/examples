import { useState } from "react"
import {Navigate} from "react-router-dom"


const Login = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = (e) => {
        e.preventDefault()
        fetch("/api/user/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(res => res.json())
            .then(data => {
                props.token[1](data.token)
                window.location.href = "/"
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {props.token[0] ? <Navigate to="/" /> : <form className="login" onSubmit={e => login(e)}>
                <div>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email</label>
                        <input id="email" name="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input id="password" name="password" className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <button type="submit" className="btn btn-success" disabled={!email || !password}>Login</button>
                </div>
            </form>}
        </>
    )
}

export default Login