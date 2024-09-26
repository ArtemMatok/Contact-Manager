using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Contact
    {
        [Key]
        public int ContactId { get; set; }
        [Required(ErrorMessage ="Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "DateOfBirth is required")]
        public DateOnly DateOfBirth { get; set; }

        [Required(ErrorMessage = "Married is required")]
        public bool Married { get; set; }

        [Required(ErrorMessage = "Phone is required")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Salary is required")]
        public decimal Salary { get; set; }
    }
}
