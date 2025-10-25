# Firebase AI Logic Quickstart Guide

This guide follows the official Firebase AI Logic documentation to set up Gemini API integration in your web app.

## 📋 Prerequisites

- Modern web browser
- Node.js (optional but recommended)
- Firebase project with AI Logic enabled

## 🚀 Step 1: Set up Firebase Project and Connect Your App

### 1.1 Access Firebase Console
1. Sign into the [Firebase Console](https://console.firebase.google.com/)
2. Select your Firebase project
3. Navigate to the **Firebase AI Logic** page

### 1.2 Enable AI Logic Services
1. Click **"Get started"** to launch the guided workflow
2. Select your preferred Gemini API provider:

#### Option A: Gemini Developer API (Recommended)
- **Billing**: Optional (available on Spark plan)
- **Benefits**: No-cost tier available, easy setup
- **Limitations**: Rate limits on free tier

#### Option B: Vertex AI Gemini API (Production)
- **Billing**: Required (Blaze pricing plan)
- **Benefits**: Higher rate limits, production-ready
- **Cost**: Pay-as-you-go pricing

### 1.3 Configure APIs and Keys
The console will automatically:
- Enable required APIs
- Create a Gemini API key (for Developer API)
- Set up billing (for Vertex AI)

⚠️ **Important**: Do not add the Gemini API key directly to your app's codebase. Use Firebase App Check for security.

## 📦 Step 2: Add the SDK

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

## 🤖 Step 3: Initialize the Service and Create a Model Instance

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

## 💬 Step 4: Send a Prompt Request to a Model

### 4.1 Basic Text Generation
```javascript
async function run() {
  // Provide a prompt that contains text
  const prompt = "Write a story about a magic backpack.";
  
  // To generate text output, call generateContent with the text input
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  
  console.log(text);
}

run();
```

### 4.2 Complete Implementation
```javascript
import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

// Firebase configuration
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

// Initialize AI Logic service
const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });

// Create model instance
const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

// Generate content
async function generateContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

// Usage
generateContent("Write a story about a magic backpack.")
  .then(text => console.log(text))
  .catch(error => console.error(error));
```

## 🔧 Advanced Features

### Streaming Responses
```javascript
async function streamContent(prompt) {
  const result = await model.generateContentStream(prompt);
  
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    if (chunkText) {
      console.log(chunkText);
    }
  }
}
```

### Multimodal Prompts
```javascript
async function generateWithImage(prompt, imageData) {
  const result = await model.generateContent({
    contents: [{
      role: "user",
      parts: [
        { text: prompt },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageData // Base64 encoded image
          }
        }
      ]
    }]
  });
  
  return result.response.text();
}
```

### Multi-turn Conversations
```javascript
class ChatSession {
  constructor() {
    this.history = [];
  }
  
  async sendMessage(message) {
    this.history.push({
      role: "user",
      parts: [{ text: message }]
    });
    
    const result = await model.generateContent({
      contents: this.history
    });
    
    const response = result.response.text();
    
    this.history.push({
      role: "model",
      parts: [{ text: response }]
    });
    
    return response;
  }
}
```

### Structured Output (JSON)
```javascript
async function generateJSON(prompt, schema) {
  const structuredPrompt = `${prompt}

Please respond with a valid JSON object that matches this schema:
${JSON.stringify(schema, null, 2)}

Return only the JSON object, no additional text.`;

  const result = await model.generateContent(structuredPrompt);
  const response = result.response.text();
  
  try {
    return JSON.parse(response);
  } catch (error) {
    throw new Error("Failed to parse JSON response");
  }
}
```

### Model Parameters Configuration
```javascript
async function generateWithConfig(prompt) {
  const result = await model.generateContent({
    contents: [{
      role: "user",
      parts: [{ text: prompt }]
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

### Safety Settings
```javascript
async function generateWithSafety(prompt) {
  const result = await model.generateContent({
    contents: [{
      role: "user",
      parts: [{ text: prompt }]
    }],
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      }
    ]
  });
  
  return result.response.text();
}
```

## 🔒 Security Best Practices

### 1. Firebase App Check
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

## 📚 What Else Can You Do?

### Supported Capabilities
- **Text Generation**: Generate text from text-only prompts
- **Streaming**: Stream responses for faster interactions
- **Multimodal**: Handle images, video, audio, and PDFs
- **Conversations**: Build multi-turn chat experiences
- **Structured Output**: Generate JSON and structured data
- **Image Generation**: Generate images with Imagen models
- **Function Calling**: Connect to external systems
- **Safety Controls**: Configure content filtering

### Next Steps
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
- [Google AI Studio](https://aistudio.google.com/) - Experiment with prompts and configurations

---

*This guide provides a complete setup for Firebase AI Logic following the official documentation. For production deployment, ensure proper security measures and cost management.*
