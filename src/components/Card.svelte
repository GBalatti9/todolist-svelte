<script>
    import { onMount } from "svelte";
    import { Form, TableRows } from "./";
    import { checkId } from '../helpers';

    let tasks = [];
    let filteredStatus = 'Status';

    onMount(() => {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    });

    const addNewTask = ({ detail }) => {

        let idAlreadyExists = checkId( tasks, detail );
        if ( idAlreadyExists ) {
            detail = {
                ...detail,
                id: tasks.length
            }
        }

        tasks = [ ...tasks, detail ]
        localStorage.setItem( 'tasks', JSON.stringify(tasks) );
    }

    const rowFunctions = {        
        handleDelete: ( id ) => {
            tasks = tasks.filter(( task ) => task.id !== id);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        },
        
        handleEdit: ( id ) => {
            tasks = tasks.map(( task ) => ({
                ...task,
                editing: task.id === id ? true : false
            }));

            localStorage.setItem("tasks", JSON.stringify(tasks));
        },
        
        closeEditing: () => {
            tasks = tasks.map(( task ) => ({
                ...task,
                editing: false,
            }));
            localStorage.setItem("tasks", JSON.stringify(tasks));
        },
        
        handleInputChange: ( { target }, id ) => {
            const { name, value } = target;
            console.log({ name, value });
            
            tasks = tasks.map(( task ) => ({
                ...task,
                [name]: 
                    task.id === id 
                    ? value     : name === "task"
                    ? task.task : task.status
            }))
            
            localStorage.setItem("tasks", JSON.stringify(tasks));
        },

        save: () => {
            tasks = tasks.map(( task ) => ({
                ...task,
                editing: false,
            }));
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }

    const handleFilterTask = ({ target }) => {
        filteredStatus = target.value;
    }

    $:filteredTasks = tasks.filter(( task ) => filteredStatus === "Status" || task.status === filteredStatus);
</script>


<table>
    <tbody>
        <tr>
            <td colspan="5">
                <Form on:add-task={ addNewTask }/>
            </td>
        </tr>
        <tr>
            <th id="id">#</th>
            <th>Task</th>
            <th>
                <select name="status" on:change={ (e) => handleFilterTask(e) }>
                    <option value="Status" selected>Status</option>
                    <option value="Done">Done</option>
                    <option value="In Progress">In Progress</option>
                    <option value="To Start">To Start</option>
                </select>
            </th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        { #each filteredTasks as task }
            <TableRows 
                { ...task } 
                { ...rowFunctions }
                />
        {/each }
    </tbody>
</table>

<style>
    select{
        background-color: transparent;
        border: none;
        text-align: center;
        margin: auto;
        font-weight: bold;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }

    #id{
        width: 50px;
    }
    th{
        font-weight: bold;
        width: 110px;
    }
    
    th,
    :global(td) {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }

    :global(td) {
        width: 100px;
    }

    th {
        background-color: #f2f2f2;
    }

    @media screen and (min-width: 480px){
        table{
            width: 80%;
            margin: auto;
        }
    }
    @media screen and (min-width: 1200px){
        table{
            width: 60%;
        }
    }
</style>