using BookWorm.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookWorm.Controllers
{
    public class BookController : Controller
    {
        private readonly BookWormContext _context;

        public BookController(BookWormContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SaveBooks([FromBody] List<Book> books)
        {
            this._context.Book.AddRangeAsync(books);
            return Ok();
        }
    }
}
