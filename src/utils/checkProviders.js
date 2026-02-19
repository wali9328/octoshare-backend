// src/utils/checkProviders.js
import prisma from "../config/prisma.js";

const providers = await prisma.bandwidthProvider.findMany();
console.log(providers);
process.exit();