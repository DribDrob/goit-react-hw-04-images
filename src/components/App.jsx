import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';
import 'styles.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const isLoading = () => {
    setLoading(prevState => !prevState);
  };

  const handleFetch = newImages => {
    setImages(prevState => [...prevState, ...newImages]);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery
          isLoading={isLoading}
          query={query}
          images={images}
          page={page}
          handleFetch={handleFetch}
        />
        {loading && <Loader />}
        {images.length !== 0 && <Button onClick={loadMore}>Load more</Button>}
        <ToastContainer autoClose={3000} />
      </div>
    </>
  );
};
// export class App extends Component {
//   state = {
//     query: '',
//     loading: false,
//     images: [],
//     page: 1,
//   };

//   handleSubmit = query => {
//     this.setState({ query, page: 1, images: [] });
//   };
//   isLoading = () => {
//     this.setState(({ loading }) => ({
//       loading: !loading,
//     }));
//   };
//   handleFetch = newImages => {
//     this.setState(prevState => ({
//       images: [...prevState.images, ...newImages],
//     }));
//   };
//   loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { query, loading, images, page } = this.state;
//     return (
//       <>
//         <div className="App">
//           <Searchbar onSubmit={this.handleSubmit} />
//           <ImageGallery
//             isLoading={this.isLoading}
//             query={query}
//             images={images}
//             page={page}
//             handleFetch={this.handleFetch}
//           />
//           {loading && <Loader />}
//           {images.length !== 0 && (
//             <Button onClick={this.loadMore}>Load more</Button>
//           )}
//           <ToastContainer autoClose={3000} />
//         </div>
//       </>
//     );
//   }
// }
