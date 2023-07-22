import { Image } from '@chakra-ui/react';
import React from 'react';

interface ImageIdentifierProps {
    width?: number | string;
    height?: number | string;
    src: string;
}

export default function ImageIdentifier(props: ImageIdentifierProps) {
    return (
        <Image src={props.src} w={props.width} h={props.height}/>
    );
}
