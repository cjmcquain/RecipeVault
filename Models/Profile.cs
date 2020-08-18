using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeVault.Models
{
    public class Profile
    {
        [Key]
        public int ProfileID { get; set; }

        [ForeignKey("User")]
        [Column(TypeName = "int")]
        public int UserID { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string FirstName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string LastName { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string ProfilePictureURL { get; set; }
    }
}
