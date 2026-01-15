export interface Location {
  mapLocation: [number, number];
  city: string;
  state: string;
  country: string;
  pincode: string;
  addressLine1: string;
  addressLine2: string;
}


export interface Manager {
  ID: string;
  /**
 * Possible accCreated Value.
 *
 * - `"0"` → Manager Account Not created
 * - `"1"` → Manager Account Created 
 * - `"2"` → Business Profile Created
 */
  accCreated: 0 | 1 | 2 | 3 | 4 | 5;
  fullName: string;
  contactNumber: string;
  dob: string;
  email: string;
  gender: string;
  profilePicture: string;
  role: "Manager";
  location?: Location;
  language?: string[];
}

export interface ManagerState {
  data: Manager | null;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}