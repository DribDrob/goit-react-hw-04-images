import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image }) => {
  const { webformatURL, largeImageURL } = image;
  return (
    <li class="gallery-item">
      <img src={webformatURL} alt={largeImageURL} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
