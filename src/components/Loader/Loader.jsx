import { Dna } from 'react-loader-spinner';
import { LoaderBox } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderBox>
      <Dna
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
/>
    </LoaderBox>
  );
};
