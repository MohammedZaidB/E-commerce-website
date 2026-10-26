using ClassicEdge.Api.Models;

namespace ClassicEdge.Api.Services
{
    public interface IEnquiryService
    {
        Task<EnquiryResult> ProcessEnquiryAsync(EnquiryRequestDto request);
    }

    public class EnquiryResult
    {
        public string ReferenceNumber { get; set; } = string.Empty;
        public string FormattedWhatsAppUrl { get; set; } = string.Empty;
        public string EmailSubject { get; set; } = string.Empty;
        public string EmailBody { get; set; } = string.Empty;
        public bool DispatchedToMailQueue { get; set; }
    }

    public class EnquiryService : IEnquiryService
    {
        private readonly ILogger<EnquiryService> _logger;
        private readonly IConfiguration _config;

        public EnquiryService(ILogger<EnquiryService> logger, IConfiguration config)
        {
            _logger = logger;
            _config = config;
        }

        public Task<EnquiryResult> ProcessEnquiryAsync(EnquiryRequestDto req)
        {
            var refId = $"CE-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString("N")[..6].ToUpper()}";
            var recipientEmail = _config["ClassicEdgeSettings:RecipientEmail"] ?? "classicedgeatelier@gmail.com";
            var rawWhatsApp = "919443750820";

            _logger.LogInformation("Processing B2B Wholesale Enquiry [{RefId}] from {Company} ({Country}) for Category: {Category}",
                refId, req.CompanyName, req.Country, req.ProductCategory);

            // Construct structured trade message for WhatsApp
            var waMessage = $"*B2B Wholesale Enquiry [{refId}] - Classic Edge*\n" +
                            $"--------------------------------\n" +
                            $"*Company:* {req.CompanyName}\n" +
                            $"*Contact Person:* {req.FullName}\n" +
                            $"*Email:* {req.BusinessEmail}\n" +
                            $"*WhatsApp/Phone:* {req.ContactNumber}\n" +
                            $"*Country:* {req.Country}\n" +
                            $"*Product Category:* {req.ProductCategory}\n" +
                            (string.IsNullOrEmpty(req.ProductName) ? "" : $"*Product Reference:* {req.ProductName}\n") +
                            $"*Est. Quantity:* {req.OrderQuantity ?? "Open for discussion"}\n" +
                            $"*Enquiry Type:* {req.EnquiryType}\n" +
                            (string.IsNullOrEmpty(req.BrandingRequirements) ? "" : $"*Branding:* {req.BrandingRequirements}\n") +
                            $"*Requirements:* {req.Message}";

            var encodedWa = Uri.EscapeDataString(waMessage);
            var waUrl = $"https://wa.me/{rawWhatsApp}?text={encodedWa}";

            // Construct formal email subject & body
            var emailSubject = $"[Trade Enquiry {refId}] {req.CompanyName} ({req.Country}) - {req.ProductCategory}";
            var emailBody = $"Dear Classic Edge Export Team,\n\n" +
                            $"A new B2B wholesale enquiry has been submitted.\n\n" +
                            $"Reference: {refId}\n" +
                            $"Company Name: {req.CompanyName}\n" +
                            $"Contact Person: {req.FullName}\n" +
                            $"Business Email: {req.BusinessEmail}\n" +
                            $"Contact Number: {req.ContactNumber}\n" +
                            $"Country of Origin: {req.Country}\n" +
                            $"Category: {req.ProductCategory}\n" +
                            $"Product: {req.ProductName ?? "Category Level"}\n" +
                            $"Order Quantity: {req.OrderQuantity ?? "To be discussed"}\n" +
                            $"Enquiry Type: {req.EnquiryType}\n" +
                            $"Branding Requirements: {req.BrandingRequirements ?? "Standard"}\n\n" +
                            $"Message & Specifications:\n{req.Message}\n\n" +
                            $"Submitted at: {DateTime.UtcNow:u} UTC";

            var result = new EnquiryResult
            {
                ReferenceNumber = refId,
                FormattedWhatsAppUrl = waUrl,
                EmailSubject = emailSubject,
                EmailBody = emailBody,
                DispatchedToMailQueue = true
            };

            return Task.FromResult(result);
        }
    }
}
