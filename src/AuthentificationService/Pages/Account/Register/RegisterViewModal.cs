using System.ComponentModel.DataAnnotations;

namespace AuthentificationService;

public class RegisterViewModal
{
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string Username { get; set; }
    [Required]
    public string FullName { get; set; }
    public string ReturnUrl { get; set; }
    public string Button { get; set; }
}
