# Valhalla UI

This repository is intended to build a Vue Single Page Application (SPA) to visualize the API of the Valhalla routing engine.

## General Features

- Hovering on layers provides additional details.
- Clear layers (marker, polyline, etc...)

## APIs

### Route API
The Route API calculates the optimal route between specified locations, considering various factors such as distance, time, and road conditions.

#### Features
- [x] Calculate optimal route
- [ ] Support for multiple waypoints
- [ ] Real-time traffic data integration

### Matrix API
The Matrix API generates a distance and time matrix for multiple locations, useful for solving problems like the traveling salesman or vehicle routing.

#### Features
- [X] Generate distance time matrix
- [ ] Support for large datasets

### Isochrone API
The Isochrone API creates polygons representing areas reachable within a specified time or distance from a given location.

#### Features
- [ ] Generate isochrone polygons
- [ ] Customizable time/distance intervals
- [ ] Integration with other mapping services

### Elevation API
The Elevation API provides elevation data for a given set of coordinates, useful for applications requiring terrain information.

#### Features
- [ ] Retrieve elevation data
- [ ] Batch processing of coordinates
- [ ] Smoothing of elevation profiles

### Trace Attributes API
The Trace Attributes API matches a GPS trace to the road network and returns detailed information about the matched route, including speed limits and road types.

#### Features
- [ ] Match GPS trace to road network
- [ ] Return speed limits
- [ ] Return road types
- [ ] Support for different GPS formats

### Optimized Route API
The Optimized Route API calculates the most efficient route for multiple stops, optimizing the order of visits to minimize travel time or distance.

#### Features
- [ ] Calculate optimized route
- [ ] Support for dynamic re-routing
- [ ] Integration with scheduling systems

## Settings

The Valhalla UI includes a settings module where you can configure the Valhalla engine endpoint and set up basic authentication. All configuration data is stored locally on your machine, and no data is sent outside of your machine.

### Configuration Options
- **Valhalla Engine Endpoint**: Specify the endpoint URL for the Valhalla routing engine.
- **Basic Authentication**: Set up basic authentication by providing a username and password.

## Getting Started

To get started with the Valhalla UI, clone the repository and follow the installation instructions in the `INSTALL.md` file.

## Contributing

Contributions are welcome! Please read the `CONTRIBUTING.md` file for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.