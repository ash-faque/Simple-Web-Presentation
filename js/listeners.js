const bindListeners = () => {

    EDITABLES.forEach(el => {
        
        el.addEventListener('keydown', (e) => {
            
            if (e.key === 'Enter'){
                
                e.preventDefault();
                if (e.target.tagName === 'LI'){
                    let li = document.createElement('li');
                    li.setAttribute('contenteditable', 'true');
                    li.setAttribute('data-index', (e.target.parentElement.children.length));
                    e.target.parentElement.appendChild(li);
                };

            } else {

                if (e.key === 'Delete') el.innerText = '..';
                if ((e.key === 'Backspace') && (el.innerText.length === 1)) el.innerText = '..';

                el.addEventListener('input', () => {
                    switch(el.tagName){
                        case "H2":
                            TEMP.data[parseInt(CURRENT_PAGE.getAttribute('id'))].title = el.innerText;
                        break;
                        case "P":
                            let li_index = parseInt(el.parentElement.getAttribute('data-index'));
                            TEMP.data[parseInt(CURRENT_PAGE.getAttribute('id'))].ul[li_index] = el.innerText;
                        break;
                    };
                });

            };
    
        });

        // TODO drag reorder
        // if (el.tagName === 'LI'){
        //     el.addEventListener('mousedown', (e) => {
        //         // console.log(e);
        //     });
        // };

    });

    welcome_panel.style.display = 'none';
    
};