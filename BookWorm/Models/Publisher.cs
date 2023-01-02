namespace BookWorm.Models
{
    [TypewriterEnabled]
    public class Publisher
    {
        public Publisher(string name)
        {
            Name = name;
        }

        public int Id { get; set; }
        public string Name { get; set; }
    }
}
