/** SimpleIDB **/
SimpleIDB = {
    initialize() {
        return new Promise((resolve, reject) => {
            let request = indexedDB.open('myDatabase')
            request.onupgradeneeded = function () {
                request.result.createObjectStore('myStore')
                resolve()
            }
            request.onerror = function () {
                reject(request.error)
            }
        })
    },

    get(key) {
        return new Promise((resolve, reject) => {
            let oRequest = indexedDB.open('myDatabase')
            oRequest.onsuccess = function () {
                let db = oRequest.result
                let tx = db.transaction('myStore', 'readonly')
                let st = tx.objectStore('myStore')
                let gRequest = st.get(key)
                gRequest.onsuccess = function () {
                    resolve(gRequest.result)
                }
                gRequest.onerror = function () {
                    reject(gRequest.error)
                }
            }
            oRequest.onerror = function () {
                reject(oRequest.error)
            }
        })
    },

    set(key, value) {
        return new Promise((resolve, reject) => {
            let oRequest = indexedDB.open('myDatabase')
            oRequest.onsuccess = function () {
                let db = oRequest.result
                let tx = db.transaction('myStore', 'readwrite')
                let st = tx.objectStore('myStore')
                let sRequest = st.put(value, key)
                sRequest.onsuccess = function () {
                    resolve()
                }
                sRequest.onerror = function () {
                    reject(sRequest.error)
                }
            }
            oRequest.onerror = function () {
                reject(oRequest.error)
            }
        })
    },

    remove(key) {
        return new Promise((resolve, reject) => {
            let oRequest = indexedDB.open('myDatabase')
            oRequest.onsuccess = function () {
                let db = oRequest.result
                let tx = db.transaction('myStore', 'readwrite')
                let st = tx.objectStore('myStore')
                let rRequest = st.delete(key)
                rRequest.onsuccess = function () {
                    resolve()
                }
                rRequest.onerror = function () {
                    reject(rRequest.error)
                }
            }
            oRequest.onerror = function () {
                reject(oRequest.error)
            }
        })
    },

    delete(){
        return new Promise((resolve, reject) => {
            let dRequest = indexedDB.deleteDatabase('myDatabase')
            dRequest.onerror = function () {
                reject(dRequest.error)
            };
        })
    }
};

// ##########################
// functions

const saveLocally = () => {
    SimpleIDB.set(TEMP.meta.title, TEMP)
        .then(() => {
            toast.log('SAVED LOCALLY');
            if (!(INDEX.data.includes(TEMP.meta.title))){
                INDEX.data.push(TEMP.meta.title);
                SimpleIDB.set('index', INDEX)
                    .then(() => toast.log('INDEX SAVED'))
                    .catch(e =>  toast.log('SAVE ERROR ' + e));
            };
        }).catch(e => {
            toast.log('SAVE ERROR ' + e);
        });
};


const lister = document.querySelector('.lister');

const loadIndex = () => {
    SimpleIDB.get('index')
        .then(r => {
            if (r){
                INDEX = r;
                INDEX.data.forEach(name => {
                    let span = document.createElement('span');
                    span.setAttribute('onclick', `openPt("${name}")`);
                    span.innerHTML = `${name}<button onclick="removePt(${name})">🧺</button>`;
                    lister.appendChild(span);
                });
            } else {
                INDEX = { "data": [] };
                let span = document.createElement('span');
                span.setAttribute('onclick', `newPt()`);
                span.innerHTML = `No Saved PresenTations`;
                lister.appendChild(span);
            };
        }).catch(e => {
            toast.log(e)
        });
};

window.onload = () => {
    SimpleIDB.initialize()
        .then(r => {
            toast.log(r);
        }).catch(e => {
            toast.log(e);
        });
    loadIndex();
};



const openPt = (name) => {
    SimpleIDB.get(name)
        .then(r => {
            TEMP = r;
            renderShits();
        }).catch(e => {
            toast.log(e)
        });
};

const removePt = (name) => {
    SimpleIDB.remove(name)
        .then(r => {
            toast.log(r);
            if (INDEX.data.includes(TEMP.meta.title)){
                INDEX.data.splice(INDEX.data.indexOf(TEMP.meta.title), 1);
                SimpleIDB.set('index', INDEX)
                    .then(() => toast.log('INDEX SAVED'))
                    .catch(e => toast.log('ERROR ON INDEXING ' + e));
            };
        }).catch(e => {
            toast.log(e)
        });
}

const newPt = () => {
    let title = window.prompt('[ TITLE NOT CONTAINING BLANK SAPCES ]');
    if (!title) return;
    TEMP = {
        "meta": {
            "title": title,
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
    saveLocally();
    renderShits();
    loadIndex();
};
