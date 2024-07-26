# Nemanja-Markovic-BlueGrid-Task

# Mandatory

First run command "docker compose up -d"
Ensure that port 27017 is not being used by any other Docker container. If it is, stop the conflicting containers.
Then run the command again: "docker compose up -d"

To start application you must first do "npm install" command,
then "npm run dev" command.

# Pre-requisites

Install Node.js (version 14 or later)

# Overview

Upon starting the application, the saveLatesResponse function is invoked and cron job. This function calls an endpoint to fetch data. Initially, this process takes about 11 seconds to complete. Once the data is fetched, it is made available at the /api/files endpoint, where it can be accessed in the required data structure format in less than half a second.

The application also sets up a cron job that runs every 60 seconds. This cron job updates the existing data by calling the same saveLatesResponse function, ensuring that the data remains up-to-date and is always available at the endpoint.

Overall, this approach of using a cron job to periodically update and cache data in a local database provides a balance between efficient data retrieval and improved user experience. It optimizes both performance and reliability, ensuring that the application delivers fast and up-to-date data while minimizing external API load and potential issues.

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
cronJob.service.ts: Manages and schedules cron jobs using the cron library, initializes with a schedule and task, starts the job, and logs events.
db.service.ts: Establishes a connection to MongoDB, handles logging for success and errors, and terminates the process on failure.
logger.service.ts: Configures Winston for logging with levels (info and error), JSON formatting, timestamps, and different transports (console and file).
fileModel.ts: Defines a Mongoose schema for storing file data in MongoDB with timestamps and flexible content format, and exports the File model.

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

# CronJobService (cronJob.service.ts):

Purpose: Manages and schedules cron jobs using the cron library.
Constructor: Initializes a CronJob instance with a specified schedule (cronTime) and a task (onTick) to run at each interval.
startCronJob: Starts the cron job and logs the event using the logger service. Logs include information about the cron job's schedule (cronTime).

# ConnectDB (db.service.ts):

Purpose: Establishes a connection to MongoDB using Mongoose.
Connection URI: Uses the MONGO_URI environment variable or a default URI if not provided.
Logging:
Logs a success message when connected successfully.
Logs an error message with detailed information if the connection fails.
Error Handling:
Differentiates between known errors (Error instances) and unknown errors.
Logs error details including the message and stack trace, if available.
Exit: Terminates the process with a non-zero status code if the connection fails.

# Logger Configuration (logger.service.ts):

Purpose: Configures a logging system using Winston to capture and store log messages.
Logging Levels:
info: Logs general information messages.
error: Logs error messages specifically.
Format:
Timestamp: Adds a timestamp to each log entry.
JSON: Formats log messages as JSON.
Pretty Print: Makes JSON output more readable.
Transports:
Console: Logs messages to the console.
File:
error.log: Stores error messages.
combined.log: Stores all log messages (both info and error).
Export: Provides a logger instance for use throughout the application.

# File Model (fileModel.ts):

Purpose: Defines the Mongoose schema and model for storing file data in MongoDB.
Schema Definition:
data: Stores the file's content in a flexible format using Schema.Types.Mixed.
createdAt: Timestamp for when the document was created, defaults to the current date and time.
updatedAt: Timestamp for when the document was last updated, defaults to the current date and time.
Model:
Name: File
Type: IFile (interface that defines the shape of the data)
Export: Provides the File model for use in repository operations.
