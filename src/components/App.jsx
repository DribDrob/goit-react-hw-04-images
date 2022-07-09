import { Component } from 'react';
// import { nanoid } from 'nanoid';
// import { Box } from './Box';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'styles.css';
// import { Loader } from 'components/Loader/Loader';
// import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    query: '',
  };

  setQuery = query => {
    this.setState({ query });
  };

  render() {
    return (
      <>
        <div className="App">
          <Searchbar onSubmit={this.setQuery} />
          <ImageGallery query={this.state.query} />
        </div>
      </>
    );
  }
}
