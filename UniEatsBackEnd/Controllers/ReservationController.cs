using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace UniEatsBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
        
    }
}


// UC-04: View Reservation Schedule
// UC-05: Make Reservation
// UC-06: Check Seat Occupied
// UC-21: Delivery

// ___________________________

// Cancel Reservation

// Allow users to cancel a reservation they made.
// Use Case: Add a CancelReservation method in ReservationController.
// Reservation Notifications

// Notify users of upcoming reservations via email or in-app notifications.
// Use Case: Integrate notification systems into the ReservationController.