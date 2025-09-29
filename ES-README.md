# **HomeFinder AI 🤖🏡**
**Tu Agente Inmobiliario con IA. Encuentra el hogar de tus sueños.**

HomeFinder AI es un proyecto desarrollado para la **Sensay & Connect Hackathon**. Es una demostración de cómo la plataforma de agentes de IA de Sensay puede ser utilizada para crear experiencias conversacionales de nueva generación en el sector inmobiliario.

Nuestro agente, "Alex", va más allá de un simple chatbot. Es un asistente empático y proactivo diseñado para entender las necesidades emocionales y de estilo de vida de los clientes, convirtiendo la búsqueda de una propiedad en una experiencia personalizada y humana.
### **✨ Funcionalidades Clave (Nuestros "Wow Factors")**
Hemos implementado varias características avanzadas para demostrar el verdadero potencial de la IA conversacional, apuntando directamente a los criterios de **Innovación, Experiencia de Usuario e Impacto Real**.

- **Personalidad Dinámica:** Alex adapta sutilmente su tono y enfoque (informativo, artístico, sofisticado) basándose en la propiedad que le interesa al cliente, ofreciendo una interacción verdaderamente personalizada.
- **Lead Scoring y Resumen para Agentes:** Con un solo clic, Alex analiza la conversación completa y genera un resumen ejecutivo para el agente inmobiliario humano, incluyendo los puntos clave del cliente, propiedades de interés y una puntuación del lead (Caliente, Tibio, Frío). Esto transforma al bot en una potente herramienta de ventas.
- **Interfaz Multilingüe (ES/EN):** La interfaz permite cambiar de idioma fácilmente, haciendo la plataforma accesible para un mercado internacional, un requisito clave en el sector inmobiliario global.
- **Tours Virtuales Interactivos:** En lugar de solo enviar un enlace, Alex invita al usuario a una conversación guiada mientras ve el tour en video, ofreciendo detalles adicionales sobre la marcha. Los enlaces son completamente clicables.
- **Conocimiento Local Enriquecido:** Alex no solo conoce las propiedades, sino también su entorno. Puede responder preguntas sobre cafés, parques, mercados y otros puntos de interés cercanos, vendiendo un estilo de vida completo.
- **Interfaz Moderna y Profesional:** Hemos construido una interfaz de usuario con un tema oscuro, elegante y tecnológico que refleja la naturaleza innovadora del proyecto.
### **🛠️ Cómo Funciona (Stack Tecnológico)**
- **Front-End:** Next.js con TypeScript y Tailwind CSS (incluyendo el plugin de Typography).
- **IA Conversacional:** Potenciado 100% por la **API de Sensay**.
- **Lógica del Agente:** La personalidad, el conocimiento y las habilidades avanzadas de "Alex" se gestionan a través de "Prompt Engineering" avanzado enviado al systemMessage y a los completions de la API de Sensay.
### **🚀 Cómo Ejecutar el Proyecto Localmente**
Para que los jueces puedan probar nuestra aplicación, sigan estos pasos:

1. **Clonar el Repositorio:**

   git clone [URL\_DEL\_REPOSITORIO\_AQUI]

   cd chat_client_sample

1. **Instalar Dependencias:**

   npm install

1. **Configurar la API Key:**
   1. Crea un archivo llamado .env.local en la raíz del proyecto.
   1. Añade tu API Key de Sensay de la siguiente manera:

      NEXT\_PUBLIC\_SENSAY\_API\_KEY=tu\_clave\_secreta\_aqui

1. **Ejecutar la Aplicación:**

   npm run dev

1. Abre tu navegador y ve a http://localhost:3000.
### **🧠 Uso Inteligente de la Plataforma Sensay**
Este proyecto fue diseñado para maximizar el uso de las características de la API de Sensay:

- **Creación y Gestión de Réplicas (/v1/replicas):** Creamos y configuramos a nuestro agente "Alex" de forma programática, definiendo su personalidad central a través del systemMessage.
- **Base de Conocimiento (/v1/training):** Entrenamos a Alex con un portafolio detallado de propiedades, incluyendo características, precios y datos del vecindario.
- **Completions (/v1/chat/completions):** Es el corazón de nuestra aplicación. Lo usamos no solo para conversaciones estándar, sino también para tareas complejas como la generación de resúmenes y la simulación de personalidades dinámicas, utilizando el parámetro skip\_chat\_history para las tareas de "back-end".
