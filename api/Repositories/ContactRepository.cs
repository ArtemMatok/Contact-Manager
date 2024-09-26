using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace api.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private readonly ApplicationDbContext _context;

        public ContactRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> DeleteContact(int contactId)
        {
           var contact = await _context.Contacts.FirstOrDefaultAsync(x=>x.ContactId == contactId);
            if(contact is null)
            {
                return false;
            }

            _context.Contacts.Remove(contact);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<Contact>?> GetContacts()
        {
            return await _context.Contacts.ToListAsync();
        }

        public async Task<Contact?> UpdateContact(int contactId, Contact updateContact)
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync(x => x.ContactId == contactId);
            if(contact is null)
            {
                return null;
            }

            contact.Name = updateContact.Name;
            contact.DateOfBirth = updateContact.DateOfBirth;
            contact.Phone = updateContact.Phone;    
            contact.Salary = updateContact.Salary;  
            contact.Married = updateContact.Married;

            _context.Contacts.Update(contact);
            await _context.SaveChangesAsync();

            return contact; 

        }

        public async Task<List<Contact>?> UploadCSV(IFormFile file)
        { 
            var csvData = new List<Contact>();
          
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                bool isFirstLine = true;
               
                while(!reader.EndOfStream)
                {
                    var line = await reader.ReadLineAsync();
                    if (isFirstLine)
                    {
                        isFirstLine = false;
                        continue;
                    }

                    var values = line.Split(",");

                    var contact = new Contact()
                    {
                        Name = values[0],
                        DateOfBirth = DateOnly.Parse(values[1], new CultureInfo("en-US")),
                        Married = bool.Parse(values[2]),
                        Phone = values[3],
                        Salary = decimal.Parse(values[4]),
                    };

                    if(contact is null)
                    {
                        return null;
                    }

                    csvData.Add(contact);
                }

                await _context.Contacts.AddRangeAsync(csvData);
                await _context.SaveChangesAsync();
            }

            return csvData;    
        }
    }
}
