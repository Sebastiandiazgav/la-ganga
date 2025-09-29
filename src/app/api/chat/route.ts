import { NextRequest, NextResponse } from 'next/server';
import BedrockService from '@/services/BedrockService';
import productsData from '@/data/products.json';

let bedrockClient: BedrockService | null = null;

function getBedrockClient() {
  if (!bedrockClient) {
    bedrockClient = new BedrockService();
  }
  return bedrockClient;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const catalogText = JSON.stringify(productsData, null, 2);
    const systemPrompt = `Eres Ganga Bot, un agente de ventas experto en productos electrónicos de la tienda La Ganga. Tu objetivo es ayudar a los clientes a encontrar los productos perfectos para sus necesidades, manteniendo una conversación natural y recordando el contexto de preguntas previas.

Catálogo de productos disponibles:
${catalogText}

Instrucciones:
- Mantén el contexto de la conversación: recuerda productos mencionados, preferencias expresadas y preguntas anteriores.
- Sé amable, profesional y conversacional, como un vendedor experto.
- Recomienda productos basados en las necesidades del cliente y el historial de la conversación.
- Incluye precios, características y enlaces cuando sea relevante.
- Si no hay productos que coincidan exactamente, sugiere alternativas similares basándote en lo que ya se ha discutido.
- Haz preguntas de seguimiento para refinar recomendaciones y mantener la conversación fluida.
- Responde de manera natural, evitando repetir información innecesaria.`;

    const client = getBedrockClient();
    const response = await client.postChatCompletion(messages, systemPrompt);

    return NextResponse.json({ content: response.content });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Failed to get response from AI' }, { status: 500 });
  }
}