import { Router } from 'express';
import { generateShortURLHandler, getURLByShortIDHandler, getURLVisitedAnalytics } from '../controllers/url.js';
const router = Router();

router.post('/', generateShortURLHandler)
router.get('/:shortID', getURLByShortIDHandler)
router.get('/analytics/:shortID', getURLVisitedAnalytics);

export default router;