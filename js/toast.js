const toaster = document.querySelector('.toast');


const toast = {
    log(msg){
        let p = document.createElement('p');
        p.innerText = msg;
        toaster.appendChild(p);
        setTimeout(() => {
            p.remove();
        }, 1500);
    },
    
};