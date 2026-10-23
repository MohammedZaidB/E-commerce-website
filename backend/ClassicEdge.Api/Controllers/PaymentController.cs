using ClassicEdge.Api.Models;
using ClassicEdge.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClassicEdge.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly ILogger<PaymentController> _logger;

        public PaymentController(IPaymentService paymentService, ILogger<PaymentController> logger)
        {
            _paymentService = paymentService;
            _logger = logger;
        }

        /// <summary>
        /// Process order payment (GPay, Card, Net Banking) and send email invoice
        /// </summary>
        [HttpPost("process-order")]
        [ProducesResponseType(typeof(ApiResponse<OrderResultDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<string>), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ProcessOrder([FromBody] ProcessOrderRequestDto request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.OrderId))
            {
                return BadRequest(ApiResponse<string>.Fail("Invalid order payload."));
            }

            try
            {
                var result = await _paymentService.ProcessOrderPaymentAsync(request);
                return Ok(ApiResponse<OrderResultDto>.Ok(result, "Payment received and invoice confirmation generated."));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing order payment");
                return StatusCode(500, ApiResponse<string>.Fail("An unexpected error occurred while processing the payment."));
            }
        }
    }
}
