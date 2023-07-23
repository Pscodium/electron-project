import React, { useEffect, useState } from "react";
import {
    Button,
    Center,
    Stack,
    Text,
    useColorMode,
    Card,
    CardBody,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { FiChevronLeft, FiChevronRight, FiZoomIn } from 'react-icons/fi';
import ImageIdentifier from "../components/ImageIdentifier";
import lpr from "../assets/lpr_example.json";

export default function Home() {
    const { colorMode, toggleColorMode } = useColorMode();
    const [imageZoom, setImageZoom] = useState(2);
    const [canvasZoom, setCanvasZoom] = useState(70);
    const zoomPercentage = canvasZoom/100;
    const vehicleImageWidth = 1000 * zoomPercentage;

    useEffect(() => {
        console.log(vehicleImageWidth);
    }, [vehicleImageWidth]);

    return (
        <Center h="100vh">
            <Stack display="flex" justifyContent="center" alignItems='center' bg="chakra-body-bg" top="0px" h="60px" zIndex="10" w="100%" position="fixed">
                <a style={{ cursor: "pointer" }} onClick={() => window.location.href = '/'}>
                    <Text
                        align="center"
                        fontSize="25px"
                        className="header-title"
                        zIndex="20"
                    >Labeling</Text>
                </a>
                <Popover>
                    <PopoverTrigger>
                        <Button zIndex="30" position="fixed" right="80px">
                            <FiZoomIn />
                        </Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>Image Zoom</PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverBody>
                                <Slider
                                    aria-label='slider-ex-2'
                                    colorScheme='pink'
                                    onChange={setCanvasZoom}
                                    value={canvasZoom}
                                    defaultValue={50}
                                >
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb />
                                </Slider>
                            </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </Popover>
                <Button zIndex="30" position="fixed" right="15px" onClick={() => toggleColorMode()}>
                    {colorMode === "dark" ? <SunIcon/> : <MoonIcon/>}
                </Button>
            </Stack>
            <Center w="100%" h="100%" flexDirection="column">
                <Card w={vehicleImageWidth + 130} minW={450} h="70%" shadow="xs" alignItems='center'>
                    <Stack marginTop="10px" display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                        <Button bg="chakra" onClick={() => imageZoom == 1? setImageZoom(imageZoom) : setImageZoom(imageZoom - 1)}>
                            <FiChevronLeft />
                        </Button>
                        <ImageIdentifier zoom={imageZoom} lpr={lpr} width={vehicleImageWidth} />
                        <Button bg="chakra" onClick={() => imageZoom == 3? setImageZoom(imageZoom) : setImageZoom(imageZoom + 1)}>
                            <FiChevronRight />
                        </Button>
                    </Stack>
                    <CardBody width={vehicleImageWidth}>
                        <Text>Plate: {lpr.plate}</Text>
                        <Text>Brand: {lpr.carbigdata_vehicle_information.brand}</Text>
                        <Text>Model: {lpr.carbigdata_vehicle_information.model}</Text>
                        <Text>Brand Model: {lpr.carbigdata_vehicle_information.brand_model}</Text>
                        <Text>Model Year: {lpr.carbigdata_vehicle_information.model_year}</Text>
                        <Text>Color: {lpr.carbigdata_vehicle_information.color}</Text>
                        <Text>Type: {lpr.carbigdata_vehicle_information.type}</Text>
                    </CardBody>
                </Card>
                <Stack paddingTop="20px" w="50%" justifyContent="space-evenly" flexDirection="row" >
                    <Button bg="green.400" color="white" padding="30px" w="100px">
                        <IoMdCheckmark size="30" />
                    </Button>
                    <Button bg="red.400" color="white" padding="30px" w="100px" >
                        <IoMdClose size="30" />
                    </Button>
                </Stack>
            </Center>
        </Center>
    );
}
