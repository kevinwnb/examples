


function Downloads(props) {
    props.setActiveLink("downloads")

    let resources = [
        { id: 1, name: "Resource 1" },
        { id: 2, name: "Resource 2", restricted: true },
        { id: 3, name: "Resource 3" }
    ]

    const handleDownload = (id) => {
        alert("Downloading " + resources.find(r => r.id == id).name)
    }

    return (
        <div className="container">
            <h2 className="mb-5 text-center">Downloads</h2>
            <div className="downloads">
                {resources.map(r =>
                    <div id={r.id} style={{ backgroundColor: r.restricted && !props.token ? "#3c3c3c" : "#4d4d4d" }}>
                        <h1>{r.name}</h1>
                        {r.restricted && !props.token && <i className="fa fa-lock"></i>}
                        {(!r.restricted || (r.restricted && props.token)) && <button className="btn btn-success" onClick={() => handleDownload(r.id)}>Download</button>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Downloads