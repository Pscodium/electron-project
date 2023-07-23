import React, { useEffect, useRef, useState } from 'react';

interface ImageIdentifierProps {
    width?: number;
    zoom: ZoomTypes;
    lpr: LprProps;
}

interface VehicleInfo {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface Point {
    x: number;
    y: number;
}

const lprImageWidth = 1920;
const lprImageHeight = 1080;
const lprImageRatio = lprImageWidth / lprImageHeight;

export default function ImageIdentifier(props: ImageIdentifierProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const divCanvasRef = useRef<HTMLDivElement>(null);
    const [image] = useState<HTMLImageElement>(new Image());
    let vehicleInfo: VehicleInfo | null = props.lpr.vehicle_position ? JSON.parse(props.lpr.vehicle_position) : null;
    const plateInfo: Point[] | null = props.lpr.plate_position ? JSON.parse(props.lpr.plate_position) : null;

    useEffect(() => {
        if (!props.lpr.image_url || !props.zoom) return;

        image.addEventListener('load', () => {
            if (props.zoom == 3) drawPlateImage();

            if (props.zoom == 2) drawVehicleImage();
        });
        image.src = props.lpr.image_url;

    }, [props.zoom]);

    async function drawVehicleImage() {
        if (!vehicleInfo && !plateInfo) {
            return;
        }

        if (!vehicleInfo) {
            vehicleInfo = guessVehiclePosition();
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = 1920;
        canvas.height = 1080;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        if (vehicleInfo.width / vehicleInfo.height > lprImageRatio) {
            // based on vehicle width
            const oldHeight = vehicleInfo.height;
            vehicleInfo.height = vehicleInfo.width / lprImageRatio;
            const heightDiff = vehicleInfo.height - oldHeight;
            vehicleInfo.y -= (heightDiff / 2);

            if (vehicleInfo.height + vehicleInfo.y > lprImageHeight) {
                vehicleInfo.y -= vehicleInfo.height + vehicleInfo.y - lprImageHeight;
            }

            if (vehicleInfo.y < 0) {
                vehicleInfo.y = 0;
            }
        } else {
            // based on vehicle height
            const oldWidth = vehicleInfo.width;
            vehicleInfo.width = vehicleInfo.height * lprImageRatio;
            const widthDiff = vehicleInfo.width - oldWidth;
            vehicleInfo.x -= (widthDiff / 2);

            if (vehicleInfo.width + vehicleInfo.x > lprImageWidth) {
                vehicleInfo.x -= vehicleInfo.width + vehicleInfo.x - lprImageWidth;
            }

            if (vehicleInfo.x < 0) {
                vehicleInfo.x = 0;
            }
        }

        ctx.drawImage(
            image,
            vehicleInfo.x,
            vehicleInfo.y,
            vehicleInfo.width,
            vehicleInfo.height,
            0,
            0,
            canvas.width,
            canvas.height,
        );
    }

    async function drawPlateImage() {

        if (!plateInfo) {
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = 1920;
        canvas.height = 1080;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        const plateDimension = getPlateDimension();

        if (plateDimension.width / plateDimension.height > lprImageRatio) {
            // based on vehicle width
            const oldHeight = plateDimension.height;
            plateDimension.height = plateDimension.width / lprImageRatio;
            const heightDiff = plateDimension.height - oldHeight;
            plateDimension.y -= (heightDiff / 2);

            if (plateDimension.height + plateDimension.y > lprImageHeight) {
                plateDimension.y -= plateDimension.height + plateDimension.y - lprImageHeight;
            }

            if (plateDimension.y < 0) {
                plateDimension.y = 0;
            }
        } else {
            // based on vehicle height
            const oldWidth = plateDimension.width;
            plateDimension.width = plateDimension.height * lprImageRatio;
            const widthDiff = plateDimension.width - oldWidth;
            plateDimension.x -= (widthDiff / 2);

            if (plateDimension.width + plateDimension.x > lprImageWidth) {
                plateDimension.x -= plateDimension.width + plateDimension.x - lprImageWidth;
            }

            if (plateDimension.x < 0) {
                plateDimension.x = 0;
            }
        }

        ctx.drawImage(
            image,
            plateDimension.x,
            plateDimension.y,
            plateDimension.width,
            plateDimension.height,
            0,
            0,
            canvas.width,
            canvas.height,
        );
    }

    function guessVehiclePosition(): VehicleInfo {
        const plateDimension = getPlateDimension();
        const vehicleWidth = plateDimension.width * 4; // vehicle should be something like 4 times larger than the plate
        const widthCenter = plateDimension.x + plateDimension.width - (plateDimension.width / 2);
        const heightCenter = plateDimension.y + plateDimension.height - (plateDimension.height / 2);
        const guessedVehiclePosition: VehicleInfo = {
            x: widthCenter - (vehicleWidth / 2),
            y: heightCenter - (vehicleWidth / 2),
            width: vehicleWidth,
            height: vehicleWidth
        };

        return guessedVehiclePosition;
    }

    function getPlateDimension() {

        if (!plateInfo) {
            throw Error("There's no plate info.");
        }

        const rect = {
            minX: Infinity,
            maxX: 0,
            minY: Infinity,
            maxY: 0
        };

        for (const position of plateInfo) {
            if (position.x < rect.minX) {
                rect.minX = position.x;
            }

            if (position.x > rect.maxX) {
                rect.maxX = position.x;
            }

            if (position.y < rect.minY) {
                rect.minY = position.y;
            }

            if (position.y > rect.maxY) {
                rect.maxY = position.y;
            }
        }

        return {
            x: rect.minX,
            y: rect.minY,
            width: rect.maxX - rect.minX,
            height: rect.maxY - rect.minY
        };
    }

    return (
        <div ref={divCanvasRef} style={{
            width: props.width,
            height: props.width? props.width/lprImageRatio : 0,
        }}>
            {props.zoom == 1?
                <img src={props.lpr.image_url} style={{ width: props.width, height: props.width? props.width/lprImageRatio : 0, borderRadius: 5 }}/>
                :
                <canvas ref={canvasRef} style={{ width: props.width, height: props.width? props.width/lprImageRatio : 0, borderRadius: 5 }} />
            }
        </div>
    );
}
