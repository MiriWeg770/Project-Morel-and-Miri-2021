using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DAL.Models
{
    public partial class MenuCalculatorContext : DbContext
    {
        public MenuCalculatorContext()
        {
        }

        public MenuCalculatorContext(DbContextOptions<MenuCalculatorContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CategoriesToMeal> CategoriesToMeal { get; set; }
        public virtual DbSet<CategoriesToMenu> CategoriesToMenu { get; set; }
        public virtual DbSet<Meal> Meal { get; set; }
        public virtual DbSet<MealCategories> MealCategories { get; set; }
        public virtual DbSet<MealProducts> MealProducts { get; set; }
        public virtual DbSet<Menu> Menu { get; set; }
        public virtual DbSet<MenuCategories> MenuCategories { get; set; }
        public virtual DbSet<UnitMeasure> UnitMeasure { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Level> Level { get; set; }

        //        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //        {
        //            if (!optionsBuilder.IsConfigured)
        //            {
        //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
        //                optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=MenuCalculator;Integrated Security=True");
        //            }
        //        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CategoriesToMeal>(entity =>
            {
                entity.HasKey(e => e.CategoriesToMealCode);

                entity.Property(e => e.CategoriesToMealCode).ValueGeneratedNever();

                entity.HasOne(d => d.MealCategoriesCodeNavigation)
                    .WithMany(p => p.CategoriesToMeal)
                    .HasForeignKey(d => d.MealCategoriesCode)
                    .HasConstraintName("FK_CategoriesToMeal_MealCategories");

                entity.HasOne(d => d.MealCodeNavigation)
                    .WithMany(p => p.CategoriesToMeal)
                    .HasForeignKey(d => d.MealCode)
                    .HasConstraintName("FK_CategoriesToMeal_Meal");
            });

            modelBuilder.Entity<CategoriesToMenu>(entity =>
            {
                entity.HasKey(e => e.CategoriesToMenuCode);

                entity.HasOne(d => d.MenuCategoriesCodeNavigation)
                    .WithMany(p => p.CategoriesToMenu)
                    .HasForeignKey(d => d.MenuCategoriesCode)
                    .HasConstraintName("FK_CategoriesToMenu_MenuCategories");

                entity.HasOne(d => d.MenuCodeNavigation)
                    .WithMany(p => p.CategoriesToMenu)
                    .HasForeignKey(d => d.MenuCode)
                    .HasConstraintName("FK_CategoriesToMenu_Menu");
            });

            modelBuilder.Entity<Meal>(entity =>
            {
                entity.HasKey(e => e.MealCode);

                entity.Property(e => e.MealName).HasMaxLength(50);

                 entity.Property(e => e.DateCreated).HasColumnType("date");

                entity.Property(e => e.DateUpdated).HasColumnType("datetime");

                entity.Property(e => e.DateUplaod).HasColumnType("date");

                entity.HasOne(d => d.PictureCodeNavigation)
                 .WithMany(p => p.Meals)
                 .HasForeignKey(d => d.PictureCode)
                 .HasConstraintName("FK_Meal_Picture");
                entity.HasOne(d => d.LevelCodeNavigation)
                   .WithMany(p => p.Meals)
                   .HasForeignKey(d => d.LevelCode)
                   .HasConstraintName("FK_Meal_Level");

                entity.HasOne(d => d.MenuCodeNavigation)
                    .WithMany(p => p.Meals)
                    .HasForeignKey(d => d.MenuCode)
                    .HasConstraintName("FK_Meal_Menu");
                entity.HasOne(d => d.UserCodeNavigation)
                    .WithMany(p => p.Meal)
                    .HasForeignKey(d => d.UserCode)
                    .HasConstraintName("FK_Meal_Users");
            });

            modelBuilder.Entity<MealCategories>(entity =>
            {
                entity.HasKey(e => e.MealCategoriesCode);

                entity.Property(e => e.MealCategoriesName).HasMaxLength(50);
            });

            modelBuilder.Entity<MealProducts>(entity =>
            {
                entity.HasKey(e => e.MealProductCode);

                entity.Property(e => e.MealProductCompany)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.MealProductName).HasMaxLength(50);

                entity.HasOne(d => d.MealCodeNavigation)
                    .WithMany(p => p.MealProducts)
                    .HasForeignKey(d => d.MealCode)
                    .HasConstraintName("FK_MealProducts_Meal");

                entity.HasOne(d => d.UnitMeasureCodeNavigation)
                    .WithMany(p => p.MealProducts)
                    .HasForeignKey(d => d.UnitMeasureCode)
                    .HasConstraintName("FK_MealProducts_UnitMeasure");
            });

            modelBuilder.Entity<Menu>(entity =>
            {
                entity.HasKey(e => e.MenuCode);
                entity.Property(e => e.DateCreated).HasColumnType("datetime");

                entity.Property(e => e.DateUpdated).HasColumnType("datetime");

                entity.Property(e => e.DateUpload).HasColumnType("datetime");

                entity.Property(e => e.MenuName).HasMaxLength(50);

                entity.HasOne(d => d.PictureCodeNavigation)
                    .WithMany(p => p.Menus)
                    .HasForeignKey(d => d.PictureCode)
                    .HasConstraintName("FK_Menu_Picture");
                entity.HasOne(d => d.LevelCodeNavigation)
                    .WithMany(p => p.Menus)
                    .HasForeignKey(d => d.LevelCode)
                    .HasConstraintName("FK_Menu_Level");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Menu)
                    .HasForeignKey(d => d.UserCode)
                    .HasConstraintName("FK_Menu_Users");
            });

            modelBuilder.Entity<MenuCategories>(entity =>
            {
                entity.HasKey(e => e.MenuCategoriesCode);

                entity.Property(e => e.MenuCategoriesName).HasMaxLength(50);
            });

            modelBuilder.Entity<UnitMeasure>(entity =>
            {
                entity.HasKey(e => e.UnitCode);

                entity.Property(e => e.ConvertionMeasureAmount).HasMaxLength(50);

                entity.Property(e => e.UnitName).HasMaxLength(50);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserCode);

                entity.Property(e => e.Mail).HasMaxLength(50);

                entity.Property(e => e.Password).HasMaxLength(50);

                entity.Property(e => e.UserName).HasMaxLength(50);
            });

            modelBuilder.Entity<Picture>(entity =>
            {
                entity.HasKey(e => e.PictureCode);

                entity.ToTable("Picture");

                entity.Property(e => e.Picture1).HasColumnName("Picture");

                entity.Property(e => e.PictureName).HasMaxLength(50);
            });
            modelBuilder.Entity<Level>(entity =>
            {
                entity.HasKey(e => e.LevelCode);

                entity.ToTable("Level");

                entity.Property(e => e.LevelName).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
