import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserServiceService } from '../../services/User/user-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User | undefined;

  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id')); // Read 'id' from route parameters
    if (!isNaN(userId)) {
      this.userService.getUserInfo(userId).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.user = response.data;
          } else {
            console.error('Failed to fetch user data:', response.msg);
          }
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
        },
        complete: () => {
          console.log('User data fetch completed.');
        }
      });
    } else {
      console.error('Invalid user ID in URL');
    }
  }

}
