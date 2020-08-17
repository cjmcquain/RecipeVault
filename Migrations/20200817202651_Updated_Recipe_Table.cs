using Microsoft.EntityFrameworkCore.Migrations;

namespace RecipeVault.Migrations
{
    public partial class Updated_Recipe_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AuthorUserId",
                table: "Recipes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthorUserId",
                table: "Recipes");
        }
    }
}
