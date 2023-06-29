import { LoaderSpan, LoadingWrapper } from "./Loading.style";

const Loading = ({ display }: LoadingProps): JSX.Element => {
  return (
    <LoadingWrapper $display={display}>
      <LoaderSpan />
      <LoaderSpan />
      <LoaderSpan />
    </LoadingWrapper>
  );
};

export default Loading;
