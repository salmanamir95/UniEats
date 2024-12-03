using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using UniEatsBackEnd.DTO;
using UniEatsBackEnd.GenericResponse;

namespace UniEatsBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ILogger<CartController> _logger;
        private readonly string? _conn;

        // For simplicity, this example will use an in-memory list to store the cart.
        // In a real-world scenario, you'd use a database or session storage.
        private static List<CartItemDTO> _cart = new List<CartItemDTO>();

        public CartController(IConfiguration configuration, ILogger<CartController> logger)
        {
            _conn = configuration.GetConnectionString("DefaultConnection");
            _logger = logger ?? throw new ArgumentNullException(nameof(logger)); // Ensure logger is not null
        }

        // UC-01: Add an item to the cart
        [HttpPost("add")]
        public GenericResponse<string> AddToCart([FromBody] CartItemDTO cartItem)
        {
            try
            {
                if (cartItem == null)
                {
                    return new GenericResponse<string> { Success = false, Msg = "Invalid item data." };
                }

                // Check if the item already exists in the cart, if so update the quantity.
                var existingItem = _cart.FirstOrDefault(x => x.ItemId == cartItem.ItemId);
                if (existingItem != null)
                {
                    existingItem.Quantity += cartItem.Quantity;
                }
                else
                {
                    // Add the item to the cart
                    _cart.Add(cartItem);
                }

                return new GenericResponse<string> { Success = true, Msg = "Item added to cart successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding item to cart.");
                return new GenericResponse<string> { Success = false, Msg = "An error occurred while adding the item to the cart." };
            }
        }

        // UC-02: Get all items in the cart
        [HttpGet]
        public GenericResponse<List<CartItemDTO>> GetCart()
        {
            try
            {
                return new GenericResponse<List<CartItemDTO>> { Success = true, data = _cart };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching cart items.");
                return new GenericResponse<List<CartItemDTO>> { Success = false, Msg = "An error occurred while fetching the cart." };
            }
        }

        // UC-03: Update the quantity of an item in the cart
        [HttpPut("update/{itemId}")]
        public GenericResponse<string> UpdateCartItemQuantity(int itemId, [FromBody] int quantity)
        {
            try
            {
                var existingItem = _cart.FirstOrDefault(x => x.ItemId == itemId);
                if (existingItem == null)
                {
                    return new GenericResponse<string> { Success = false, Msg = "Item not found in the cart." };
                }

                existingItem.Quantity = quantity;

                return new GenericResponse<string> { Success = true, Msg = "Cart item quantity updated." };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating cart item.");
                return new GenericResponse<string> { Success = false, Msg = "An error occurred while updating the cart item." };
            }
        }

        // UC-04: Remove an item from the cart
        [HttpDelete("remove/{itemId}")]
        public GenericResponse<string> RemoveFromCart(int itemId)
        {
            try
            {
                var itemToRemove = _cart.FirstOrDefault(x => x.ItemId == itemId);
                if (itemToRemove == null)
                {
                    return new GenericResponse<string> { Success = false, Msg = "Item not found in the cart." };
                }

                _cart.Remove(itemToRemove);

                return new GenericResponse<string> { Success = true, Msg = "Item removed from cart." };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error removing item from cart.");
                return new GenericResponse<string> { Success = false, Msg = "An error occurred while removing the item from the cart." };
            }
        }
    }
}
