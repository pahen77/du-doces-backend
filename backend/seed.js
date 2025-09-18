/*
 * Script de seed para popular o banco com produtos de exemplo.
 * Execute com: npm run seed
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = [
    // Águas LA
    { name: 'Água LA 510ml', brand: 'LA', category: 'bebidas', price: 0.75, unitType: 'unidade', size: '510ml', imageUrl: '' },
    { name: 'Água LA 510ml (Fardo c/12)', brand: 'LA', category: 'bebidas', price: 9.00, unitType: 'fardo', size: '510ml', packQty: 12, imageUrl: '' },
    // Colas (Utilidades)
    { name: 'ThreeBond Cola', brand: 'ThreeBond', category: 'utilidades', price: 1.99, unitType: 'unidade', imageUrl: '' },
    { name: 'SuperBond Cola', brand: 'SuperBond', category: 'utilidades', price: 4.95, unitType: 'unidade', imageUrl: '' },
    // Pipoca OZ (Salgadinhos)
    { name: 'Pipoca OZ 40g Doce', brand: 'OZ', category: 'salgadinho', price: 0.70, unitType: 'unidade', size: '40g', flavor: 'Doce', imageUrl: '' },
    { name: 'Pipoca OZ 40g Salgada', brand: 'OZ', category: 'salgadinho', price: 0.70, unitType: 'unidade', size: '40g', flavor: 'Salgada', imageUrl: '' },
    { name: 'Pipoca OZ 40g Doce (Fardo c/30)', brand: 'OZ', category: 'salgadinho', price: 21.00, unitType: 'fardo', size: '40g', packQty: 30, flavor: 'Doce', imageUrl: '' },
    { name: 'Pipoca OZ 40g Salgada (Fardo c/30)', brand: 'OZ', category: 'salgadinho', price: 21.00, unitType: 'fardo', size: '40g', packQty: 30, flavor: 'Salgada', imageUrl: '' },
    { name: 'Pipoca OZ 12g Doce (Cx c/50)', brand: 'OZ', category: 'salgadinho', price: 16.50, unitType: 'fardo', size: '12g', packQty: 50, flavor: 'Doce', imageUrl: '' },
    // Coca/Fanta (Bebidas)
    { name: 'Coca-Cola 350ml lata', brand: 'Coca-Cola', category: 'bebidas', price: 3.25, unitType: 'unidade', size: '350ml', imageUrl: '' },
    { name: 'Coca-Cola 200ml PET', brand: 'Coca-Cola', category: 'bebidas', price: 1.65, unitType: 'unidade', size: '200ml', imageUrl: '' },
    { name: 'Coca-Cola Zero 200ml PET', brand: 'Coca-Cola', category: 'bebidas', price: 1.65, unitType: 'unidade', size: '200ml', flavor: 'Zero', imageUrl: '' },
    { name: 'Coca-Cola 200ml PET (Fardo c/12)', brand: 'Coca-Cola', category: 'bebidas', price: 19.80, unitType: 'fardo', size: '200ml', packQty: 12, imageUrl: '' },
    { name: 'Coca-Cola Zero 200ml PET (Fardo c/12)', brand: 'Coca-Cola', category: 'bebidas', price: 19.80, unitType: 'fardo', size: '200ml', packQty: 12, flavor: 'Zero', imageUrl: '' },
    { name: 'Coca-Cola 220ml lata', brand: 'Coca-Cola', category: 'bebidas', price: 2.15, unitType: 'unidade', size: '220ml', imageUrl: '' },
    { name: 'Coca-Cola Zero 220ml lata', brand: 'Coca-Cola', category: 'bebidas', price: 2.15, unitType: 'unidade', size: '220ml', flavor: 'Zero', imageUrl: '' },
    { name: 'Coca-Cola 220ml lata (Fardo c/12)', brand: 'Coca-Cola', category: 'bebidas', price: 25.80, unitType: 'fardo', size: '220ml', packQty: 12, imageUrl: '' },
    { name: 'Coca-Cola Zero 220ml lata (Fardo c/12)', brand: 'Coca-Cola', category: 'bebidas', price: 25.80, unitType: 'fardo', size: '220ml', packQty: 12, flavor: 'Zero', imageUrl: '' },
    { name: 'Fanta Laranja 220ml lata', brand: 'Fanta', category: 'bebidas', price: 1.99, unitType: 'unidade', size: '220ml', flavor: 'Laranja', imageUrl: '' },
    { name: 'Fanta Uva 220ml lata', brand: 'Fanta', category: 'bebidas', price: 1.99, unitType: 'unidade', size: '220ml', flavor: 'Uva', imageUrl: '' },
    { name: 'Fanta Laranja 220ml lata (Fardo c/6)', brand: 'Fanta', category: 'bebidas', price: 11.94, unitType: 'fardo', size: '220ml', packQty: 6, flavor: 'Laranja', imageUrl: '' },
    { name: 'Fanta Uva 220ml lata (Fardo c/6)', brand: 'Fanta', category: 'bebidas', price: 11.94, unitType: 'fardo', size: '220ml', packQty: 6, flavor: 'Uva', imageUrl: '' },
    // Energéticos BALY
    { name: 'Energético BALY 473ml Morango', brand: 'BALY', category: 'bebidas', price: 4.50, unitType: 'unidade', size: '473ml', flavor: 'Morango', imageUrl: '' },
    { name: 'Energético BALY 473ml Coco & Açaí', brand: 'BALY', category: 'bebidas', price: 4.50, unitType: 'unidade', size: '473ml', flavor: 'Coco & Açaí', imageUrl: '' },
    { name: 'Energético BALY 473ml Maçã Verde', brand: 'BALY', category: 'bebidas', price: 4.50, unitType: 'unidade', size: '473ml', flavor: 'Maçã Verde', imageUrl: '' },
    { name: 'Energético BALY 473ml Tropical', brand: 'BALY', category: 'bebidas', price: 4.50, unitType: 'unidade', size: '473ml', flavor: 'Tropical', imageUrl: '' },
    { name: 'Energético BALY 473ml Cereja', brand: 'BALY', category: 'bebidas', price: 4.50, unitType: 'unidade', size: '473ml', flavor: 'Cereja', imageUrl: '' },
    { name: 'Energético BALY 473ml Manga', brand: 'BALY', category: 'bebidas', price: 4.50, unitType: 'unidade', size: '473ml', flavor: 'Manga', imageUrl: '' },
    { name: 'Energético BALY 473ml Tradicional', brand: 'BALY', category: 'bebidas', price: 4.50, unitType: 'unidade', size: '473ml', flavor: 'Tradicional', imageUrl: '' },
    { name: 'Energético BALY 473ml Melancia', brand: 'BALY', category: 'bebidas', price: 4.50, unitType: 'unidade', size: '473ml', flavor: 'Melancia', imageUrl: '' },
    // Chocolates
    { name: 'Nestlé Suflair 50g', brand: 'Nestlé', category: 'chocolate', price: 4.99, unitType: 'unidade', size: '50g', imageUrl: '' },
    { name: 'Nestlé Suflair 50g (Caixa c/20)', brand: 'Nestlé', category: 'chocolate', price: 99.50, unitType: 'fardo', size: '50g', packQty: 20, imageUrl: '' },
    { name: 'Nestlé KitKat 41,5g', brand: 'Nestlé', category: 'chocolate', price: 2.99, unitType: 'unidade', size: '41,5g', imageUrl: '' },
    { name: 'Nestlé KitKat 41,5g (Caixa c/24)', brand: 'Nestlé', category: 'chocolate', price: 71.75, unitType: 'fardo', size: '41,5g', packQty: 24, imageUrl: '' },
    { name: 'Arcor Block 38g', brand: 'Arcor', category: 'chocolate', price: 1.75, unitType: 'unidade', size: '38g', imageUrl: '' },
    { name: 'Arcor Block 38g (Caixa c/20)', brand: 'Arcor', category: 'chocolate', price: 32.50, unitType: 'fardo', size: '38g', packQty: 20, imageUrl: '' },
    { name: 'Paçoca Clamel rolha (Caixa c/100)', brand: 'Clamel', category: 'bala', price: 29.95, unitType: 'fardo', packQty: 100, imageUrl: '' },
    { name: 'Paçoca Moreninha do Rio (Caixa c/50)', brand: 'Moreninha do Rio', category: 'bala', price: 18.50, unitType: 'fardo', packQty: 50, imageUrl: '' },
    { name: 'Paçoca Paçoquita (Caixa c/50)', brand: 'Paçoquita', category: 'bala', price: 24.90, unitType: 'fardo', packQty: 50, imageUrl: '' },
    // Fabitos
    { name: 'Fabitos Churrasco 60g', brand: 'Fabitos', category: 'salgadinho', price: 1.65, unitType: 'unidade', size: '60g', flavor: 'Churrasco', imageUrl: '' },
    { name: 'Fabitos Cebola 60g', brand: 'Fabitos', category: 'salgadinho', price: 1.65, unitType: 'unidade', size: '60g', flavor: 'Cebola', imageUrl: '' },
    { name: 'Fabitos Bacon 60g', brand: 'Fabitos', category: 'salgadinho', price: 1.65, unitType: 'unidade', size: '60g', flavor: 'Bacon', imageUrl: '' },
    { name: 'Fabitos Presunto 60g', brand: 'Fabitos', category: 'salgadinho', price: 1.65, unitType: 'unidade', size: '60g', flavor: 'Presunto', imageUrl: '' },
    { name: 'Fabitos Pizza 60g', brand: 'Fabitos', category: 'salgadinho', price: 1.65, unitType: 'unidade', size: '60g', flavor: 'Pizza', imageUrl: '' },
    { name: 'Fabitos Queijo 60g', brand: 'Fabitos', category: 'salgadinho', price: 1.65, unitType: 'unidade', size: '60g', flavor: 'Queijo', imageUrl: '' }
  ];
  await prisma.product.createMany({ data: products });
  console.log('Produtos inseridos com sucesso!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });