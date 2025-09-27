/*
  Warnings:

  - Added the required column `bairro` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnae` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnpj` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_empresa` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsavel` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone_contato` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_projeto` to the `projetos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_projetos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "nome_empresa" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "cnae" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "telefone_contato" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "tipo_projeto" TEXT NOT NULL,
    "numero_projeto_anterior" TEXT,
    "data_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "situacao" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "projetos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_projetos" ("createdAt", "data_criacao", "id", "nome", "situacao", "updatedAt", "userId") SELECT "createdAt", "data_criacao", "id", "nome", "situacao", "updatedAt", "userId" FROM "projetos";
DROP TABLE "projetos";
ALTER TABLE "new_projetos" RENAME TO "projetos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
