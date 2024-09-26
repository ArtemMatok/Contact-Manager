using api.Models;

namespace api.Interfaces
{
    public interface IContactRepository
    {
        Task<List<Contact>?> UploadCSV(IFormFile file);
        Task<List<Contact>?> GetContacts();
        Task<Contact?> UpdateContact(int contactId, Contact updateContact);
        Task<bool> DeleteContact(int contactId);
    }
}
