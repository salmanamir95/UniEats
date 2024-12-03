using System;
using System.Collections.Generic;
using System.Linq;
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

        // For simplicity, this example will use an in-memory dictionary to store carts by userId.
        private static Dictionary<int, List<CartItemDTO>> _carts = new Dictionary<int, List<CartItemDTO>>();

        public CartController(IConfiguration configuration, ILogger<CartController> logger)
        {
            _conn = configuration.GetConnectionString("DefaultConnection");
            _logger = logger ?? throw new ArgumentNullException(nameof(logger)); // Ensure logger is not null
        }

        // UC-01: Add an item to the cart for a specific user
        [HttpPost("add/{userId}")]
        public GenericResponse<string> AddToCart(int userId, [FromBody] CartItemDTO cartItem)
        {
            try
            {
                if (cartItem == null)
                {
                    return new GenericResponse<string> { Success = false, Msg = "Invalid item data." };
                }

                // If the user's cart doesn't exist, create one
                if (!_carts.ContainsKey(userId))
                {
                    _carts[userId] = new List<CartItemDTO>();
                }

                // Check if the item already exists in the user's cart, if so update the quantity.
                var existingItem = _carts[userId].FirstOrDefault(x => x.ItemId == cartItem.ItemId);
                if (existingItem != null)
                {
                    existingItem.Quantity += cartItem.Quantity;
                }
                else
                {
                    // Add the item to the user's cart
                    _carts[userId].Add(cartItem);
                }

                return new GenericResponse<string> { Success = true, Msg = "Item added to cart successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding item to cart.");
                return new GenericResponse<string> { Success = false, Msg = "An error occurred while adding the item to the cart." };
            }
        }

        // UC-02: Get all items in the cart for a specific user
        [HttpGet("{userId}")]
        public GenericResponse<List<CartItemDTO>> GetCart(int userId)
        {
            try
            {
                // Check if the user has a cart
                if (!_carts.ContainsKey(userId))
                {
                    return new GenericResponse<List<CartItemDTO>> { Success = false, Msg = "User's cart is empty." };
                }

                return new GenericResponse<List<CartItemDTO>> { Success = true, data = _carts[userId] };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching cart items.");
                return new GenericResponse<List<CartItemDTO>> { Success = false, Msg = "An error occurred while fetching the cart." };
            }
        }

        // UC-03: Update the quantity of an item in the cart for a specific user
        [HttpPut("update/{userId}/{itemId}")]
        public GenericResponse<string> UpdateCartItemQuantity(int userId, int itemId, [FromBody] int quantity)
        {
            try
            {
                // Check if the user has a cart
                if (!_carts.ContainsKey(userId))
                {
                    return new GenericResponse<string> { Success = false, Msg = "User's cart is empty." };
                }

                // Find the item in the user's cart
                var existingItem = _carts[userId].FirstOrDefault(x => x.ItemId == itemId);
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

        // UC-04: Remove an item from the cart for a specific user
        [HttpDelete("remove/{userId}/{itemId}")]
        public GenericResponse<string> RemoveFromCart(int userId, int itemId)
        {
            try
            {
                // Check if the user has a cart
                if (!_carts.ContainsKey(userId))
                {
                    return new GenericResponse<string> { Success = false, Msg = "User's cart is empty." };
                }

                // Find the item in the user's cart
                var itemToRemove = _carts[userId].FirstOrDefault(x => x.ItemId == itemId);
                if (itemToRemove == null)
                {
                    return new GenericResponse<string> { Success = false, Msg = "Item not found in the cart." };
                }

                _carts[userId].Remove(itemToRemove);

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
