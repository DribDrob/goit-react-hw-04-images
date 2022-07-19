import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import 'styles.css';
import { useEffect } from 'react';

export const ImageGallery = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  useEffect(() => {
    toggleModal();
  }, [largeImageURL, tags]);

  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
      {images && (
        <ul className="ImageGallery">
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              onClick={() => {
                setLargeImageURL(largeImageURL);
                setTags(tags);
              }}
            />
          ))}
        </ul>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  // isLoading: PropTypes.func.isRequired,
  // query: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ),
  // page: PropTypes.number.isRequired,
  // handleFetch: PropTypes.func.isRequired,
};

// export class ImageGallery extends Component {
//   state = {
//     showModal: false,
//     openLargeImage: null,
//   };
//   componentDidUpdate(prevProps, prevState) {
//     const { query, page } = this.props;
//     if (prevProps.query !== query || prevProps.page !== page) {
//       this.props.isLoading();
//       // setTimeout(() => {
//       getImages(query, page)
//         .then(({ data }) => {
//           const images = data;
//           if (images.totalHits === 0) {
//             return toast.error(
//               'Sorry, there are no images matching your search query. Please try again.'
//             );
//           }
//           this.props.handleFetch(images.hits);
//         })
//         .catch(error => toast.error('Something went wrong. Please try again.'))
//         .finally(() => this.props.isLoading());
//       // }, 2000);
//     }
//   }
//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };
//   setLargeImage = (largeImageURL, tags) => {
//     this.setState({
//       openLargeImage: { largeImageURL: largeImageURL, tags: tags },
//     });
//   };

//   render() {
//     const { showModal, openLargeImage } = this.state;
//     const { images } = this.props;
//     return (
//       <>
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={openLargeImage.largeImageURL} alt={openLargeImage.tags} />
//           </Modal>
//         )}
//         {images && (
//           <ul className="ImageGallery">
//             {images.map(({ id, webformatURL, largeImageURL, tags }) => (
//               <ImageGalleryItem
//                 key={id}
//                 webformatURL={webformatURL}
//                 tags={tags}
//                 onClick={() => {
//                   this.setLargeImage(largeImageURL, tags);
//                   this.toggleModal();
//                 }}
//               />
//             ))}
//           </ul>
//         )}
//       </>
//     );
//   }
// }

// ImageGallery.propTypes = {
//   isLoading: PropTypes.func.isRequired,
//   query: PropTypes.string.isRequired,
//   images: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       webformatURL: PropTypes.string.isRequired,
//       largeImageURL: PropTypes.string.isRequired,
//       tags: PropTypes.string,
//     })
//   ),
//   page: PropTypes.number.isRequired,
//   handleFetch: PropTypes.func.isRequired,
// };
