import { Component } from 'react';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ModalWindow } from './Modal/Modal';
import Notiflix from 'notiflix'; 

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    largeImage: {
      url: null,
      tags: null,
    },
  };

  async fetchPixabayImages(query, page) {
    try {
      const apiKey = '29357448-0203ad34ff6f16514b0291a92';
      const perPage = 12;
      const orientation = 'horizontal';
      const safeSearch = true;

      const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=${orientation}&safesearch=${safeSearch}&per_page=${perPage}&page=${page}`;
      
      const response = await fetch(url);
      const data = await response.json();

      return data.hits;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState({ images: [] });
      try {
        this.setState({ isLoading: true });
        
        const hits = await this.fetchPixabayImages(query, 1);
        if (hits.length === 0) {
          Notiflix.Notify.failure('No results found for your query');
        }
        this.setState({ images: hits });
      } finally {
        this.setState({ isLoading: false });
      }
      return;
    }

    if (prevState.query === query && prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        
        const hits = await this.fetchPixabayImages(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmit = query => {
    this.setState({ query, page: 1 });
  };

  onImageClick = (url, tags) => {
    this.setState({ largeImage: { url, tags } });
  };

  onHandleClose = () => {
    this.setState({ largeImage: { url: null, tags: null } });
  };

  onChangePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { isLoading, images, largeImage } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        {isLoading && <Loader />}
        {images.length > 1 && (
          <ImageGallery images={images} onImageClick={this.onImageClick} />
        )}
        {images.length > 1 && <Button onChangePage={this.onChangePage} />}
        {largeImage.url && (
          <ModalWindow
            onHandleClose={this.onHandleClose}
            url={largeImage.url}
            tags={largeImage.tags}
          />
        )}
      </Container>
    );
  }
}
