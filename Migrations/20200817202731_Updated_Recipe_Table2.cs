using Microsoft.EntityFrameworkCore.Migrations;

namespace RecipeVault.Migrations
{
    public partial class Updated_Recipe_Table2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AuthorUserId",
                table: "Recipes",
                newName: "UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Recipes",
                newName: "AuthorUserId");
        }
    }
}
