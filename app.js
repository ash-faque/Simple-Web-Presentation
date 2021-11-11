const loadMyPresentations = () => {
    if (localStorage.ID !== ('' || null)){
        let ID = localStorage.ID;

        let data = {
            "hoo hooo": "http://kaki.com",
            "do this": "http://dady.com",
        }

        let swpts = document.getElementById('swpts');
        let keys = Object.keys(data);
        let innet_txt = '';
        keys.forEach(key => {
            let link = data[key];
            innet_txt += `<li><a href="${link}">${key}</a></li>`;
        });
        innet_txt += '<li><a href="/edit#new">create a new presentation</a></li>';
        swpts.innerHTML = innet_txt;
    };
};

window.onload = loadMyPresentations();