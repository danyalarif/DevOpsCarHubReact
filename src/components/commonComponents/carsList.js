import { Box, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";

import CarCard from "./carCard";
export default function CarsList({cars}) {
    const theme = useMantineTheme()
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  return (
    <>
      <Box mt="md" >
        <Carousel
        
          slideGap="xl"
          align="center"
          slideSize={400}
          
          breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}    
        >
            {
                  cars.map((car) => {
                        return (
                        <Carousel.Slide >
                                    <CarCard car={car} />
                              </Carousel.Slide>
                        )
                  })
            }
        </Carousel>
      </Box>
    </>
  );
}
