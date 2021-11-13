const bindListeners = () => {

    EDITABLES.forEach(el => {
        
        el.addEventListener('keydown', (e) => {

            // console.log(e.key)

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
                
                el.addEventListener('input', () => {
                    let page_index = 0;
                    switch(el.tagName){
                        case "H2":
                            page_index = parseInt(el.parentElement.parentElement.getAttribute('id'));
                            TEMP.data[page_index].title = el.innerText;
                        break;
                        case "LI":
                            page_index = parseInt(el.parentElement.parentElement.parentElement.getAttribute('id'));
                            let li_index = parseInt(el.getAttribute('data-index'));
                            TEMP.data[page_index].ul[li_index] = el.innerText;
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
    
};