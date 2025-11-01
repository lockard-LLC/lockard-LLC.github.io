# API Schemas

This directory contains API specification files that serve as the root files for Postman API integration.

## Files

### openapi.yaml
The main OpenAPI 3.0 specification file that defines:
- API endpoints and operations
- Request/response schemas
- Authentication methods
- Data models

This file serves as the **root file** for the API schema in Postman.

## Usage with Postman

### Importing to Postman

1. **Via Postman UI:**
   - Open Postman
   - Go to APIs → Create API → Import OpenAPI
   - Select `openapi.yaml` as the root file

2. **Via Postman API:**
   - Use the API key to authenticate
   - Create an API with this schema as the root file
   - Collections will be automatically generated

### Directory Structure

```
docs/postman/
├── collections/          # Generated Postman collections
│   └── .gitkeep
├── schemas/             # API specification files
│   ├── openapi.yaml    # Root OpenAPI spec
│   └── README.md       # This file
└── environments/        # Postman environments (if needed)
```

### Syncing with Postman

When you connect this repository to Postman:
- `openapi.yaml` will be set as the root schema file
- Collections generated from this schema will appear in `docs/postman/collections/`
- Any updates to the schema can be synced bidirectionally

## Customization

Edit `openapi.yaml` to:
- Add new endpoints under `paths:`
- Define new data models under `components/schemas:`
- Add authentication methods under `components/securitySchemes:`
- Configure servers and environments

## Validation

Validate your OpenAPI schema:
```bash
# Using Postman CLI
postman api validate --api-id <api-id>

# Using online validator
https://editor.swagger.io/
```

## Integration with .well-known

The API discovery is configured in `/.well-known/apis.json` which references:
- This OpenAPI specification
- Postman collection metadata
- API documentation URLs
