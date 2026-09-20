import { ISkill } from '../component/skill/ISkill';

const programmingLanguages: ISkill.Skill = {
  category: 'Programming Languages',
  items: [{ title: 'Java' }, { title: 'Python' }, { title: 'TypeScript / JavaScript' }],
};
const backendDevelopment: ISkill.Skill = {
  category: 'Backend / Architecture',
  items: [
    { title: 'Spring Boot' },
    { title: 'Spring Security' },
    { title: 'Spring Batch' },
    { title: 'JPA' },
    { title: 'QueryDSL' },
    { title: 'DDD' },
    { title: 'Hexagonal Architecture' },
    { title: 'Modular Monolith' },
  ],
};

const database: ISkill.Skill = {
  category: 'Data / Messaging',
  items: [
    { title: 'PostgreSQL' },
    { title: 'MySQL' },
    { title: 'Oracle' },
    { title: 'Redis' },
    { title: 'Airflow' },
  ],
};

const devOps: ISkill.Skill = {
  category: 'DevOps / Infrastructure',
  items: [
    { title: 'Docker' },
    { title: 'Kubernetes' },
    { title: 'AWS' },
    { title: 'Terraform' },
    { title: 'Ansible' },
    { title: 'Linux' },
    { title: 'Vault' },
    { title: 'Jenkins' },
    { title: 'GitHub Actions / GitLab CI' },
  ],
};

const observability: ISkill.Skill = {
  category: 'Observability / Security',
  items: [
    { title: 'Grafana' },
    { title: 'Loki / Tempo / Mimir' },
    { title: 'OpenTelemetry' },
    { title: 'SonarQube' },
    { title: 'OAuth 2.0 / JWT' },
  ],
};

const aiAgent: ISkill.Skill = {
  category: 'AI / Agent Engineering',
  items: [
    { title: 'LangChain' },
    { title: 'LangGraph' },
    { title: 'RAG' },
    { title: 'FastAPI' },
    { title: 'MCP' },
    { title: 'Qdrant / Ollama' },
  ],
};

const skill: ISkill.Payload = {
  disable: false,
  skills: [programmingLanguages, backendDevelopment, database, devOps, observability, aiAgent],
};

export default skill;
