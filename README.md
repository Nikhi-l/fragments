![RetailX Preview Light](/readme-assets/fragments-light.png#gh-light-mode-only)
![RetailX Preview Dark](/readme-assets/fragments-dark.png#gh-dark-mode-only)

# RetailX - AI Agent for Retail Intelligence

RetailX is an advanced multimodal AI agent designed specifically for retail intelligence and store management. This powerful platform combines computer vision, natural language processing, and real-time analytics to provide comprehensive retail insights through an intuitive conversational interface.

## 🚀 Features

### 🤖 **Multimodal AI Agent**
- **Natural Language Interface**: Chat with your retail data using plain English
- **Computer Vision**: Analyze camera feeds and visual data
- **Real-time Analytics**: Get instant insights from your store operations
- **Intelligent Responses**: Context-aware AI that understands retail terminology

### 📊 **Retail Intelligence Capabilities**
- **🎥 Live Camera Monitoring**: Real-time security camera feeds with AI analysis
- **📈 Performance Dashboards**: Comprehensive store analytics and KPIs
- **👥 Customer Analytics**: Traffic patterns, behavior analysis, and satisfaction metrics
- **📦 Inventory Management**: Stock levels, alerts, and optimization insights
- **💰 Sales Intelligence**: Revenue tracking, transaction analysis, and forecasting
- **👨‍💼 Staff Performance**: Employee metrics and operational efficiency

### 🛠 **Technical Stack**
- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **UI/UX**: shadcn/ui, TailwindCSS, responsive design
- **AI Integration**: Vercel AI SDK with multiple LLM providers
- **Real-time Data**: Live camera feeds, streaming analytics
- **Authentication**: Supabase Auth with role-based access

### 🔌 **Supported AI Models**
- **🔸 OpenAI**: GPT-4, GPT-4 Turbo, GPT-4o
- **🔸 Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus
- **🔸 Google**: Gemini Pro, Gemini Flash
- **🔸 Mistral**: Large, Small models
- **🔸 Groq**: High-speed inference
- **🔸 Local Models**: Ollama support

## 🎯 Use Cases

### **Store Operations**
- Monitor multiple store locations from a single dashboard
- Track customer traffic patterns and peak hours
- Analyze staff performance and scheduling optimization
- Real-time inventory alerts and stock management

### **Security & Safety**
- Live camera feed monitoring with AI-powered alerts
- Motion detection and suspicious activity identification
- Multi-location security oversight
- Incident reporting and documentation

### **Business Intelligence**
- Sales performance analysis across time periods
- Customer satisfaction tracking and feedback analysis
- Competitive analysis and market insights
- Predictive analytics for demand forecasting

### **Customer Experience**
- Queue management and wait time optimization
- Customer journey mapping and behavior analysis
- Personalized recommendations and targeting
- Service quality monitoring and improvement

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org) (v18 or higher)
- [Git](https://git-scm.com)
- AI Provider API Key (OpenAI, Anthropic, etc.)

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/retailx.git
cd retailx
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file:

```env
# AI Provider Keys (choose one or more)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_AI_API_KEY=your_google_key
MISTRAL_API_KEY=your_mistral_key

# Optional: Database & Auth
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key

# Optional: Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host

# Optional: Rate Limiting
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to start using RetailX!

### 5. Build for Production

```bash
npm run build
npm start
```

## 💬 How to Use

### **Camera Monitoring**
Ask RetailX to show camera feeds:
- *"Show me the camera feeds for Main Store"*
- *"Monitor the entrance cameras"*
- *"Display security footage from all locations"*

### **Analytics & Reports**
Get business insights:
- *"How is my store performing this month?"*
- *"Show me today's sales analytics"*
- *"What are the peak hours for customer traffic?"*

### **Inventory Management**
Check stock levels:
- *"What items are low in stock?"*
- *"Show inventory levels for electronics section"*
- *"Alert me about out-of-stock products"*

### **Staff Performance**
Monitor team efficiency:
- *"How is staff performance today?"*
- *"Show employee schedules and attendance"*
- *"Which team members need training?"*

## 🏗 Architecture

### **AI Agent Core**
- **Natural Language Understanding**: Processes retail-specific queries
- **Context Management**: Maintains conversation history and store context
- **Multi-modal Processing**: Handles text, images, and video data
- **Response Generation**: Creates relevant insights and visualizations

### **Data Sources**
- **Camera Feeds**: Real-time video streams from store cameras
- **POS Systems**: Transaction data and sales metrics
- **Inventory Systems**: Stock levels and product information
- **Staff Management**: Employee schedules and performance data

### **Intelligence Modules**
- **Computer Vision**: Object detection, people counting, behavior analysis
- **Predictive Analytics**: Sales forecasting, demand prediction
- **Anomaly Detection**: Unusual patterns, security alerts
- **Recommendation Engine**: Optimization suggestions, insights

## 🔧 Customization

### **Adding New Store Locations**
1. Configure camera feed URLs in the store management section
2. Set up location-specific analytics dashboards
3. Define custom KPIs and metrics for each location

### **Custom AI Models**
1. Add new model configurations in `lib/models.json`
2. Implement provider-specific logic in `lib/models.ts`
3. Configure model parameters for retail-specific tasks

### **Dashboard Widgets**
1. Create new visualization components in `components/`
2. Define data sources and metrics
3. Add to the dashboard configuration

## 🔒 Security & Privacy

- **Data Encryption**: All data transmission is encrypted
- **Access Control**: Role-based permissions for different user types
- **Privacy Compliance**: GDPR and retail privacy standards
- **Audit Logging**: Complete activity tracking and monitoring

## 📈 Roadmap

### **Phase 1: Core Intelligence** ✅
- Multi-modal AI agent
- Camera feed integration
- Basic analytics dashboard

### **Phase 2: Advanced Analytics** 🚧
- Predictive modeling
- Customer behavior analysis
- Advanced computer vision

### **Phase 3: Enterprise Features** 📋
- Multi-tenant architecture
- Advanced reporting
- API integrations
- Mobile applications

### **Phase 4: AI Automation** 🔮
- Automated decision making
- Smart alerts and notifications
- Autonomous store optimization

## 🤝 Contributing

We welcome contributions to RetailX! Whether you're fixing bugs, adding features, or improving documentation, your help makes RetailX better for everyone.

### **How to Contribute**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation for new features
- Ensure responsive design compatibility

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.retailx.ai](https://docs.retailx.ai)
- **Community**: [Discord Server](https://discord.gg/retailx)
- **Issues**: [GitHub Issues](https://github.com/your-org/retailx/issues)
- **Email**: support@retailx.ai

---

**RetailX** - Transforming retail operations through intelligent AI agents 🛍️🤖