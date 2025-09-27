-- CreateTable
CREATE TABLE "tabela1" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "ocupacao" TEXT NOT NULL,
    "classificacao" TEXT,
    "grupo" TEXT,
    "subgrupo" TEXT,
    "divisao" TEXT,
    "carga_incendio_mj_m2" DECIMAL,
    "observacoes" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tabela1_codigo_key" ON "tabela1"("codigo");
