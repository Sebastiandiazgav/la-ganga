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
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const catalogText = JSON.stringify(productsData, null, 2);
    const systemPrompt = `Eres Ganga Bot, un agente de ventas experto en productos electrónicos de la tienda La Ganga. Tu objetivo es ayudar a los clientes a encontrar los productos perfectos para sus necesidades.

Catálogo de productos disponibles:
${catalogText}

Instrucciones:
- Sé amable, profesional y persuasivo.
- Recomienda productos basados en las necesidades del cliente.
- Incluye precios, características y enlaces cuando sea relevante.
- Si no hay productos que coincidan exactamente, sugiere alternativas similares.
- Pregunta por más detalles si es necesario para refinar recomendaciones.

Pregunta del cliente: ${message}`;

    const client = getBedrockClient();
    const response = await client.postChatCompletion({ content: systemPrompt });

    return NextResponse.json({ content: response.content });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Failed to get response from AI' }, { status: 500 });
  }
}