import React, { useState } from "react";
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
    SliderThumb,
    useDisclosure
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { FiChevronLeft, FiChevronRight, FiZoomIn } from 'react-icons/fi';
import ImageIdentifier from "../components/ImageIdentifier";
import lpr from "../assets/lpr_example.json";
import '../styles/home.css';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';

export default function Home() {
    const { colorMode, toggleColorMode } = useColorMode();
    const [imageZoom, setImageZoom] = useState(2);
    const [canvasZoom, setCanvasZoom] = useState(70);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const vehicleImageWidth = 1000 * (canvasZoom/100); // based on zoom slider position transform hundred percent in 1000 value

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
                            <PopoverHeader>Vehicle Image Scale</PopoverHeader>
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
                    <CardBody className="card-body" flexDirection='column' width={vehicleImageWidth}>
                        <text>Plate: <text id="inside-text">{lpr.plate}</text></text>
                        <text>Brand: <text id="inside-text">{lpr.carbigdata_vehicle_information.brand}</text></text>
                        <text >Model: <text id="inside-text">{lpr.carbigdata_vehicle_information.model}</text></text>
                        <text>Brand Model: <text id="inside-text">{lpr.carbigdata_vehicle_information.brand_model}</text></text>
                        <text>Model Year: <text id="inside-text">{lpr.carbigdata_vehicle_information.model_year}</text></text>
                        <text>Color:<text id="inside-text">{lpr.carbigdata_vehicle_information.color}</text></text>
                        <text>Type: <text id="inside-text">{lpr.carbigdata_vehicle_information.type}</text></text>
                    </CardBody>
                </Card>
                <Stack paddingTop="20px" w="50%" justifyContent="space-evenly" flexDirection="row" >
                    <Button bg="green.400" color="white" padding="30px" w="100px" onClick={onOpen}>
                        <IoMdCheckmark size="30" />
                    </Button>
                    <Button bg="red.400" color="white" padding="30px" w="100px" onClick={onOpen} >
                        <IoMdClose size="30" />
                    </Button>
                </Stack>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Confirm your choice</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>Are you sure of your choice?</Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="green" marginRight='5'>Confirm</Button>
                            <Button colorScheme='red' mr={3} onClick={onClose}>
                            Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Center>
        </Center>
    );
}
