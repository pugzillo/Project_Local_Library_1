function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let returnedBooks = [];
  let unreturnedBooks = [];

  for (let book in books) {
    let borrowTransactions = books[book].borrows;
    let returnStatus = borrowTransactions[0].returned; // Latest return status

    if (returnStatus) {
      returnedBooks.push(books[book]);
    } else {
      unreturnedBooks.push(books[book]);
    }
  }

  return [unreturnedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  let borrowers = [];
  let borrowTransactions = book.borrows;

  for (let transaction of borrowTransactions) {
    borrowers.push({
      ...transaction,
      ...accounts.find((account) => account.id === transaction.id),
    });
  }
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
