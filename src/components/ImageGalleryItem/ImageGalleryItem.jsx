import PropTypes from 'prop-types';
import { GalleryItemImage, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onImageClick,
  tags,
}) => {
  return (
    <GalleryItem>
      <GalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={() => onImageClick(largeImageURL, tags)}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
