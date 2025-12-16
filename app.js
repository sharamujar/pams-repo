import { apiReference } from '@scalar/express-api-reference'
import serveSwaggerSpecification from './src/config/openapi.js'
import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './src/routes/userRoutes.js'
import announcementRoutes from './src/routes/announcementRoutes.js'
import personRoutes from './src/routes/personRoutes.js';
import benefitEligibilityRoutes from './src/routes/benefitEligibilityRoutes.js';
import appointmentRoutes from './src/routes/appointmentRoutes.js'
import serviceTypeRoutes from './src/routes/serviceTypeRoutes.js';
import systemLogRoutes from './src/routes/systemLogRoutes.js';
import transactionRoutes from './src/routes/transactionRoutes.js';
import yearlyArchiveRoutes from './src/routes/yearlyArchiveRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = 3000

app.use(bodyParser.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/announcements", announcementRoutes);
app.use('/api/v1/persons', personRoutes);
app.use('/api/v1/benefit-eligibility', benefitEligibilityRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/service-types', serviceTypeRoutes);
app.use('/api/v1/system-logs', systemLogRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use("/api/v1/yearly-archive", yearlyArchiveRoutes);

app.use(express.static(path.join(__dirname, 'src/view')));

app.use(
  '/reference',
  apiReference({
    theme: 'laserwave',
    url: '/openapi.json',
  }),
)

app.get('/openapi.json', serveSwaggerSpecification);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

