export type Launch = {
    id: string,
    name: string,
    net: string,
    pad: Pad,
};

export type Pad = {
    id: number,
    url: string,
    name: string,
    map_url: string,
    latitude: string,
    longitude: string,
    map_image: string,
    location: Location,
};

export type Location = {
    id: number,
    url: string,
    name: string,
    country_code: string,
    map_image: string,
}