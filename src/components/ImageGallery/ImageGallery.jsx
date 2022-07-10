// import PropTypes from 'prop-types';
import { RotatingSquare } from 'react-loader-spinner';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import 'styles.css';

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    showModal: false,
    openLargeImageIndx: null,
  };
  componentDidUpdate(prevProps, _) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      this.setState({ loading: true, images: [] });
      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${nextQuery}&page=1&key=27565635-1fa3e47e8e30944c800be594a&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(r => {
            if (r.ok) {
              return r.json();
            }
            return Promise.reject(new Error('Помилочка'));
          })
          .then(images => {
            if (images.totalHits === 0) {
              console.log(
                'Sorry, there are no images matching your search query. Please try again.'
              );
              return;
            }
            this.setState({ images: images.hits });
          })
          .catch(error => this.setState({ error }))
          .finally(() => this.setState({ loading: false }));
      }, 2000);
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
    const { images, loading, error, showModal, openLargeImageIndx } =
      this.state;
    return (
      <>
        {error && <div>Error...</div>}
        {loading && (
          <div className="Loader">
            <RotatingSquare
              ariaLabel="rotating-square"
              visible={true}
              color="#3f51b599"
              height="200"
              width="200"
            />
          </div>
        )}
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
        {/* <Button /> */}
      </>
    );
  }
}

// ImageGallery.propTypes = {
//   query: PropTypes.string.isRequired,
// };
