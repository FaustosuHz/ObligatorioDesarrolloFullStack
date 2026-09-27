let listaLibros = [
    {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    },
    {
        "userId": 1,
        "id": 2,
        "title": "quis ut nam facilis et officia qui",
        "completed": false
    },
    {
        "userId": 1,
        "id": 3,
        "title": "fugiat veniam minus",
        "completed": false
    },
    {
        "userId": 1,
        "id": 4,
        "title": "et porro tempora",
        "completed": true
    }
]


export const getLibrosByUser = (userId) => {
    const idNumerico = Number(userId);
    const librosDelUsuario = listaLibros.filter((libro) => libro.userId === idNumerico);
    return librosDelUsuario;
}


export const getLibros = () => {
    return listaLibros;
}

//devuelve un libro por el id
export const getLibroById = (id) => {
    return listaLibros.find(l => l.id == id);
}

//en el data recibe los datos del objeto excepto el id
export const createLibro = (data) => {
    const ultimoLibro = listaLibros[listaLibros.length - 1];
    const id = ultimoLibro.id + 1;
    const libroNuevo = { ...data, id };
    listaLibros.push(libroNuevo);
    return libroNuevo;
}

//actualiza uno o mas campos del libro
//en caso de no venir un dato de reemplazo se toma
//como que no se modifica el mismo
export const updateLibro = (id, data) => {
    const libroActual = listaLibros.at(id);
    Object.assign(libroActual, data);
    return libroActual;
}

//reemplaza un libro por los datos que vienen
//del nuevo libro, en caso de no venir un campo
//se considera eliminado
export const replaceLibro = (id, data) => {

    //verifico si el libro existe 
    // si no existe lo creo 
    //si existe lo sobreescribimos
    const auxIndice = listaLibros.findIndex(l => l.id == id);
    const encontro = auxIndice != -1;
    const libroReemplazado = { ...data, id }

    if (encontro) {
        listaLibros[auxIndice] = libroReemplazado;
    } else {
        listaLibros.push(libroReemplazado);
    }

    return libroReemplazado;
}

export const deleteLibro = (id) => {
    const resultadoDeEliminacion = listaLibros.filter(l => l.id != id);
    listaLibros = resultadoDeEliminacion;
    //si se quiere retornar se hace return listaLibros
}