import React, { useContext } from "react";

type CarouselContextProps = {
  carouselUpdate: number;
  setCarouselUpdate: React.Dispatch<React.SetStateAction<number>>;
};

const CarouselContext = React.createContext<CarouselContextProps>({
  carouselUpdate: 0,
  setCarouselUpdate: () => {
    console.log("carousel context initialized");
  },
});

const useCarouselContext = (): CarouselContextProps => {
  const context = useContext(CarouselContext);
  return context;
};

export { CarouselContext, useCarouselContext };
