import { NextRequest, NextResponse } from 'next/server';
import BedrockService from '@/services/BedrockService';

let bedrockClient: BedrockService | null = null;

function getBedrockClient() {
  if (!bedrockClient) {
    bedrockClient = new BedrockService();
  }
  return bedrockClient;
}

export async function POST(request: NextRequest) {
  try {
    const { chatHistory } = await request.json();

    if (!chatHistory) {
      return NextResponse.json({ error: 'Chat history is required' }, { status: 400 });
    }

    const summaryPrompt = `Eres un analista de ventas. Basado en la siguiente conversación entre un cliente y Ganga Bot (agente de ventas), genera un resumen ejecutivo en formato Markdown con:

- **Puntos clave del cliente:** Necesidades expresadas, preferencias.
- **Productos de interés:** Lista de productos mencionados o recomendados.
- **Puntuación del lead:** Caliente (muy interesado), Tibio (interesado pero necesita más info), Frío (poco interesado).
- **Recomendaciones:** Próximos pasos para cerrar la venta.

Conversación:
${chatHistory}

Resumen:`;

    const client = getBedrockClient();
    const response = await client.postChatCompletion({ content: summaryPrompt });

    return NextResponse.json({ content: response.content });
  } catch (error) {
    console.error('Error in summary API:', error);
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}