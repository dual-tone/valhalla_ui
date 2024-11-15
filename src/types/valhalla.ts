export interface TraceRoutePayload {
    shape: Shape[];
    costing: string;
    shape_match: string;
}

export interface TraceRouteJson {
    locations: TraceRouteLocation[];
    costing: string;
    costing_options: CostingOptions;
    units: string;
    id: string;
}

export interface CostingOptions {
    auto: Auto;
}

export interface Auto {
    country_crossing_penalty: number;
}

export interface TraceRouteLocation {
    lat: number;
    lon: number;
}


export interface Shape {
    lat: number;
    lon: number;
    type: Type;
    original_index?: number;
}

export enum Type {
    Break = "break",
    Via = "via",
}

// Responses
export interface RouteReponse {
    trip: Trip;
    id: string;
}

export interface TraceRouteResponse {
    trip: Trip;
    alternates: Alternate[];
}

export interface Alternate {
    trip: Trip;
}

export interface Trip {
    locations: Location[];
    legs: Leg[];
    summary: Summary;
    status_message: string;
    status: number;
    units: string;
    language: string;
}

export interface Leg {
    maneuvers: Maneuver[];
    summary: Summary;
    shape: string;
}

export interface Maneuver {
    type: number;
    instruction: string;
    verbal_succinct_transition_instruction?: string;
    verbal_pre_transition_instruction: string;
    verbal_post_transition_instruction?: string;
    street_names?: string[];
    time: number;
    length: number;
    cost: number;
    begin_shape_index: number;
    end_shape_index: number;
    travel_mode: string;
    travel_type: string;
    verbal_transition_alert_instruction?: string;
}

export interface Summary {
    has_time_restrictions: boolean;
    has_toll: boolean;
    has_highway: boolean;
    has_ferry: boolean;
    min_lat: number;
    min_lon: number;
    max_lat: number;
    max_lon: number;
    time: number;
    length: number;
    cost: number;
}

export interface Location {
    type: string;
    lat: number;
    lon: number;
    original_index: number;
}

// Matrix API
export interface SourceToTargetPayload {
    sources: Source[];
    targets: Source[];
    costing: string;
    shape_format: string;
}

export interface SourceToTargetResponse {
    algorithm: string;
    units: string;
    sources: Source[];
    targets: Source[];
    sources_to_targets: Array<SourcesToTarget[]>;
}

export interface Source {
    lon: number;
    lat: number;
}

export interface SourcesToTarget {
    shape: string;
    distance: number;
    time: number;
    to_index: number;
    from_index: number;
}
