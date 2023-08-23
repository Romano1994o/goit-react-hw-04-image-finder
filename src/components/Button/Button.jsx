import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled';
import { LoaderBox } from '../Loader/Loader.styled';
export const Button = ({ onChangePage }) => {
  return (
    <LoaderBox>
      <LoadMoreBtn type="button" onClick={onChangePage}>
        Load more
      </LoadMoreBtn>
    </LoaderBox>
  );
};

Button.propTypes = {
  onChangePage: PropTypes.func.isRequired,
};
