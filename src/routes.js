const {  addBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookById, getBookName } = require('./handler')
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
        
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler,
        
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByIdHandler,
        
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookByIdHandler,
        
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookById,
        
    },
    
]
module.exports = routes;