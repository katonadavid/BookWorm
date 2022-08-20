using BookWorm.Enums;

namespace BookWorm.Models
{
    public class Author
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public Nationality Nationality { get; set; }
    }
}
