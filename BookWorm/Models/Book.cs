namespace BookWorm.Models
{
    [TypewriterEnabled]
    public class Book : Publication
    {
        public string ISBN { get; set; }
        public int PageCount { get; set; }
    }
}
