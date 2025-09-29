# **Ganga Bot AI 🤖🛒**
**Your AI Sales Agent. Find the perfect electronic products.**

Ganga Bot AI is a project demonstrating how Amazon Bedrock can be used to create intelligent sales agents for e-commerce. It showcases conversational AI in the retail sector.

Our agent, "Ganga Bot," goes beyond a simple chatbot. It is an empathetic and proactive assistant designed to understand customers' needs, recommend products from a catalog, and facilitate sales conversations.
### **✨ Key Features**
We have implemented advanced conversational AI features for e-commerce:

- **Product Recommendations:** Ganga Bot analyzes customer queries and recommends products from the catalog based on needs, budget, and preferences.
- **Sales-Oriented Conversations:** The agent acts as a professional salesperson, highlighting product features, prices, and availability.
- **Lead Analysis:** Generates conversation summaries with customer insights, product interests, and lead scoring for sales teams.
- **Multilingual Interface (ES/EN):** Easy language switching for broader accessibility.
- **Modern UI:** Dark, elegant interface with real-time chat and summary generation.
### **🛠️ Technology Stack**
- **Front-End:** Next.js with TypeScript and Tailwind CSS.
- **Conversational AI:** Powered by **Amazon Bedrock** with Claude 3.5 Sonnet.
- **Agent Logic:** Ganga Bot's knowledge comes from prompt engineering with product catalog data.
- **Data:** Product catalog stored in JSON format.
### **🚀 How to Run the Project Locally**

1. **Clone the Repository:**

   git clone [REPOSITORY URL HERE]

   cd homefinder-ai-hackathon

2. **Install Dependencies:**

   npm install

3. **Configure AWS Credentials:**
   - Create a file called .env.local in the project root.
   - Add your AWS credentials:

     AWS_ACCESS_KEY_ID=your_access_key
     AWS_SECRET_ACCESS_KEY=your_secret_key
     AWS_REGION=us-east-1

4. **Run the Application:**

   npm run dev

5. Open your browser and go to http://localhost:3000.
### **🧠 Architecture Overview**
- **Bedrock Integration:** Uses AWS Bedrock Runtime API to invoke Claude 3.5 Sonnet for conversational AI.
- **Product Knowledge:** Catalog loaded from JSON file and included in prompts for context-aware responses.
- **Conversation Flow:** Real-time chat with product recommendations and lead analysis.