# embeddings-neo4j

Projeto de exemplo para indexação de documentos e vetores usando Neo4j e modelos de embedding.

**Descrição**
- Serviço principal: Neo4j (graph database) para armazenar nós, relações e vetores.
- Código: scripts em `src/` para processar documentos e inserir vetores/ metadados no banco.

**Estrutura**
- `docker-compose.yml`: serviço Neo4j (volumes, portas, environment).
- `.env`: variáveis de ambiente (não comitar chaves).
- `src/`: código TypeScript do projeto.
- `tensores.pdf`: exemplo de documento.

Pré-requisitos
- Node.js (versão compatível listada em `package.json`, ex. v22.x)
- Docker Desktop / Docker Engine com suporte a `docker compose`
- Git (opcional)

Instalação
1. Clone o repositório (ou já está na pasta):
   ```bash
   git clone https://github.com/CeloAraujo/embeddings-neo4j.git
   cd embeddings-neo4j
   ```
2. Instale dependências:
   ```bash
   npm ci
   ```

Configuração
1. Crie um arquivo `.env` na raiz (não comite). Exemplo mínimo:
   ```env
   OPENROUTER_API_KEY=seu_token_aqui
   OPENROUTER_SITE_URL=http://localhost:8000
   NEO4J_USER=neo4j
   NEO4J_PASSWORD=password
   NEO4J_URI=bolt://localhost:7687
   NEO4J_DATABASE=neo4j
   ```
2. Ajuste modelos/variáveis conforme necessário.

Infra (Docker)
- Para subir o Neo4j (modo detached):
  ```bash
  npm run infra:up
  # ou
  docker compose up -d --wait
  ```
- Parar e remover recursos:
  ```bash
  npm run infra:down
  # ou
  docker compose down --volumes
  ```

Comandos úteis
- `npm run start` — roda a aplicação (conforme script em `package.json`).
- `npm run dev` — modo desenvolvimento com watch.
- `docker compose ps` — ver containers.
- `docker compose logs -f neo4j` — acompanhar logs do Neo4j.

Segurança
- Nunca comite o `.env` com chaves sensíveis. O repositório já tem `.gitignore` incluindo `.env`.
- Se alguma chave vazou, revogue/rotacione imediatamente.

Observações
- O `docker-compose.yml` foi adaptado para a sintaxe do Compose V2 (sem a chave `version`).
- Se o Docker não subir os containers, verifique se o Docker Desktop/daemon está rodando e execute diagnósticos com `docker compose --verbose up`.

Contribuição
- Abra issues ou envie PRs. Mantenha secrets fora do repositório.

---
