// Go (Golang) Cloud Services course content
export const goContent: { [key: string]: any } = {
  "go-language-philosophy": {
    id: "go-language-philosophy",
    title: "Go's Philosophy: Simplicity with Purpose",
    type: "text",
    duration: 20,
    content: [
      {
        id: "intro",
        type: "text",
        title: "Why Go?",
        content: "Go (or Golang) was designed at Google to make building networked and cloud-scale software approachable. Its creators focused on lightning-fast compilation, a minimal syntax, and batteries-included tooling so teams ship reliable services without ceremony."
      },
      {
        id: "design-goals",
        type: "text",
        title: "Language Design Goals",
        content: "Go's core principles keep teams productive:\n\n⚙️ Simplicity: a small, orthogonal feature set\n🚀 Developer velocity: quick builds and single-binary deployments\n🧵 Built-in concurrency: goroutines and channels as first-class citizens\n🧰 Pragmatic tooling: go fmt, go test, go mod standardize workflows\n☁️ Cloud native fit: static binaries, low memory footprint, predictable performance"
      },
      {
        id: "hello-go",
        type: "code",
        title: "Your First Go Program",
        language: "go",
        content: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, Go!\")\n}\n\n// Try it locally:\n// 1. Save this as main.go\n// 2. Run go run main.go\n// 3. Build a binary with go build"
      }
    ]
  },
  "go-tooling-setup": {
    id: "go-tooling-setup",
    title: "Setting Up Your Go Workspace",
    type: "text",
    duration: 25,
    content: [
      {
        id: "install",
        type: "text",
        title: "Installing Go",
        content: "1. Visit https://go.dev/dl and download the installer for your OS.\n2. Add Go's bin folder to your PATH (the installer usually does this).\n3. Verify the install with go version."
      },
      {
        id: "module-mode",
        type: "text",
        title: "Module-Aware Workspaces",
        content: "Go modules keep dependencies reproducible. Initialize a new project with:\n\ngo mod init github.com/you/service\n\nHelpful commands:\n• go fmt ./... — auto-format code\n• go test ./... — run unit tests\n• go run main.go — execute a file\n• go build — create a binary\n• go doc — read package documentation"
      },
      {
        id: "editor",
        type: "text",
        title: "Editor Essentials",
        content: "Use VS Code with the official Go extension for linting, refactors, and debugging. Configure format-on-save so gofmt keeps the codebase consistent."
      }
    ]
  },
  "go-first-program": {
    id: "go-first-program",
    title: "Project Layout and First Binary",
    type: "text",
    duration: 30,
    content: [
      {
        id: "layout",
        type: "text",
        title: "Idiomatic Project Structure",
        content: "A typical Go service keeps responsibilities clear:\n\nmy-service/\n|-- cmd/\n|   `-- server/main.go\n|-- internal/handlers\n|-- pkg/logger\n|-- go.mod\n`-- go.sum\n\nKeep packages focused and avoid deeply nested hierarchies."
      },
      {
        id: "build-run",
        type: "code",
        title: "Build and Run",
        language: "bash",
        content: "# Initialize module\ngo mod init github.com/example/myservice\n\n# Fetch dependencies\ngo get github.com/gorilla/mux\n\n# Build a binary\ngo build ./cmd/server\n\n# Run directly\ngo run ./cmd/server"
      }
    ]
  },
  "go-concurrency-primitives": {
    id: "go-concurrency-primitives",
    title: "Go Concurrency Primitives",
    type: "text",
    duration: 30,
    content: [
      {
        id: "goroutines",
        type: "text",
        title: "Goroutines",
        content: "Goroutines are lightweight threads managed by the Go runtime. They start with the go keyword and multiplex onto OS threads. Spawning thousands is normal thanks to tiny stack footprints."
      },
      {
        id: "channels",
        type: "code",
        title: "Channels for Synchronization",
        language: "go",
        content: "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc worker(id int, done chan<- bool) {\n    fmt.Printf(\"worker %d starting\\n\", id)\n    time.Sleep(1 * time.Second)\n    fmt.Printf(\"worker %d done\\n\", id)\n    done <- true\n}\n\nfunc main() {\n    done := make(chan bool)\n    go worker(1, done)\n\n    <-done // block until worker signals completion\n}\n"
      },
      {
        id: "select",
        type: "code",
        title: "Multiplexing with select",
        language: "go",
        content: "select {\ncase msg := <-jobs:\n    fmt.Println(\"received job\", msg)\ncase <-time.After(2 * time.Second):\n    fmt.Println(\"timeout waiting for job\")\n}"
      }
    ]
  },
  "go-goroutines-channels": {
    id: "go-goroutines-channels",
    title: "Goroutines, Pools, and Backpressure",
    type: "text",
    duration: 35,
    content: [
      {
        id: "pattern",
        type: "text",
        title: "Worker Pool Pattern",
        content: "Bounding concurrency keeps services stable. Worker pools process incoming tasks without overwhelming downstream systems."
      },
      {
        id: "worker-pool",
        type: "code",
        title: "Implementing a Worker Pool",
        language: "go",
        content: "func main() {\n    jobs := make(chan int, 100)\n    results := make(chan int, 100)\n\n    for w := 1; w <= 5; w++ {\n        go worker(w, jobs, results)\n    }\n\n    for j := 1; j <= 20; j++ {\n        jobs <- j\n    }\n    close(jobs)\n\n    for a := 1; a <= 20; a++ {\n        <-results\n    }\n}\n\nfunc worker(id int, jobs <-chan int, results chan<- int) {\n    for j := range jobs {\n        fmt.Printf(\"worker %d processing job %d\\n\", id, j)\n        time.Sleep(time.Second)\n        results <- j * 2\n    }\n}\n"
      }
    ]
  },
  "go-concurrency-patterns": {
    id: "go-concurrency-patterns",
    title: "Observability and Safety in Concurrent Go",
    type: "text",
    duration: 30,
    content: [
      {
        id: "context",
        type: "text",
        title: "Managing Lifecycles with context.Context",
        content: "context.Context propagates deadlines, cancellation signals, and request-scoped values. Accept a context as the first parameter in long-running operations so callers can cancel work."
      },
      {
        id: "errgroup",
        type: "code",
        title: "Coordinate Goroutines with errgroup",
        language: "go",
        content: "g, ctx := errgroup.WithContext(ctx)\nurls := []string{\n    \"https://service.internal/a\",\n    \"https://service.internal/b\",\n}\n\nfor _, url := range urls {\n    url := url\n    g.Go(func() error {\n        req, _ := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)\n        resp, err := http.DefaultClient.Do(req)\n        if err != nil {\n            return err\n        }\n        defer resp.Body.Close()\n        return nil\n    })\n}\n\nif err := g.Wait(); err != nil {\n    log.Fatal(err)\n}\n"
      },
      {
        id: "testing",
        type: "text",
        title: "Testing Concurrent Code",
        content: "Use t.Parallel judiciously and rely on the race detector with go test -race ./.... Guard shared state with mutexes or prefer message passing."
      }
    ]
  },
  "go-restful-services": {
    id: "go-restful-services",
    title: "Building RESTful APIs",
    type: "text",
    duration: 35,
    content: [
      {
        id: "router",
        type: "code",
        title: "Minimal HTTP Server",
        language: "go",
        content: "func main() {\n    mux := http.NewServeMux()\n    mux.HandleFunc(\"/healthz\", func(w http.ResponseWriter, r *http.Request) {\n        w.WriteHeader(http.StatusOK)\n        w.Write([]byte(\"ok\"))\n    })\n\n    srv := &http.Server{\n        Addr:    \":8080\",\n        Handler: mux,\n    }\n\n    log.Println(\"listening on :8080\")\n    log.Fatal(srv.ListenAndServe())\n}\n"
      },
      {
        id: "middleware",
        type: "text",
        title: "Middleware Essentials",
        content: "Wrap handlers to add logging, metrics, or auth. Keep middleware functions small and composable. Prefer context values over global variables for request metadata."
      },
      {
        id: "testing",
        type: "code",
        title: "Testing Handlers",
        language: "go",
        content: "func TestHealthHandler(t *testing.T) {\n    req := httptest.NewRequest(http.MethodGet, \"/healthz\", nil)\n    rr := httptest.NewRecorder()\n\n    handler(rr, req)\n\n    if rr.Code != http.StatusOK {\n        t.Fatalf(\"expected 200, got %d\", rr.Code)\n    }\n    if rr.Body.String() != \"ok\" {\n        t.Fatalf(\"expected body ok\")\n    }\n}\n"
      }
    ]
  },
  "go-microservices": {
    id: "go-microservices",
    title: "Service Boundaries and Contracts",
    type: "text",
    duration: 30,
    content: [
      {
        id: "boundaries",
        type: "text",
        title: "Design for Team Autonomy",
        content: "Define clear service ownership and avoid chatty APIs. Favor coarse-grained endpoints, schema evolution strategies, and compatibility testing."
      },
      {
        id: "grpc",
        type: "text",
        title: "REST vs. gRPC",
        content: "Go's standard library shines for REST. For high-throughput, strongly typed contracts, pair gRPC with Protocol Buffers to gain streaming and code generation."
      },
      {
        id: "resilience",
        type: "text",
        title: "Resilience Patterns",
        content: "Implement retries with backoff, circuit breakers, and request hedging. Libraries such as go-resiliency and circuit simplify these patterns."
      }
    ]
  },
  "go-cloud-deployment": {
    id: "go-cloud-deployment",
    title: "Deploying Go Services to the Cloud",
    type: "text",
    duration: 35,
    content: [
      {
        id: "containerization",
        type: "code",
        title: "Container-Friendly Build",
        language: "dockerfile",
        content: "# syntax=docker/dockerfile:1\nFROM golang:1.22-alpine AS build\nWORKDIR /app\nCOPY go.mod go.sum ./\nRUN go mod download\nCOPY . .\nRUN CGO_ENABLED=0 GOOS=linux go build -o service ./cmd/server\n\nFROM gcr.io/distroless/base-debian12\nCOPY --from=build /app/service /service\nEXPOSE 8080\nENTRYPOINT [\"/service\"]"
      },
      {
        id: "observability",
        type: "text",
        title: "Observability Checklist",
        content: "Instrument with OpenTelemetry, expose Prometheus metrics, and emit structured logs. Ship traces to a backend like Jaeger or Honeycomb for distributed debugging."
      },
      {
        id: "platforms",
        type: "text",
        title: "Platform Options",
        content: "Go binaries run anywhere: Docker on ECS, Kubernetes, Google Cloud Run, or serverless platforms like AWS Lambda. Automate go test, security scanning, and image signing inside CI/CD."
      }
    ]
  }
};

// Function to get Go course content
export const getGoContent = () => goContent;
