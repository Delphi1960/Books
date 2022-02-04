export interface AuthState {
  user: AnyObject | null;
  isAuthed: boolean;
}

export type AnyObject = {
  [k: string]: any;
};
