using System.ComponentModel.DataAnnotations;

namespace ClassicEdge.Api.Models
{
    public class EnquiryRequestDto
    {
        [Required(ErrorMessage = "Full name is required")]
        [StringLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Company name is required")]
        [StringLength(150)]
        public string CompanyName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Business email is required")]
        [EmailAddress(ErrorMessage = "Invalid business email address")]
        public string BusinessEmail { get; set; } = string.Empty;

        [Required(ErrorMessage = "Contact / WhatsApp number is required")]
        [Phone(ErrorMessage = "Invalid contact number")]
        public string ContactNumber { get; set; } = string.Empty;

        [Required(ErrorMessage = "Country is required")]
        public string Country { get; set; } = string.Empty;

        [Required(ErrorMessage = "Product category is required")]
        public string ProductCategory { get; set; } = string.Empty;

        public string? ProductName { get; set; }

        public string? OrderQuantity { get; set; }

        [Required(ErrorMessage = "Enquiry type is required")]
        public string EnquiryType { get; set; } = "Wholesale"; // Wholesale, Bulk Supply, Private Label, Customisation, General Enquiry

        [Required(ErrorMessage = "Message & specifications are required")]
        [StringLength(3000)]
        public string Message { get; set; } = string.Empty;

        public string? BrandingRequirements { get; set; }
    }

    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }
        public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;

        public static ApiResponse<T> Ok(T? data, string message = "Success")
        {
            return new ApiResponse<T> { Success = true, Message = message, Data = data };
        }

        public static ApiResponse<T> Fail(string message)
        {
            return new ApiResponse<T> { Success = false, Message = message, Data = default };
        }
    }
}
