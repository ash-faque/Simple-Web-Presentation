// page operations
// ##################
// new page
const addNewPg = () => {
    TEMP.data.push({
        "title": "Title",
        "ul": [
            "add your points right here",
            "check the box to select"
        ]
    });
    TEMP.meta.total_pages++;
    console.log('ADDED NEW PAGE');
    renderShits();
    bindListeners();
};
// ##################
// remove page
const removePg = () => {
    if (TEMP.meta.total_pages > 1){
        let page_index = parseInt(CURRENT_PAGE.getAttribute('id'));
        TEMP.data.splice(page_index, 1);
        TEMP.meta.total_pages--;
        console.log('REMOVED PAGE');
        renderShits();
        bindListeners();
    };
};
// $$$$$$$$$$$$$$$$$$
// li operations
// // new li
// ##################
const addNewLi = () => {
    TEMP.data[CURRENT_PAGE.getAttribute('id')].ul.push('---');
    console.log('ADDED NEW POINT')
    renderShits();
    bindListeners();
};
// remove li
// ################
const removeLi = () => {
    Array.from(CURRENT_PAGE.querySelectorAll('input[type="checkbox"]'))
        .filter(checkbox => checkbox.checked)
        .forEach(input => {
            let li_index = parseInt(input.parentElement.getAttribute('data-index'));
            TEMP.data[CURRENT_PAGE.getAttribute('id')].ul.splice(li_index, 1);
            console.log('REMOVED POINT(S)');
        });
    renderShits();
    bindListeners();
};
// $$$$$$$$$$$$$$$$$$
// hud operations
// #################
const toggleHud = (btn) => {
    let other_contols = btn.parentElement.previousElementSibling;
    // console.log(other_contols)
    if ((getComputedStyle(other_contols).display) === 'block'){
        other_contols.style.display = 'none';
        Array.from(document.querySelectorAll('.li_kill')).forEach(li_k => li_k.style.display = 'none');
        Array.from(document.querySelectorAll('.page_cover')).forEach(cover => cover.style.display = 'block');
    } else {
        other_contols.style.display = 'block';
        Array.from(document.querySelectorAll('.li_kill')).forEach(li_k => li_k.style.display = 'inline');
        Array.from(document.querySelectorAll('.page_cover')).forEach(cover => cover.style.display = 'none');
    };
};