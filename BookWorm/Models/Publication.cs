using BookWorm.Enums;

namespace BookWorm.Models
{
    public class Publication
    {
        public int Id { get; set; }
        public string ISBN { get; set; }
        public string Title { get; set; }
        public PublicationType PublicationType { get; set; }
        public int PageCount { get; set; }
        public Author Author { get; set; }
        public Language Language { get; set; }
        public Publisher Publisher { get; set; }
        public DateTime PublicationDate { get; set; }

    }
}
