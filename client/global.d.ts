type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;

type BoxProps = {
  children: React.ReactNode;
  isExempt?: boolean;
  user?: User;
};

type LoadingProps = {
  display: string;
};

type User = {
  id: string;
  name?: string;
  email: string;
  password: string;
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
  display: string;
};

type AnimProps = {
  anim: boolean;
};
