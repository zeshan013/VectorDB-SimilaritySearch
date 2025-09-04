import express from 'express';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'js-yaml';
import ciscoRoutes from './src/routes/cisco.routes.js';
dotenv.config();

const app = express();
app.use(express.json());

//get details of swagger from yml
const spec = yaml.load(fs.readFileSync('./swagger/swagger.yml', 'utf8'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(spec));

app.use('/', ciscoRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
