import { useState } from "react"
import { Navigate } from "react-router-dom"


const Login = (props) => {

    const [email, setEmail] = useState("kevinwnb@gmail.com")
    const [password, setPassword] = useState("kikoblu")
    const [err, setErr] = useState("")

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

                return { error: true, msg: "Invalid Credentials" }
            })
            .then(data => {
                if (data.error)
                    return setErr(data.msg)

                props.setToken(data.token)
                window.location.href = "/"
            })
            .catch(err => setErr("An error ocurred, try again"))
    }

    return (
        <>
            {props.token ? <Navigate to="/" /> : <form className="login" onSubmit={e => login(e)}>
                <div>
                    {err && <p className="alert alert-danger">{err}</p>}
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