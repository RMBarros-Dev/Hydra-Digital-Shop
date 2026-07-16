var builder = DistributedApplication.CreateBuilder(args);

// Redis/Docker is not available on this machine; use in-memory cache instead.
// Removed Redis project dependency and container orchestration.
var server = builder.AddProject<Projects.Hydra_Digital_Shop_Server>("server")
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

var webfrontend = builder.AddViteApp("webfrontend", "../frontend")
    .WithReference(server)
    .WaitFor(server);

// Also register the frontend project so Aspire can inject the backend URL into the Vite app environment
// Note: frontend project is already configured as a Vite app (webfrontend).
// If an explicit project registration is required, uncomment and adjust the line below when Projects.frontend exists.
// builder.AddProject<Projects.frontend>("frontend").WithReference(server);

server.PublishWithContainerFiles(webfrontend, "wwwroot");

builder.Build().Run();
