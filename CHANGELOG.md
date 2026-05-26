# Changelog

This file aggregates individual changelog entries generated on commits (folder changelogs/).

## 2026-05-26T15-08-00-090Z_8a6efdb.md

**Date:** 2026-05-26 12:07:59 -0300

**Author:** 

**Message:**

chore(rag): add final post-commit changelog entry and remove legacy JS hook

**Files changed:**

- changelogs/2026-05-26T15-07-30-507Z_8ca4953.md
- scripts/changelog-postcommit.js

**Stat:**

```
commit 8a6efdb8cd98527e8a0c0c2ae920af1576bfe836
Author: marcelo.araujo <marcelo.araujo@memora.com.br>
Date:   Tue May 26 12:07:59 2026 -0300

    chore(rag): add final post-commit changelog entry and remove legacy JS hook

 changelogs/2026-05-26T15-07-30-507Z_8ca4953.md | 52 ++++++++++++++++++++++++++
 scripts/changelog-postcommit.js                | 52 --------------------------
 2 files changed, 52 insertions(+), 52 deletions(-)
```

---

## 2026-05-26T15-07-30-507Z_8ca4953.md

**Date:** 2026-05-26 12:07:29 -0300

**Author:** 

**Message:**

feat(rag): finalize changelog automation pipeline

Adiciona GitHub Actions para geração e commit automático de CHANGELOG.md, atualiza README e finaliza a automação local de changelog/commit.

**Files changed:**

- .github/workflows/changelog-generator.yml
- CHANGELOG.md
- README.md
- changelogs/2026-05-26T14-55-45-570Z_67de33d.md
- changelogs/2026-05-26T14-58-21-071Z_ab35419.md
- changelogs/2026-05-26T15-03-20-353Z_5d7b63d.md
- changelogs/2026-05-26T15-05-00-926Z_2f4e6af.md
- prompts/answerPrompt.json
- prompts/template.txt
- src/ai.ts
- src/config.ts
- src/index.ts

**Stat:**

```
commit 8ca495375609ec24a20cd3af2c19f9b87ae53481
Author: marcelo.araujo <marcelo.araujo@memora.com.br>
Date:   Tue May 26 12:07:29 2026 -0300

    feat(rag): finalize changelog automation pipeline
    
    Adiciona GitHub Actions para geração e commit automático de CHANGELOG.md, atualiza README e finaliza a automação local de changelog/commit.

 .github/workflows/changelog-generator.yml      |  33 ++++++++
 CHANGELOG.md                                   |  64 ++++++++++++++++
 README.md                                      |  16 ++--
 changelogs/2026-05-26T14-55-45-570Z_67de33d.md |  30 ++++++++
 changelogs/2026-05-26T14-58-21-071Z_ab35419.md |  32 ++++++++
 changelogs/2026-05-26T15-03-20-353Z_5d7b63d.md |  32 ++++++++
 changelogs/2026-05-26T15-05-00-926Z_2f4e6af.md |  26 +++++++
 prompts/answerPrompt.json                      |  38 ++++++++++
 prompts/template.txt                           |  19 +++++
 src/ai.ts                                      | 101 +++++++++++++++++++++++++
 src/config.ts                                  |  13 ++++
 src/index.ts                                   |  48 +++++++++---
 12 files changed, 438 insertions(+), 14 deletions(-)
```

---

## 2026-05-26T15-05-00-926Z_2f4e6af.md

**Date:** 2026-05-26 12:05:00 -0300

**Author:** 

**Message:**

chore(release): add changelog aggregation script and preversion hook

**Files changed:**

- package.json

**Stat:**

```
commit 2f4e6afdcc2c19bd68d6a450684dbef34a990964
Author: marcelo.araujo <marcelo.araujo@memora.com.br>
Date:   Tue May 26 12:05:00 2026 -0300

    chore(release): add changelog aggregation script and preversion hook

 package.json | 4 +++-
 1 file changed, 3 insertions(+), 1 deletion(-)
```

---

## 2026-05-26T15-03-20-353Z_5d7b63d.md

**Date:** 2026-05-26 12:03:19 -0300

**Author:** 

**Message:**

feat(changelog): aggregate changelogs into CHANGELOG.md

Gera um CHANGELOG.md consolidado a partir dos arquivos em changelogs/ para facilitar versão interna e histórico.

**Files changed:**

- CHANGELOG.md
- scripts/aggregate-changelogs.cjs

**Stat:**

```
commit 5d7b63da4ecffeab4f2f017ec37922729074e09a
Author: marcelo.araujo <marcelo.araujo@memora.com.br>
Date:   Tue May 26 12:03:19 2026 -0300

    feat(changelog): aggregate changelogs into CHANGELOG.md
    
    Gera um CHANGELOG.md consolidado a partir dos arquivos em changelogs/ para facilitar versão interna e histórico.

 CHANGELOG.md                     | 72 ++++++++++++++++++++++++++++++++++++++++
 scripts/aggregate-changelogs.cjs | 36 ++++++++++++++++++++
 2 files changed, 108 insertions(+)
```

---

## 2026-05-26T14-58-21-071Z_ab35419.md

**Date:** 2026-05-26 11:58:20 -0300

**Author:** 

**Message:**

Revert "test(changelog-hook): trigger post-commit changelog generation"

This reverts commit 6d37177c3959ed04bf74c7ea78972a6151c85768.

**Files changed:**

- README.md
- githooks/post-commit

**Stat:**

```
commit ab35419c2efc9f2e3d28d067026a334260899a33
Author: marcelo.araujo <marcelo.araujo@memora.com.br>
Date:   Tue May 26 11:58:20 2026 -0300

    Revert "test(changelog-hook): trigger post-commit changelog generation"
    
    This reverts commit 6d37177c3959ed04bf74c7ea78972a6151c85768.

 README.md            | Bin 6171 -> 5950 bytes
 githooks/post-commit |   0
 2 files changed, 0 insertions(+), 0 deletions(-)
```

---

## 2026-05-26T14-55-45-570Z_67de33d.md

**Date:** 2026-05-26 11:55:44 -0300

**Author:** 

**Message:**

chore(rag): add CommonJS changelog generator for hooks

**Files changed:**

- README.md
- githooks/post-commit
- scripts/changelog-postcommit.cjs

**Stat:**

```
commit 67de33d756917fcce2a7981ee13100b1bc925923
Author: marcelo.araujo <marcelo.araujo@memora.com.br>
Date:   Tue May 26 11:55:44 2026 -0300

    chore(rag): add CommonJS changelog generator for hooks

 README.md                        |  1 +
 githooks/post-commit             |  2 +-
 scripts/changelog-postcommit.cjs | 52 ++++++++++++++++++++++++++++++++++++++++
 3 files changed, 54 insertions(+), 1 deletion(-)
```

---

