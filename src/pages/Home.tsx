import React from "react";
import { Button, Center, Stack, Text, useColorMode, Icon, Card } from '@chakra-ui/react';
import { MoonIcon, SunIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import ImageIdentifier from "../components/ImageIdentifier";

export default function Home() {
    const { colorMode, toggleColorMode } = useColorMode();

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
                <Button zIndex="30" position="fixed" right="15px" onClick={() => toggleColorMode()}>
                    {colorMode === "dark" ? <SunIcon/> : <MoonIcon/>}
                </Button>
            </Stack>
            <Center w="100%" h="100%" flexDirection="column">
                <Card w="60%" h="70%" shadow="xs">
                    <ImageIdentifier src="https://objectstorage.sa-saopaulo-1.oraclecloud.com/n/grtqyv6nwfc2/b/intelbras/o/6a5c3120-3d9d-11ed-9816-79eff64c2d45.stream/RDS1H86-20230721150202.jpg"/>
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
