# .well-known Directory

This directory contains standard well-known URIs as defined by RFC 8615.

## Files

### security.txt
Security contact and policy information following RFC 9116.
- **Purpose**: Provides security researchers with contact information
- **Update**: Review and update the expiration date annually

### apis.json
API discovery document following the APIs.json specification.
- **Purpose**: Describes available APIs and their documentation
- **Related**: Links to postman.json for API testing
- **Docs**: References detailed guides in `docs/postman/`

### postman.json
Postman collection for API testing and exploration.
- **Purpose**: Provides ready-to-use API collection for developers
- **Integration**: Used with Postman API and workspace

### config.template.json
Template for environment-specific configuration.
- **Purpose**: Provides structure for configuration without exposing secrets
- **Usage**: Copy to config.json and fill in actual values (never commit config.json)

## Usage

These files are served at:
- `https://lockard-llc.github.io/.well-known/security.txt`
- `https://lockard-llc.github.io/.well-known/apis.json`
- `https://lockard-llc.github.io/.well-known/postman.json`

## Configuration

For Postman integration:
1. Set `POSTMAN_API_KEY` environment variable
2. Use the config.template.json as a guide
3. Keep actual API keys in environment variables or secure configuration

## Maintenance

- Review security.txt expiration date before October 31, 2026
- Update API endpoints in apis.json and postman.json as services evolve
- Keep documentation URLs current
