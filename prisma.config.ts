import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
	datasource: {
	url: process.env.DATABASE_URL,
	},    
	migrate: {
    	datasourceUrl: process.env.DATABASE_URL,
  },
});