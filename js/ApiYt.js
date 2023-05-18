// DEFINIMOS QUE EN BOTON BUSCAR SE EJECUTA LA FUNCION "youtube"
const btnBuscar = document.querySelector('#buscar');

// EXTRAEMOS EL ID DEL VIDEO PARA EXTRAER TODOS LOS DATOS NECESARIOS
btnBuscar.addEventListener("click", extraerId);
function extraerId() {
    let buscaVideo = ((document.querySelector("#buscaryt").value).split(' ')).join("%20");
    console.log(buscaVideo);
    async function youtube(buscaVideo) {
        let url = `https://youtube138.p.rapidapi.com/search/?q=${buscaVideo}&hl=en&gl=US`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '67bde9beb7mshdfbdc0547b9c306p1a0d2ejsne9ee7ec5082e',
                'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            let idVideo = result.contents[0].video.videoId;
            let idLogo = result.contents[0].video.author.avatar[0].url;
            let idNombre = result.contents[0].video.author.title;
            let idTitulo = result.contents[0].video.title;
            let videoRel1 = result.contents[1].video.videoId;
            let videoRel2 = result.contents[2].video.videoId;
            let videoRel3 = result.contents[3].video.videoId;
            crearVideo(idVideo);
            crearLogo(idLogo);
            crearNombre(idNombre);
            crearTitulo(idTitulo);
            crearVideoRel(videoRel1, videoRel2, videoRel3);
            comentarios(idVideo);
            descripcion(idVideo);
            console.log("dieguito")
        } catch (error) {
            console.error(error);
        }
    };
    youtube(buscaVideo);
    async function comentarios(idVideo) {
        let url2 = `https://youtube138.p.rapidapi.com/video/comments/?id=${idVideo}&gl=US`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '67bde9beb7mshdfbdc0547b9c306p1a0d2ejsne9ee7ec5082e',
                'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url2, options);
            const result = await response.json();
            let idComent1 = result.comments[0].content;
            let idComent2 = result.comments[1].content;
            let idComent3 = result.comments[2].content;
            let idComent4 = result.comments[3].content;
            let idComent5 = result.comments[4].content;
            crearComentario(idComent1, idComent2, idComent3, idComent4, idComent5)
        } catch (error) {
            console.error(error);
        }
    };

    async function descripcion(idVideo) {
        let url3 = `https://youtube138.p.rapidapi.com/video/details/?id=${idVideo}&hl=en&gl=US`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '67bde9beb7mshdfbdc0547b9c306p1a0d2ejsne9ee7ec5082e',
                'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url3, options);
            const result = await response.json();
            let idDescripcion = result.description;
            crearDescripcion(idDescripcion);
        } catch (error) {
            console.error(error);
        }
    }
};


// CREAMOS CADA UNO DE LOS ELEMENTOS
function crearVideo(idVideo) {
    document.querySelector("#video").innerHTML = `<iframe width="100%" height="800px" src="https://www.youtube.com/embed/${idVideo}" 
    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
};

function crearLogo(idLogo) {
    document.querySelector("#logo").innerHTML = `<img src="${idLogo}" alt="" srcset="" id="imagenLogo">`
};

function crearNombre(idNombre) {
    document.querySelector("#nombreCanal").innerHTML = `<p id="nombre"><b>${idNombre}</b></p>`
};

function crearTitulo(idTitulo) {
    document.querySelector("#tituloVideo").innerHTML = `<p id="titulo">${idTitulo}</p>`
};

function crearVideoRel(videoRel1, videoRel2, videoRel3) {
    document.querySelector("#videoRelacionado1").innerHTML = `<iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoRel1}" 
    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    document.querySelector("#videoRelacionado2").innerHTML = `<iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoRel2}" 
    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    document.querySelector("#videoRelacionado3").innerHTML = `<iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoRel3}" 
    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
};

function crearComentario(idComent1, idComent2, idComent3, idComent4, idComent5) {
    document.querySelector("#comentarios").innerHTML = `                                
    <li>${idComent1}</li>
    <li>${idComent2}</li>
    <li>${idComent3}</li>
    <li>${idComent4}</li>
    <li>${idComent5}</li> `;
};

function crearDescripcion(idDescripcion) {
    document.querySelector("#descripcion").innerHTML = `<p>${idDescripcion}</p>`;
};