import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

interface BedrockServiceOptions {
  region?: string;
  profile?: string;
}

interface ChatCompletionRequest {
  content: string;
  source?: string;
  skip_chat_history?: boolean;
}

interface ChatCompletionResponse {
  content: string;
}

class BedrockService {
  private client: BedrockRuntimeClient;
  private modelId: string = 'anthropic.claude-3-5-sonnet-20240620-v1:0'; // Claude 3.5 Sonnet

  constructor(options: BedrockServiceOptions = {}) {
    const credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    };

    this.client = new BedrockRuntimeClient({
      region: options.region || process.env.AWS_REGION || 'us-east-1',
      credentials,
    });
  }

  async invokeModel(prompt: string): Promise<string> {
    const requestBody = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    };

    const command = new InvokeModelCommand({
      modelId: this.modelId,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(requestBody),
    });

    try {
      const response = await this.client.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      return responseBody.content[0].text;
    } catch (error) {
      console.error('Error invoking Bedrock model:', error);
      throw new Error('Failed to get response from Bedrock');
    }
  }

  // Simulate the Sensay API structure for chat completions
  async postChatCompletion(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
    const prompt = request.content;
    const response = await this.invokeModel(prompt);
    return { content: response };
  }
}

export default BedrockService;