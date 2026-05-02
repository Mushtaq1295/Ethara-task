import Project from '../models/Project.js';
import Task from '../models/Task.js';
import User from '../models/User.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: 'Done' });
    const inProgressTasks = await Task.countDocuments({ status: 'In Progress' });
    const toDoTasks = await Task.countDocuments({ status: 'To Do' });
    const totalUsers = await User.countDocuments();

    // Workload distribution
    const tasks = await Task.find({}).populate('assignee', 'name');
    const workload = {};
    tasks.forEach(task => {
      if (task.assignee) {
        const name = task.assignee.name;
        workload[name] = (workload[name] || 0) + 1;
      }
    });

    const workloadData = Object.keys(workload).map(key => ({
      name: key,
      tasks: workload[key]
    }));

    res.json({
      totalProjects,
      totalTasks,
      completedTasks,
      inProgressTasks,
      toDoTasks,
      totalUsers,
      workloadData
    });
  } catch (error) {
    next(error);
  }
};
