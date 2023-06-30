import { LoaderSpan, LoadingWrapper } from "./LoadingStyle";

const Loading = ({ display }: LoadingProps): JSX.Element => {
  return (
    <LoadingWrapper display={display}>
      <LoaderSpan />
      <LoaderSpan />
      <LoaderSpan />
    </LoadingWrapper>
  );
};

export default Loading;
