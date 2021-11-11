
let editables;

const previw_panel = document.querySelector('.previw_panel');
const anchor_panel = document.querySelector('.anchor_panel');


// rendering function
const renderShits = () => {

    previw_panel.innerHTML = "";
    anchor_panel.innerHTML = "";

    TEMP.data.forEach(page => {
        let index = TEMP.data.indexOf(page);
        let { title, ul } = page;
        let div = document.createElement('div');
        div.setAttribute('id', index.toString());
        div.classList.add('page');
        let divTxt = `<h2 contenteditable="true">${title}</h2>`;

        let ulContent = '';
        ul.forEach(liTxt => {
            ulContent += `<li contenteditable="true"
                        data-index="${ul.indexOf(liTxt)}">
                        <span class="li_kill" onclick="removeLi(this)">X</span>
                        ${liTxt}</li>`;
        });
        (divTxt += `<ul>${ulContent}</ul>`);
        div.innerHTML = `<div class="page_wrap">${divTxt}
                            <div class="em_controls">
                                <button onclick="removePage(this)"><span>Remove This Slide</span><p>🎁</p></button>
                                <button onclick="addNewLi(this)"><span>Add Another Point</span><p>🎁</p></button>
                                <button onclick="startSlideShow(this)"><span>Start Slide Show</span><p>🎁</p></button>
                            </div>
                            <div class="ss_controls">
                                <button onclick="endSlideShow(this)"><span>End Slide Show</span><p>🎀</p></button>
                            </div>
                        </div>`;
        previw_panel.appendChild(div);
        
        let a = document.createElement('a');
        a.href = `#${index}`;
        a.innerHTML = "<span>PAGE</span><span>" + (index + 1) + "</span>";
        anchor_panel.appendChild(a);

    });

    let div = document.createElement('div');
    div.setAttribute('id', "+");
    div.classList.add('page');
    div.innerHTML = `<div class="page_wrap">
                        <h2>add page</h2>
                        <ul>
                            <li>add a new page in here</li>
                            <li>to do that, just click on the below button</li>
                        </ul>
                        <p class="add_new_pg_btn" onclick="addNewPage()">+</p>
                    </div>`;
    previw_panel.appendChild(div);

    let a = document.createElement('a');
    a.href = `#+`;
    a.innerHTML = `<span>PAGE</span><span>+</span>`;
    anchor_panel.appendChild(a);


    editables = Array.from(document.querySelectorAll('[contenteditable="true"]'));
    bindListeners();
};


// render json
renderShits();

