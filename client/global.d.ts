type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;

type BoxProps = {
  children: React.ReactNode;
  isExempt?: boolean;
  user?: User;
};

type LoadingProps = {
  display: boolean;
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
