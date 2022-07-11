export type Launch = {
    id: string,
    name: string,
    net: string,
    pad: Pad,
    status: Status,
};

export type Status = {
    id: number,
    abbrev: string,
}

export type Pad = {
    id: number,
    url: string,
    name: string,
    map_url: string,
    latitude: string,
    longitude: string,
    map_image: string,
    location: Location,
    agency_id: number,
};

export type Location = {
    id: number,
    url: string,
    name: string,
    country_code: string,
    map_image: string,
}

export type Agency = {
    id: string,
};

export type LaunchesGetParams = {
    limit: number,
    net__gt: string,
    net__lt: string,
    status?: number,
}
