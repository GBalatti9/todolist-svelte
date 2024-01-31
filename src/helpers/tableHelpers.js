export const checkId = ( tasks, detail ) => {
    return tasks.find(( task ) => task.id === detail.id);
}