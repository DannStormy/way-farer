import { Router } from 'express';
import Model from '../middlewares/middlewares.model';
import * as Schema from '../../lib/schemas/lib.schema.trip';
import * as AuthMiddleware from '../middlewares/middlewares.auth';
import * as TripMiddleware from '../middlewares/middlewares.trip';
import * as TripController from '../controllers/controllers.trip';

const router = Router();

router.use(AuthMiddleware.authenticate);
router.post(
  '/book-trip',
  Model(Schema.bookTrip, 'payload'),
  [
    TripMiddleware.checkTripStatus,
    TripMiddleware.checkIfBusIsFilled,
    TripMiddleware.checkSeatAvailability
  ],
  TripController.bookTrip
);

router.use(AuthMiddleware.isAdmin);
router.post(
  '/register-bus',
  Model(Schema.registerBus, 'payload'),
  TripController.registerBus
);

router.post(
  '/create-trip',
  Model(Schema.createTrip, 'payload'),
  TripMiddleware.checkIfBusExists,
  TripMiddleware.checkBusAvailability,
  TripController.createTrip
);

router.put(
  '/cancel-trip/:trip_id',
  Model(Schema.tripId, 'param'),
  TripMiddleware.checkIfTripExists,
  TripController.cancelTrip
);

export default router;