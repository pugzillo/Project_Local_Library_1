const books = require("../../test/fixtures/books.fixture");
const accounts = require("../../test/fixtures/accounts.fixture");
const authors = require("../../test/fixtures/authors.fixture");

// Returns the top five
function returnTopFive(array) {
  // Sort in Descending Order
  let sorted = array.sort((value1, value2) => {
    return value1.count < value2.count ? 1 : -1;
  });

  // Return top 5
  return sorted.slice(0, 5);
}

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => book.borrows[0].returned === false).length;
}

// Prioritize in refactoring
function getMostCommonGenres(books) {
  // Object that has genre as key and count of books as value
  let countByBookGenre = books.reduce((object, book) => {
    let bookGenre = book.genre;
    object[bookGenre] ? object[bookGenre]++ : (object[bookGenre] = 1);
    return object;
  }, {});

  // Reformat countByBookGenre to array of Objects
  const allGenres = Object.keys(countByBookGenre).map((bookGenre) => ({
    name: bookGenre,
    count: countByBookGenre[bookGenre],
  }));

  return returnTopFive(allGenres);
}

function getMostPopularBooks(books) {
  let borrowCounts = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
  borrowCounts.sort((book1, book2) => {
    return book1.count < book2.count ? 1 : -1;
  });
  return borrowCounts.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let countByAuthor = books.reduce((object, book) => {
    let authorId = book.authorId;
    let borrowCount = book.borrows.length;
    if (!object[authorId]) {
      object[authorId] = 0;
    }
    object[authorId] += borrowCount;

    return object;
  }, {});

  const borrowsByAuthor = Object.keys(countByAuthor).map((authorID) => {
    const author = authors.find((author) => String(author.id) === authorID);
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: countByAuthor[authorID],
    };
  });

  return returnTopFive(borrowsByAuthor);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
