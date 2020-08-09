using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeVault.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(25)")]
        public string Username { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(25)")]
        public string Password { get; set; }
    }
}
