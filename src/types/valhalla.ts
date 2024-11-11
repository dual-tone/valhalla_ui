export interface TraceRoutePayload {
    shape: Shape[];
    costing: string;
    shape_match: string;
}

export interface Shape {
    lat: number;
    lon: number;
    type: Type;
}

export enum Type {
    Break = "break",
    Via = "via",
}
