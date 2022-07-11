import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import 'styles.css';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '27565635-1fa3e47e8e30944c800be594a';

export class ImageGallery extends Component {
  state = {
    showModal: false,
    openLargeImageIndx: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.props;
    if (prevProps.query !== query || prevProps.page !== page) {
      this.props.isLoading();
      const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        page: page,
        per_page: 12,
      });
      // setTimeout(() => {
      axios(`/?${params}`)
        .then(({ data }) => {
          const images = data;
          if (images.totalHits === 0) {
            return toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
          this.props.handleFetch(images.hits);
        })
        .catch(error => toast.error('Something went wrong. Please try again.'))
        .finally(() => this.props.isLoading());
      // }, 2000);
    }
  }
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  setLargeImageIndx = index => {
    this.setState({ openLargeImageIndx: index });
  };

  render() {
    const { showModal, openLargeImageIndx } = this.state;
    const { images } = this.props;
    return (
      <>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              src={images[openLargeImageIndx].largeImageURL}
              alt={images[openLargeImageIndx].tags}
            />
          </Modal>
        )}
        {images && (
          <ul className="ImageGallery">
            {images.map((image, index) => (
              <ImageGalleryItem
                key={image.id}
                image={image}
                onClick={() => {
                  this.setLargeImageIndx(index);
                  this.toggleModal();
                }}
              />
            ))}
          </ul>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  isLoading: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ),
  page: PropTypes.number.isRequired,
  handleFetch: PropTypes.func.isRequired,
};
