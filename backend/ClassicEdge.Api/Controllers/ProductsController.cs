using ClassicEdge.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClassicEdge.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private static readonly List<CategoryDto> Categories = new()
        {
            new CategoryDto { Id = "all", Name = "All Collections" },
            new CategoryDto { Id = "leather-shoes", Name = "Leather Shoes" },
            new CategoryDto { Id = "leather-slippers", Name = "Leather Slippers" },
            new CategoryDto { Id = "wallets", Name = "Wallets" },
            new CategoryDto { Id = "bags", Name = "Bags" },
            new CategoryDto { Id = "belts", Name = "Belts" },
            new CategoryDto { Id = "other-leather-goods", Name = "Other Leather Goods" },
            new CategoryDto { Id = "textiles-garments", Name = "Textiles & Garments" }
        };

        private static readonly List<ProductDto> Products = new()
        {
            new ProductDto
            {
                Id = "ls-01",
                Name = "Handcrafted Oxford & Brogue Formal Shoes",
                Category = "leather-shoes",
                CategoryLabel = "Leather Shoes",
                SubType = "Formal Shoes",
                Image = "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80",
                Description = "Classic lace-up formal dress shoes crafted with premium leather uppers, neat perforations, and durable outsoles.",
                Highlights = new() { "Traditional wingtip & cap-toe options", "Hand-finished burnish", "Custom branding & sole stamping on discussion" },
                Specs = "Available on enquiry"
            },
            new ProductDto
            {
                Id = "ls-02",
                Name = "Slip-On Leather Loafers & Casual Footwear",
                Category = "leather-shoes",
                CategoryLabel = "Leather Shoes",
                SubType = "Casual Shoes",
                Image = "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80",
                Description = "Refined penny loafers and casual driving shoes engineered for comfort and modern style.",
                Highlights = new() { "Cushioned leather footbed", "Supple upper finishes", "Private-label branding options" },
                Specs = "Available on enquiry"
            },
            new ProductDto
            {
                Id = "lp-01",
                Name = "Artisanal Everyday Leather Slippers",
                Category = "leather-slippers",
                CategoryLabel = "Leather Slippers",
                SubType = "Everyday Slippers",
                Image = "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1000&q=80",
                Description = "Ergonomic slip-on leather footwear featuring soft footbed cushioning and durable under-sole construction.",
                Highlights = new() { "Natural leather lining", "Comfort-contoured footbed", "Wholesale packaging options" },
                Specs = "Available on enquiry"
            },
            new ProductDto
            {
                Id = "lp-02",
                Name = "Traditional & Casual Arabian Style Slides",
                Category = "leather-slippers",
                CategoryLabel = "Leather Slippers",
                SubType = "Casual Leather Slippers",
                Image = "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
                Description = "Distinctive leather slides developed with attention to regional Middle Eastern preferences.",
                Highlights = new() { "Wide upper band for secure fit", "Moisture-resistant leather insole", "Custom embossing available" },
                Specs = "Available on enquiry"
            },
            new ProductDto
            {
                Id = "wl-01",
                Name = "Classic Bifold Leather Wallet",
                Category = "wallets",
                CategoryLabel = "Wallets",
                SubType = "Classic Wallets",
                Image = "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80",
                Description = "Timeless bifold design engineered with multiple card slots and currency compartments.",
                Highlights = new() { "RFID shielding options", "Clean turned-edge craftsmanship", "Debossed logo placement" },
                Specs = "Available on enquiry"
            },
            new ProductDto
            {
                Id = "bg-01",
                Name = "Executive Leather Messenger & Briefcase",
                Category = "bags",
                CategoryLabel = "Bags",
                SubType = "Leather Bags",
                Image = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
                Description = "Structured business messenger bag with padded laptop compartment, organizer pockets, and solid brass fittings.",
                Highlights = new() { "Full leather handle & strap", "Durable inner twill lining", "Custom hardware branding" },
                Specs = "Available on enquiry"
            },
            new ProductDto
            {
                Id = "bl-01",
                Name = "Classic Full-Grain Dress Leather Belt",
                Category = "belts",
                CategoryLabel = "Belts",
                SubType = "Classic Leather Belts",
                Image = "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80",
                Description = "Sleek formal belt with feathered edge detailing and single-prong solid buckle.",
                Highlights = new() { "Reversible or fixed buckle options", "Logo stamping on inner suede", "Custom width sizing" },
                Specs = "Available on enquiry"
            },
            new ProductDto
            {
                Id = "og-01",
                Name = "Executive Leather Desk Accessories & Folios",
                Category = "other-leather-goods",
                CategoryLabel = "Other Leather Goods",
                SubType = "Additional Leather Accessories",
                Image = "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
                Description = "Bespoke leather desk pads, document portfolios, coaster sets, and writing folders for hospitality and corporate retail.",
                Highlights = new() { "Perimeter stitch finish", "Non-slip backing", "Custom embossing" },
                Specs = "Available on enquiry"
            },
            new ProductDto
            {
                Id = "tx-01",
                Name = "Premium Woven Textile Fabrics & Materials",
                Category = "textiles-garments",
                CategoryLabel = "Textiles and Garments",
                SubType = "Textile Products",
                Image = "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=1000&q=80",
                Description = "Export-grade woven textiles, natural cotton, linen blends, and specialised fabrics sourced for wholesale trade.",
                Highlights = new() { "Multiple weave structures", "Bulk roll packaging", "Custom dye batches" },
                Specs = "Available on enquiry"
            }
        };

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            return Ok(ApiResponse<List<CategoryDto>>.Ok(Categories));
        }

        [HttpGet]
        public IActionResult GetProducts([FromQuery] string? category, [FromQuery] string? search)
        {
            var query = Products.AsEnumerable();

            if (!string.IsNullOrEmpty(category) && category != "all")
            {
                query = query.Where(p => p.Category.Equals(category, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p => p.Name.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                                         p.Description.Contains(search, StringComparison.OrdinalIgnoreCase));
            }

            return Ok(ApiResponse<List<ProductDto>>.Ok(query.ToList()));
        }
    }
}
