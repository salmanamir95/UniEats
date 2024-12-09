var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers(); // <-- Add support for controllers

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// Build the application
var app = builder.Build();

// Enable CORS
app.UseCors("AllowAngularApp");

// Enable Swagger for development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable static file serving (for uploaded images)
app.UseStaticFiles();

// Redirect HTTP requests to HTTPS
app.UseHttpsRedirection();

// Map Controllers
app.MapControllers();

app.Run();
