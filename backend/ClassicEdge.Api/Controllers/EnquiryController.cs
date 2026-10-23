using ClassicEdge.Api.Models;
using ClassicEdge.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClassicEdge.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnquiryController : ControllerBase
    {
        private readonly IEnquiryService _enquiryService;
        private readonly ILogger<EnquiryController> _logger;

        public EnquiryController(IEnquiryService enquiryService, ILogger<EnquiryController> logger)
        {
            _enquiryService = enquiryService;
            _logger = logger;
        }

        /// <summary>
        /// Submit B2B wholesale quotation or customisation enquiry
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(ApiResponse<EnquiryResult>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<string>), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SubmitEnquiry([FromBody] EnquiryRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                var errors = string.Join("; ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
                return BadRequest(ApiResponse<string>.Fail($"Validation failed: {errors}"));
            }

            try
            {
                var result = await _enquiryService.ProcessEnquiryAsync(request);
                return Ok(ApiResponse<EnquiryResult>.Ok(result, "Enquiry received and routed to Classic Edge export desk."));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing enquiry");
                return StatusCode(500, ApiResponse<string>.Fail("An unexpected error occurred while processing your enquiry."));
            }
        }
    }
}
