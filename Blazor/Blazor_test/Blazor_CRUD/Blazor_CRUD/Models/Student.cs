using System.ComponentModel.DataAnnotations;

namespace Blazor_CRUD.Models
{
    public class Student
    {

        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Range(18, 35)]
        public int Age { get; set; }

        public DateTime? Birthday { get; set; }
    }
}
