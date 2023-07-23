enum ZoomTypes {
    NO_ZOOM = 1,
    VEHICLE = 2,
    PLATE = 3
}


interface LprProps {
    plate: string;
    plate_position: string;
    vehicle_position: string | null;
    image_url: string;
}
