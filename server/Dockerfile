# Stage 1: Build
FROM rust:latest AS builder

WORKDIR /app

# Cache dependencies first
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release && rm -rf src

# Copy the source code and build
COPY . .
RUN cargo build --release

# Stage 2: Minimal runtime
FROM debian:bookworm-slim

# Install system dependencies
RUN apt-get update && apt-get install -y libssl3 sqlite3 ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Create a non-root user
RUN useradd -m appuser

# Copy the binary from the builder stage
COPY --from=builder /app/target/release/bbk-server /app/bbk-server

# Create a directory for the SQLite database
RUN mkdir -p /app/data && chown -R appuser:appuser /app/data

# Change ownership and permissions
RUN chown appuser:appuser /app/bbk-server && chmod +x /app/bbk-server

# Switch to the non-root user
USER appuser

ENV DB_PATH=/app/data/db.sqlite

# Expose the application port
EXPOSE 3000

# Run the binary
CMD ["/app/bbk-server"]
