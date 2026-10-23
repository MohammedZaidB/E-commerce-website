namespace ClassicEdge.Api.Models
{
    public class OrderCustomerDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
    }

    public class OrderPaymentDetailsDto
    {
        public string Method { get; set; } = string.Empty; // GPay / UPI, Card, Net Banking
        public decimal Amount { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Shipping { get; set; }
        public decimal Tax { get; set; }
        public decimal Discount { get; set; }
        public string Status { get; set; } = "PAID";
    }

    public class OrderItemDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal PriceNum { get; set; }
        public string Price { get; set; } = string.Empty;
    }

    public class ProcessOrderRequestDto
    {
        public string OrderId { get; set; } = string.Empty;
        public string TransactionId { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public OrderCustomerDto Customer { get; set; } = new();
        public OrderPaymentDetailsDto Payment { get; set; } = new();
        public List<OrderItemDto> Items { get; set; } = new();
    }

    public class OrderResultDto
    {
        public string OrderId { get; set; } = string.Empty;
        public string TransactionId { get; set; } = string.Empty;
        public bool EmailSent { get; set; }
        public string RecipientEmail { get; set; } = string.Empty;
        public string EmailSubject { get; set; } = string.Empty;
        public string ConfirmationMessage { get; set; } = string.Empty;
    }
}
