-- CreateTable
CREATE TABLE "anexoa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ocupacao_uso" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "divisao" TEXT NOT NULL,
    "cnae" TEXT NOT NULL,
    "carga_incendio_mj_m2" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
