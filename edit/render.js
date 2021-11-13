// rendering function
const renderShits = () => {

    previw_panel.innerHTML = "";

    TEMP.data.forEach(page => {
        let index = TEMP.data.indexOf(page);

        let { title, ul } = page;

        let div = document.createElement('div');
        div.setAttribute('id', index.toString());
        div.classList.add('page');

        let divTxt = `<h4>PAGE ${index + 1} OF ${TEMP.meta.total_pages}</h4>
                    <h2 contenteditable="true">${title}</h2>`;

        let ulContent = '';
        ul.forEach(liTxt => {
            ulContent += `<li data-index="${ul.indexOf(liTxt)}">
                            <input type="checkbox" class="li_kill">
                            <p  contenteditable="true">${liTxt}</p>
                        </li>`;
        });

        (divTxt += `<ul>${ulContent}</ul>`);
        div.innerHTML = `<div class="page_cover"></div>
                        <div class="page_wrap">${divTxt}</div>`;

        previw_panel.appendChild(div);
    });

    EDITABLES = Array.from(document.querySelectorAll('[contenteditable="true"]'));

    Array.from(document.querySelectorAll('.page'))
        .forEach(pg => {
            observer.observe(pg);
        });

    bindListeners();
};

// render json
renderShits();