using System.ComponentModel.DataAnnotations;

namespace BookWorm.Models
{
    [TypewriterEnabled]
    public class Publisher
    {
        public Publisher(string name)
        {
            Name = name;
        }

        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
