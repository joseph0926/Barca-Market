import { useState, useEffect, useCallback, FC, ReactElement } from 'react';
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { HomeSliderButton } from './HomeSliderButton';
import { imageByIndex } from '@/shared/utils/static-data';

const HomeSlider: FC = (): ReactElement => {
  const options: EmblaOptionsType = {};
  const SLIDE_COUNT = 7;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  const autoplayOptions = {
    delay: 2000,
    rootNode: (emblaRoot: EmblaPluginType) => emblaRoot.parentElement
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel(
    {
      containScroll: 'keepSnaps',
      dragFree: true,
      loop: true
    },
    [Autoplay(autoplayOptions)]
  );

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      setSelectedIndex(index);
      emblaMainApi.scrollTo(index);
      emblaThumbsApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi, setSelectedIndex]
  );

  useEffect(() => {
    if (!emblaThumbsApi) return;

    const onSelectThumb = () => {
      const selectedIndex = emblaThumbsApi.selectedScrollSnap();
      setSelectedIndex(selectedIndex);
      if (!emblaMainApi) return;
      emblaMainApi.scrollTo(selectedIndex);
    };

    emblaThumbsApi.on('select', onSelectThumb);
    return () => {
      if (emblaThumbsApi) {
        emblaThumbsApi.off('select', onSelectThumb);
      }
    };
  }, [emblaThumbsApi, emblaMainApi]);

  useEffect(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;

    const onSelectMain = () => {
      const selectedIndex = emblaMainApi.selectedScrollSnap();
      setSelectedIndex(selectedIndex);
      emblaThumbsApi.scrollTo(selectedIndex);
    };

    emblaMainApi.on('select', onSelectMain);
    return () => {
      if (emblaMainApi) {
        emblaMainApi.off('select', onSelectMain);
      }
    };
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
              <img className="embla__slide__img" src={imageByIndex(index)} alt="Your alt text" />
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((index) => (
              <HomeSliderButton
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={imageByIndex(index)}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
