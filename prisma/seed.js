import { PrismaClient } from '@prisma/client';
import fs from 'fs';
const prisma = new PrismaClient();
function slugify(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)+/g,'');}
async function main(){const raw=JSON.parse(fs.readFileSync('data/products.json','utf-8'));const catMap=new Map();const brandMap=new Map();for(const p of raw){if(!catMap.has(p.category)){const cat=await prisma.category.upsert({where:{slug:slugify(p.category)},update:{},create:{name:p.category,slug:slugify(p.category)}});catMap.set(p.category,cat.id);}if(!brandMap.has(p.brand)){const br=await prisma.brand.upsert({where:{slug:slugify(p.brand)},update:{},create:{name:p.brand,slug:slugify(p.brand)}});brandMap.set(p.brand,br.id);}}
for(const p of raw){const exists=await prisma.product.findFirst({where:{name:p.name}});if(exists) continue;await prisma.product.create({data:{name:p.name,price:p.price,spec:p.spec,imageUrl:p.image,promo:!!p.promo,sku:undefined,stock:100,categoryId:catMap.get(p.category),brandId:brandMap.get(p.brand)}});}console.log('Seed concluído');}
main().catch(e=>{console.error(e);process.exit(1);}).finally(async()=>{await prisma.$disconnect();});
