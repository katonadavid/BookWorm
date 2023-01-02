using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookWorm.Migrations
{
    /// <inheritdoc />
    public partial class ManyToManyAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Creators_PublicationId",
                table: "Creators");

            migrationBuilder.DropColumn(
                name: "PublicationId",
                table: "Creators");

            migrationBuilder.CreateTable(
                name: "CreatorPublication",
                columns: table => new
                {
                    CreatorsId = table.Column<int>(type: "int", nullable: false),
                    PublicationsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CreatorPublication", x => new { x.CreatorsId, x.PublicationsId });
                    table.ForeignKey(
                        name: "FK_CreatorPublication_Creators_CreatorsId",
                        column: x => x.CreatorsId,
                        principalTable: "Creators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CreatorPublication_PublicationsId",
                table: "CreatorPublication",
                column: "PublicationsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CreatorPublication");

            migrationBuilder.AddColumn<int>(
                name: "PublicationId",
                table: "Creators",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Creators_PublicationId",
                table: "Creators",
                column: "PublicationId");
        }
    }
}
