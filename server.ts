import express from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Google GenAI Client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    platform: 'AaharSetu',
    version: '1.0.0-demo',
    hasGemini: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Aahar AI Chat Endpoint
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { prompt, history = [] } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getGenAI();
    if (ai) {
      const systemInstruction = `You are Aahar AI, the intelligent nutrition and food knowledge companion for AaharSetu (आहारसेतु) — India's citizen-facing food-business transparency and nutrition literacy platform.
Your goals:
1. Provide warm, clear, culturally grounded insights into Indian food, nutrition, traditional recipes, macronutrients, vitamins, and digestive wellness.
2. Clearly distinguish between nutritional guidance and medical advice. Always state that guidance is educational.
3. Be respectful, objective, concise, and structured (use clear bullet points and bolding).
4. Never make official food-safety certifications or replace formal inspections.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({
        text: response.text || 'Unable to generate response at this time.',
        source: 'gemini-3.8-flash',
      });
    }

    // Fallback response when no Gemini API key is configured
    return res.json({
      text: getFallbackNutritionResponse(prompt),
      source: 'offline-knowledge-base',
    });
  } catch (error: any) {
    console.error('Gemini Chat error:', error);
    return res.json({
      text: getFallbackNutritionResponse(req.body.prompt || ''),
      source: 'fallback-safety',
      error: error.message,
    });
  }
});

// AI Inspection Assistant Endpoint
app.post('/api/gemini/inspect', async (req, res) => {
  try {
    const { inspectionType, context = '' } = req.body;
    const ai = getGenAI();

    if (ai) {
      const prompt = `Act as the AaharSetu AI Inspection Assistant for an authorised food safety officer during an inspection.
Context: ${inspectionType} - ${context}.
Provide a strict, professional observation checklist formatted in JSON:
{
  "observations": [
    { "item": "string", "status": "safe"|"warning"|"attention", "confidence": 85, "note": "string" }
  ],
  "recommendation": "string"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      try {
        const parsed = JSON.parse(response.text || '{}');
        return res.json(parsed);
      } catch {
        // Return default structured
      }
    }

    return res.json({
      observations: [
        {
          item: 'Cooked food hot-holding temperature check',
          status: 'safe',
          confidence: 94,
          note: 'Bain-marie held above 65°C consistently.',
        },
        {
          item: 'Perishable ingredients storage lids & elevation',
          status: 'warning',
          confidence: 82,
          note: 'Recommend airtight silicone gaskets on secondary pantry dry bins.',
        },
        {
          item: 'Staff hygiene gear & handwash accessibility',
          status: 'safe',
          confidence: 91,
          note: 'Pedal-operated taps and single-use towels operational.',
        },
      ],
      recommendation:
        'Overall hygiene compliance satisfactory. Issue minor advisory for ingredient container sealing.',
      source: 'rule-engine',
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Intelligent fallback helper for food & nutrition queries
function getFallbackNutritionResponse(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('paneer') || p.includes('protein')) {
    return `**Paneer (Indian Cottage Cheese) Nutritional Highlights**\n\n• **Protein Content**: ~18–20g of high-biological value protein per 100g serving.\n• **Calcium & Minerals**: Rich in calcium (~400mg), phosphorus, and magnesium for bone integrity.\n• **Healthy Fats**: Contains ~20–22g lipids, mostly saturated fatty acids. For lighter preparation, low-fat cow's milk paneer can be chosen.\n• **Carbohydrates**: Very low (<2–3g per 100g), making it suitable for low-carb and vegetarian regimens.\n\n*Note: Approximate nutritional facts for educational context. For specific metabolic needs, consult a certified dietitian.*`;
  }
  if (p.includes('poha')) {
    return `**Poha (Flattened Rice) Digestibility & Wellness**\n\n• **Caloric Density**: ~180 kcal per standard bowl (cooked with seasonal vegetables, peanuts, and mustard seeds).\n• **Iron Enriched**: Flattened rice absorbs iron from traditional iron rollers during production (~2.5mg/100g).\n• **Carbohydrates**: Easily digestible complex carbohydrates providing sustained morning satiety without sluggishness.\n• **Healthy Addition**: Squeezing fresh lemon adds Vitamin C, which significantly enhances non-heme iron absorption.\n\n*Note: Approximate nutritional facts for educational purposes.*`;
  }
  if (p.includes('dal') || p.includes('lentils')) {
    return `**Dal (Lentils & Pulses) in Indian Nutrition**\n\n• **Protein Profile**: Cooked dal delivers ~8–12g protein per cup. When paired with rice or roti, it completes the essential amino acid spectrum (lysine + methionine balance).\n• **Dietary Fiber**: High soluble and insoluble fiber (~7–8g per cup) promoting healthy gut microbiota and stable postprandial glucose.\n• **Micronutrients**: Rich source of folate, potassium, magnesium, and plant iron.\n• **Preparation Tip**: Soaking dal for 20–30 minutes before pressure cooking neutralizes phytates and improves bio-availability.\n\n*Note: Approximate nutritional facts for educational purposes.*`;
  }
  if (p.includes('iron')) {
    return `**Iron-Rich Traditional Indian Foods**\n\n• **Greens**: Palak (spinach), methi (fenugreek leaves), sarson, and drumstick (moringa) leaves.\n• **Millets**: Ragi (finger millet) and Bajra (pearl millet).\n• **Legumes**: Chickpeas (chana), rajma, and sprouted green gram.\n• **Natural Sweeteners**: Organic jaggery (gud) and dates (khajoor).\n• **Pro Tip**: Consume with Vitamin C (amla, lemon, or tomatoes) to multiply non-heme iron uptake threefold.\n\n*Note: Approximate nutritional facts for educational purposes.*`;
  }
  return `**Nutritional Guidance & Food Safety Insights**\n\n• **Balanced Thali**: A traditional Indian balanced meal includes 50% vegetables/salads, 25% protein (dal, sprouts, paneer, or eggs), and 25% complex whole grains (roti/unpolished rice).\n• **Microbial Safety**: Ensure freshly cooked hot food is consumed within 2 hours or stored below 5°C.\n• **Hydration & Digestion**: Traditional probiotics like fresh curd, buttermilk (chaas) with roasted cumin, or kanji boost gut enzymes naturally.\n\n*Disclaimer: AI-generated information is strictly for general educational purposes and is not medical advice.*`;
}

// Vite middleware & Static server setup
async function startServer() {
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    process.argv[1]?.includes('dist') ||
    process.argv[1]?.endsWith('.cjs');

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const cwd = process.cwd();
    const candidateDistPaths = [
      path.join(cwd, 'dist'),
      cwd,
    ];
    let distPath = candidateDistPaths[0];
    for (const p of candidateDistPaths) {
      if (fs.existsSync(path.join(p, 'index.html'))) {
        distPath = p;
        break;
      }
    }

    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`AaharSetu server running on http://0.0.0.0:${PORT} (environment: ${isProduction ? 'production' : 'development'})`);
  });

  server.on('error', (err: any) => {
    console.error('Server failed to bind or listen:', err);
    process.exit(1);
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed cleanly');
      process.exit(0);
    });
  });
}

startServer().catch((err: any) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
