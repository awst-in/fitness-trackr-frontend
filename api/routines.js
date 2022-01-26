const routinesRouter = require('express').Router();
const {
  getAllPublicRoutines,
  createRoutine,
  updateRoutine,
  getRoutineById,
  destroyRoutine,
  addActivityToRoutine,
} = require('../db');
const { requireUser } = require('../db/util');

routinesRouter.use((req, res, next) => {
  console.log(` A request is being made to /routines`);
  next();
});

routinesRouter.get('/', async (req, res, next) => {
  try {
    const routines = await getAllPublicRoutines();
    res.send(routines);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

routinesRouter.post('/', requireUser, async (req, res, next) => {
  const { name, goal, isPublic } = req.body;
  const creatorId = req.user.id;
  try {
    const createdRoutine = await createRoutine({
      creatorId: creatorId,
      name: name,
      goal: goal,
      isPublic: isPublic,
    });
    if (createdRoutine) {
      res.send(createdRoutine);
    } else {
      next({
        name: 'FailedToCreateRoutine',
        message: 'Error creating routine!',
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

routinesRouter.patch('/:routineId', requireUser, async (req, res, next) => {
  try {
    const id = req.params.routineId;
    const updatedRoutine = await updateRoutine({ ...req.body, id });
    if (updatedRoutine) {
      res.send(updatedRoutine);
    } else {
      next({
        name: 'FailedUpdatingRoutine',
        message: 'Error updating routine!',
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

routinesRouter.delete('/:routineId', async (req, res, next) => {
  try {
    const routineId = req.params.routineId;
    const routineToDelete = await getRoutineById(routineId);
    if (routineToDelete && routineToDelete.creatorId === req.user.id) {
      const deletedRoutine = await destroyRoutine(routineId);
      res.send(deletedRoutine);
    } else {
      next({
        name: 'UnauthorizedUserError',
        message: 'You cannot delete a routine that is not yours',
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

routinesRouter.post('/:routineId/activities', requireUser, async (req, res, next) => {
  try {
    const routineId = req.params.routineId;
    const { activityId, count, duration } = req.body;
    const addedActivity = await addActivityToRoutine({ routineId, activityId, count, duration });
    if (addedActivity) {
      res.send(addedActivity);
    } else {
      next({ name: 'ErrorAddingActivity', message: 'Cannot add activity to routine' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = routinesRouter;
