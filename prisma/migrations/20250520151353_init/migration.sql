-- CreateTable
CREATE TABLE "Usuario" (
    "ID" SERIAL NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "dni" TEXT NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "estadoCivil" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Factura" (
    "ID" SERIAL NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION NOT NULL,
    "nombreFantasia" TEXT NOT NULL,
    "fechaFundacion" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Factura_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "DetalleFactura" (
    "ID" SERIAL NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "facturaId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,

    CONSTRAINT "DetalleFactura_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Producto" (
    "ID" SERIAL NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "nombre" TEXT NOT NULL,
    "precioUnitario" DOUBLE PRECISION NOT NULL,
    "descripcion" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleFactura" ADD CONSTRAINT "DetalleFactura_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "Factura"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleFactura" ADD CONSTRAINT "DetalleFactura_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
