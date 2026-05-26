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

RAG (Retrieval-Augmented Generation)
-----------------------------------

Este repositório foi atualizado para um fluxo RAG básico que combina:
- indexação de documentos (PDF) em vetores de embeddings
- armazenamento e busca vetorial em Neo4j (grafo)
- geração de respostas com um LLM via OpenRouter/OpenAI, usando contexto recuperado

Arquivos principais e localização
- Código principal: [src/index.ts](src/index.ts#L1-L115)
- Lógica de QA / pipeline: [src/ai.ts](src/ai.ts#L1-L101)
- Configurações: [src/config.ts](src/config.ts#L1-L59)
- Prompts: [prompts/answerPrompt.json](prompts/answerPrompt.json#L1) e [prompts/template.txt](prompts/template.txt#L1)
- Saída das respostas: pasta `./respostas`

Como funciona (resumo)
1. `src/index.ts` carrega e divide o documento (`tensores.pdf`) em chunks.
2. Para cada chunk, é calculado o embedding com `HuggingFaceTransformersEmbeddings`.
3. Vetores e metadados são armazenados no Neo4j usando `Neo4jVectorStore`.
4. Para cada pergunta, o sistema realiza uma busca por similaridade (vetorial) no Neo4j.
5. O contexto recuperado é injetado em um prompt (template) e enviado ao modelo (via `ChatOpenAI` configurado para OpenRouter).
6. A resposta é salva em `./respostas` e também impressa no console.

Variáveis de ambiente (exemplo)
Crie um arquivo `.env` na raiz (NÃO comite). Exemplo mínimo:

```env
OPENROUTER_API_KEY=seu_token_aqui
OPENROUTER_SITE_URL=http://localhost:8000
OPENROUTER_SITE_NAME=MeuSite
NLP_MODEL=gpt-4o-mini
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password
```

Pontos importantes sobre configuração
- `EMBEDDING_MODEL`: usado por `HuggingFaceTransformersEmbeddings` (definido em `src/config.ts`).
- `OPENROUTER_API_KEY` e `NLP_MODEL`: usados para configurar `ChatOpenAI` com `baseURL` customizado.
- `NEO4J_*`: credenciais e URI do Neo4j.
- Ajuste `similarity.topK` em `src/config.ts` para controlar quantos chunks são recuperados.

Rodando localmente
1. Suba o Neo4j (Docker) se necessário:

```bash
npm run infra:up
```

2. Instale dependências e rode o script:

```bash
npm ci
npm run start
```

3. Para desenvolvimento com watch:

```bash
npm run dev
```

Observações finais
- Os prompts estão em `prompts/` e você pode ajustá-los para o seu domínio.
- A pasta `./respostas` guarda as respostas geradas (cada arquivo é timestampado).
- Não comite tokens ou `.env`.

Automatic changelogs on commit
-----------------------------------

Este repositório agora gera automaticamente um changelog para cada commit.

- Hook rastreável: o hook de git está em `githooks/post-commit` (rastreado no repositório).
- Script gerador: `scripts/changelog-postcommit.js` cria um arquivo em `changelogs/` com
   data, autor, mensagem de commit, arquivos alterados e um `stat` do commit.

Como funciona
- Ao efetuar um commit, o hook chama o script Node que lê o último commit e grava
   um arquivo Markdown em `changelogs/` com nome no formato `YYYY-MM-DDTHH-MM-SS-sss_<sha>.md`.

Como ativar localmente
- Este repositório usa `githooks/` como diretório de hooks. Para ativá-lo localmente, execute:

```bash
cd embeddings-neo4j
git config core.hooksPath githooks
chmod +x githooks/post-commit
```

Como desativar
- Para desativar (não gerar changelogs em commits):

```bash
git config --unset core.hooksPath
```

Privacidade
- Os arquivos em `changelogs/` contêm metadados do commit e não devem incluir segredos.
   Se preferir não registrar determinadas informações, ajuste `scripts/changelog-postcommit.js`.

