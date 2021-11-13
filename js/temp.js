const previw_panel = document.querySelector('.previw_panel');
const welcome_panel = document.querySelector('.welcome');

let EDITABLES;
let CURRENT_PAGE = document.querySelector('.page');

let TEMP = {};
// {
//     "meta": {
//         "title": "trial",
//         "total_pages": 2,
//         "engine_version": 1,
//     },
//     "data": [
//         {
//             "title": "Welcome",
//             "ul": [
//                 "Tap to edit any text"
//             ]
//         },
//         {
//             "title": "Page two",
//             "ul": [
//                 "Welcome again"
//             ]
//         },
//     ]
// }
let INDEX = {};
// {
//     "data": []
// }