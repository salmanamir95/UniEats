using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace UniEatsBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {

    }
}

// UC-14: Payment
// UC-15: Pay by Card
// UC-16: Validate Payment
// UC-17: Pay by Cash

// ________________________

// Wallet or Loyalty Points

// Introduce a wallet or point-based reward system for frequent users.
// Use Case: Add RewardPoints logic in the UserController and integrate with PaymentController.
// Split Payment

// Allow users to split the bill and pay separately in groups.
// Use Case: Add a SplitPayment method in PaymentController.