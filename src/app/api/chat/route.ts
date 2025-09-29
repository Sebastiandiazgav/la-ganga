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
- Mantén el contexto de la conversación de forma coherente: recuerda productos mencionados, preferencias expresadas, preguntas anteriores y el hilo principal de la conversación.
- Sé amable, profesional y conversacional, como un vendedor experto que conoce bien a sus clientes.
- Recomienda productos basados en las necesidades del cliente y el historial completo de la conversación.
- Incluye precios, características y enlaces cuando sea relevante.
- Si no hay productos que coincidan exactamente, sugiere alternativas similares basándote en lo que ya se ha discutido.
- Haz preguntas de seguimiento para refinar recomendaciones y mantener la conversación fluida.
- Responde de manera natural, evitando repetir información innecesaria.
- Si detectas un posible cambio de tema o categoría de productos, confirma con el usuario antes de cambiar: "¿Estás interesado en cambiar de tema? Antes estábamos hablando de [tema anterior], pero veo que ahora preguntas por [nuevo tema]. ¿Quieres que continuemos con lo anterior o cambiamos?".
- Respeta siempre la intención del usuario y evita respuestas fuera de contexto. Si algo no está claro, pide aclaración en lugar de asumir.
- Mantén el flujo natural de la conversación sin perder el hilo, conectando cada respuesta con lo previamente discutido.`;

    const client = getBedrockClient();
    const response = await client.postChatCompletion(messages, systemPrompt);

    return NextResponse.json({ content: response.content });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Failed to get response from AI' }, { status: 500 });
  }
}