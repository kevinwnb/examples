import { useState } from "react"
import { Navigate } from "react-router-dom"


const Login = (props) => {

    const [email, setEmail] = useState("kevinwnb@gmail.com")
    const [password, setPassword] = useState("kikoblu")

    const login = (e) => {
        e.preventDefault()
        fetch("/api/user/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(res => {
                if (res.status == 200)
                    return res.json()

                throw Error("Invalid Credentials")
            })
            .then(data => {
                if (typeof data.token === "string") {
                    props.setToken(data.token)
                    window.location.href = "/"
                }

                throw Error("Invalid Credentials")
            })
            .catch(err => props.setError(err.message))
    }

    return (
        <>
            {props.token ? <Navigate to="/" /> : <form className="login" onSubmit={e => login(e)}>
                <div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input id="email" name="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input id="password" name="password" className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <button type="submit" className="btn btn-success" disabled={!email || !password}>Login</button>
                </div>
            </form>}
        </>
    )
}

export default Login