const routineActivitiesRouter = require('express').Router();
const {
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivityById,
  canEditRoutineActivity,
} = require('../db/routine_activities');
const { requireUser } = require('../db/util');

routineActivitiesRouter.use((req, res, next) => {
  console.log(` A request is being made to /routine_activities`);
  next();
});

routineActivitiesRouter.patch('/:routineActivityId', requireUser, async (req, res, next) => {
  try {
    const routineToUpdate = await getRoutineActivityById(req.params.routineActivityId);
    const routineActivityId = req.params.routineActivityId;
    const { count, duration } = req.body;
    if (!routineToUpdate) {
      next({
        name: 'ErrorGettingRoutineActivity',
        message: 'No routine found',
      });
    } else {
      const auth = await canEditRoutineActivity(req.params.routineActivityId, req.user.id);
      if (auth) {
        const updatedRoutine = await updateRoutineActivity({
          id: routineActivityId,
          count,
          duration,
        });
        res.send(updatedRoutine);
      } else {
        next({
          name: 'AuthorizationError',
          message: 'User not authorized',
        });
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

routineActivitiesRouter.delete('/:routineActivityId', requireUser, async (req, res, next) => {
  try {
    const auth = await canEditRoutineActivity(req.params.routineActivityId, req.user.id);
    if (auth) {
      const deletedRoutineActivity = await destroyRoutineActivity(req.params.routineActivityId);
      res.send(deletedRoutineActivity);
    } else {
      next({
        name: 'AuthorizationError',
        message: 'User not authorized!',
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = routineActivitiesRouter;
