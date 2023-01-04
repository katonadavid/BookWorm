using BookWorm.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookWorm.DataAccess
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetBooks();
        Task<Book> GetBook();
        Task<Book> AddBook(Book book);
        Task<Book> UpdateBook(Book book);
        Task DeleteBooks(List<int> bookIds);

    }
}
