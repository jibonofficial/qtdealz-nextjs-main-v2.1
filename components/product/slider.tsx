import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal } from "@mui/material";
import appConfig from "config";
import { find, findIndex } from "lodash";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { selectedSubSKUAtom } from "atoms/atoms";
import SwiperCore, { Controller, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import * as styles from "./style";

interface Props {
  images: string[];
  youtubeLink?: string;
}

export const Slider: React.FC<Props> = ({ images, youtubeLink }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | undefined>();
  const selectedSubSku = useRecoilValue(selectedSubSKUAtom);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperCore | undefined>();
  const [open, setOpen] = React.useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLImageElement, MouseEvent>, name: string) => {
    setSelectedImg(name);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedImg(null);
    setOpen(false);
  };

  useEffect(() => {
    if (selectedSubSku && controlledSwiper) {
      const swiperElWithSelectedSubSkuImg = find(controlledSwiper.slides, (slide) => {
        return slide.ariaValueText === selectedSubSku.image_url;
      });

      if (swiperElWithSelectedSubSkuImg) {
        const swiperIndex = findIndex(controlledSwiper.slides, swiperElWithSelectedSubSkuImg);
        controlledSwiper.slideTo(swiperIndex);
        thumbsSwiper?.slideTo(swiperIndex);
      }
    }
  }, [selectedSubSku]);

  return (
    <>
      <Box className="pd-details">
        <Swiper
          slidesPerView={1}
          modules={[Navigation, Thumbs, Controller]}
          navigation={images && images.length > 1 ? true : false}
          onSwiper={setControlledSwiper}
          // https://github.com/nolimits4web/swiper/issues/5630#issuecomment-1111418301
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          className="swiper-view"
          controller={{
            control: controlledSwiper && !controlledSwiper.destroyed ? controlledSwiper : undefined,
          }}
        >
          {youtubeLink && (
            <SwiperSlide>
              {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
              <iframe
                src={`https://www.youtube.com/embed/${youtubeLink}`}
                width="100%"
                height="100%"
                frameBorder="0"
              ></iframe>
            </SwiperSlide>
          )}
          {images?.map((name, index) => (
            <SwiperSlide aria-valuetext={name} key={index}>
              <img
                src={`${appConfig.api.imgUrl}/${name}`}
                alt={`product-${name}`}
                onClick={(event) => handleOpen(event, name)}
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          modules={[Navigation, Thumbs, Controller]}
          onSwiper={setThumbsSwiper}
          spaceBetween={30}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          className="swiper-preview"
        >
          {youtubeLink && (
            <SwiperSlide>
              <img
                src={`https://img.youtube.com/vi/${youtubeLink}/sddefault.jpg`}
                alt="video-thumb"
              />
            </SwiperSlide>
          )}
          {images?.map((name, index) => (
            <SwiperSlide key={index}>
              <img src={`${appConfig.api.imgUrl}/${name}`} alt="product-thumb" loading="lazy" />
            </SwiperSlide>
          ))}
        </Swiper>
        <Modal open={open} onClose={handleClose}>
          <Box sx={styles.imageModalStyle}>
            <IconButton sx={styles.imageModalCloseButton} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <div className="modal-slider-container">
              <Swiper
                modules={[Navigation, Thumbs, Controller]}
                initialSlide={controlledSwiper?.activeIndex}
                navigation={images && images.length > 1 ? true : false}
                slidesPerView={1}
                className="swiper-view"
                onSlideChange={(swiper) => controlledSwiper?.slideTo(swiper.activeIndex)}
              >
                {images?.map((name, index) => (
                  <SwiperSlide aria-valuetext={name} key={index}>
                    <img
                      src={`${appConfig.api.imgUrl}/${name}`}
                      alt={`product-${name}`}
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Box>
        </Modal>
      </Box>
    </>
  );
};
