const books = require("../../test/fixtures/books.fixture");
const accounts = require("../../test/fixtures/accounts.fixture");
const authors = require("../../test/fixtures/authors.fixture");

function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => {
    var nameA = a.name.last.toUpperCase();
    var nameB = b.name.last.toUpperCase();
    return nameA > nameB ? 1 : -1;
  });
}

function getTotalNumberOfBorrows(account, books) {
  // Array of all borrow transactions
  let borrowTransactions = books.reduce(
    (acc, book) => [...acc, ...book.borrows],
    []
  );
  // Extract the Account IDs from all burrow transactions
  let burrowingAccounts = borrowTransactions.map((borrow) => borrow.id);
  // Filter to account IDs of focus and count transactions
  return burrowingAccounts.filter((id) => id === account.id).length;
}

// Prioritize for refactoring
function getBooksPossessedByAccount(account, books, authors) {
  let booksPossessedByAccount = [];

  for (let book in books) {
    let borrowTransactions = books[book].borrows;
    for (let transaction in borrowTransactions) {
      let borrowTransaction = borrowTransactions[transaction];
      // Check if account has borrowed book and has not returned it (currently possessed)
      if (
        borrowTransaction.id === account.id &&
        borrowTransaction.returned === false
      ) {
        // embed author object inside of book object
        books[book].author = authors.find(
          (author) => author.id === books[book].authorId
        );
        booksPossessedByAccount.push(books[book]);
      }
    }
  }
  return booksPossessedByAccount;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
