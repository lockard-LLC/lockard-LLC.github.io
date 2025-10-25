# Firebase AI Logic Setup Guide

This guide shows you how to get started with Firebase AI Logic (formerly Vertex AI in Firebase) to make calls to the Gemini API directly from your app.

## 🚀 Prerequisites

- Modern web browser
- Node.js (optional but recommended)
- Firebase project with AI Logic enabled

## 📋 Step 1: Set up Firebase Project and Enable AI Logic

### 1.1 Access Firebase Console
1. Sign into the [Firebase Console](https://console.firebase.google.com/)
2. Select your Firebase project
3. Navigate to the **Firebase AI Logic** page

### 1.2 Enable AI Logic Services
1. Click **Get started** to launch the guided workflow
2. Select your preferred Gemini API provider:

#### Option A: Gemini Developer API (Recommended for beginners)
- **Billing**: Optional (available on Spark plan)
- **Benefits**: No-cost tier available, easy setup
- **Limitations**: Rate limits on free tier

#### Option B: Vertex AI Gemini API (For production)
- **Billing**: Required (Blaze pricing plan)
- **Benefits**: Higher rate limits, production-ready
- **Cost**: Pay-as-you-go pricing

### 1.3 Configure APIs and Keys
The console will automatically:
- Enable required APIs
- Create a Gemini API key (for Developer API)
- Set up billing (for Vertex AI)

⚠️ **Important**: Do not add the Gemini API key directly to your app's codebase. Use Firebase App Check for security.

## 📦 Step 2: Install Firebase AI Logic SDK

### 2.1 Install Firebase SDK
```bash
npm install firebase
```

### 2.2 Initialize Firebase in Your App
```javascript
import { initializeApp } from "firebase/app";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
```

## 🤖 Step 3: Initialize AI Logic Service

### 3.1 Import Required Modules
```javascript
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
```

### 3.2 Initialize AI Service
```javascript
// Initialize the Gemini Developer API backend service
const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });

// Create a GenerativeModel instance
const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });
```

## 💬 Step 4: Send Prompts to Gemini

### 4.1 Basic Text Generation
```javascript
async function generateStory() {
  try {
    const prompt = "Write a story about a magic backpack.";
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log(text);
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

// Usage
generateStory().then(story => {
  console.log("Generated story:", story);
});
```

### 4.2 Advanced Usage with Parameters
```javascript
async function generateWithParameters() {
  const result = await model.generateContent({
    contents: [{
      role: "user",
      parts: [{ text: "Explain quantum computing in simple terms." }]
    }],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    }
  });
  
  return result.response.text();
}
```

## 🔒 Security Best Practices

### 1. Use Firebase App Check
```javascript
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Initialize App Check
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('your-recaptcha-site-key'),
  isTokenAutoRefreshEnabled: true
});
```

### 2. Environment Variables
```bash
# .env file
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### 3. Server-Side Validation
```javascript
// Validate requests on your backend
app.post('/api/generate', async (req, res) => {
  try {
    // Verify App Check token
    const appCheckToken = req.header('X-Firebase-AppCheck');
    if (!appCheckToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Generate content
    const result = await model.generateContent(req.body.prompt);
    res.json({ text: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## 🎯 Model Selection Guide

### Available Models

| Model | Use Case | Capabilities |
|-------|----------|--------------|
| `gemini-2.5-flash` | General purpose, fast | Text generation, reasoning |
| `gemini-2.5-pro` | Complex tasks, high quality | Advanced reasoning, code generation |
| `gemini-1.5-flash` | Balanced performance | Good for most use cases |
| `gemini-1.5-pro` | Maximum capability | Best for complex tasks |

### Choosing the Right Model
```javascript
// For fast, simple tasks
const fastModel = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

// For complex, high-quality output
const proModel = getGenerativeModel(ai, { model: "gemini-2.5-pro" });
```

## 🔄 Streaming Responses

### Real-time Generation
```javascript
async function streamGeneration() {
  const result = await model.generateContentStream("Write a poem about coding.");
  
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log("Chunk:", chunkText);
    // Update UI with streaming text
  }
}
```

## 🖼️ Working with Images (Imagen)

### Generate Images
```javascript
import { getImagenModel } from "firebase/ai";

// Create Imagen model instance
const imagenModel = getImagenModel(ai, { model: "imagen-3" });

async function generateImage() {
  const result = await imagenModel.generateImage({
    prompt: "A futuristic city with flying cars",
    config: {
      numberOfImages: 1,
      aspectRatio: "16:9"
    }
  });
  
  return result.images[0];
}
```

## 🚀 Deployment Considerations

### 1. Rate Limits
- **Developer API**: 15 requests per minute (free tier)
- **Vertex AI**: Higher limits with billing

### 2. Cost Management
```javascript
// Implement request throttling
class AIService {
  constructor() {
    this.requestQueue = [];
    this.isProcessing = false;
  }
  
  async throttledRequest(prompt) {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({ prompt, resolve, reject });
      this.processQueue();
    });
  }
  
  async processQueue() {
    if (this.isProcessing || this.requestQueue.length === 0) return;
    
    this.isProcessing = true;
    const { prompt, resolve, reject } = this.requestQueue.shift();
    
    try {
      const result = await model.generateContent(prompt);
      resolve(result.response.text());
    } catch (error) {
      reject(error);
    } finally {
      this.isProcessing = false;
      setTimeout(() => this.processQueue(), 1000); // 1 second delay
    }
  }
}
```

### 3. Error Handling
```javascript
async function safeGenerate(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return { success: true, text: result.response.text() };
  } catch (error) {
    if (error.code === 'quota-exceeded') {
      return { success: false, error: 'Rate limit exceeded' };
    }
    return { success: false, error: error.message };
  }
}
```

## 📚 Next Steps

1. **Try the quickstart app** to see complete implementations
2. **Set up Firebase App Check** for production security
3. **Choose appropriate models** for your use cases
4. **Implement proper error handling** and rate limiting
5. **Test with your specific prompts** and use cases

## 🔗 Additional Resources

- [Firebase AI Logic Documentation](https://firebase.google.com/docs/ai)
- [Gemini API Reference](https://ai.google.dev/docs)
- [Firebase App Check Setup](https://firebase.google.com/docs/app-check)
- [Pricing Information](https://firebase.google.com/pricing)

---

*This guide provides a complete setup for Firebase AI Logic. For production deployment, ensure proper security measures and cost management.*
