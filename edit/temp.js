const previw_panel = document.querySelector('.previw_panel');

let EDITABLES;
let CURRENT_PAGE;


// temporery store
const TEMP = {
    "meta": {
        "title": "trial",
        "auther": "tester",
        "total_pages": 2,
        "engine_version": 1,
    },
    "data": [
        {
            "title": "Welcome",
            "ul": [
                "Tap to edit any text"
            ]
        },
        {
            "title": "Page two",
            "ul": [
                "Welcome again"
            ]
        },
    ]
};