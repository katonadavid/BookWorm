using BookWorm.Enums;
using System.ComponentModel.DataAnnotations;

namespace BookWorm.Models
{
    [TypewriterEnabled]
    public abstract class Publication
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Title { get; set; }
        
        [Required]
        public PublicationType PublicationType { get; set; }
        
        [Required]
        public Language Language { get; set; }
        
        [Required]
        public Publisher Publisher { get; set; }
        
        [Required]
        public int PublicationYear { get; set; }

        public string ImageLink { get; set; }

        public ICollection<Creator> Creators { get; set; }
    }
}
