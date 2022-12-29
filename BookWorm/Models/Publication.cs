using BookWorm.Enums;

namespace BookWorm.Models
{
    public class Publication
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public PublicationType PublicationType { get; set; }
        public Creator Creator { get; set; }
        public Language Language { get; set; }
        public Publisher Publisher { get; set; }
        public DateTime PublicationDate { get; set; }

    }
}
