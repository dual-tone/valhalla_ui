# Running Valhalla UI Locally

To run this repository locally using Docker, follow these steps:

## Prerequisites

- Ensure that the Valhalla engine is running and accessible from your machine.

## Steps

1. **Clone the repository:**
    ```sh
    git clone https://github.com/dual-tone/valhalla_ui.git
    cd valhalla_ui
    ```

2. **Build the Docker image:**
    ```sh
    docker build -t valhalla_ui .
    ```

3. **Run the Docker container:**
    ```sh
    docker run -p 3000:3000 valhalla_ui
    ```

4. **Access the application:**
    Open your web browser and navigate to `http://localhost:3000`.

Make sure the Valhalla engine is running and accessible to ensure the UI functions correctly.