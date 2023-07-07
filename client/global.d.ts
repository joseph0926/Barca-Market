type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;

type BoxProps = {
  children: React.ReactNode;
  isExempt?: boolean;
  user?: User;
  currentUser?: User;
};

type LoadingProps = {
  $display: boolean;
};

type User = {
  id: string;
  name?: string;
  email: string;
  password: string;
};

type CurrentUser = {
  currentUser: User;
};

type isUserValid = {
  name?: boolean;
  email: boolean;
  password: boolean;
};

type ModeProps = {
  mode: "dark" | "light" | string;
};

type DisplayProps = {
  $display: boolean;
};

type AnimProps = {
  $anim: boolean;
};

type Post = {
  id: string;
  content: string;
  likes?: string[];
  images?: string[];
  hashtags?: string[];
  totalComments?: number;
  totalLikes?: number;
  isPrivate: boolean;
  userId: string;
  version?: number;
  comments?: string[];
};

type PostProps = {
  post: Post;
};
