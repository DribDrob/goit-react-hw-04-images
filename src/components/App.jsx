import { Component } from 'react';
// import { nanoid } from 'nanoid';
// import { Box } from './Box';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  
  render() {
    return (
      <>
        <Searchbar onSubmit={this.addContact} />
        <ImageGallery />
        <Loader />
        <Button />
        <Modal />
      </>
    );
  }
}
