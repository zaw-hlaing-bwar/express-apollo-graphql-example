let bookData = require('./data.json');

module.exports = {
    //update book function
    updateBookTitle : (source, {id, title}) => {
        bookData.map(book => {
            if (book.id === id) {
                book.title = title;
                return book;
            }
        });
    return bookData.filter(book => book.id === id)[0];
    },

    loginUser : (source, {username, password}) => {
        console.log(username, password);
        return {
            name: "test",
            phone: "test",
            email: "test@gmail.com"
        };
    }
};