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

    // Sorts books based on return status
    returnStatus
      ? returnedBooks.push(books[book])
      : unreturnedBooks.push(books[book]);
  }

  return [unreturnedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  let borrowTransactions = book.borrows;

  let borrowers = borrowTransactions.map((transaction) => {
    return {
      ...transaction,
      ...accounts.find((account) => account.id === transaction.id), // finds account info on author id of focus
    };
  });
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
