import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import BedrockService from './services/BedrockService';

async function testBedrock() {
  console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? 'Presente' : 'No presente');
  console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? 'Presente' : 'No presente');
  console.log('AWS_REGION:', process.env.AWS_REGION);

  const bedrock = new BedrockService();

  try {
    const response = await bedrock.invokeModel('Hola, ¿puedes presentarte como un agente de ventas de productos electrónicos?');
    console.log('Respuesta de Bedrock:', response);
  } catch (error) {
    console.error('Error en la prueba:', error);
  }
}

testBedrock();