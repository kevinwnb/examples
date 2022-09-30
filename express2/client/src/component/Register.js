import { useState } from "react"


const Register = (props) => {

    props.setActiveLink("register")

    const [profileImage, setProfileImage] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const register = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("profile_image", profileImage[0])
        formData.append("first_name", firstName)
        formData.append("last_name", lastName)
        formData.append("email", email)
        formData.append("password", password)
        fetch("/api/user", {
            method: "POST",
            body: formData
        })
            .then(res => res.status)
            .then(s => {
                console.log(s)
                window.location.href = "/login"
            })
    }

    return (
        <form className="register" onSubmit={e => register(e)}>
            <div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="profile_image">Profile Image</label>
                    <input name="profile_image" className="form-control" type="file" onChange={e => setProfileImage(e.target.files)}></input>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="first_name">First Name</label>
                    <input name="first_name" className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="last_name">Last Name</label>
                    <input name="last_name" className="form-control" value={lastName} onChange={e => setLastName(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input name="email" className="form-control" type="email" value={email} onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input name="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                <button type="submit" className="btn btn-success">Register</button>
            </div>
        </form>
    )
}

export default Register