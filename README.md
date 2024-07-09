# Nemanja-Markovic-BlueGrid-Task

This task demonstrates a Node.js application built with Express that fetches data from an external API, transforms it, and returns the transformed data as JSON. The application uses TypeScript for type safety and Streams for efficient data processing.To start application you must first do "npm install" command then "npm run dev" command.

By using Node.js streams, this application can handle large amounts of data efficiently. Streams allow processing data piece-by-piece (or chunk-by-chunk), which is particularly useful when working with large data sets or slow data sources. This approach helps to:

# Reduce Memory Usage: 
Instead of loading the entire response into memory, the application processes it in smaller chunks.
# Improve Performance:
Streams can start processing data as soon as it starts arriving, which can make the application more responsive.
# Handle Backpressure:
 Streams provide a way to manage the flow of data, preventing the application from being overwhelmed by too much data at once.

In this implementation, the data is streamed from the remote API using Axios. The response.data stream is then piped through a custom transform stream (UrlTransform). This transform stream processes each chunk of data to extract file URLs, build a nested structure, and convert it to JSON before passing it to the next stream, which is the HTTP response in this case.
 

# Project Structure

index.ts: The entry point of the application.
file.controller.ts: Contains the logic for handling file data.
file.router.ts: Defines the routing for file-related endpoints.
axios.service.ts: Provides a service for making HTTP requests using Axios.
transformer.service.ts: Defines the transformation logic for processing the data stream.

# Entry Point (index.ts):

Sets up the Express application.
Configures routes for file operations.
Starts the server on port 3000.
Handles errors globally.

# Controller (file.controller.ts):

Defines a request handler for fetching and processing file data.
Uses AxiosService to make a streaming GET request to the specified URL.
Pipes the response data through the UrlTransform stream to transform the data.
Sends the transformed data back to the client.

# Router (file.router.ts):

Defines the /api/files route and associates it with the dataFileHandler controller.

# Axios Service (axios.service.ts):

Provides a method for making streaming GET requests using Axios.

# Transformer Service (transformer.service.ts):

Defines a Transform stream (UrlTransform) that processes the incoming data stream.
Extracts file URLs from the input data.
Builds a nested structure based on the URLs.
Outputs the transformed data as a JSON string.
