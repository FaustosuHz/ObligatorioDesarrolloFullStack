export const generarKeyRedisLibrosUserPaginado = (userId, pagina, limite) => {
    return `user:libros:${userId}:pagina:${pagina}:limite:${limite}`;
}