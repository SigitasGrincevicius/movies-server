import { UserRole } from 'src/users/enums/user-role.enum';

export interface ActiveUserData {
  // ID of the user
  sub: string;
  // Email of the user
  email: string;
  role: UserRole;
}
