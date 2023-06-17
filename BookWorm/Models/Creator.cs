using BookWorm.Enums;
using System.ComponentModel.DataAnnotations;

namespace BookWorm.Models
{
    [TypewriterEnabled]
    public class Creator
    {
        public Guid Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        [Required]
        public string LastName { get; set; }
        public Nationality Nationality { get; set; }
        public ICollection<Publication> Publications { get; set; }
    }
}
