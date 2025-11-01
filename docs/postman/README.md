# Postman API Integration

This directory contains all Postman-related files for the Lockard LLC API.

## 📁 Directory Structure

```
docs/postman/
├── collections/          # Postman collections (auto-generated)
├── schemas/             # API specifications (OpenAPI/AsyncAPI)
│   └── openapi.yaml    # Root schema file
├── environments/        # Environment configurations
│   ├── development.json
│   └── production.json
├── scripts/             # Helper scripts and validators
└── README.md            # This file
```

## 🚀 Getting Started

### 1. Set Up Your Postman API Key

Add your Postman API key to the environment:

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Postman API key
POSTMAN_API_KEY=PMAK-your-api-key-here
```

### 2. Choose Your Root Schema File

The **root file** is the main API specification that Postman uses to generate collections:
- **Default:** `docs/postman/schemas/openapi.yaml`
- This file contains all API endpoints, models, and authentication configs

### 3. Configure Collection Directory

Collections will be stored in:
- **Default:** `docs/postman/collections/`
- Collections synced from Postman will appear here
- You can commit these to Git for version control

## 📋 What to Tell Postman

When setting up your API in Postman, use these values:

| Setting | Value |
|---------|-------|
| **API Name** | Lockard LLC API |
| **Root Schema File** | `docs/postman/schemas/openapi.yaml` |
| **Schema Type** | OpenAPI 3.0 |
| **Collections Directory** | `docs/postman/collections/` |
| **Sync Strategy** | Bidirectional (recommended) |

## 🔧 Next Steps with API Key

Once you have your Postman API key, I can help you:

1. **Create a Workspace** - Set up a dedicated Postman workspace
2. **Create an API** - Initialize the API with your OpenAPI schema
3. **Generate Collections** - Auto-generate collections from the schema
4. **Set Up Environments** - Configure dev/staging/prod environments
5. **Create Mock Servers** - Generate mock APIs for testing
6. **Add Tests** - Write automated test scripts

## 📖 Example Commands

### Create API in Postman
```bash
# Using Postman API (once your key is configured)
curl -X POST https://api.getpostman.com/apis \
  -H "X-API-Key: YOUR_POSTMAN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "api": {
      "name": "Lockard LLC API",
      "summary": "Main API for Lockard LLC services"
    }
  }'
```

### Import Schema
```bash
# Import the OpenAPI schema to Postman
postman import docs/postman/schemas/openapi.yaml
```

## 🔗 Integration with .well-known

The API is discoverable via:
- `/.well-known/apis.json` - API discovery document
- `/.well-known/postman.json` - Postman collection metadata
- `/.well-known/security.txt` - Security contact info

## 🛠️ Customizing Your API

### Add New Endpoints

Edit `docs/postman/schemas/openapi.yaml` and add under `paths:`:

```yaml
paths:
  /your-endpoint:
    get:
      summary: Your endpoint description
      responses:
        '200':
          description: Success response
```

### Add Data Models

Add schemas under `components/schemas:`:

```yaml
components:
  schemas:
    YourModel:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
```

### Configure Authentication

Modify `components/securitySchemes:`:

```yaml
components:
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
```

## 📚 Resources

- [Postman API Documentation](https://learning.postman.com/docs/developer/intro-api/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Postman API Network](https://www.postman.com/api-network/)

## 🤝 Contributing

When adding new API endpoints:
1. Update `docs/postman/schemas/openapi.yaml`
2. Validate the schema with Swagger Editor
3. Sync to Postman to regenerate collections
4. Test all endpoints
5. Commit changes to Git

---

**Ready to connect?** Once you provide your Postman API key, I can automate all of this setup for you!
