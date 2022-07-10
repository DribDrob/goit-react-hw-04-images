// import PropTypes from 'prop-types';
import { Grid } from 'react-loader-spinner';
import axios from 'axios';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import 'styles.css';

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    page: 1,
    error: null,
    showModal: false,
    openLargeImageIndx: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery || prevState.page !== this.state.page) {
      this.setState({ loading: true });
      setTimeout(() => {
        axios(
          `https://pixabay.com/api/?q=${nextQuery}&page=${this.state.page}&key=27565635-1fa3e47e8e30944c800be594a&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(({ data }) => {
            const images = data;
            if (images.totalHits === 0) {
              console.log(
                'Sorry, there are no images matching your search query. Please try again.'
              );
              return;
            }
            const newImages = images.hits;

            this.setState(prevState => ({
              images: [...prevState.images, ...newImages],
            }));
          })
          .catch(error => this.setState({ error }))
          .finally(() => this.setState({ loading: false }));
        // fetch(
        //   `https://pixabay.com/api/?q=${nextQuery}&page=${this.state.page}&key=27565635-1fa3e47e8e30944c800be594a&image_type=photo&orientation=horizontal&per_page=12`
        // )
        //   .then(r => {
        //     if (r.ok) {
        //       return r.json();
        //     }
        //     return Promise.reject(new Error('Помилочка'));
        //   })
        //   .then(images => {
        //     console.log(images);
        //     if (images.totalHits === 0) {
        //       console.log(
        //         'Sorry, there are no images matching your search query. Please try again.'
        //       );
        //       return;
        //     }
        //     const newImages = images.hits;

        //     this.setState(prevState => ({
        //       images: [...prevState.images, ...newImages],
        //     }));
        //   })
        //   .catch(error => this.setState({ error }))
        //   .finally(() => this.setState({ loading: false }));
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
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, loading, error, showModal, openLargeImageIndx } =
      this.state;
    return (
      <>
        {error && <div>Error...</div>}
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
        {loading && (
          <div className="Loader">
            <Grid
              ariaLabel="loading-indicator"
              visible={true}
              color="#3f51b599"
              height="50"
              width="50"
            />
          </div>
        )}
        {images.length !== 0 && (
          <button className="Button" type="button" onClick={this.loadMore}>
            Загрузить еще
          </button>
        )}
      </>
    );
  }
}

// ImageGallery.propTypes = {
//   query: PropTypes.string.isRequired,
// };
