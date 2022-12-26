namespace BookWorm.Models
{
    public class Book : Publication
    {
        public string ISBN { get; set; }
        public int PageCount { get; set; }
    }
}
