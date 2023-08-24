import React, { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ModalWindow } from './Modal/Modal';
import Notiflix from 'notiflix'; 



export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImage, setLargeImage] = useState({ url: null, tags: null });

  const fetchPixabayImages = async (query, page) => {
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
  };

  useEffect(() => {
    const fetchData = async () => {
      if (query === '') return;

      setIsLoading(true);
      try {
        if (page === 1) {
          const hits = await fetchPixabayImages(query, 1);
          if (hits.length === 0) {
            Notiflix.Notify.failure('No results found for your query');
          }
          setImages(hits);
        } else {
          const hits = await fetchPixabayImages(query, page);
          setImages(prevImages => [...prevImages, ...hits]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const onSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const onImageClick = (url, tags) => {
    setLargeImage({ url, tags });
  };

  const onHandleClose = () => {
    setLargeImage({ url: null, tags: null });
  };

  const onChangePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {images.length > 1 && (
        <ImageGallery images={images} onImageClick={onImageClick} />
      )}
      {images.length > 1 && <Button onChangePage={onChangePage} />}
      {largeImage.url && (
        <ModalWindow
          onHandleClose={onHandleClose}
          url={largeImage.url}
          tags={largeImage.tags}
        />
      )}
    </Container>
  );
};


