using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace UniEatsBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartAndOrderController : ControllerBase
    {

    }
}


// Save Cart for Later

// Allow users to save their cart and retrieve it later.
// Use Case: Add a SaveCart method in CartController.
// Order History

// Display detailed order history, including status (e.g., completed, in progress).
// Use Case: Add OrderHistory functionality in OrderController.
// Track Order Status

// Allow users to track the status of their order (e.g., preparing, ready for pickup).
// Use Case: Add a TrackOrder method in OrderController.
// Reorder Previous Items

// Let users quickly reorder items from their order history.
// Use Case: Add a Reorder functionality in OrderController.