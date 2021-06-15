const books = require("../../test/fixtures/books.fixture");
const accounts = require("../../test/fixtures/accounts.fixture");
const authors = require("../../test/fixtures/authors.fixture");

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
  let countObject = books.reduce((object, book) => {
    let bookGenre = book.genre;
    object[bookGenre] ? object[bookGenre]++ : (object[bookGenre] = 1);
    return object;
  }, {});

  // Reformat countObject to array of Objects
  let allGenres = [];

  for (let genre in countObject) {
    let count = countObject[genre];
    allGenres.push({
      name: genre,
      count: count,
    });
  }

  // Sort in Descending Order
  let allGenresSorted = allGenres.sort((genre1, genre2) => {
    return genre1.count < genre2.count ? 1 : -1;
  });

  // Return top 5
  return allGenresSorted.slice(0, 5);
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
  let countObject = books.reduce((object, book) => {
    let authorId = book.authorId;
    let borrowCount = book.borrows.length;
    object[authorId]
      ? (object[authorId] += borrowCount)
      : (object[authorId] = borrowCount);
    return object;
  }, {});

  let borrowsByAuthor = [];

  for (let entry in countObject) {
    const author = authors.find((author) => String(author.id) === entry);
    borrowsByAuthor.push({
      name: `${author.name.first} ${author.name.last}`,
      count: countObject[entry],
    });
  }

  borrowsByAuthor.sort((author1, author2) => {
    return author1.count < author2.count ? 1:-1;
  })
  return borrowsByAuthor.slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
