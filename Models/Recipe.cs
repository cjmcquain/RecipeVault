using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeVault.Models
{
    public class Recipe
    {
        [Key]
        public int RecipeID { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Title { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Ingredients { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(4000)")]
        public string Directions { get; set; }

        [Required]
        [ForeignKey("Category")]
        [Column(TypeName = "int")]
        public int CategoryId { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string PictureURL { get; set; }

        [Required]
        [Column(TypeName = "datetime")]
        public DateTime CreateDate { get; set; }

        [Required]
        [ForeignKey("User")]
        [Column(TypeName = "int")]
        public int UserID { get; set; }
    }
}
