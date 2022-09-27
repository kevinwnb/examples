import $ from "jquery"
const send = (className) => {
    return $(className).animate({ left: "+=80px", opacity: 0 }, 200, function () {
        $(this).animate({ left: "-=80px" }, 0, function () {
            setTimeout(function () {
                $(className).animate({ opacity: 1 }, 500, function () {
                    setReload(reload => reload + 1)
                })
            }, 700)
        })
    })
}

export default send