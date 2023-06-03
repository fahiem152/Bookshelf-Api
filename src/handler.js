const {
    nanoid
} = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    const id = nanoid(16);
    const finished = pageCount === readPage;
    // const finished = pageCount === readPage ? true : false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    if (!name) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        });
        response.statusCode = 400;
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.statusCode = 400;
        return response;
    }

    const newBook = {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        id,
        finished,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: "fail",
        message: `Gagal menambahkan buku`,
    });
    response.code(500);
    return response;

};
const getAllBookHandler = (request, h) => {
    const { name, reading, finished } = request.query;
    var booksFilter = books;
    if (name !== undefined) {
        bookFilter = booksFilter.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
        booksFilter = bookFilter;
        return {
            status: 'success',
            data: {
                books: booksFilter.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher

                }))
            }
        }
    }
    if (reading !== undefined) {
        bookFilter = booksFilter.filter((book) => book.reading == reading);
        booksFilter = bookFilter;
        return {
            status: 'success',
            data: {
                books: booksFilter.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                    
                }))
            }
        }
    }
    if (finished !== undefined) {
        bookFilter = booksFilter.filter((book) => book.finished == finished);
        booksFilter = bookFilter;
        return {
            status: 'success',
            data: {
                books: booksFilter.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                    
                }))
            }
        }
    }
    const response = h.response({
        status: 'success',
        data: {
            books: booksFilter.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher
            }))
        }

    // data: {
    //     books: books.map((book) => ({
    //         id: book.id,
    //         name: book.name,
    //         publisher: book.publisher
    //     }))
    // }
    })
    response.statusCode=200;
    return response;
    // status: 'success',
    // data: {
    //     books: books.map((book) => ({
    //         id: book.id,
    //         name: book.name,
    //         publisher: book.publisher
    //     }))
    // }
};
const getBookByIdHandler = (request, h) => {
    const {
        id
    } = request.params;
    const book = books.filter((n) => n.id === id)[0];
    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book
            }
        }
    }
    const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan"
    })
    response.statusCode = 404;
    return response;
};
const editBookByIdHandler = (request, h) => {
    const {
        id
    } = request.params;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
        if (!name) {
            const response = h.response({
                status: "fail",
                message: "Gagal memperbarui buku. Mohon isi nama buku",
            });
            response.statusCode = 400;
            return response;
        }
        if (readPage > pageCount) {
            const response = h.response({
                status: "fail",
                message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
            });
            response.statusCode = 400;
            return response;
        }

        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt
        }
        const response = h.response({
            status: "success",
            message: "Buku berhasil diperbarui",
        });
        response.statusCode = 200;
        return response;
    }
    const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.statusCode = 404;
    return response;
}
const deleteBookById = (request, h) => {
    const {
        id
    } = request.params;
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus"
        })
        response.statusCode = 200;
        return response;
    }
    const response = h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan"
    })
    response.statusCode = 404;
    return response;
}

// const getBookName = (request, h) => {
//     const {
//         name
//     } = request.query;
//     const book = books.filter((n) => n.name.toLowerCase() === name.toLowerCase())[0];
//     if (book !== undefined) {
//         return {
//             status: 'success',
//             data: {
//                 book
//             }
//         }
//     }
//     const response = h.response({
//         status: "fail",
//         message: "Buku tidak ditemukan"
//     })
//     response.statusCode = 404;
//     return response;
// }
module.exports = {
    addBookHandler,
    getAllBookHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookById,

};