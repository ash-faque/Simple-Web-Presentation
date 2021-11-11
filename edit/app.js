// main thread
// new page
const addNewPage = () => {
    TEMP.data.push({
        "title": "Title",
        "ul": [
            "add your points here", "and may be here"
        ]
    });
    TEMP.meta.total_pages ++
    renderShits();
    bindListeners();
};

// new li
const addNewLi = (trigger) => {
    let li = document.createElement('li');
    li.setAttribute('contenteditable', 'true');
    li.setAttribute('data-index', (trigger.parentElement.previousElementSibling.children.length));
    li.innerHTML = `<span class="li_kill" onclick="removeLi(this)">X</span>Edit here`;
    trigger.parentElement.previousElementSibling.appendChild(li);
};

// remove page
const removePage = (trigger) => {
    let page_index = parseInt(trigger.parentElement.parentElement.getAttribute('id'));
    console.log(page_index)
    TEMP.data.splice(page_index, 1);

    renderShits();
    bindListeners();
};

// remove li
const removeLi = (trigger) => {
    let page_index = parseInt(trigger.parentElement.parentElement.parentElement.parentElement.getAttribute('id'));
    let li_index = parseInt(trigger.parentElement.getAttribute('data-index'));

    TEMP.data[page_index].ul.splice(li_index, 1);

    renderShits();
    bindListeners();
};

// slideShowModeStart
const startSlideShow = (trigger) => {
    trigger.parentElement.style.display = 'none';
    trigger.parentElement.nextElementSibling.style.display = 'flex';
    Array.from(document.querySelectorAll('.li_kill')).forEach(killer => {
        killer.style.display = 'none';
    });
};

// slideShowModeEnd
const endSlideShow = (trigger) => {
    trigger.parentElement.style.display = 'none';
    trigger.parentElement.previousElementSibling.style.display = 'flex';
    Array.from(document.querySelectorAll('.li_kill')).forEach(killer => {
        killer.style.display = 'inline';
    });
};