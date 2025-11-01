# Postman Quick Start Guide 🚀

## ✅ Setup Complete

Your repository is now ready for Postman API integration with all the necessary files and structure.

## 📋 When Setting Up in Postman

Use these exact values:

| Field | Value |
|-------|-------|
| **API Schema Root File** | `docs/postman/schemas/openapi.yaml` |
| **Collection Directory** | `docs/postman/collections/` |
| **Schema Type** | OpenAPI 3.0 |

## 🔑 Get Your API Key Ready

1. Go to: <https://go.postman.co/settings/me/api-keys>

2. Click "Generate API Key"
3. Copy the key (format: `PMAK-...`)
4. Add to `.env` file:

   ```bash
   POSTMAN_API_KEY=PMAK-your-key-here
   ```

## 🎯 Quick Start Steps

### Step 1: Install Dependencies

```bash
yarn install
# or
npm install
```

### Step 2: Run Setup Helper

```bash
yarn postman:setup
# or
npm run postman:setup
```

This will:

- ✅ Verify your API key
- ✅ Show your Postman account info
- ✅ List your workspaces
- ✅ Display the configuration summary

### Step 3: Import to Postman

**Option A: Via Postman UI** (Recommended)

1. Open Postman (<https://web.postman.co>)
2. Go to **APIs** → **Create API** → **Import**
3. Choose **File** → Select `docs/postman/schemas/openapi.yaml`
4. Set collection directory: `docs/postman/collections/`
5. Click **Import**

**Option B: Via Git Integration**

1. In Postman, go to **APIs** → **Create API** → **Connect Repository**
2. Connect your GitHub repository
3. Select branch: `main`
4. Root file: `docs/postman/schemas/openapi.yaml`
5. Collection directory: `docs/postman/collections/`

## 📁 What's Been Created

```
docs/postman/
├── collections/              # Collections go here (auto-synced)
│   └── .gitkeep
├── schemas/                  # Your API specifications
│   ├── openapi.yaml         # 👈 ROOT FILE (use this in Postman)
│   └── README.md
├── environments/             # Environment configs
│   ├── development.json     # Local dev environment
│   └── production.json      # Production environment
├── scripts/                 # Helper scripts and validators
└── README.md                # Full documentation
```

## 🔗 Your API is Discoverable

Your API is now discoverable at:

- **APIs.json**: <https://lockard-llc.github.io/.well-known/apis.json>
- **OpenAPI Spec**: <https://lockard-llc.github.io/docs/postman/schemas/openapi.yaml>
- **Postman Collection**: <https://lockard-llc.github.io/.well-known/postman.json>

## 🛠️ Available Commands

```bash
# Validate .well-known directory
yarn wellknown:validate

# Run Postman setup helper
yarn postman:setup

# Start local development server
yarn dev

# Deploy to Firebase
yarn deploy
```

## 📖 Your API Includes

The OpenAPI schema (`openapi.yaml`) includes:

✅ **Health Check Endpoint** - `/health`
✅ **Authentication** - `/auth/login`
✅ **User Management** - `/users`
✅ **API Key & JWT Auth** - Pre-configured security schemes
✅ **Pagination** - Built-in pagination support
✅ **Error Handling** - Standardized error responses

## 🎨 Customizing Your API

### Add a New Endpoint

Edit `docs/postman/schemas/openapi.yaml`:

```yaml
paths:
  /your-endpoint:
    get:
      summary: Your endpoint description
      tags:
        - YourTag
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/YourModel'
```

### Add a New Model

```yaml
components:
  schemas:
    YourModel:
      type: object
      required:
        - id
        - name
      properties:
        id:
          type: string
        name:
          type: string
```

## 🔒 Security Notes

- ✅ `.env` is gitignored - never commit API keys
- ✅ Use environment variables for secrets
- ✅ Actual config files are ignored (only templates committed)
- ✅ Security.txt is configured at `/.well-known/security.txt`

## 🆘 Troubleshooting

### API Key Not Working?

1. Check it's in `.env` as `POSTMAN_API_KEY=PMAK-...`
2. Verify the key has proper permissions in Postman
3. Try generating a new key

### Can't Find Root File?

- The root file is: `docs/postman/schemas/openapi.yaml`
- This file exists and is ready to use
- Make sure you're in the repository root

### Collections Not Syncing?

1. Ensure collection directory is set to: `docs/postman/collections/`
2. Check Git integration is enabled
3. Verify workspace permissions

## 🎉 Next Steps

1. **Get your API key** from Postman
2. **Run the setup**: `yarn postman:setup`
3. **Import to Postman** using the UI or Git
4. **Start building** your API endpoints!

## 📚 Resources

- [Full Documentation](./README.md)
- [Schema Documentation](./schemas/README.md)
- [Postman API Docs](https://learning.postman.com/docs/developer/intro-api/)
- [OpenAPI Specification](https://swagger.io/specification/)

---

**Need help?** Check the detailed README in `./README.md` or see `.well-known/security.txt` for contact info.
