using BookWorm.DataAccess.DTOs;
using BookWorm.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookWorm.DataAccess
{
    public interface IPublicationRepository
    {
        Task<PublicationTableResponseDTO> GetPublications(PublicationTableRequestDTO request);
        Task<Publication> GetPublication(int publicationId);
        Task<Publication> AddPublication(Publication publication);
        Task<Publication> UpdatePublication(Publication publication);
        Task DeletePublications(List<Guid> publicationIds);
    }
}
