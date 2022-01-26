const activitiesRouter = require('express').Router();
const {
  getAllActivities,
  createActivity,
  getActivityById,
  updateActivity,
  getPublicRoutinesByActivity,
} = require('../db');

activitiesRouter.use((req, res, next) => {
  console.log(`A request is being made to /activities`);
  next();
});

activitiesRouter.get('/', async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
  try {
    const activityId = await getActivityById(req.params.activityId);
    const routineByActivity = await getPublicRoutinesByActivity(activityId);
    res.send(routineByActivity);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

activitiesRouter.post('/', async (req, res, next) => {
  try {
    const activityToCreate = req.body;
    if (!activityToCreate.name || !activityToCreate.description) {
      next({
        name: 'InvalidActivity',
        message: 'Fields are missing from activity being created',
      });
    } else {
      const createdActivity = await createActivity(activityToCreate);
      res.send(createdActivity);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

activitiesRouter.patch('/:activityId', async (req, res, next) => {
  try {
    const activityId = req.params.activityId;
    const { name, description } = req.body;
    const updateFields = {};
    if (name) {
      updateFields.name = name;
    }
    if (description) {
      updateFields.description = description;
    }
    const updatedActivity = await updateActivity({ id: activityId, name: name, description: description });
    res.send(updatedActivity);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = activitiesRouter;
