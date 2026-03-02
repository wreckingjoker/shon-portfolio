import { IntegrationGrid, type Integration } from './ui/integration-showcase'

const SI = 'https://cdn.simpleicons.org/'

const AUTOMATION_TOOLS: Integration[] = [
  { name: 'n8n',                 description: 'Visual workflow automation platform',     iconSrc: SI + 'n8n/ffffff' },
  { name: 'OpenAI API',          description: 'GPT-4 & vision model integration',        iconSrc: SI + 'openai/ffffff' },
  { name: 'Multi-Agent Systems', description: 'Coordinated AI agent pipelines',          iconText: 'MA' },
  { name: 'LangChain',           description: 'LLM application framework',               iconSrc: SI + 'langchain/ffffff' },
  { name: 'Python',              description: 'Core scripting & automation language',    iconSrc: SI + 'python/ffffff' },
  { name: 'FastAPI',             description: 'High-performance REST API backend',       iconSrc: SI + 'fastapi/ffffff' },
  { name: 'Supabase',            description: 'PostgreSQL database & auth layer',        iconSrc: SI + 'supabase/ffffff' },
  { name: 'REST APIs',           description: 'HTTP service integration & webhooks',     iconText: 'API' },
  { name: 'Prompt Engineering',  description: 'Precision model instruction design',      iconText: 'PE' },
  { name: 'RAG Pipelines',       description: 'Retrieval-augmented generation systems',  iconText: 'RAG' },
  { name: 'Apify',               description: 'Web scraping & data extraction',          iconSrc: SI + 'apify/ffffff' },
  { name: 'Google Sheets API',   description: 'Spreadsheet data sync & reporting',       iconSrc: SI + 'googlesheets/ffffff' },
]

const CREATIVE_TOOLS: Integration[] = [
  { name: 'Higgsfield',          description: 'Cinematic AI video generation',           iconText: 'HF' },
  { name: 'HeyGen',              description: 'AI avatar & talking head videos',         iconText: 'HG' },
  { name: 'Runway ML',           description: 'Gen-2 video editing & generation',        iconSrc: SI + 'runwayml/ffffff' },
  { name: 'ElevenLabs',          description: 'Realistic AI voice synthesis',            iconSrc: SI + 'elevenlabs/ffffff' },
  { name: 'Leonardo AI',         description: 'AI image generation for ads',             iconText: 'LA' },
  { name: 'Google Veo',          description: "Google's video generation model",         iconText: 'VEO' },
  { name: 'Google Flow',         description: 'AI-powered cinematic workflow tool',      iconText: 'GF' },
  { name: 'Suno AI',             description: 'AI music & audio generation',             iconText: 'SN' },
  { name: 'CapCut',              description: 'Video editing & effects automation',      iconSrc: SI + 'capcut/ffffff' },
  { name: 'Canva',               description: 'Rapid visual content creation',           iconSrc: SI + 'canva/ffffff' },
  { name: 'InVideo',             description: 'AI-powered video ad creation',            iconText: 'IV' },
  { name: 'OpenArt AI',          description: 'AI art generation & remixing',            iconText: 'OA' },
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-[100dvh] flex flex-col justify-center items-center px-6 md:px-10 py-36 scroll-mt-20"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="w-full max-w-6xl">
        {/* Glass panel */}
        <div
          className="rounded-3xl p-10 md:p-14"
          style={{
            background: 'rgba(5,5,5,0.65)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(0,212,255,0.1)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          <p
            className="text-sm tracking-widest uppercase mb-4"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}
          >
            Capabilities
          </p>
          <h2
            className="text-4xl md:text-6xl font-bold mb-14"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            My Arsenal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 relative">
            {/* Vertical divider */}
            <div
              className="hidden md:block absolute inset-y-0 left-1/2 w-px"
              style={{ background: 'var(--color-primary)', opacity: 0.2 }}
            />

            {/* AI Automation */}
            <div className="md:pr-12">
              <h3
                className="text-xs tracking-[0.2em] uppercase mb-6 pb-3"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-primary)',
                  borderBottom: '1px solid rgba(0,212,255,0.12)',
                }}
              >
                AI Automation
              </h3>
              <IntegrationGrid integrations={AUTOMATION_TOOLS} initialCount={6} />
            </div>

            {/* AI Creative */}
            <div className="md:pl-12">
              <h3
                className="text-xs tracking-[0.2em] uppercase mb-6 pb-3"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-primary)',
                  borderBottom: '1px solid rgba(0,212,255,0.12)',
                }}
              >
                AI Creative
              </h3>
              <IntegrationGrid integrations={CREATIVE_TOOLS} initialCount={6} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
